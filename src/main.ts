import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
      preventDuplicates: true,
      tapToDismiss: true,
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'increasing',
      timeOut: 2500,
    }),
  ],
}).catch((err) => console.error(err));
