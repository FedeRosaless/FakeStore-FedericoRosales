import { Component, OnInit } from '@angular/core';
import { CartService } from '../products/service/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  public totalProducts: number = 0;
  constructor(private CartService: CartService) {}

  ngOnInit(): void {
    this.CartService.getProducts().subscribe((res) => {
      this.totalProducts = res.length;
    });
  }
}
