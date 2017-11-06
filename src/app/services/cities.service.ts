import {Injectable} from '@angular/core';
import {DealsService} from './deals.service';

function onlyUnique(items: string[]) {
  return items.reduce((uniqueItems, item) => {
    if (!uniqueItems.includes(item)) {
      uniqueItems.push(item);
    }
    return uniqueItems;
  }, []);
}

function sortAsc(items: string[]) {
  return items.sort();
}


@Injectable()
export class CitiesService {

  constructor(private dealsService: DealsService) {
  }

  getDepartureCities(): Promise<string[]> {
    return this.dealsService.getDeals()
      .then(deals => deals.map(deal => deal.departure))
      .then(onlyUnique);
      // .then(sortAsc);
  }

  getArrivalCities(): Promise<string[]> {
    return this.dealsService.getDeals()
      .then(deals => deals.map(deal => deal.arrival))
      .then(onlyUnique);
      // .then(sortAsc);
  }
}
