import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { CoinValuationParametersPageComponent } from './views/coin-valuation-parameters-page/coin-valuation-parameters-page.component';
import { CoinValuationParametersCreateComponent } from './components/coin-valuation-parameters/coin-valuation-parameters-create/coin-valuation-parameters-create.component';
import { CoinValuationParametersUpdateComponent } from './components/coin-valuation-parameters/coin-valuation-parameters-update/coin-valuation-parameters-update.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductCrudComponent,
  },
  {
    path: 'products/create',
    component: ProductCreateComponent,
  },
  {
    path: 'products/:id',
    component: ProductUpdateComponent,
  },
  {
    path: 'coin-valuation-parameters',
    component: CoinValuationParametersPageComponent,
  },
  {
    path: 'coin-valuation-parameters/create',
    component: CoinValuationParametersCreateComponent,
  },
  {
    path: 'coin-valuation-parameters/:id',
    component: CoinValuationParametersUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
