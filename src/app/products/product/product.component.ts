import { Component, Input, OnInit } from '@angular/core';
import { RestService } from 'src/app/products/service/rest.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public productsList: any = [];

  constructor(
    private RestService: RestService,
    private CartService: CartService
  ) {}

  public loadInfo() {
    this.RestService.get(`https://fakestoreapi.com/products`).subscribe(
      (response) => {
        this.productsList = response;
      }
    );
  }

  ngOnInit(): void {
    this.loadInfo();

    this.productsList.forEach((a: any) => {
      Object.assign(a, { quantity: 1, total: a.price });
    });
  }

  addToCart(payload: any) {
    this.CartService.addToCart(payload);
  }
}
