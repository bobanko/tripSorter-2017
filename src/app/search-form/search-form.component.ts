import {Component} from '@angular/core';
import {CitiesService} from '../services/cities.service';
import {SearchParams, SearchService} from '../services/search.service';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.less']
})
export class SearchFormComponent {

  departureCities: string[];
  arrivalCities: string[];

  searchParams: SearchParams = new SearchParams();

  constructor(private citiesService: CitiesService,
              private searchService: SearchService) {
    citiesService.getDepartureCities()
      .then(cities => {
        this.departureCities = cities;
        this.searchParams.departure = cities[0];
      });
    citiesService.getArrivalCities()
      .then(cities => {
        this.arrivalCities = cities;
        this.searchParams.arrival = cities[0];
      });

    this.searchParams.sortType = 'cheapest';
  }

  search(searchParams: SearchParams) {
    this.searchService.search(searchParams);
    // todo: show/redirect to results
  }
}
