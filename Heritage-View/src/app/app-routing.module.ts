import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProblemComponent } from './pages/problem/problem.component';
import { TopComponent } from './pages/top/top.component'

const routes: Routes = [
  { path: 'top',  component: TopComponent },
  { path: '', redirectTo: 'top', pathMatch: 'full' },
  { path: 'problem', component: ProblemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
