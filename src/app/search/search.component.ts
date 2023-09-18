import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

  @ViewChild('inputField')
  inputField!: ElementRef;

  @Input() placeholder = ""

  @Output() locationChanged: EventEmitter<{lat: number, lng: number, placeID: string | undefined}> = new EventEmitter();

  autocomplete: google.maps.places.Autocomplete | undefined

  constructor() {}

  ngOnInit(): void {
    console.log(2)
  }
  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement);

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const placeID = place?.place_id
        this.locationChanged.emit({ lat, lng, placeID});
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      }
    });

  }


}


