export class Duration {
  h: number;
  m: number;

  constructor({h, m}){
    this.h = Number(h);
    this.m = Number(m);
  }

  toString() {
    return `${this.h}h${this.m}`;
  }
}





export type TResultItem = {
  transport: string;
  departure: string;
  arrival: string;
  duration: Duration;
  cost: number;
  discount: number;
  reference: string;
}


export class ResultItem {
  transport: string;
  departure: string;
  arrival: string;
  duration: Duration;
  cost: number;
  discount: number;
  reference: string;
}
