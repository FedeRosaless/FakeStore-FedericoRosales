import { Component, OnInit } from '@angular/core';
import { CartService } from '../products/service/cart.service';
('../products/service/cart.service');
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  public totalProducts: number = 0;
  public subscription: Subscription = new Subscription();

  constructor(private CartService: CartService) {}

  ngOnInit(): void {
    this.subscription = this.CartService.getProducts().subscribe(
      (cart: any) => {
        let total: number = 0;
        cart.items.map((i: any) => (total += i.total));
        this.totalProducts = total;
      }
    );
  }
}
