package app.escooters.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.time.LocalDateTime;

@NamedQueries({
  @NamedQuery(name="Trip_find_current_from_scooter", query="select t from Trip t " +
    "inner join Scooter s on s = t.scooter" +
    " where s.status = 'IN_USE'")
})

@Entity
public class Trip {

  @Id
  @GeneratedValue
  private long id;

  private LocalDateTime start;
  private LocalDateTime end;
  private String startLocation;
  private String endLocation;
  private double mileage;
  private double cost;
  @ManyToOne
  private Scooter scooter;

  public Trip(LocalDateTime start, LocalDateTime end, String startLocation, String endLocation, double mileage, double cost,
       Scooter scooter){
    this.start = start;
    this.end = end;
    this.startLocation = startLocation;
    this.endLocation = endLocation;
    this.mileage = mileage;
    this.cost = cost;
    this.scooter = scooter;
  }

  public Trip(){}

  public long getId() {
    return id;
  }

  public LocalDateTime getStart() {
    return start;
  }

  public LocalDateTime getEnd() {
    return end;
  }

  public String getStartLocation() { return startLocation; }

  public String getEndLocation() { return endLocation; }

  public double getCost() {
    return cost;
  }

  public double getMileage(){
    return mileage;
  }

  public void setMileage(double mileage) {
    this.mileage = mileage;
  }

  public void setCost(double cost) {
    this.cost = cost;
  }

  public void setEnd(LocalDateTime end) {
    this.end = end;
  }

  public void setEndLocation(String endLocation) {
    this.endLocation = endLocation;
  }

  public void setStart(LocalDateTime start) {
    this.start = start;
  }

  public void setStartLocation(String startLocation) {
    this.startLocation = startLocation;
  }

  public void setScooter(Scooter scooter) {
    this.scooter = scooter;
  }

  public Scooter getScooter(){
    return this.scooter;
  }

  public static Trip createRandomTrip(){
    LocalDateTime start = LocalDateTime.of(
      (int) (Math.random() * (2019-2000) + 2000),
      (int) (Math.random() * (12-1) + 1),
      (int) (Math.random() * (31-1) + 1),
      (int) (Math.random() * (12-1) + 1),
      (int) (Math.random() * (60-1) + 1));
    LocalDateTime end = start.plusSeconds((int)(Math.random() * 9999));


    String startLocation = "gps(" + (Math.random() * 500) + ", "
      + (Math.random() * 10000) + ")";
    String endLocation  = "gps(" + (Math.random() * 500) + ", "
      + (Math.random() * 10000) + ")";

    double mileage = (Math.random() * 999999);
    double cost = (Math.random() * 29);

    return new Trip(start, end, startLocation, endLocation, mileage,
      cost, null);
  }

  @Override
  public String toString(){
    return "Trip: " + this.id + "Start: " + this.start;
  }
}
