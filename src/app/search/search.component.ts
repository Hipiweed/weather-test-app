import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { WeatherService } from '../services/weather.service';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

  @ViewChild('inputField')
  inputField!: ElementRef;

  @Input() placeholder = ""

  @Output() locationChanged: EventEmitter<{lat: number, lng: number, city: string | undefined}> = new EventEmitter();

  autocomplete: google.maps.places.Autocomplete | undefined

  constructor(private weaherService: WeatherService) {}

  ngOnInit(): void {
    // Get user's location
    this.getUserLocation()
      .then(location => {
        const lat = location.lat;
        const lng = location.lng;
        let city = '';

        this.weaherService.getCityName(lat.toString(),lng.toString()).subscribe((data: any) => {
          city = data.results[0].address_components[2].long_name
          this.inputField.nativeElement.value = city
          this.locationChanged.emit({ lat, lng, city });
        })
        if (this.autocomplete) {
          this.autocomplete.setBounds(new google.maps.LatLngBounds(location));
        }
      })
      .catch(error => {
        console.error("Failed to get user location:", error);
      });
  }

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement);

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();
      if (place && place.geometry && place.geometry.location && place.address_components) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        let city = "";
        for (let i = 0; i < place.address_components.length; i++) {
          let addressType = place.address_components[i].types[0];
          if (addressType === "locality") {
            city = place.address_components[i]["long_name"];
            break;
          }
        }

        this.locationChanged.emit({ lat, lng, city });
      }
    });

  }

  getUserLocation(): Promise<{ lat: number, lng: number }> {
    return new Promise((resolve, reject) => {
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
           position => {
            console.log(position)
             const lat = position.coords.latitude;
             const lng = position.coords.longitude;
             resolve({ lat, lng });
           },
           error => {
             throw Error('Could not get user data please type data')

           }
         );
       } else {
         reject("Geolocation is not supported by this browser.");
       }
    });
  }



}


