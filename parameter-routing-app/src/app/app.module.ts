import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';
import { appRoutes } from "app/app.routing";
import { RouterModule } from "@angular/router";
import { AppService } from "app/app.service";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
