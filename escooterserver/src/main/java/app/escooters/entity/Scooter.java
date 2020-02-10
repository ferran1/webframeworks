package app.escooters.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@NamedQueries({
  @NamedQuery(name="Scooter_find_by_status", query="select s from Scooter s where " +
    "STATUS = ?1"),
  @NamedQuery(name="Scooter_find_by_battery", query="select s from Scooter s where" + " BATTERY_CHARGE <= ?2")
})
@Entity
public class Scooter {

  public enum ScooterStatus {
    MAINTENANCE,
    IDLE,
    IN_USE
  }

  //  @JsonView(ScooterView.OnlyTagAndStatus.class)
  @Id
  private String tag;
  //  @JsonView(ScooterView.OnlyTagAndStatus.class)
  @Enumerated(EnumType.STRING)
  private ScooterStatus status;

  private String gpsLocation;
  private int batteryCharge;
  private int mileage;

  @OneToOne
  private Trip currentTrip;
  @JsonIgnore
  @OneToMany(mappedBy = "scooter", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
  private List<Trip> trips = new ArrayList<>();

  public Scooter() {
  }

  public Scooter(String scooterTag, ScooterStatus status, String gpsLocation, int batteryCharge,
                 int mileage, Trip currentTrip, List<Trip> trips) {
    this.tag = scooterTag;
    this.status = status;
    this.gpsLocation = gpsLocation;
    this.batteryCharge = batteryCharge;
    this.mileage = mileage;
    this.currentTrip = currentTrip;
    this.trips = trips;
  }

  public String getTag() {
    return tag;
  }

  public void setTag(String tag) {
    this.tag = tag;
  }

  public int getBatteryCharge() {
    return batteryCharge;
  }

  public int getMileage() {
    return mileage;
  }

  public String getGpsLocation() {
    return gpsLocation;
  }

  public Trip getCurrentTrip() {
    return currentTrip;
  }

  public ScooterStatus getStatus(){
    return status;
  }

  public void setBatteryCharge(int batteryCharge) {
    this.batteryCharge = batteryCharge;
  }

  public void setStatus(ScooterStatus status) {
    this.status = status;
  }

  public void setCurrentTrip(Trip currentTrip) {
    this.currentTrip = currentTrip;
  }

  public void setMileage(int mileage) {
    this.mileage = mileage;
  }

  public void setGpsLocation(String gpsLocation) {
    this.gpsLocation = gpsLocation;
  }

  public List<Trip> getTrips(){
    return this.trips;
  }

  public void setTrips(List<Trip> trips) {
    this.trips = trips;
  }

  public void addTrip(Trip trip){
    this.trips.add(trip);
  }

  public Trip createNewTrip(LocalDateTime start){
    Trip trip = new Trip(start, null, gpsLocation,null, 0.03, 0.0, this);
    return trip;
  }

  @Override
  public int hashCode() {
    return Objects.hash(tag);
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if(obj == null || getClass() != obj.getClass()) return false;
    Scooter scooter = (Scooter) obj;
    return tag.equals(scooter.tag);
  }

  @Override
  public String toString(){
    return "Scooter: " + this.tag;
  }

  public static Scooter trueCopy(Scooter scooter) {
    Scooter scooterCopy = new Scooter(scooter.tag, scooter.status,
      scooter.gpsLocation, scooter.batteryCharge, scooter.mileage, scooter.currentTrip, scooter.trips);
    return scooterCopy;
  }

  public static String generateScooterTag() {
    String scooterTag = "";
    String alphabet = "ABCDEFGHIJKLMNOPQRSTVWXYZ";
    scooterTag += alphabet.charAt((int) (Math.random() * 25));
    for (int i = 0; i < 3; i++) {
      scooterTag += Math.round(Math.random() * 9);
    }
    System.out.println(scooterTag);
    return scooterTag;
  }

  public static Scooter createRandomScooter(){
    int mileage = (int) Math.floor(Math.random() * 4000);
    int batteryCharge = (int) (Math.random() * 100);
    ScooterStatus status = ScooterStatus.values()[(int) (Math.random() * 2)];
    String gpsLocation = "lng: " + (int) (Math.random() * 99999) + " lat: " + (int) (Math.random() * 99999);

    Scooter scooter = new Scooter(Scooter.generateScooterTag(), status, gpsLocation, batteryCharge, mileage,
      null, null);

    return scooter;
  }



}
