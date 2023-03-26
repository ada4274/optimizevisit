import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet'; 
import { Subscription } from 'rxjs';
import { RESTAPIService } from 'src/app/services/restapiservice.service';

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy , AfterViewInit{

  private jardinsSubscription: Subscription = new Subscription;
  private itinerairesConseilEurope: Subscription = new Subscription;
  private museesSubscription: Subscription = new Subscription;

  constructor(private apiService: RESTAPIService){
  }
  ngAfterViewInit(): void {
     }
  ngOnDestroy(): void {
    this.jardinsSubscription.unsubscribe();
    this.itinerairesConseilEurope.unsubscribe();
    this.museesSubscription.unsubscribe();
  }
  // private datas :any;
  private jardins :any;
  private musees :any;
  private dataCoords = [];
  public dataLoaded = false;

  ngOnInit(): void {
    // this.jardinsSubscription = this.apiService.getJardinsRemarquables().subscribe(data =>
    // {
    //   this.jardins = data;
    //   console.log(data)
    // }); 
    this.museesSubscription = this.apiService.getMusees().subscribe(data =>
      {
        
        this.musees = data;
        this.dataLoaded = true;
        console.log(data)
      });
    
      // this.itinerairesConseilEurope = this.apiService.getItinerairesConseilEurope().subscribe(data =>
      //   {
      //     console.log(data)
         
      //   });
  }
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 16,
    zoomControl: false,
    center: { lat: 48.856614, lng: 2.3522219 }
  }

initApiMarkers(){
  console.log(this.dataCoords)
  //@ts-ignore

// this.datas.records.forEach(element => {
//   //@ts-ignore
//     this.dataCoords.push(
//   //@ts-ignore
//      { position: { lat: element.geometry.coordinates[1], lng:  element.geometry.coordinates[0] },

//   //@ts-ignore
//       draggable: true,
//     description: element.fields.description
//     }
      
//       )
// });
  //@ts-ignore

this.musees.records.forEach(element => {
  //@ts-ignore
    this.dataCoords.push(
  //@ts-ignore
     { position: { lat: element.geometry.coordinates[1], lng:  element.geometry.coordinates[0] },

  //@ts-ignore
      draggable: true,
    description: element.fields.nom_officiel_du_musee
    }
      
      )
});
  //@ts-ignore

// this.jardins.records.forEach(element => {
//   //@ts-ignore
//     this.dataCoords.push(
//   //@ts-ignore
//      { position: { lat: element.geometry.coordinates[1], lng:  element.geometry.coordinates[0] },

//   //@ts-ignore
//       draggable: true,
//     description: element.fields.description
//     }
      
//       )
// });

for (let index = 0; index < this.dataCoords.length; index++) {
  const data1 = this.dataCoords[index];
  //@ts-ignore
  const marker1 = Leaflet.marker(this.dataCoords[index].position, { draggable: data1.draggable })
      //@ts-ignore

  console.log(this.dataCoords[index])
  console.log(marker1)
  // const marker1 = this.generateMarker(data1, index);
      //@ts-ignore

  marker1.addTo(this.map).bindPopup(`<b>${data1.description}</b>`);
  //     //@ts-ignore

  // this.map.panTo(data1.position);
  // this.markers.push(marker1)
}

// for (let index = 0; index < this.jardins.length; index++) {
//   const data1 = this.jardins[index];
//   //@ts-ignore
//   const marker1 = Leaflet.marker(this.jardins[index].position, { draggable: data1.draggable })
//       //@ts-ignore

//   console.log(this.jardins[index])
//   console.log(marker1)
//   // const marker1 = this.generateMarker(data1, index);
//       //@ts-ignore

//   marker1.addTo(this.map).bindPopup(`<b>${data1.description}</b>`);
//   //     //@ts-ignore

//   // this.map.panTo(data1.position);
//   // this.markers.push(marker1)
// }
for (let index = 0; index < this.musees.length; index++) {
  const data1 = this.musees[index];
  //@ts-ignore
  const marker1 = Leaflet.marker(this.musees[index].position, { draggable: data1.draggable })
      //@ts-ignore

  console.log(this.musees[index])
  console.log(marker1)
  // const marker1 = this.generateMarker(data1, index);
      //@ts-ignore

  marker1.addTo(this.map).bindPopup(`<b>${data1.description}</b>`);
  //     //@ts-ignore

  // this.map.panTo(data1.position);
  // this.markers.push(marker1)
}
}

  initMarkers() {
    const initialMarkers = [
      {
        position: { lat: 48.856614, lng: 2.3522219 },
        draggable: true
      },
      // {
      //   position: { lat: 28.625293, lng: 79.817926 },
      //   draggable: false
      // },
      // {
      //   position: { lat: 28.625182, lng: 79.81464 },
      //   draggable: true
      // }
    ];
    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
      this.map.panTo(data.position);
      this.markers.push(marker)
    }
   
   
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
    this.initApiMarkers();
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  } 

}
