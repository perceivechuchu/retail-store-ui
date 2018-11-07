import { RouterModule, Routes } from '@angular/router';
import {AddProductComponent} from "./components/add-product/add-product.component";
import {ListProductComponent} from "./components/list-product/list-product.component";
import {EditProductComponent} from "./components/edit-product/edit-product.component";

const routes: Routes = [
  { path: 'add-product', component: AddProductComponent },
  { path: 'list-product', component: ListProductComponent },
  { path: 'edit-product', component: EditProductComponent },
  {path : '', component : ListProductComponent}
];

export const routing = RouterModule.forRoot(routes);
