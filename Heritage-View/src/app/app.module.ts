import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// material
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';

// component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopComponent } from './pages/top/top.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { DifficultySetComponent } from './components/difficulty-set/difficulty-set.component';
import { ProblemComponent } from './pages/problem/problem.component';
import { LimitTimeComponent } from './components/limit-time/limit-time.component';
import { RoundComponent } from './components/round/round.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { AnswerComponent } from './pages/answer/answer.component';
import { ResultComponent } from './pages/result/result.component';


@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    MenuCardComponent,
    DifficultySetComponent,
    ProblemComponent,
    LimitTimeComponent,
    RoundComponent,
    PrimaryButtonComponent,
    AnswerComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // material
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatRadioModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
