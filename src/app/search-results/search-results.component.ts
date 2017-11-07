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
  notFound = false

  totalCost: number;
  totalDiscountedCost: number;
  totalDuration: Duration;

  constructor(private searchService: SearchService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: SearchParams) => {
      this.searchService.search(params).then(results => {
        if (results.length === 0) {
          this.notFound = true;
          return;
        }
        this.results = results;
        this.totalCost = results.reduce((sum, deal) => sum + deal.cost, 0);
        this.totalDiscountedCost = results.reduce((sum, deal) => sum + deal.discountCost, 0);

        const durationMins = results.reduce((sum, deal) => sum + +deal.duration, 0);

        this.totalDuration = new Duration({
          h: Math.trunc(durationMins / 60), m: durationMins % 60
        });

      });
    });
  }
}
