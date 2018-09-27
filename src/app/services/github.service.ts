import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError, } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class GithubService {
  baseUrl: string;
  user = {};
  repos = [];
  status: string = null;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  loadUser(userName: string) {
    this.status = "LOADING";
    let user$ = this.getUser(userName);
    let repos$ = this.getRepos(userName);
    forkJoin(user$, repos$).subscribe(
      res => {
        //res is an array that the position 0 is the result of getUser, and 1 of getRepos
        this.user = res[0];
        this.repos = this.orderRepos(res[1]);

        //The total stargazers_count is not avaliable in https://api.github.com/users/{username}
        //We need to count it from the repositories
        this.user['stars'] = this.countStart(this.repos).stargazers_count;
        this.status = "OK";
      },
      err => {
        throwError(err);
        if (err.status == 404) {
          this.status = "NOT FOUND";
        } else {
          this.status = "CONNECTION ERROR";
        }
      }
    );
  }

  getRepos(userName: string): Observable<any> {
    let url = this.baseUrl + "/users/" + userName + "/repos";
    return this.http.get(url);
  }

  getUser(userName: string): Observable<any> {
    let url = this.baseUrl + "/users/" + userName;
    return this.http.get(url);
  }

  //
  orderRepos(repos: Array<any>) {
    return repos.sort((a, b) => {
      return b.stargazers_count-a.stargazers_count     
    })
  }

  //We are going to sum the stars from all repos using reduce
  countStart(repos: Array<any>){
    return repos.reduce( (a,b) =>{
      return {stargazers_count: a.stargazers_count + b.stargazers_count};
    });    
  }
}
