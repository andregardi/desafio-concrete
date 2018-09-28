import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { GithubService } from '../../services/github.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Used to capture the username input in the form
  userName: string;

  constructor( private router: Router) { }

  ngOnInit() {
  }

  //When the form is submitted, prevent default action and navigate to the search
  searchSubmit(e){
    e.preventDefault();
    let route = "/search/"+this.userName;
    this.router.navigate([route]);
  }

}
