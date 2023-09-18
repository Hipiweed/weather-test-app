import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherData } from '../models/WeatherDataModel';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent  {
  @Input() weatherData: undefined | WeatherData[] = undefined;

}
