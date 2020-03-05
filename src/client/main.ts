// import 'hammerjs';
// import { enableProdMode } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { BootstrapModuleFn as Bootstrap, hmr, WebpackModule } from '@ngxs/hmr-plugin';

// import { AppModule } from './app/app.module';
// import { environment } from './environments/environment';

// declare const WebpackModule;

// console.log('environment', environment);

// if (environment.production) {
//   enableProdMode();
// }

// const bootstrap: Bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

// if (environment.hmr) {
//   hmr(module, bootstrap).catch(err => console.error(err));
// } else {
//   bootstrap().catch(err => console.log(err));
// }

// import { enableProdMode } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app/app.module';
// import { environment } from './environments/environment';
// import { hmrBootstrap } from './hmr';
// if (environment.production) {
//   enableProdMode();
// }
// // const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);
// // if (environment.hmr) {
// //   if (module['hot']) {
// //     hmrBootstrap(module, bootstrap);
// //   } else {
// //     console.error('HMR is not enabled for webpack-dev-server!');
// //     console.log('Are you using the --hmr flag for ng serve?');
// //   }
// // } else {
// //   bootstrap();
// // }

// const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

// if (environment.hmr) {
//   // @ts-ignore
//   if (module.hot) {
//     bootstrap()
//       .then(ngModuleRef => {
//         // @ts-ignore
//         return hmrModule(ngModuleRef, module);
//       })
//       .catch(err => console.log(err));
//   } else {
//     console.error('HMR is not enabled for webpack-dev-server!');
//     console.log('Are you using the --hmr flag for ng serve?');
//   }
// } else {
//   bootstrap().catch(err => console.log(err));
// }

import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { hmrModule } from '@angularclass/hmr';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (environment.hmr) {
  // @ts-ignore
  if (module.hot) {
    bootstrap()
      .then(ngModuleRef => {
        // @ts-ignore
        return hmrModule(ngModuleRef, module);
      })
      .catch(err => console.log(err));
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap().catch(err => console.log(err));
}
