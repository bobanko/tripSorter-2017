import {Component, Input} from '@angular/core';
import {Deal} from '../../services/deal';


@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.less']
})
export class ResultItemComponent {
  @Input('item') deal: Deal;
}
