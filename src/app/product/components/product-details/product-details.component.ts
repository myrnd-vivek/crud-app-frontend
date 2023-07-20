import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Route } from '@angular/router';
import { Product } from '../../model/product-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  id: string = '';
  productDetails: Product = {
    name: '',
    _id: '',
    company: '',
    createAT: '',
    price: '',
    imageUrl: ''
  };
  constructor(
    private _productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.id = params['id'];
      this._productService.getProductDetails(this.id).subscribe((res) => {
        this.productDetails = res;
        // console.log(this.productDetails[0]._id);
      });
    });
  }

  navigateBack() {
    this.router.navigate(['/'])
  }
}
