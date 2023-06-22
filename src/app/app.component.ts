import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
// services
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  readonly VAPID_PUBLIC_KEY =
    'BId1LdU7Kcq6UbvVDQmia-hKIChYJguBxb19eFToDCDh5bBIwjp-QnKkLOoK3L1j6w3WbVxF1PhMwyo-Cd-DMWU';
  constructor(private appService: AppService, private swPush: SwPush) {}

  ngOnInit(): void {
    this.appService.logUpdate();
    this.appService.promptUpdate();
  }

  subscribeToNotifications() {
    console.log('subscribe');
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub) => console.log('record', sub))
      .catch((err) =>
        console.error('Could not subscribe to notifications', err)
      );
  }
}
