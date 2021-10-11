import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopComponent } from './pages/top/top.component';
import { ProblemComponent } from './pages/problem/problem.component';
import { AnswerComponent } from './pages/answer/answer.component';
import { ResultComponent } from './pages/result/result.component';
import { ExplanationComponent } from './pages/explanation/explanation.component';

const routes: Routes = [
  { path: 'top',  component: TopComponent },
  { path: '', redirectTo: 'top', pathMatch: 'full' },
  { path: 'problem', component: ProblemComponent },
  { path: 'answer', component: AnswerComponent },
  { path: 'result', component: ResultComponent },
  { path: 'explanation', component: ExplanationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
