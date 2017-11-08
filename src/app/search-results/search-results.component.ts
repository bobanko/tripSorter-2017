import {Component, OnInit} from '@angular/core';
import {Deal, Duration} from '../services/deal';
import {SearchParams, SearchService} from '../services/search.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.less']
})
export class SearchResultsComponent implements OnInit {

  results: Deal[] = [];

  totalCost: number;
  totalDiscountedCost: number;
  totalDuration: Duration;

  searchParams: SearchParams;

  constructor(private searchService: SearchService,
              private route: ActivatedRoute) {
  }

  getTotalCost(results: Deal[]): number {
    return results.reduce((sum, deal) => sum + deal.cost, 0);
  }

  getTotalDiscountedCost(results: Deal[]): number {
    return results.reduce((sum, deal) => sum + deal.discountCost, 0);
  }

  getTotalDuration(results: Deal[]): Duration {
    const durationMins = results.reduce((sum, deal) => sum + +deal.duration, 0);

    return new Duration({
      h: Math.trunc(durationMins / 60), m: durationMins % 60
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: SearchParams) => {
      this.searchParams = params;
      this.searchService.search(params).then(results => {
        if (results.length === 0) {
          return;
        }

        this.results = results;
        this.totalCost = this.getTotalCost(results);
        this.totalDiscountedCost = this.getTotalDiscountedCost(results);
        this.totalDuration = this.getTotalDuration(results);
      });
    });
  }
}
