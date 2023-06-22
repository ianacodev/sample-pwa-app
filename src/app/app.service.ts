import { Injectable, ApplicationRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { map, first, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    private appRef: ApplicationRef,
    private updates: SwUpdate,
    private http: HttpClient
  ) {}

  getDogBreeds() {
    const url = 'https://dog.ceo/api/breeds/list/all';
    return this.http.get<any>(url).pipe(map((res) => Object.keys(res.message)));
  }

  logUpdate() {
    this.updates.versionUpdates.subscribe((evt) => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(
            `New app version ready for use: ${evt.latestVersion.hash}`
          );
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(
            `Failed to install app version '${evt.version.hash}': ${evt.error}`
          );
          break;
      }
    });
  }

  checkForUpdates() {
    const appIsStable$ = this.appRef.isStable.pipe(
      first((isStable) => isStable === true)
    );
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);
    everySixHoursOnceAppIsStable$.subscribe(async () => {
      try {
        const updateFound = await this.updates.checkForUpdate();
        console.log(
          updateFound
            ? 'A new version is available.'
            : 'Already on the latest version.'
        );
      } catch (err) {
        console.error('Failed to check for updates:', err);
      }
    });
  }

  promptUpdate() {
    this.updates.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
      )
      .subscribe((evt) => {
        if (this.promptUser(evt)) {
          // Reload the page to update to the latest version.
          document.location.reload();
        }
      });
  }

  promptUser(evt: any) {
    return window.confirm('New Version Available Reload to Update?');
  }

  handleUnrecoverableEvent() {
    this.updates.unrecoverable.subscribe((event) => {
      this.notifyUser(
        'An error occurred that we cannot recover from:\n' +
          event.reason +
          '\n\nPlease reload the page.'
      );
    });
  }

  notifyUser(message: string) {
    window.alert(message);
  }
}
