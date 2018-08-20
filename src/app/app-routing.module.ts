import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashtagComponent }   from './hashtag/hashtag.component';
import { UserComponent }      from './user/user.component';


const routes: Routes = [
  { path: '', redirectTo: '/hashtag', pathMatch: 'full' },
  { path: 'hashtag', component: HashtagComponent },
  { path: 'user', component: UserComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/