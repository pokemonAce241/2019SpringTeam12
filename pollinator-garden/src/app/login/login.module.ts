import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLoginComponent } from './main-login/main-login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MainLoginComponent, CreateAccountComponent, ForgotPasswordComponent]
})
export class LoginModule { }
