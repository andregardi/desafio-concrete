import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError, } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { reduce } from 'rxjs/internal/operators/reduce';
import { isEmpty } from 'rxjs/internal/operators/isEmpty';


@Injectable({
  providedIn: 'root'
})
export class GithubService {
  baseUrl: string;
  user = {};
  repos = [];
  public status: string = null;

  constructor(private http: HttpClient) {
    //The github api base url is a variable of the environment
    this.baseUrl = environment.baseUrl;
  }

  //Send two requests to github, then join it on a single Observable and deal with the result
  loadUser(userName: string) {    

    //For the loading gif
    this.status = "LOADING"; 
    
    //Send the requests
    let user$ = this.getUser(userName);
    let repos$ = this.getRepos(userName);

    //Join the Observables. Wait for both requests to complete.
    forkJoin(user$, repos$).subscribe(
      //res is an array that the position 0 is the result of getUser, and 1 of getRepos
      res => {        
        this.user = res[0];

        //The repos need to be sorted by the stargazers_count (decreasing order)
        this.repos = this.orderRepos(res[1]);

        //The total stargazers_count is not avaliable in https://api.github.com/users/{username}
        //We need to count it from the repositories
        this.user['stars'] = this.countStart(this.repos);

        //Comunicate to other components that the requests where successfuly loaded
        this.status = "OK";
      },

      //Dealing with errors
      err => {
        throwError(err);
        if (err.status == 404) { //Only for the case that the user does not exists
          this.status = "NOT FOUND";
        }else { //Deals with all other errors
          this.status = "CONNECTION ERROR";
        }
      }
    );
  }

  //Simple request to get the user by username
  getRepos(userName: string): Observable<any> {
    let url = this.baseUrl + "/users/" + userName + "/repos";
    return this.http.get(url);
  }

  //Simple request to get the repos by username
  getUser(userName: string): Observable<any> {
    let url = this.baseUrl + "/users/" + userName;
    return this.http.get(url);
  }

  //Sort the stargazers_count from highest to lowest
  orderRepos(repos: Array<any>) {
    return repos.sort((a, b) => {
      return b.stargazers_count-a.stargazers_count     
    })
  }

  //Sum all the stars from all repos of an user
  countStart(repos: Array<any>){
    let stars = 0;
    repos.forEach( (repo) =>{
      stars += repo.stargazers_count;
    } );
    return stars;   
  }
}
