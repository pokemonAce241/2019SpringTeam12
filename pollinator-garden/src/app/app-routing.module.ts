import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainLoginComponent } from './login/main-login/main-login.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { CreateAccountComponent } from './login/create-account/create-account.component';
import { MainGardenComponent } from './garden/main-garden/main-garden.component';
import { ShoppingListComponent } from './shopping-list/shopping-list/shopping-list.component';
import { AuthGuard } from './services/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: MainLoginComponent
  },
  {
    path: 'login/forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'login/create-account',
    component: CreateAccountComponent
  },
  {
    path: 'garden',
    component: MainGardenComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    //canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
