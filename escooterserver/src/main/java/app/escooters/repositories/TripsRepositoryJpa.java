package app.escooters.repositories;

import app.escooters.entity.Scooter;
import app.escooters.entity.Trip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public class TripsRepositoryJpa implements TripsRepository {

  @Autowired
  private EntityManager em;

  @Override
  public List<Trip> findAll() {
    TypedQuery<Trip> trips = em.createQuery("select t from Trip t",
      Trip.class);

    return trips.getResultList();
  }

  // Returns a list of Trips by passing in the name of a named query
  @Override
  public List<Trip> findByQuery(String jpqlName) {
    TypedQuery<Trip> query = em.createQuery(jpqlName, Trip.class);

    return query.getResultList();
  }

  @Override
  public Trip findById(long id) {
    return em.find(Trip.class, id);
  }

  @Override
  public Trip save(Trip trip) {
    return em.merge(trip);
  }

  @Override
  public boolean deleteById(long id) {
    Query query = em.createNativeQuery("delete from Trip where ID == :id",
      Trip.class).setParameter("id", id);
    int result = query.executeUpdate();
    return result == 1;
  }
}
