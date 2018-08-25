import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Tweet } from '../tweet';
import { TweetService } from '../tweet.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  tweets: Tweet[] = [];
  term = '';
  page = 1;
  total: number;

  constructor(private tweetService: TweetService) { }

  ngOnInit() {
	this.tweetService.onSearchUpdate.subscribe(tweets => {
		this.total = 100;
        this.tweets = tweets;
		});
  }

  getTweets(): void { 
    const itemsperpage = 10;
    const start = itemsperpage * (this.page - 1);
    const end = start + itemsperpage - 1; // Inclusive
    this.tweetService.getTweets('hashtags', this.term, start, end)
      .subscribe(tweets => {
        this.total = 100;
        this.tweets = tweets;
      });
  }

  getPage(page: number): void {
    this.page = page;
    this.getTweets();
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/




