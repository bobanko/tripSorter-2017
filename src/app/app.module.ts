import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ResultItemComponent } from './search-results/result-item/result-item.component';
import { DealsService } from './services/deals.service';
import {CitiesService} from './services/cities.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    SearchResultsComponent,
    ResultItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DealsService, CitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
