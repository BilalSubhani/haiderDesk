import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LogoStoreComponent } from './logo-store/logo-store.component';
import { LogoDetailComponent } from './logo-store/logo-detail/logo-detail.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CustomLogoComponent } from './custom-logo/custom-logo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'logo-store', component: LogoStoreComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'custom-logo', component: CustomLogoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cportal', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'logo-store/:logoName',
    component: LogoDetailComponent,
    data: { renderMode: 'dynamic' },
  },
  { path: '**', component: PageNotFoundComponent },
];
