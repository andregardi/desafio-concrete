import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ResultComponent } from './components/result/result.component';
import { Search } from './components/search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:userName', component: Search },
  { path: '**', redirectTo: '', pathMatch: 'full' }, //mispeling routes redirect to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
