package app.escooters.repositories;

import app.escooters.entity.Scooter;
import java.util.List;

public interface ScooterRepository {

  public List<Scooter> findAll();
  List<Scooter> findByQuery(String jpqlName, Object[] params);
  public Scooter findById(String tag);

  public Scooter save(Scooter scooter);

  public boolean deleteById(String tag);


}
