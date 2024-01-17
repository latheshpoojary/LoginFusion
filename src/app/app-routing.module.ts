import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPanelComponent } from './auth-panel/auth-panel.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path:'',redirectTo:'login',pathMatch:'full'
  },
  {
    path:'login',component:AuthPanelComponent
  },
  {
    path:'forgot',component:ForgotPasswordComponent
  },
  {
    path:'reset',component:ResetPasswordComponent
  },
  {
    path:'home',loadChildren: () =>
    import("./pages/pages.module").then((m) => m.PagesModule),
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
