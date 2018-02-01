import { Category } from './../../category/category';
import { FirebaseApp } from 'angularfire2';
import { ArticleService } from './../article.service';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { NgxMasonryOptions } from 'ngx-masonry';
import { Component, OnInit, Inject } from '@angular/core';
import { Article } from '../article';
import { CategoryService } from '../../category/category.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  categories: Category[];
  categoryId: string;
  article: Article;
  initialValue: any; //Hiermee kan ik de standaard geselecteerde waarde instellen
  upload: boolean;
  storageRef: firebase.storage.Reference;
  private uploadTask: firebase.storage.UploadTask;
  file: any;
  showSpinner: boolean = true; //Moet nog geimplementeerd worden
  articles: Observable<Article[]>;
  addHidden: boolean = true;

  constructor( @Inject(FirebaseApp) firebaseApp: firebase.app.App,
    private articleService: ArticleService,
    private categoryService: CategoryService) {
    this.storageRef = firebase.storage().ref('articles');
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): any {
    this.categoryService.getCategories().snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Category;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }).subscribe((cats) => {
      this.categories = cats;
      this.showSpinner = false;
    });
  }

  getArticles(categoryId: string): any {
    this.articles = this.articleService.getArticlesForCategory(categoryId).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Article;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    this.articles.subscribe(() => {
      this.showSpinner = false;
    });
  }

  onNgModelChange(event: any) {
    this.categoryId = event;
    this.getArticles(this.categoryId);
    this.addHidden = false;
  }

  uploadFile(event: any) {
    if (this.upload || !this.categoryId) return;
    this.file = event.target.files[0];
    this.uploadTask = this.storageRef.child(Date.now().toString()).put(this.file);
    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        this.upload = true;
      },
      (error) => {
        this.upload = false;
      },
      () => {
        this.article = {
          imagePath: this.uploadTask.snapshot.downloadURL,
          categoryId: this.categoryId
        }
        this.articleService.saveArticle(this.article);
        this.upload = false;
      })
  }

  deleteArticle(article) {
    this.articleService.removeArticle(article);
  }
}



