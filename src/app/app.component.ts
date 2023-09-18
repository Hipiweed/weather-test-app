import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private weatherService: WeatherService) {}

  onLocationChanged(location: {lat: number, lng: number, placeID: string | undefined}) {
    const lat = location.lat.toString();
    const lng = location.lng.toString();
    const placeID = location.placeID
    if(!placeID) throw Error('No place id cannot get data')
    this.weatherService.getWeatherDataForThisWeak(lat, lng, placeID).subscribe(data => {
      console.log(data)
  })

  }

}
