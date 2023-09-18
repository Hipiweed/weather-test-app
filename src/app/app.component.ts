import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { WeatherData } from './models/WeatherDataModel';
import { BehaviorSubject, Subject } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  weatherData:undefined | WeatherData[] = undefined;

  constructor(private weatherService: WeatherService, private changeDetector: ChangeDetectorRef) {}

  onLocationChanged(location: {lat: number, lng: number, city: string | undefined}) {
    const lat = location.lat.toString();
    const lng = location.lng.toString();
    this.weatherService.getWeatherDataForThisWeak(lat, lng).subscribe((data: any) => {
      const weatherData: WeatherData[] = data.daily.time.map((time: string, index: number) => {
        return {
          maxTemp: data.daily.temperature_2m_max[index],
          minTemp: data.daily.temperature_2m_min[index],
          rain: data.daily.rain_sum[index],
          avrageTemp: (data.daily.temperature_2m_max[index] + data.daily.temperature_2m_min[index]) / 2,
          city:location.city,
          windSpeed: data.daily.windspeed_10m_max[index],
          date: time
        };
      });
      this.weatherData = weatherData
      this.changeDetector.detectChanges();
    })

  }

}
