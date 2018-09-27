import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GithubService } from '../../services/github.service';
import { ResultComponent } from '../result/result.component';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class Search implements OnInit {

  userName: string;

  constructor(private githubService: GithubService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.userName = params['userName'];
      this.githubService.loadUser(this.userName);
    });
  }

  searchSubimited(e){
    e.preventDefault();
    let route = "/search/"+this.userName;
    this.router.navigate([route]);
    this.githubService.loadUser(this.userName);
  }

}
