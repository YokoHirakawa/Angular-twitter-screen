import { ChangeDetectionStrategy,Component,Input,OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.css' ]
})
export class HeroesComponent implements OnInit {
  heroes:Hero[] = [];
  term:string = "spacex";
  page:number = 1;
  total:number;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    //this.getHeroes("spacex", 1);
  }


  getHeroes() : void {
    const itemsperpage = 10
    const start = itemsperpage * (this.page - 1);
    const end = start + itemsperpage-1; // Inclusive
    this.heroService.getHeroes("users", this.term, start, end)
      .subscribe(heroes => {
        this.total = 100;
        this.heroes = heroes;
      });   
  }

  getPage(page:number) : void {
    this.page = page;
    this.getHeroes();
  }
}

  

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/