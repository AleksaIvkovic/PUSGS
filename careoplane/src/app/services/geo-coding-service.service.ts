import { Injectable } from '@angular/core';
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

  public LatLon(address: string): google.maps.LatLng{
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        return results[0].geometry.location;
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
        return null;
      }
    });
    return null;
  }
}
