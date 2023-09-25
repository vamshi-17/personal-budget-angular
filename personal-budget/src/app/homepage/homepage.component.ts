import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit{

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

  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (var i = 0; i < res.budget.length; i++) {
        this.dataSource.labels.push(res.budget[i].title);
        this.dataSource.datasets[0].data.push(res.budget[i].budget);
        // this.dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
        // this.dataSource.labels[i] = res.data.myBudget[i].title;
    }
    this.createChart();
    // this.createD3Chart();
    });
  }

  createChart() {
    // var ctx = document.getElementById("myChart").getContext("2d");
    var ctx = document.getElementById("myChart") as HTMLCanvasElement;
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
  }

//   createD3Chart() {
//     var myDoughnut = new Chart('canvas', {
//         type: 'doughnut',
//         data: this.dataSource,
//         options: {
//             legend: {
//                 display: true
//             },
//             scales: {
//                 xAxes: [{
//                     display: false
//                   }],
//                   yAxes: [{
//                     display: true
//                   }],
//             }
//         }
//     })
// }


  // createD3Chart() {
  //   // Set up dimensions and radius for the chart
  //   const width = 250;
  //   const height = 250;
  //   const radius = Math.min(width, height) / 2;

  //   // Create a color scale
  //   const color = d3.scaleOrdinal()
  //       .domain(this.dataSource.labels)
  //       .range(this.dataSource.datasets[0].backgroundColor); // Use the backgroundColor from data

  //   // Create an SVG element within the container
  //   const svg = d3.select(".donut")
  //       .append("svg")
  //       .attr("width", width)
  //       .attr("height", height)
  //       .append("g")
  //       .attr("transform", `translate(${width / 2},${height / 2})`);

  //       let d = 0;
  //   // Generate a pie layout
  //   const pie = d3.pie()
  //       .value(d => d);

  //   // Generate the arc for each slice
  //   const arc = d3.arc()
  //       .innerRadius(radius - 45) // Set inner radius for the donut
  //       .outerRadius(radius);

  //   // Create the donut chart
  //   const arcs = svg.selectAll("arc")
  //       .data(pie(this.dataSource.datasets[0].data))
  //       .enter()
  //       .append("g")
  //       .attr("class", "arc");

  //   // Add slices to the chart
  //   arcs.append("path")
  //       .attr("d", arc)
  //       .attr("fill", (d, i) => color(i)); // Use the color scale

  //   // Add labels to the chart
  //   arcs.append("text")
  //       .attr("transform", d => `translate(${arc.centroid(d)})`)
  //       .attr("text-anchor", "middle")
  //       .text((d, i) => this.dataSource.labels[i]);
  //   }
}
