import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule)
  },
  {
    path: 'suppliers',
    loadChildren: () => import('./suppliers/suppliers.module').then(m => m.SuppliersPageModule)
  },
  {
    path: 'price-reductions',
    loadChildren: () => import('./price-reductions/price-reductions.module').then(m => m.PriceReductionsPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsPageModule)
  },
  {
    path: 'products/form',
    loadChildren: () => import('./products/productform/productform.module').then(m => m.ProductformPageModule)
  },
  {
    path: 'products/details',
    loadChildren: () => import('./products/productdetails/productdetails.module').then(m => m.ProductdetailsPageModule)
  },
  {
    path: 'reports/form',
    loadChildren: () => import('./reports/reportform/reportform.module').then(m => m.ReportformPageModule)
  },
  {
    path: 'price-reductions/form',
    loadChildren: () => import('./price-reductions/price-reductionform/price-reductionform.module').then(m => m.PriceReductionformPageModule)
  },
  {
    path: 'suppliers/form',
    loadChildren: () => import('./suppliers/supplierform/supplierform.module').then(m => m.SupplierformPageModule)
  },
  {
    path: 'users/form',
    loadChildren: () => import('./users/userform/userform.module').then(m => m.UserformPageModule)
  },
  {
    path: 'products/assign',
    loadChildren: () => import('./products/assign/assign.module').then(m => m.AssignPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
