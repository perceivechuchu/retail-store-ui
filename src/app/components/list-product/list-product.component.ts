import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ProductInfo} from "../../models/product-info.model";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  productInfos: ProductInfo[];

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe( data => {
        this.productInfos = data.responseBody;
      });
  }

  deleteProduct(productInfo: ProductInfo): void {
    this.productService.deleteProduct(productInfo.id + '')
      .subscribe( data => {
        this.productInfos = this.productInfos.filter(u => u !== productInfo);
      })
  };

  editProduct(productInfo: ProductInfo): void {
    localStorage.removeItem("editProductId");
    localStorage.setItem("editProductId", productInfo.id + '');
    this.router.navigate(['edit-product']);
  };

  addProduct(): void {
    this.router.navigate(['add-product']);
  };
}
