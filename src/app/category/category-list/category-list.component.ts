import { Category } from './../category';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  showSpinner: boolean = true;
  categories: Observable<Category[]>;
  
  constructor(private categoryService: CategoryService) { }

  getCategories(): any {
    this.categories = this.categoryService.getCategories().snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Category;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    this.categories.subscribe(() => this.showSpinner = false);
  }  

  removeCategory(category)
  {
    this.categoryService.removeCategory(category);
  }

  ngOnInit() {
    this.getCategories();
  }

}
