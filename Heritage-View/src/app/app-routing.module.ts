import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopComponent } from './pages/top/top.component';
import { ProblemComponent } from './pages/problem/problem.component';
import { AnswerComponent } from './pages/answer/answer.component';
import { ResultComponent } from './pages/result/result.component';
import { ExplanationComponent } from './pages/explanation/explanation.component';
import { ProblemGuard } from './guards/problem.guard';

const routes: Routes = [
  { path: 'top', component: TopComponent },
  { path: '', redirectTo: 'top', pathMatch: 'full' },
  {
    path: 'problem',
    component: ProblemComponent,
    canDeactivate: [ProblemGuard],
  },
  { path: 'answer', component: AnswerComponent, canDeactivate: [ProblemGuard] },
  { path: 'result', component: ResultComponent },
  { path: 'explanation', component: ExplanationComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // 画面遷移時にスクロールトップへ
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
