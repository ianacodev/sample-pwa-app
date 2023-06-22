import { Component, OnInit } from '@angular/core';
// services
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'sample-pwa-app';

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.logUpdate();
  }
}
