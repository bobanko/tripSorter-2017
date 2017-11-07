import {Component, OnInit} from '@angular/core';
import {CitiesService} from '../services/cities.service';
import {SearchParams} from '../services/search.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.less']
})
export class SearchFormComponent implements OnInit {

  departureCities: string[];
  arrivalCities: string[];

  searchParams: SearchParams = new SearchParams();

  constructor(private citiesService: CitiesService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: SearchParams) => {

      this.citiesService.getDepartureCities()
        .then(cities => {
          this.departureCities = cities;
          this.searchParams.departure = params.departure || cities[0];
        });

      this.citiesService.getArrivalCities()
        .then(cities => {
          this.arrivalCities = cities;
          this.searchParams.arrival = params.arrival || cities[0];
        });

      this.searchParams.sortType = params.sortType || 'cheapest';
    });
  }

  search(searchParams: SearchParams) {
    this.router.navigate(['/results', searchParams]);
  }
}
