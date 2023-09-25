import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public dataSource:any = {

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
private dataLoaded = false;
  constructor(private http: HttpClient) { }
  fetchData() {
    if (this.dataLoaded) {
      return of(this.dataSource);
    }
    else
    return this.http.get('http://localhost:3002/budget').pipe(
    tap((res:any) => {
      for (var i = 0; i < res.budget.length; i++) {
        this.dataSource.labels.push(res.budget[i].title);
        this.dataSource.datasets[0].data.push(res.budget[i].budget);
    }
    this.dataLoaded=true;

  })
    )

  }
}
