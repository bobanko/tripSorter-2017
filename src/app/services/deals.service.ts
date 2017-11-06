import { Injectable } from '@angular/core';
import { Deal, IDeal } from './deal';

import dealsResponse from './deals.response.json';

type TDealsRaw = {
  currency: string;
  deals: IDeal[];
};

@Injectable()
export class DealsService {

  getDealsFromServer(): Promise<TDealsRaw> {
    return Promise.resolve(dealsResponse);
  }

  mapDeals(dealsRaw: TDealsRaw): Deal[] {
    let result = dealsRaw.deals.map(raw => new Deal(raw));
    return result;
  }

  getDeals(): Promise<Deal[]> {
    return this.getDealsFromServer()
      .then(dealsRaw => this.mapDeals(dealsRaw));
  }
}
