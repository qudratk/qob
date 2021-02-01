import {Component} from '@angular/core';
import {DataCollectorService} from './data-collector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'qob';

  constructor(private dataCollecter: DataCollectorService) {
  }
}
