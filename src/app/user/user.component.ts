import { ChangeDetectionStrategy,Component,Input,OnInit } from '@angular/core';
import { Tweet } from '../tweet';
import { TweetService } from '../tweet.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [ './user.component.css' ]
})
export class UserComponent implements OnInit {
  tweets:Tweet[] = [];
  term:string = "";
  page:number = 1;
  total:number;

  constructor(private tweetService: TweetService) { }

  ngOnInit() {
    //this.getTweets("spacex", 1);
  }


  getTweets() : void {
    const itemsperpage = 10
    const start = itemsperpage * (this.page - 1);
    const end = start + itemsperpage-1; // Inclusive
    this.tweetService.getTweets("users", this.term, start, end)
      .subscribe(tweets => {
        this.total = 100;
        this.tweets = tweets;
      });   
  }

  getPage(page:number) : void {
    this.page = page;
    this.getTweets();
  }
}

  

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/