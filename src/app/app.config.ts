import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';


// Configure the Angular application a high level
export const appConfig: ApplicationConfig = {
  // (providerRouter) Function that allows you to configure and register routes.
  // (routes) The arrays of routes defined for the application.
  // (provideClientHydration) Provides the ability to rehydrate the client state when the application is initially loaded.
  // (provideAnimations) Enable and configure animations within the Angular application.
  // (provideHttpClient) Provides an instance of the HTTP client configured for use with the fetch function as an HTTP backend.
  providers: [provideRouter(routes), provideClientHydration(), provideAnimations(), provideHttpClient(withFetch()) ]
};
