import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RESTAPIService {
  
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/text'
    })
  };
  
  public getJardinsRemarquables():Observable<any> {
    // let url = ''
    let url = "http://localhost:4200/api/records/1.0/search/?dataset=liste-des-jardins-remarquables&q=&facet=region&facet=departement&facet=types&refine.departement=Paris";
    return this.http.get(url, this.httpOptions);
  }
  public getItinerairesConseilEurope():Observable<any> {
    // let url = ''
    let url = "http://localhost:4200/api/records/1.0/search/?dataset=itineraires-culturels-du-conseil-de-l-europe&q=&facet=region&refine.departement=Paris";
    return this.http.get(url, this.httpOptions);
  }
  public getMusees():Observable<any> {
    // let url = ''
    let url = "http://localhost:4200/api/records/1.0/search/?dataset=liste-et-localisation-des-musees-de-france&q=&rows=20&facet=region_administrative&facet=departement&refine.departement=Paris";
    return this.http.get(url, this.httpOptions);
  }
}