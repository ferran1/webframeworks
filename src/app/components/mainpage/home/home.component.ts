import{Component, OnInit}from '@angular/core';

@Component({
selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

listCities: string;
dropDownCities: object;
dropDownText: string;
imgDescription: object;

image1 = 'assets/images/E-bikes1.jpg'
image2 = 'assets/images/E-bikes.jpg'
image3 = 'assets/images/E-bikes2.jpg'
image4 = 'assets/images/E-bikes3.jpg'
image5 = 'assets/images/E-bikes4.jpg'
image6 = 'assets/images/E-bikes5.jpg'
image7 = 'assets/images/E-bikes6.jpg'


descriptionTitle: string;
description: string;
bikeLocation: string;
approximateDuration: string;


showPlekInfo(description, image){
switch(image) {
case "assets/images/E-bikes1.jpg":
this.descriptionTitle = description.name;
this.description = description.description;
this.bikeLocation = description.location;
this.approximateDuration = description.duration;
break;
case "assets/images/E-bikes.jpg":
this.descriptionTitle = description.name;
this.description = description.description;
this.bikeLocation = description.location;
this.approximateDuration = description.duration;
break;
case "assets/images/E-bikes2.jpg":
this.descriptionTitle = null;
break;
case "assets/images/E-bikes4.jpg":
this.descriptionTitle = null;
break;
}

}

showCity(e, city){
console.log(e, city.places)
this.dropDownText = city.name;
this.listCities = city.places;
}

constructor() {

this.dropDownCities = [
{"name":"Amsterdam",
"places":[{"name":"Leidseplein", "bikes":5}, {"name":"Haarlemmerweg", "bikes":12},
{"name":"Amstelveenseweg", "bikes":3 }]},
{"name":"Rotterdam"},
{"name":"Den Haag"}
]

this.imgDescription = [
{"name":"Canal tour", "description":"Tour around the Canals. Visit the old warehouses that helped Amsterdam become a great city!", "location":"Leidseplein", "duration":"2 hours and 10 minutes"},
{"name":"Test", "description":"Test", "location":"Testplein", "duration":"1 hours and 10 minutes"}]
}

ngOnInit() {
  }

}
