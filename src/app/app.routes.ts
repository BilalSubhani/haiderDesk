import { Routes } from '@angular/router';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { LogoStoreComponent } from './logo-store/logo-store.component';
import { LogoDetailComponent } from './logo-store/logo-detail/logo-detail.component';

export const routes: Routes = [
  { path: '', component: HeroSectionComponent, pathMatch: 'full' },
  { path: 'logo-store', component: LogoStoreComponent },
  { path: ':logoName', component: LogoDetailComponent },
];
