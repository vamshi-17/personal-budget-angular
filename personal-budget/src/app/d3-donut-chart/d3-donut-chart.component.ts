import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';


@Component({
  selector: 'pb-d3-donut-chart',
  templateUrl: './d3-donut-chart.component.html',
  styleUrls: ['./d3-donut-chart.component.scss']
})
export class D3DonutChartComponent implements AfterViewInit {

  public dataSource: any = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fc6b19',
                '#ff5733',
                '#117a65',
                '#9b59b6'
            ],
        }
    ],
    labels: []
  };

  constructor(private http: HttpClient){
  }

     // Add a ViewChild decorator for the chart container
     @ViewChild('d3Chart') private d3ChartContainer!: ElementRef

  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (var i = 0; i < res.budget.length; i++) {
        this.dataSource.labels.push(res.budget[i].title);
        this.dataSource.datasets[0].data.push(res.budget[i].budget);
    }
    this.createD3Chart();
  });
  }

  createD3Chart() {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(this.d3ChartContainer.nativeElement)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
      .domain(this.dataSource.labels)
      .range(this.dataSource.datasets[0].backgroundColor);

    const pie = d3.pie<number>()
      .value(d => d);

    const arc = d3.arc<d3.PieArcDatum<number>>()
      .innerRadius(radius - 50)
      .outerRadius(radius);

    const p = svg.selectAll('.arc')
      .data(pie(this.dataSource.datasets[0].data))
      .enter().append('g')
      .attr('class', 'arc');

    p.append('path')
      .attr('d', d => arc(d) as any)
      .attr('fill', (d, i) => color(this.dataSource.labels[i]) as string);

    p.append('text')
      .attr('transform', (d: d3.PieArcDatum<number>) => `translate(${arc.centroid(d)})`) // Explicit typing for centroid
      .attr('text-anchor', 'middle')
      .text((d, i) => this.dataSource.labels[i]);
  }

}
