import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public product: any = [];
  public grandTotal: number = 0;
  constructor(private CartService: CartService) {}

  ngOnInit(): void {
    this.CartService.getProducts().subscribe((res) => {
      this.product = res;
      this.grandTotal = this.CartService.getTotalPrice();
    });
  }

  removeItem(payload: any) {
    this.CartService.removeCartItem(payload);
  }

  emptyCart() {
    this.CartService.removeAllcart();
  }
}
