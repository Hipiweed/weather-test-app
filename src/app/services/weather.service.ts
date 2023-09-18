import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }


  getTimezone(latitude: string, longitude: string): Observable<any> {
    const apiKey = '***REMOVED***';
    const timestamp = Math.floor(Date.now() / 1000);
    const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${timestamp}&key=${apiKey}`;
    return this.http.get(url);
  }

  getCityName(latitude: string, longitude: string) {
    const apiKey = '***REMOVED***';
    const urlCityName = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    return this.http.get(urlCityName);
  }

  getWeatherDataForThisWeak(latitude: string, longitude: string, ) {
    return this.getTimezone(latitude, longitude).pipe(
      switchMap((timezoneData) => {
        const timezone = encodeURIComponent(timezoneData.timeZoneId);
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,rain_sum,windspeed_10m_max&&timezone=${timezone}`;
        return this.http.get(url);
      })
    );
  }


}
