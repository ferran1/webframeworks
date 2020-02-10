package app.escooters.repositories;

import app.escooters.entity.Scooter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ScooterRepositoryMock implements ScooterRepository {

  private ArrayList<Scooter> scooters;

  public ScooterRepositoryMock() {
    scooters = new ArrayList<Scooter>(7);
    scooters.add(new Scooter(generateScooterTag(), Scooter.ScooterStatus.IN_USE, "lng: 100 lat: 400",
      80, 7530, null, null));
    scooters.add(new Scooter(generateScooterTag(), Scooter.ScooterStatus.MAINTENANCE, "lng: 1230 lat: 120",
      23, 4120, null, null));
    scooters.add(new Scooter(generateScooterTag(), Scooter.ScooterStatus.IDLE, "lng: 3123 lat: 890",
      55, 5550, null, null));
    scooters.add(new Scooter(generateScooterTag(), Scooter.ScooterStatus.MAINTENANCE, "lng: 1234 lat: 190",
      55, 1234, null, null));
    scooters.add(new Scooter(generateScooterTag(), Scooter.ScooterStatus.IN_USE, "lng: 62132 lat: 2230",
      65, 9876, null,null));
    scooters.add(new Scooter(generateScooterTag(), Scooter.ScooterStatus.IDLE, "lng: 97123 lat: 3210",
      76, 4423, null, null));
    scooters.add(new Scooter(generateScooterTag(), Scooter.ScooterStatus.IDLE, "lng: 25123 lat: 1423",
      32, 4321, null, null));
  }

  private static String generateScooterTag() {
    String scooterTag = "";
    String alphabet = "ABCDEFGHIJKLMNOPQRSTVWXYZ";
    scooterTag += alphabet.charAt((int) (Math.random() * 25));
    for (int i = 0; i < 3; i++) {
      scooterTag += Math.round(Math.random() * 9);
    }
    System.out.println(scooterTag);
    return scooterTag;
  }

  @Override
  public ArrayList<Scooter> findAll() {
    return scooters;
  }

  @Override
  public List<Scooter> findByQuery(String jpqlName, Object[] params) {
    return null;
  }

  @Override
  public Scooter findById(String tag) {
    return scooters.stream().filter(scooter -> scooter.getTag().equals(tag)
    ).findFirst().orElse(null);
  }

  @Override
  public Scooter save(Scooter scooter) {
    if (findById(scooter.getTag()) == null) {
      scooters.add(scooter);
    } else for (Scooter s : scooters) {
      if (s.getTag().equals(scooter.getTag())) {
        int indexOfScooter = scooters.indexOf(s);
        return scooters.set(indexOfScooter, scooter);
      }
    }
    return findById(scooter.getTag());
  }

  @Override
  public boolean deleteById(String tag) {
    if (tag != null && findById(tag) != null) {
      scooters.removeIf(scooter -> scooter.getTag().equals(tag));
      return true;
    } else return false;
  }

}
