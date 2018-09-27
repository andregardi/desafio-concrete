import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { Search } from './search.component';
import { ResultComponent } from '../result/result.component';


describe('SearchComponent', () => {
  let component: Search;
  let fixture: ComponentFixture<Search>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Search, ResultComponent ],
      imports:[
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Search);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
