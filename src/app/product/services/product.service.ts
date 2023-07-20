import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductDeleteInfo } from '../model/product-model';
import { Payload } from 'src/app/shared/add-dialog/add-dialog.component';

const URL = "http://localhost:4445/api/products";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  public getProductList():Observable<Product[]> {
    return this.http.get<Product[]>(URL)
  }

  public getProductDetails(id:string):Observable<Product> {
    return this.http.get<Product>(`${URL}/${id}`)
  }

  public deleteProduct(id:string):Observable<ProductDeleteInfo> {
    return this.http.delete<ProductDeleteInfo>(`${URL}/${id}`)
  }

  public createProduct(data:Payload) {
    return this.http.post(`${URL}/add`,data);
  } 

  public sendFormData(formData:any) {
    return this.http.post(`${URL}/add-with-image`,formData)
  }

  public updateProduct(id:string,data:any):Observable<Product[]> {
    return this.http.patch<Product[]>(`${URL}/${id}`,data)
  }
}
