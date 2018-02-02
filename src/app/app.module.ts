import { ArticleService } from './articles/article.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NgxMasonryModule } from 'ngx-masonry';
import 'firebase/storage';
import 'hammerjs';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { environment } from '../environments/environment';
import { CategoryService } from './category/category.service';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryFeComponent } from './category/category-fe/category-fe.component';
import { OverviewComponent } from './overview/overview.component';
import { CarouselListComponent } from './carousel/carousel-list/carousel-list.component';
import { MasonryComponent } from './masonry/masonry.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryAddComponent,
    CategoryListComponent,
    CategoryFeComponent,
    OverviewComponent,
    CarouselListComponent,
    MasonryComponent,
    ArticleListComponent
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    FormsModule,
    NgxMasonryModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot([
      { path: "home", component: HomeComponent },
      { path: "mansory/:id", component: MasonryComponent },
      {
        path: "overzicht",
        component: OverviewComponent,
        children: [
          { path: '', redirectTo: 'categorieën', pathMatch: "full" },
          { path: "categorieën", component: CategoryListComponent },
          { path: "categorieën/:id", component: CategoryAddComponent },
          { path: "artikelen", component: ArticleListComponent },
        ]
      },
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "**", redirectTo: "home", pathMatch: "full" }
    ])
  ],
  providers: [CategoryService, ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
