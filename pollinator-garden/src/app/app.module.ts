import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { GardenModule } from './garden/garden.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MyGardensComponent } from 'src/app/garden/my-gardens/my-gardens.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    LoginModule,
    GardenModule,
    ShoppingListModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    MyGardensComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MyGardensComponent]
})
export class AppModule { }
