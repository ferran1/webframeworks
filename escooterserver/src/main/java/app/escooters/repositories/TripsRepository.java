package app.escooters.repositories;

import app.escooters.entity.Scooter;
import app.escooters.entity.Trip;

import java.util.List;

public interface TripsRepository {

  public List<Trip> findAll();

  List<Trip> findByQuery(String jpqlName);

  public Trip findById(long id);

  public Trip save(Trip trip);

  public boolean deleteById(long id);

}
