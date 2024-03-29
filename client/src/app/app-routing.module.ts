import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { ShopComponent } from './shop/shop.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path:"",component:HomeComponent,data:{breadcrumb:'Ana sayfa'}},
  {path:"test-error",component:TestErrorComponent,data:{breadcrumb:'Test Errors'}},
  {path:"server-error",component:ServerErrorComponent,data:{breadcrumb:'Server Error'}},
  {path:"not-found",component:NotFoundComponent,data:{breadcrumb:'Not Found'}},
  {path:"shop",component:ShopComponent,data:{breadcrumb:'shop'}},
  {path:"shop/:id",component:ProductDetailsComponent,data:{breadcrumb:{alias:'shopDetail'}}},
  //  {path:"basket",component:BasketComponent,data:{breadcrumb:'basket'}},
  {path:"basket",loadChildren:()=>import('./basket/basket.module').then(mod=>mod.BasketModule),data:{breadcrumb:'Basket'}},
  {path:"checkout",canActivate:[AuthGuard],loadChildren:()=>import('./checkout/checkout.module').then((mod)=>mod.CheckoutModule),data:{breadcrumb:'Checkout'}},
  {path:"account",loadChildren:()=>import('./account/account.module').then((mod)=>mod.AccountModule),data:{breadcrumb:{skip:true}}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//
