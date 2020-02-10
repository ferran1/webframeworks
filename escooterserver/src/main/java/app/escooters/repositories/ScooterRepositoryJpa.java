package app.escooters.repositories;
import app.escooters.entity.Scooter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class ScooterRepositoryJpa implements ScooterRepository {

  private Logger logger = LoggerFactory.getLogger(this.getClass());

  @Autowired
  private EntityManager em;

  @Override
  public List<Scooter> findAll() {
    TypedQuery<Scooter> query = this.em.createQuery("select s from Scooter s", Scooter.class);
    return query.getResultList();
  }

  @Override
  public List<Scooter> findByQuery(String jpqlName, Object[] params) {
    TypedQuery<Scooter> query = this.em.createNamedQuery(jpqlName, Scooter.class);

    if(params[0] != null){
      query.setParameter(2, params[0]);
    } else query.setParameter(1, params[1].toString());

    return query.getResultList();
  }

  @Override
  public Scooter findById(String tag) {
    /*TypedQuery<Scooter> query = this.em.createQuery("select s from Scooter s where " +
      "TAG = :tag", Scooter.class).setParameter("tag", tag);*/
    return this.em.find(Scooter.class, tag);

//    return query.getSingleResult();
  }

  @Override
  public Scooter save(Scooter scooter) {
    Scooter result = em.merge(scooter);

    return result;
  }

  @Override
  public boolean deleteById(String tag) {
    int query = em.createNativeQuery("delete from Scooter where " +
      "TAG = :tag", Scooter.class).setParameter("tag", tag).executeUpdate();
    return query == 1;
  }

}

