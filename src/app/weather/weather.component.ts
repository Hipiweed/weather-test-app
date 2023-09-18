import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeatherData } from '../models/WeatherDataModel';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent  {
  @Input() weatherData: undefined | WeatherData[] = undefined;

  @Output() thisWeek: EventEmitter<boolean> = new EventEmitter();

  onWeekChange(thisWeek: boolean){
    this.thisWeek.emit(thisWeek);
  }

}
