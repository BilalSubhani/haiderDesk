import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LogoStoreComponent } from './pages/logo-store/logo-store.component';
import { LogoDetailComponent } from './pages/logo-store/logo-detail/logo-detail.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CustomLogoComponent } from './pages/custom-logo/custom-logo.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'logo-store', component: LogoStoreComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'custom-logo', component: CustomLogoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cportal', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'logo-store/logo-details',
    component: LogoDetailComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];
