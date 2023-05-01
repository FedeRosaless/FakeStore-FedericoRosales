import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = {
    items: [],
    totalPrice: 0,
  };
  public productList = new BehaviorSubject<any>([]);
  private cartSubject = new BehaviorSubject<{
    items: any[];
    totalPrice: number;
  }>({ items: [], totalPrice: 0 });

  constructor() {}

  getProducts(): Observable<{ items: any[]; totalPrice: number }> {
    const exists = localStorage.getItem('cart');
    if (!exists) {
      localStorage.setItem('cart', JSON.stringify(this.cartItemList));
      let cart: any;
      const cartString = localStorage.getItem('cart');
      if (cartString) {
        cart = JSON.parse(cartString);
        this.cartSubject.next(cart);
        return this.cartSubject.asObservable();
      }
    } else {
      let cart: any;
      cart = JSON.parse(exists);
      this.cartSubject.next(cart);
      return this.cartSubject.asObservable();
    }
    return this.cartSubject.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product: any): Observable<any> {
    const exist = localStorage.getItem('cart');
    if (exist) {
      let cart: any;
      cart = JSON.parse(exist);
      const productExist = cart.items.filter((i: any) => i.id == product.id);
      if (productExist.length === 0) cart.items.push({ ...product, total: 1 });
      else {
        const itemIndex = cart.items.findIndex((i: any) => i.id === product.id);
        cart.items[itemIndex] = {
          ...product,
          total: cart.items[itemIndex].total + 1,
        };
      }
      cart.totalPrice += product.price;
      let cartParsed: any;
      cartParsed = JSON.stringify(cart);
      localStorage.setItem('cart', cartParsed);
      this.cartSubject.next(cart);
      return this.cartSubject.asObservable();
    }
    return of(null);
  }

  getTotalPrice(): number {
    let grandTotal: number = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.price;
    });
    return grandTotal;
  }

  removeCartItem(product: any): Observable<any> {
    const exist = localStorage.getItem('cart');
    if (exist) {
      let cart: any;
      cart = JSON.parse(exist);
      const itemsFiltered = cart.items.filter((i: any) => i.id != product.id);
      cart.items = itemsFiltered;
      cart.totalPrice -= product.price;
      let cartString: any;
      cartString = JSON.stringify(cart);
      localStorage.setItem('cart', cartString);
      this.cartSubject.next(cart);
      return this.cartSubject.asObservable();
    }
    return this.cartItemList;
  }

  removeAllcart(): Observable<any> {
    const exist = localStorage.getItem('cart');
    if (exist) {
      let cart: any;
      cart = JSON.parse(exist);
      cart.items = [];
      cart.totalPrice = 0;
      let cartString: any;
      cartString = JSON.stringify(cart);
      localStorage.setItem('cart', cartString);
      this.cartSubject.next(cart);
      return this.cartSubject.asObservable();
    }
    return of(null);
  }

  totalMinus(product: any): Observable<any> {
    const exist = localStorage.getItem('cart');
    if (exist) {
      let cart: any;
      cart = JSON.parse(exist);
      const productToUpdate = cart.items.find((i: any) => i.id == product.id);
      if (productToUpdate.total > 1) {
        productToUpdate.total -= 1;
        cart.totalPrice -= product.price;
        localStorage.setItem('cart', JSON.stringify(cart));
        this.cartSubject.next(cart);
      }
    }
    return this.cartSubject.asObservable();
  }

  totalPlus(product: any): Observable<any> {
    const exist = localStorage.getItem('cart');
    if (exist) {
      let cart: any;
      cart = JSON.parse(exist);
      const item = cart.items.find((i: any) => i.id == product.id);
      if (item.total > 0) {
        item.total += 1;
        cart.totalPrice += item.price;
        localStorage.setItem('cart', JSON.stringify(cart));
        this.cartSubject.next(cart);
      }
    }
    return this.cartSubject.asObservable();
  }
}
