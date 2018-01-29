import { Category } from './../category';
import { Component, OnInit, Inject } from '@angular/core';
import { FirebaseApp } from "angularfire2";
import * as firebase from 'firebase';
import { Upload } from '../../file';
import { error } from 'selenium-webdriver';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  storageRef: firebase.storage.Reference;
  category: Category;
  upload: boolean;
  test: string;
  file: any;
  image: string;
  private uploadTask: firebase.storage.UploadTask;

  constructor( @Inject(FirebaseApp) firebaseApp: firebase.app.App,
    private categoryService: CategoryService) {
    this.storageRef = firebase.storage().ref('categories');
    this.category = new Category();
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
    this.uploadTask = this.storageRef.child('nieuwefoto').put(this.file);
    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        this.upload = true;
      },
      (error) => {
        console.log(error);
        this.upload = false;
      },
      () => {
        this.category.categoryImage = this.uploadTask.snapshot.downloadURL;
        this.categoryService.saveCategory(category);
        this.category = new Category();
        this.upload = false;
      })
  }

  ngOnInit() {
  }

}
