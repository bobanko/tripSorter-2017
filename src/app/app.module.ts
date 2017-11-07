import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SearchFormComponent} from './search-form/search-form.component';
import {SearchResultsComponent} from './search-results/search-results.component';
import {ResultItemComponent} from './search-results/result-item/result-item.component';
import {DealsService} from './services/deals.service';
import {CitiesService} from './services/cities.service';
import {SearchService} from './services/search.service';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';


const appRoutes: Routes = [
  {path: 'search', component: SearchFormComponent},
  {
    path: 'results', component: SearchResultsComponent,
    data: {title: 'Heroes List'}
  },
  {path: '**', redirectTo: '/search'}
];

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    SearchResultsComponent,
    ResultItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DealsService, CitiesService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
