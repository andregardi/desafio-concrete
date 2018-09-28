import { TestBed,  async, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { GithubService } from './github.service';


describe('GithubServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      RouterModule
  ],
  }));

  it('should be created', () => {
    const service: GithubService = TestBed.get(GithubService);
    expect(service).toBeTruthy();
  });

  it('should return 0 stars when get no repos', () =>{
    const service: GithubService = TestBed.get(GithubService);
    let repos = [];
    let stars = service.countStart(repos);
    expect(stars).toBe(0);
  });

  it('should sum the stars', () =>{
    const service: GithubService = TestBed.get(GithubService);
    let repos = [{stargazers_count: 9}, {stargazers_count: 10}];
    let stars = service.countStart(repos);
    expect(stars).toBe(19);
  });

  it('should sort repos desc', () =>{
    const service: GithubService = TestBed.get(GithubService);
    let repos = [{stargazers_count: 9}, {stargazers_count: 1}, {stargazers_count: 10}];
    let sorted = service.orderRepos(repos);
    expect(repos[0].stargazers_count).toBe(10);
    expect(repos[2].stargazers_count).toBe(1);
  })
});
