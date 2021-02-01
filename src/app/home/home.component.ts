import {Component, OnInit} from '@angular/core';
import {tsXLXS} from 'ts-xlsx-export';
import {DataCollectorService} from '../data-collector.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data;

  constructor(private dataCollector: DataCollectorService) {
  }

  downloadData(): any {
    const report = this.dataCollector.createReport();
    this.data = [
      {
        Tower: 'A',
        Flat: '101',
        Month: 'November',
        Year: '2017'
      },
      {
        Tower: 'A',
        Flat: '201',
        Month: 'November',
        Year: '2017'
      },
      {
        Tower: 'B',
        Flat: '301',
        Month: 'November',
        Year: '2017'
      },
      {
        Tower: 'C',
        Flat: '101',
        Month: 'November',
        Year: '2017'
      },
      {
        Tower: 'D',
        Flat: '401',
        Month: 'November',
        Year: '2017'
      }];
    // const q1 = 3; const q2 = 2;
    // const quiz = `quiz${q1}`;
    // const object = {Name: '', email: '', quiz2: '', total: ''};
    // object[quiz] = 'dfghj';
    // console.log(object);

    setTimeout(() => {
      tsXLXS().exportAsExcelFile(this.dataCollector.report).saveAsExcelFile(`${Date.now()}`);
      if (report) {
      } else {
        console.log('dfghjkl');
      }
    }, 2000);
  }

  ngOnInit(): void {
  }

}
