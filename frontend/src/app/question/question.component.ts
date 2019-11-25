import { Component, OnInit } from '@angular/core';
import { Question } from './question';
import { QUESTIONS } from '../mock-questions';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
//  /questionmock
export class QuestionComponent implements OnInit {
  changeTrigger = 0;
  questions = QUESTIONS;
  selectedQuestion: Question;
  onSelect(question: Question): void {
    this.selectedQuestion = question;
  }
  constructor() { }

  onChange(newValue) {
    const index = newValue[0];
    const votes = parseInt(newValue[1], 10);
    this.selectedQuestion.answers[index].votes = votes;
    this.onSelect(this.selectedQuestion);
    this.changeTrigger++;
    // don't forget to update the model here
    // ... do other stuff here ...
  }
  ngOnInit() {}

}
