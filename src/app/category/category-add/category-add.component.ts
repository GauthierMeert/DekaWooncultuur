import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Category } from './../category';
import { Component, OnInit, Inject } from '@angular/core';
import { FirebaseApp } from "angularfire2";
import * as firebase from 'firebase';
import { Upload } from '../../file';
import { error } from 'selenium-webdriver';
import { CategoryService } from '../category.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  category: Observable<Category>;
  isNewCategory: boolean;
  categoryKey: any;
  storageRef: firebase.storage.Reference;
  upload: boolean;
  test: string;
  file: any;
  image: string;
  private uploadTask: firebase.storage.UploadTask;

  constructor( @Inject(FirebaseApp) firebaseApp: firebase.app.App,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.storageRef = firebase.storage().ref('categories');
  }

  uploadFile(event: any) {
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.image = e.target.result;
    }
    this.file = event.target.files[0];
    reader.readAsDataURL(this.file);
  }

  saveCategory(category: Category) {
    this.uploadTask = this.storageRef.child(category.categoryName).put(this.file);
    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        this.upload = true;
      },
      (error) => {
        console.log(error);
        this.upload = false;
      },
      () => {
        this.category.subscribe((res) => {
          res.categoryImage = this.uploadTask.snapshot.downloadURL;
        });
        console.log(category.id);
        this.isNewCategory ? this.categoryService.saveCategory(category) : this.categoryService.editCategory(category);
        this.upload = false;
        this.router.navigate([`categories`])
      })
  }

  ngOnInit() {
    this.categoryKey = this.activatedRoute.snapshot.params['id'];
    this.isNewCategory = this.categoryKey === 'new';
    !this.isNewCategory ? this.getCategory() : this.category = Observable.of({}) as Observable<Category>;
  }

  getCategory(): any {
    this.category = this.categoryService.getCategory(this.categoryKey).snapshotChanges().map(actions => {
        const data = actions.payload.data() as Category;
        const id = actions.payload.id;
        return { id, ...data };
      });
  }
}
