import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KEYMAPBOX } from './myhelper.service';

@Injectable({
  providedIn: 'root'
})
export class MymapService {


  constructor(private http: HttpClient) { }
  getNameFromLatLng(lat: number, lng: number): Observable<any> {

    let url = "https://api.openweathermap.org/geo/1.0/reverse?lat=" + lat + "&lon=" + lng + "&limit=2&appid=0dc0c57feb7eb1b11760a6d1d5ba3c2d"
    return this.http.get(url);
  }
  configDirections(coordinates: any): any {
    let arrayItineraireGoogleMap: any = [];

    for (var j = 0; j < coordinates.length; j++) {
      //convertir les doonées latlng de mapbox en données de google map
      arrayItineraireGoogleMap.push(this.convertMapboxToGoogleMap(coordinates[j]))
    }
    return arrayItineraireGoogleMap;
  }
  getArrayItineraireFromMapBox(
    startLocationLatitude: number, startLocationLongitude: number,
    endLocationLatitude: number, endLocationLongitude: number)
    : Observable<any> {

    let url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startLocationLongitude},${startLocationLatitude};${endLocationLongitude},${endLocationLatitude}?steps=true&geometries=geojson&access_token=${KEYMAPBOX}`;

    return this.http.get(url);
  }


  convertMapboxToGoogleMap(objectMapBox: any): any {
    return [objectMapBox[1], objectMapBox[0]];
  }

}