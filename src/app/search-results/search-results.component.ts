import { Component, OnInit } from '@angular/core';
import { Duration, ResultItem } from './result-item/result-item';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.less']
})
export class SearchResultsComponent implements OnInit {

  results: ResultItem[] = [];

  constructor() {

    this.results.push({
      'transport': 'train',
      'departure': 'London',
      'arrival': 'Amsterdam',
      'duration': new Duration({
        'h': '3',
        'm': '30'
      }),
      'cost': 160,
      'discount': 50,
      'reference': 'TLA0330'
    });


  }

  ngOnInit() {
  }

}
