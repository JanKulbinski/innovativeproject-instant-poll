import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { TestingConnectionServiceService } from '../app/testing-connection-service.service';
import { BackendConnectionService } from "../app/backend-connection.service";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";
import { ChartsModule } from 'ng2-charts';

import { NavbarComponent } from './navbar/navbar.component';
import { PollroomComponent } from './pollroom/pollroom.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RoomsComponent } from './rooms/rooms.component';
import { MyPieChartComponent } from './my-pie-chart/my-pie-chart.component';
import { QuestionComponent } from './question/question.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PollroomComponent,
    HomepageComponent,
    RoomsComponent,
    MyPieChartComponent,
    QuestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    RouterModule.forRoot([
      {path: '', component: HomepageComponent},
      {path: 'pollroom/:id', component: PollroomComponent},
      {path: 'rooms', component: RoomsComponent},
      {path: 'questionmock', component: QuestionComponent}

    ]),
  ],
  providers: [TestingConnectionServiceService,BackendConnectionService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]

})
export class AppModule { }
