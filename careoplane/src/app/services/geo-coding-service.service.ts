import { Injectable, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeoCodingServiceService {
  public constructor() { }

  // public LatLon(address: string): google.maps.LatLng{
  //   let geocoder: google.maps.Geocoder;
  //   geocoder = new google.maps.Geocoder();
  //   geocoder.geocode({'address': address},(results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
  //     console.log(results[0].geometry);
  //     return results[0].geometry.location;
  //   });
  //   return null;
  // }

  public checkAddress(address: string): boolean{
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address':address}, function(results, status) {
      if (status === 'OK') {
        return true;
      }
      else{
        return false;
      }
    });

    return false;
  }

  public LatLon(address: string, map: google.maps.Map, gmap: ElementRef):void{
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address':address}, function(results, status) {
      if (status === 'OK') {
        this.mapOptions  = {
          center:results[0].geometry.location
          ,
          zoom: 8
        }; 
        this.map = new google.maps.Map(gmap.nativeElement,this.mapOptions);
        this.marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map
        });
        this.marker.setMap(this.map);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
        return null;
      }
    });
    return null;
  }
}
