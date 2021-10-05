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
import { MenuCardsComponent } from './components/menu-cards/menu-cards.component';
import { DifficultySetComponent } from './components/difficulty-set/difficulty-set.component';
import { ProblemComponent } from './pages/problem/problem.component';
import { LimitTimeComponent } from './components/limit-time/limit-time.component';
import { RoundComponent } from './components/round/round.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { AnswerComponent } from './pages/answer/answer.component';


@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    MenuCardsComponent,
    DifficultySetComponent,
    ProblemComponent,
    LimitTimeComponent,
    RoundComponent,
    PrimaryButtonComponent,
    AnswerComponent,
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
