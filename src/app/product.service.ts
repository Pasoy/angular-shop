import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list('/products').push(product);
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }

  getProducts() {
    return this.db
      .list<Product>('/products')
      .snapshotChanges()
      .pipe(
        map(products => {
          return products.map(product => {
            const value = product.payload.val();
            const key = product.payload.key;
            return { key, ...value };
          });
        })
      );
  }

  getProduct(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }
}
