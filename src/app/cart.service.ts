import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './products';

interface iItem {
  product: Product,
  cnt: number
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: iItem[] = [];

  constructor(
    private http: HttpClient
  ) { }

  addToCart(product: Product) {
    let findItem: iItem | undefined = this.items.find(item => item.product.id == product.id);
    if (typeof findItem == 'undefined') {
      let newItem: iItem = {
        product: product,
        cnt: 1
      }
      this.items.push(newItem);
    } else {
      findItem.cnt += 1;
    }
  }

  getItems() {
    return this.items;
  }

  deleteItem(productId: number) {
    this.items = [...this.items.filter(item => item.product.id != productId)];
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingPrices() {
    return this.http.get<{ type: string, price: number }[]>('/assets/shipping.json');
  }
}
