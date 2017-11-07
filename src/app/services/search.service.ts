import {Injectable} from '@angular/core';
import {CitiesService} from './cities.service';
import {DealsService} from './deals.service';
import {Deal} from './deal';


export class SearchParams {
  departure: string;
  arrival: string;
  sortType: string;
}

class Node {
  constructor(public name: string,
              public isOut: boolean = false,
              public shortestPath: number = Infinity,
              public cameFrom: Node = null) {
  }
}

class Edge {
  constructor(public _deal: Deal,
              public weight: number,
              public from: Node,
              public to: Node) {
  }
}


@Injectable()
export class SearchService {

  nodes: Node[];
  edges: Edge[];

  constructor(private citiesService: CitiesService,
              private dealsService: DealsService) {
    Promise.all([
      this.dealsService.getDeals(),
      this.citiesService.getAllCities()
    ]).then(([deals, cities]) => this.initGraph(deals, cities));
  }

  initGraph(deals: Deal[], cities: string[]) {
    this.nodes = cities.map(city => new Node(city));

    this.edges = deals.map(deal => {
      return new Edge(
        deal, deal.cost, // todo: add similar for duration
        this.nodes.find(x => x.name === deal.departure),
        this.nodes.find(x => x.name === deal.arrival));
    });

    console.log(this.edges[0]);
  }

  search(searchParams: SearchParams) {
    console.log(searchParams);
    // todo: impl

    const fromNode = this.nodes.find(node => node.name === searchParams.departure);
    const toNode = this.nodes.find(node => node.name === searchParams.departure);

    this.edges.forEach(edge => {


    });

  }

}
