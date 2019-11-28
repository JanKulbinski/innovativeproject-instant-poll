import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {Question} from '../question/question';

@Component({
  selector: 'app-my-pie-chart',
  templateUrl: './my-pie-chart.component.html',
  styleUrls: ['./my-pie-chart.component.css']
})
export class MyPieChartComponent implements OnInit, OnChanges {
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
  public changeType = () => {
    const types: ChartType[] = ['line', 'bar', 'radar', 'pie', 'polarArea', 'doughnut', 'bubble', 'scatter'];
    const i = types.indexOf(this.pieChartType)
    this.pieChartType = types[(i + 1) % 8];
  }


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pieChartData[0].data = Array.from(this.question.answers, answer => answer.votes);
    this.pieChartLabels = Array.from(this.question.answers, answer => answer.option);
  }

}
