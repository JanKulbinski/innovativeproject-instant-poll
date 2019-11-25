import {Component, OnChanges, OnInit, Input, SimpleChanges} from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Question } from '../question/question'

@Component({
  selector: 'app-my-pie-chart',
  templateUrl: './my-pie-chart.component.html',
  styleUrls: ['./my-pie-chart.component.css']
})
export class MyPieChartComponent implements OnInit,OnChanges {
  @Input() question: Question;
  @Input() changeTrigger: number;
  public pieChartData: ChartDataSets[] = [
    { data: [], label: 'Haha' },
  ];
  public pieChartLabels: Label[] = [];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLegend = true;

  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pieChartData = [
      { data: Array.from(this.question.answers, answer => answer.votes), label: 'Series A' },
    ];
    this.pieChartLabels = Array.from(this.question.answers, answer => answer.option);
  }

}
