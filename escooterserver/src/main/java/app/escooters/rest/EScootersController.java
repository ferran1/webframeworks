package app.escooters.rest;

import app.escooters.entity.Trip;
import app.escooters.repositories.ScooterRepositoryJpa;
import app.escooters.repositories.TripsRepositoryJpa;
import app.escooters.rest.exception.BadRequestException;
import app.escooters.rest.exception.ForbiddenException;
import app.escooters.rest.exception.PreConditionException;
import app.escooters.rest.exception.ResourceNotFoundException;
import app.escooters.entity.Scooter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import views.ScooterView;


import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("scooters")
public class EScootersController<E> {

  @Autowired
  private ScooterRepositoryJpa scooterService;
  @Autowired
  private TripsRepositoryJpa tripsService;

  @GetMapping(produces = "application/json")
  public List<Scooter> getAllScooters(@RequestParam(name = "battery", required = false) Integer batteryCharge,
                                      @RequestParam(name = "status", required = false) String status) {
    Object[] params = new Object[2];
    params[0] = batteryCharge;
    params[1] = status;
    System.out.println("0: " + params[0] + ", 1: " + params[1]);

    if(batteryCharge == null && status == null)
      return this.scooterService.findAll();

    if (params[0] != null && params[1] != null) {
//      error one parameter only
      throw new BadRequestException("Only one parameter allowed");
    }
//    error status incorrect

    if (params[0] != null && params[1] == null) {
      return this.scooterService.findByQuery("Scooter_find_by_battery", params);
    } else if (params[0] == null && params[1] != null && params[1].equals(Scooter.ScooterStatus.IN_USE.name()) ||
      params[1].equals(Scooter.ScooterStatus.IDLE.name())
      || params[1].equals(Scooter.ScooterStatus.MAINTENANCE.name())) {
      return this.scooterService.findByQuery("Scooter_find_by_status", params);
    } else throw new BadRequestException("status=" + params[1] + " is not a " +
      "valid scooter status value");
  }

  @GetMapping(path = "/{tag}")
  public Scooter getScooterByTag(@PathVariable String tag) {
    if (scooterService.findById(tag) == null) {
      throw new ResourceNotFoundException("Scooter not found: " + tag);
    } else return scooterService.findById(tag);
  }

  @GetMapping(path = "/currenttrips")
  public List<Trip> getCurrentTrips(){
    return tripsService.findByQuery("Trip_find_current_from_scooter");
  }

  @PostMapping
  public ResponseEntity<Scooter> saveScooter(@RequestBody Scooter scooter) {
    Scooter savedScooter = scooterService.save(scooter);

    URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{tag}")
      .buildAndExpand(savedScooter.getTag()).toUri();
    return ResponseEntity.created(location).body(savedScooter);

  }

  @PostMapping(path = "/{tag}/claim")
  public ResponseEntity<Trip> claimTrip(@RequestBody(required = false) LocalDateTime date, @PathVariable String tag) {
    int batteryChargeThreshold = 10;
    Scooter scooter = scooterService.findById(tag);
    Trip trip;

    if (scooter.getStatus() == Scooter.ScooterStatus.MAINTENANCE
      || scooter.getStatus() == Scooter.ScooterStatus.IN_USE) {
      throw new PreConditionException("Scooter-Tag=" + scooter.getTag() + " with status " + scooter.getStatus()
        + " cannot be claimed for another trip"
      );
    } else if (scooter.getBatteryCharge() < batteryChargeThreshold) {
      throw new PreConditionException("Scooter-Tag=" + scooter.getTag() + " with battery charge " +
        scooter.getBatteryCharge() + " cannot be claimed for another trip"
      );
    }

    if (date == null) {
      trip = scooter.createNewTrip(LocalDateTime.now());
    } else trip = scooter.createNewTrip(date);


    trip = tripsService.save(trip);
    scooter.setCurrentTrip(tripsService.findById(trip.getId()));
    scooter.setStatus(Scooter.ScooterStatus.IN_USE);
    scooterService.save(scooter);

    URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{tag}/claim")
      .buildAndExpand(scooter.getTag()).toUri();
    return ResponseEntity.created(location).body(trip);
  }

  @PutMapping(path = "/{tag}")
  public Scooter updateScooter(@PathVariable String tag, @RequestBody Scooter scooter) {
    if (!tag.equals(scooter.getTag())) {
      throw new ForbiddenException("Scooter-tag=" + scooter.getBatteryCharge() + " does not match path parameter: " + tag);
    } else if (scooterService.findById(tag) != null) {
      return scooterService.save(scooter);
    } else throw new ResourceNotFoundException("Scooter not found!");
  }

  @DeleteMapping(path = "/{tag}")
  public boolean deleteScooter(@PathVariable String tag) {
    if (scooterService.findById(tag) == null) {
      throw new ResourceNotFoundException("Scooter not found: " + tag);
    } else if (scooterService.findById(tag) != null) {
      return scooterService.deleteById(tag);
    } else return false;
  }

}
