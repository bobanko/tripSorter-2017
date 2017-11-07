import {Component} from '@angular/core';
import {CitiesService} from '../services/cities.service';
import {SearchParams} from '../services/search.service';
import {Router} from '@angular/router';


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
              private router: Router) {
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
    this.router.navigate(['/results', searchParams]);
  }
}
