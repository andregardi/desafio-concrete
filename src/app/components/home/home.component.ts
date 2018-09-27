import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { GithubService } from '../../services/github.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: string;

  constructor( private router: Router) { }

  ngOnInit() {
  }

  searchSubimited(e){
    e.preventDefault();
    let route = "/search/"+this.userName;
    this.router.navigate([route]);
  }

}
