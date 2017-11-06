import {Component, OnInit} from '@angular/core';
import {CitiesService} from '../services/cities.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.less']
})
export class SearchFormComponent implements OnInit {

  departureCities: string[];
  arrivalCities: string[];


  constructor(private citiesService: CitiesService) {
    citiesService.getDepartureCities()
      .then(cities => this.departureCities = cities);
    citiesService.getArrivalCities()
      .then(cities => this.arrivalCities = cities);
  }

  ngOnInit() {
  }

}
