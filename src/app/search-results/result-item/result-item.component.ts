import { Component, Input, OnInit } from '@angular/core';
import { Duration, ResultItem } from './result-item';


@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.less']
})
export class ResultItemComponent implements OnInit {

  @Input('item') resultItem: ResultItem;

  constructor() {

  }


  ngOnInit() {
  }

}
