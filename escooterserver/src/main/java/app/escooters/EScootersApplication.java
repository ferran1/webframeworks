package app.escooters;

import app.escooters.entity.Scooter;
import app.escooters.entity.Trip;
import app.escooters.repositories.ScooterRepositoryJpa;
import app.escooters.repositories.TripsRepositoryJpa;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.transaction.Transactional;
import java.util.List;

@SpringBootApplication
public class EScootersApplication implements CommandLineRunner {

  private Logger logger = LoggerFactory.getLogger(this.getClass());

  @Autowired
  ScooterRepositoryJpa scootersRepo;
  @Autowired
  TripsRepositoryJpa tripsRepo;

  public static void main(String[] args) {
    SpringApplication.run(EScootersApplication.class, args);
  }

  @Override
  public void run(String... args) throws Exception {
    createInitialScooters();
    createInitialTrips();
    logger.info("All scooters -> {}", scootersRepo.findAll());
  }
  @Transactional
  protected void createInitialScooters() {
    List<Scooter> scooters = this.scootersRepo.findAll();

    if (scooters != null && scooters.size() > 0) return;
    System.out.println("Configuring some initial scooter data");

    for (int i = 0; i < 9; i++) {
      Scooter scooter = Scooter.createRandomScooter();
      scooter = this.scootersRepo.save(scooter);
    }
  }


  @Transactional
  protected void createInitialTrips(){
    List<Trip> trips = this.tripsRepo.findAll();

    if(trips != null && trips.size() > 0) return;
    System.out.println("Configuring some initial trips data");


    for (int i = 0; i < 9; i++) {
      Trip trip = Trip.createRandomTrip();
      trip.setScooter(this.scootersRepo.findAll().get((int)
        (Math.random() * 9)));
      /*Scooter scooter = this.scootersRepo.findById(trip.getScooter().getScooterTag());
      scooter.addTrip(trip);*/
      /*Scooter scooter = this.scootersRepo.findById(trip.getScooter().getScooterTag());
      scooter.setCurrentTrip(trip);*/
      trip = this.tripsRepo.save(trip);
    }

  }
}
