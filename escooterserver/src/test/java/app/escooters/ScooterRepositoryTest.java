package app.escooters;

import app.escooters.entity.Scooter;
import app.escooters.repositories.ScooterRepositoryJpa;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Class to test the scooter repository
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes=EScootersApplication.class)
class ScooterRepositoryTest {

  @Autowired
  ScooterRepositoryJpa repo;

  /**
   * Method to test the "findById" method in the repo
   */
  @Test
  public void testFindById(){
    Scooter scooter = repo.findById("L312");
    //Check if the mileage (1588) is the same as the scooter received from the repo
    Assert.assertEquals("1588", Integer.toString(scooter.getMileage()));
  }

  @Test
  @DirtiesContext
  public void testDeleteById(){
    repo.deleteById("T664");
    assertNull(repo.findById("T664"));
  }

//  @Test
//  void contextLoads() {
//  }

}
