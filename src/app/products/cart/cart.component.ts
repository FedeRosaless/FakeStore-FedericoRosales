import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public product: any = [];
  public grandTotal: number = 0;
  public subscription: Subscription = new Subscription();
  constructor(private CartService: CartService) {}

  ngOnInit(): void {
    this.subscription = this.CartService.getProducts().subscribe(
      (cart: any) => {
        this.product = [...cart.items];
        this.grandTotal = cart.totalPrice.toFixed(2);
      }
    );
  }

  removeItem(payload: any) {
    this.CartService.removeCartItem(payload);
  }

  emptyCart() {
    this.CartService.removeAllcart();
  }

  totalMinus(payload: any) {
    this.CartService.totalMinus(payload).subscribe();
  }

  totalPlus(payload: any) {
    this.CartService.totalPlus(payload).subscribe();
  }
}
