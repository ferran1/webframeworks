export class Trip {

  start: Date;
  end: Date;
  duration: number;
  startLocation: string;
  endLocation: string;
  mileage: number;
  cost: number;
  scooterTag: string;

constructor(start, end, startLocation, endLocation, mileage, cost, scooterTag) {
  this.start = new Date(start);
  this.end = new Date(end);
  this.duration = this.end.getTime() - this.start.getTime();
  this.startLocation = startLocation;
  this.endLocation = endLocation;
  this.mileage = mileage;
  this.cost = cost;
  this.scooterTag = scooterTag;


}

static trueCopy(trip: Trip): Trip{
  return Object.assign(new Trip(trip.start, trip.end, trip.startLocation, trip.endLocation, trip.mileage, trip.cost, trip.scooterTag), trip);
}


}
