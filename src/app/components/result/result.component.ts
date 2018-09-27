import { Component, OnInit, Input } from '@angular/core';
import { Search } from '../search/search.component'

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  @Input() user;
  @Input() repos;


  constructor() { }

  ngOnInit() {
  }

}
