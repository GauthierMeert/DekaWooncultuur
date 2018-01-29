import { Category } from './category';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {
  private categories$: AngularFireList<Category>;
  categories: Observable<Category[]>;
  category: Observable<Category>;
  private category$: AngularFireObject<Category>;

  constructor(private db: AngularFireDatabase) {
    this.category$ = this.db.object('category');
    this.category = this.category$.valueChanges();
    this.categories$ = this.db.list('categories');
    this.categories = this.categories$.valueChanges();
  }

  getCategory(CategoryKey: string) {
    return this.db.object('categories/${CategoryKey}').valueChanges();
  }

  getcategories() {
    return this.categories;
  }

  saveCategory(Category: Category) {
    this.categories$.push(Category).then(_ => console.log('succes'));
  }

  editCategory(Category: Category) {
    this.categories$.update(Category.$key, Category).then(_ => console.log('succes')).catch(error => console.log(error));
  }

  removeCategory(Category) {
    this.category$.remove().then(_ => console.log('succes')).catch(error => console.log(error));
  }


}
