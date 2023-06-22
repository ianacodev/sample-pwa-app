import { Component, OnInit } from '@angular/core';
// services
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.logUpdate();
    this.appService.promptUpdate();
  }
}
