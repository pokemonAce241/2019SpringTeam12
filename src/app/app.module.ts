import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { GardenModule } from './garden/garden.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

@NgModule({
  imports: [
    BrowserModule,
    LoginModule,
    GardenModule,
    ShoppingListModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }