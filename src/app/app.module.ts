import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {AlertsListComponent} from './components/alerts-list/alerts-list.component';
import {HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/product.service";
import {AlertService} from "./services/alert.service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';



@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    AlertsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDatepickerModule
  ],
  providers: [ProductService,AlertService],
  bootstrap: [AppComponent]
})
export class AppModule
{
}

