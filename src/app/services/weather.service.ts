import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = process.env["API_KEY"]

  constructor(private http: HttpClient) { }

  formatDate = (date: Date): string => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  getTimezone(latitude: string, longitude: string): Observable<any> {
    const apiKey = this.apiKey;
    const timestamp = Math.floor(Date.now() / 1000);
    const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${timestamp}&key=${apiKey}`;
    return this.http.get(url);
  }

  getCityName(latitude: string, longitude: string) {
    const apiKey = this.apiKey;
    const urlCityName = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    return this.http.get(urlCityName);
  }

  getWeatherDataForThisWeek(latitude: string, longitude: string, ) {
    return this.getTimezone(latitude, longitude).pipe(
      switchMap((timezoneData) => {
        const timezone = encodeURIComponent(timezoneData.timeZoneId);
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,rain_sum,windspeed_10m_max&timezone=${timezone}`;
        return this.http.get(url);
      })
    );
  }
  getWeatherDataForLastWeek(latitude: string, longitude: string, ) {
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 7);
    const formattedCurrentDate = this.formatDate(currentDate);
    const formattedPastDate = this.formatDate(pastDate);
    return this.getTimezone(latitude, longitude).pipe(
      switchMap((timezoneData) => {
        const timezone = encodeURIComponent(timezoneData.timeZoneId);
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${formattedPastDate}&end_date=${formattedCurrentDate}&daily=temperature_2m_max,temperature_2m_min,rain_sum,windspeed_10m_max&timezone=${timezone}`;
        return this.http.get(url);
      })
    );
  }




}
