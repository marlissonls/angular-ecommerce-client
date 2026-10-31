import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

import { StoreLayoutComponent } from './layouts/store-layout/store-layout.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  // Rotas públicas: usuário logado ou deslogado.
  {
    path: '',
    children: [
      {
        path: '',
        component: StoreLayoutComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: HomeComponent,
          },
          // {
          //   path: 'catalog',
          //   // component: CatalogComponent,
          // },
          // {
          //   path: 'product/:id',
          //   // component: ProductComponent,
          // },
        ],
      },
    ],
  },

  // Rotas públicas: somente usuário deslogado.
  // {
  //   path: '',
  //   canActivateChild: [guestGuard],
  //   children: [
  //     {
  //       path: 'login',
  //       // component: LoginComponent,
  //     },
  //     {
  //       path: 'register',
  //       // component: RegisterComponent,
  //     },
  //   ],
  // },

  // Rotas privadas: somente usuário autenticado.
  // {
  //   path: '',
  //   canActivateChild: [authGuard],
  //   children: [
  //     {
  //       path: '',
  //       // component: StoreLayoutComponent,
  //       children: [
  //         {
  //           path: 'cart',
  //           // component: CartComponent,
  //         },
  //         {
  //           path: 'checkout',
  //           // component: CheckoutComponent,
  //         },
  //         {
  //           path: 'orders',
  //           // component: OrdersComponent,
  //         },
  //         {
  //           path: 'account',
  //           // component: AccountComponent,
  //         },
  //       ],
  //     },
  //   ],
  // },

  {
    path: '**',
    redirectTo: '',
  },
];
