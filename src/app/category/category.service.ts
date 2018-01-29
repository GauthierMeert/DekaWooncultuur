import { Category } from './category';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class CategoryService {
  private categories$: AngularFirestoreCollection<Category>;
  private category$: AngularFirestoreDocument<Category>;

  constructor(private db: AngularFirestore) {
    this.categories$ = this.db.collection('categories');
  }

  getCategory(categoryKey: string) {
    return this.db.doc<Category>('categories/' + categoryKey);
  }

  getCategories() {
    return this.categories$;
  }

  saveCategory(category: Category) {
    this.categories$.add(category).then(_ => console.log('succes')).catch(error => console.log(error));
  }

  editCategory(category: Category) {
    this.db.doc<Category>('categories/' + category.id).update(category).then(_ => console.log('succes')).catch(error => console.log(error));
  }

  removeCategory(category: Category) {
    this.db.doc<Category>('categories/' + category.id).delete().then(_ => console.log('succes')).catch(error => console.log(error));
  }
}
