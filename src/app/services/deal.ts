const minInHour = 60;

function two(value: number) {
  return String(value).length < 2 ? `0${value}` : value;
}

export class Duration {
  h: number;
  m: number;

  constructor({h, m}) {
    this.h = Number(h);
    this.m = Number(m);
  }

  toString() {
    return `${two(this.h)}h${two(this.m)}`;
  }

  valueOf() {
    return this.h * minInHour + this.m;
  }
}


export interface IDeal {
  transport: string;
  departure: string;
  arrival: string;
  duration: Duration;
  cost: number;
  discount: number;
  reference: string;
}


export class Deal implements IDeal {
  departure: string;
  arrival: string;
  duration: Duration;
  cost: number;
  discount: number;
  reference: string;
  transport: string;

  get hasDiscount() {
    return this.discount > 0;
  }

  get discountCost() {
    return this.cost * (1 - this.discount / 100);
  }

  constructor({transport, departure, arrival, duration, cost, discount, reference}: IDeal) {
    this.transport = transport;
    this.departure = departure;
    this.arrival = arrival;
    this.cost = cost;
    this.discount = discount;
    this.reference = reference;
    this.duration = new Duration(duration);
  }
}
