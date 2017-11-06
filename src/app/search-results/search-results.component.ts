import { Component, OnInit } from '@angular/core';
import { DealsService } from '../services/deals.service';
import { Deal } from '../services/deal';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.less']
})
export class SearchResultsComponent implements OnInit {

  results: Deal[] = [];

  constructor(dealsService: DealsService) {

    dealsService.getDeals().then(deals => this.results = deals);

  }

  ngOnInit() {
  }

}
