import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ProductInfo} from "../models/product-info.model";
import { ApiResponse } from '../models/api-response.model';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8099/store/retail/api/v1/products';

  getProducts() {
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  getProductById(id: string) {
    return this.http.get<ApiResponse>(this.baseUrl + '/' + id);
  }

  createProduct(product: ProductInfo) {
    return this.http.post(this.baseUrl, product);
  }

  updateProduct(id: string, product: ProductInfo) {
    return this.http.put(this.baseUrl + '/' + id, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
