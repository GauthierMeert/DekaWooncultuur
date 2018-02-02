import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';
import { ArticleService } from '../articles/article.service';

@Component({
	selector: 'app-masonry',
	templateUrl: './masonry.component.html',
	styleUrls: ['./masonry.component.css']
})
export class MasonryComponent implements OnInit {
	articleImages: {}[];
	categoryKey: any;

	masonryImages;
	limit = 15;

	constructor(private articleService: ArticleService,
		private activatedRoute: ActivatedRoute) {
	}

	public masonryOptions: NgxMasonryOptions = {
		transitionDuration: '0.2s',
		gutter: 20,
		resize: true,
		initLayout: true,
		fitWidth: true
	};

	ngOnInit() {
		let categoryKey = this.activatedRoute.snapshot.params['id'];
		console.log(categoryKey);
		this.articleService.getArticlesForCategory(categoryKey).valueChanges().subscribe(articles => {
			this.articleImages = articles;
			this.masonryImages = this.articleImages.slice(0, this.limit);
		});
	}

	showMoreImages() {
		this.limit += 15;
		this.masonryImages = this.articleImages.slice(0, this.limit);
	}
}

