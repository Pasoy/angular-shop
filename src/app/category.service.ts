import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getCategories() {
    return this.db
      .list('/categories')
      .snapshotChanges()
      .pipe(
        map(categories => {
          return categories.map(category => {
            const value = category.payload.val();
            const key = category.payload.key;
            return { key, ...value };
          });
        })
      );
  }
}
