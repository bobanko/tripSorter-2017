import {Injectable} from '@angular/core';
import {Deal, IDeal} from './deal';

import dealsResponse from './deals.response.json';

interface IDealsRaw {
  currency: string;
  deals: IDeal[];
}

@Injectable()
export class DealsService {

  getDealsFromServer(): Promise<IDealsRaw> {
    return Promise.resolve(dealsResponse);
  }

  mapDeals(dealsRaw: IDealsRaw): Deal[] {
    return dealsRaw.deals.map(raw => new Deal(raw));
  }

  getDeals(): Promise<Deal[]> {
    return this.getDealsFromServer()
      .then(dealsRaw => this.mapDeals(dealsRaw));
  }
}
