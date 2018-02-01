import { Article } from './article';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class ArticleService {
  private articles$: AngularFirestoreCollection<Article>;
  private article$: AngularFirestoreDocument<Article>;

  constructor(private db: AngularFirestore) {
    this.articles$ = this.db.collection('articles');
  }

  getArticle(articleKey: string) {
    return this.db.doc<Article>('articles/' + articleKey);
  }

  getArticles() {
    return this.articles$;
  }

  getArticlesForCategory(categoryId:string) {
    return this.db.collection('articles', ref => ref.where('categoryId', '==', categoryId));
  }

  saveArticle(article: Article) {
    this.articles$.add(article).then(_ => console.log('succes')).catch(error => console.log(error));
  }

  //TODO: wanneer een artikel verwijderd wordt --> ook de afbeelding uit de store verwijderen!!!
  removeArticle(article: Article) {
    this.db.doc<Article>('articles/' + article.id).delete().then(_ => console.log('succes')).catch(error => console.log(error));
  }
}