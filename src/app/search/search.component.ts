import { Component, OnInit, Input } from '@angular/core';
import { TweetService } from '../tweet.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

 	@Input() term = '';
 	@Input() mode = '';
 	@Input() title = '';
 	@Input() placeholder = '';
 	@Input() results = '';
 
   constructor(private tweetService: TweetService) { }

  ngOnInit() {
  }

  onKeyEnter(e) {
  	if(e.keyCode == 13) 
	  	this.tweetService.doSearch(this.mode, this.term);
  }

}
