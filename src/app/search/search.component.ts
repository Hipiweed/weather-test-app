import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

  @ViewChild('inputField')
  inputField!: ElementRef;

  @Input() placeholder = ""

  autocomplete: google.maps.places.Autocomplete | undefined

  constructor() {}

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement);

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      }
    });
  }


}


