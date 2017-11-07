import {Component, OnInit} from '@angular/core';
import {DealsService} from '../services/deals.service';
import {Deal} from '../services/deal';
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

  total = {
    cost: 0,
    time: 0,
  }

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
        // this.results.push(...deals);
        this.total.cost = results.reduce((sum, deal) => sum + deal.cost, 0);

      });
    });
  }
}
