import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TopComponent } from './pages/top/top.component'

const routes: Routes = [
  { path: 'top',  component: TopComponent },
  { path: '', redirectTo: 'top', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
