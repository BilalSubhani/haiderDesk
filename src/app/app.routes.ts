import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LogoStoreComponent } from './logo-store/logo-store.component';
import { LogoDetailComponent } from './logo-store/logo-detail/logo-detail.component';
import { CartPageComponent } from './cart-page/cart-page.component';
export const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'logo-store', component: LogoStoreComponent },
  { path: 'cart', component: CartPageComponent },
  {
    path: 'logo-store/:logoName',
    component: LogoDetailComponent,
    data: { renderMode: 'ssr' },
  },
];
