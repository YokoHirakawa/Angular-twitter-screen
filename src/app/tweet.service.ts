import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Tweet } from './tweet';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class TweetService {

  private tweetsUrl = 'http://127.0.0.1:5000/users/ElonMusk?start=0&end=10';  // Web APIのURL

  constructor(
    private http: HttpClient){ }

  /** サーバーからヒーローを取得する */
  getTweets (mode:string, term:string, start:number, end:number): Observable<Tweet[]> {

    let url = 'http://127.0.0.1:5000/'+mode+'/'+term+'?start='+start+'&end='+end;
 
    return this.http.get<Tweet[]>(url)
    .pipe(
      tap(results => {
        return results.map(element => {
          let tweet = new Tweet();
          tweet.name = '';
          tweet.text = element.text;
          tweet.id = element.id;
          tweet.favourites_count = element.favourites_count;
          tweet.reply_count = element.reply_count;
          tweet.retweet_count = element.retweet_count;
          tweet.created_at= element.created_at;
          return tweet;
        });
      }),
      catchError(this.handleError('getTweets', []))
    );
  }

  /** IDによりヒーローを取得する。idが見つからない場合は`undefined`を返す。 */
  getTweetNo404<Data>(id: number): Observable<Tweet> {
    const url = `${this.tweetsUrl}/?id=${id}`;
    return this.http.get<Tweet[]>(url)
      .pipe(
        map(tweets => tweets[0]), // {0|1} 要素の配列を返す
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} tweet id=${id}`);
        }),
        catchError(this.handleError<Tweet>(`getTweet id=${id}`))
      );
  }

  /** IDによりヒーローを取得する。見つからなかった場合は404を返却する。 */
  getTweet(id: number): Observable<Tweet> {
    const url = `${this.tweetsUrl}/${id}`;
    return this.http.get<Tweet>(url).pipe(
      tap(_ => this.log(`fetched tweet id=${id}`)),
      catchError(this.handleError<Tweet>(`getTweet id=${id}`))
    );
  }

  /* 検索語を含むヒーローを取得する */
  searchTweets(term: string): Observable<Tweet[]> {
    if (!term.trim()) {
      // 検索語がない場合、空のヒーロー配列を返す
      return of([]);
    }
    return this.http.get<Tweet[]>(`${this.tweetsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found tweets matching "${term}"`)),
      catchError(this.handleError<Tweet[]>('searchTweets', []))
    );
  }

  //////// Save methods //////////

  /** POST: サーバーに新しいヒーローを登録する */
  addTweet (tweet: Tweet): Observable<Tweet> {
    return this.http.post<Tweet>(this.tweetsUrl, tweet, httpOptions).pipe(
      tap((tweet: Tweet) => this.log(`added tweet w/ id=${tweet.id}`)),
      catchError(this.handleError<Tweet>('addTweet'))
    );
  }

  /** DELETE: サーバーからヒーローを削除 */
  deleteTweet (tweet: Tweet | number): Observable<Tweet> {
    const id = typeof tweet === 'number' ? tweet : tweet.id;
    const url = `${this.tweetsUrl}/${id}`;

    return this.http.delete<Tweet>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted tweet id=${id}`)),
      catchError(this.handleError<Tweet>('deleteTweet'))
    );
  }

  /** PUT: サーバー上でヒーローを更新 */
  updateTweet (tweet: Tweet): Observable<any> {
    return this.http.put(this.tweetsUrl, tweet, httpOptions).pipe(
      tap(_ => this.log(`updated tweet id=${tweet.id}`)),
      catchError(this.handleError<any>('updateTweet'))
    );
  }

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力

      // TODO: ユーザーへの開示のためにエラーの変換処理を改善する
      this.log(`${operation} failed: ${error.message}`);

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }

  /** TweetServiceのメッセージをMessageServiceを使って記録 */
  private log(message: string) {
    console.log(`TweetService: ${message}`);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/