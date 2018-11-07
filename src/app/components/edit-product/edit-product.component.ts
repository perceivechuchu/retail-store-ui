import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {ProductInfo} from "../../models/product-info.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productInfo: ProductInfo;
  editForm: FormGroup;
  productId: string;
  categories = [];
  submitted = false;

  constructor(private formBuilder: FormBuilder,private router: Router, private productService: ProductService) {
    this.categories = [{id: 'ACCESSORIES', name: 'ACCESSORIES'}, 
                       {id: 'BEAUTY', name: 'BEAUTY'}, 
                       {id: 'ELECTRONICS', name: 'ELECTRONICS'},
                       {id: 'FASHION', name: 'FASHION'},
                       {id: 'HEALTH', name: 'HEALTH'},
                       {id: 'MUSIC', name: 'MUSIC'},
                       {id: 'GROCERY', name: 'GROCERY'},
                      ];
   }

  ngOnInit() {
    this.productId = localStorage.getItem("editProductId");
    if(!this.productId) {
      alert("Invalid action.")
      this.router.navigate(['list-product']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      barCode: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required]
    });
    this.productService.getProductById(this.productId)
      .subscribe( data => {
        this.editForm.setValue(data.responseBody);
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }
    this.productService.updateProduct(this.productId, this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-product']);
        },
        error => {
          alert(error);
        });
  }

  onCancel(){
    this.router.navigate(['list-product']);
  }

}
