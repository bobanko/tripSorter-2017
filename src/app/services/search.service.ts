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
              public minDistance: number = Infinity,
              public cameBy: Edge = null) {
  }
}

class Edge {
  public isUsed = false;

  constructor(public _deal: Deal,
              public weight: number,
              public from: Node,
              public to: Node) {
  }

  get distance() {
    return this.weight + this.from.minDistance;
  }

}

function getNodeEdges(node: Node, allEdges: Edge[]) {
  return allEdges.filter(edge => edge.from === node && !edge.isUsed);
}

function getNearestNode(nodes: Node[]): Node {
  if (nodes.length < 2) {
    return nodes[0];
  }
  return nodes.reduce((n1, n2) => n1.minDistance < n2.minDistance ? n1 : n2);
}

function getMinDistanceNode(nodes: Node[]): Node {
  const activeNodes = nodes.filter(n => !n.isOut);
  return getNearestNode(activeNodes);
}

@Injectable()
export class SearchService {
  nodes: Node[];
  edges: Edge[];

  constructor(private citiesService: CitiesService,
              private dealsService: DealsService) {
  }

  initGraph(deals: Deal[], cities: string[], getWeight: (deal: Deal) => number) {
    this.nodes = cities.map(city => new Node(city));

    this.edges = deals.map(deal => {
      return new Edge(
        deal, getWeight(deal), // todo: add similar for duration
        this.nodes.find(x => x.name === deal.departure),
        this.nodes.find(x => x.name === deal.arrival));
    });
  }

  async search(searchParams: SearchParams) {
    const sortBy = {
      fastest: (deal) => deal.duration,
      cheapest: (deal) => deal.discountCost
    };

    await Promise.all([
      this.dealsService.getDeals(),
      this.citiesService.getAllCities()
    ]).then(([deals, cities]) => this.initGraph(deals, cities,
      sortBy[searchParams.sortType]));


    const fromNode = this.nodes.find(node => node.name === searchParams.departure);
    const toNode = this.nodes.find(node => node.name === searchParams.arrival);

    // Deikstra
    fromNode.minDistance = 0;
    for (let node = fromNode;
         node !== undefined;
         node = getMinDistanceNode(this.nodes)) {
      getNodeEdges(node, this.edges)
        .forEach(edge => {
          edge.isUsed = true;
          if (edge.to.minDistance > edge.distance) {
            edge.to.minDistance = edge.distance;
            edge.to.cameBy = edge;
          }
        });
      node.isOut = true;
    }

    const resultDeals: Deal[] = [];

    for (let edge = toNode.cameBy; edge !== null; edge = edge.from.cameBy) {
      resultDeals.push(edge._deal);
    }

    return resultDeals.reverse();
  }
}
