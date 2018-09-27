import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ResultComponent } from './components/result/result.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { Search } from './components/search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'search', component: Search,
    children: [
      { path: '', redirectTo: '404', pathMatch: 'full'},
      { path: 'result', component: ResultComponent },
      { path: '404', component: NotFoundComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
