export enum ScooterStatus {
  IDLE = "Idle",
  IN_USE = "InUse",
  MAINTENANCE = "Maintenance"
}

export class Scooter {

  public tag: string;
  public status: string;
  public gpsLocation: string;
  public batteryCharge: number;
  public mileage: number;

  constructor(scooterTag, status: string, gpsLocation: string, batteryCharge: number, mileage: number) {
    this.tag = scooterTag;
    this.status = status;
    this.gpsLocation = gpsLocation;
    this.batteryCharge = batteryCharge;
    this.mileage = mileage;
  }

  static trueCopy(scooter: Scooter): Scooter {
    return Object.assign(new Scooter(scooter.tag, scooter.status, scooter.gpsLocation, scooter.batteryCharge, scooter.mileage), scooter);

  }

}
