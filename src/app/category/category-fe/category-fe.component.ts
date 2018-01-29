import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-fe',
  templateUrl: './category-fe.component.html',
  styleUrls: ['./category-fe.component.css']
})
export class CategoryFeComponent implements OnInit {
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

