import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

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

  addForm: FormGroup;

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      barCode: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required]
    });

  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.productService.createProduct(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-product']);
      });
  }

  onCancel(){
    this.router.navigate(['list-product']);
  }

}
