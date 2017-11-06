import { Component, Input, OnInit } from '@angular/core';
import { Deal } from '../../services/deal';


@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.less']
})
export class ResultItemComponent implements OnInit {

  @Input('item') deal: Deal;

  constructor() {

  }


  ngOnInit() {
  }

}
