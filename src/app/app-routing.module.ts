import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AdminAuthGuard } from './shared/guard/admin-auth.guard';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  {path:'signin', component: SignInComponent},
  {path:'signup', component: SignUpComponent},
  {path:'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
  {path:'admindashboard', component: AdminDashboardComponent,canActivate:[AdminAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
