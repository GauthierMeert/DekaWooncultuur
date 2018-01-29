import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import 'firebase/storage';
import 'hammerjs';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { environment } from '../environments/environment';
import { CategoryService } from './category/category.service';
import { CategoryListComponent } from './category/category-list/category-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryAddComponent,
    CategoryListComponent
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot([
      { path: "home", component: HomeComponent },
      { path: "category", component: CategoryAddComponent },
      { path: "category/:id", component: CategoryAddComponent },
      { path: "categories", component: CategoryListComponent },
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "**", redirectTo: "home", pathMatch: "full" }
    ])
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
