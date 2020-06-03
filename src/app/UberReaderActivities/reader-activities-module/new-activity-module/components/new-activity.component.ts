import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivityService} from '../../../activity.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'new-activity',
  styleUrls: ['./new-activity.component.css'],
  template: `
      <div id="newActivityWrapper">
          <div id="newActivityMainContainer">
              <settings-modal  [settingsOpened]="settingsData" (settings)="fromSettings($event)"></settings-modal>
              <mdl-card class="card--activity mdl-shadow--2dp card--activity-full mdl-card" mdl-shadow="2">
                  <div class="content-div" *ngIf="!gameOver">{{showingText}}</div>
              </mdl-card>
          </div>
      </div>
  `
})
export class NewActivityComponent implements OnInit, OnDestroy {
  private fullText: string;
  private showingText: string;
  private speedWPM: number = 70;
  private groupSize: number = 2;
  private internalTimer: any;
  private settingsData: any;

  private preferencesChangedSubscriber: Subscription;
  private gameOver: boolean = false;

  constructor(protected activityService: ActivityService) {}

  public ngOnInit() {
    // todo: impl it later
    // this.settingsData = {
    //   speedWPM: this.speedWPM,
    //   groupSize: this.groupSize
    // };
    // todo:  change it to input-text value
    this.fullText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium assumenda autem consectetur ' +
      'dignissimos dolore doloribus ex explicabo fuga fugiat hic ipsam magni molestiae neque nisi odio pariatur quibusdam ' +
      'quod ratione, repellat rerum sed suscipit tenetur voluptate. Ad aliquam explicabo facere labore magnam maxime omnis ' +
      'possimus provident ratione. Architecto quas, sed.';

    if (this.preferencesChangedSubscriber) {
      this.preferencesChangedSubscriber.unsubscribe();
    }

    this.preferencesChangedSubscriber = this.activityService.preferencesChangedSubject.subscribe(
      (data) => {
        this.preferencesChanged(data);
      });
    this.getShowingText(this.groupSize);
  }

  public ngOnDestroy() {
    if (this.preferencesChangedSubscriber) { this.preferencesChangedSubscriber.unsubscribe(); }
  }

  public fromSettings( settings: any ): void {
    this.speedWPM = settings.speedWPM;
    this.groupSize = settings.groupSize;

    if (settings.settingsViewOpened) {
      clearTimeout(this.internalTimer);
    } else {
      this.gameStarts();
    }
  }

  private runGame(WPM: number, groupSize: number): any {
    const speedInMS = 100000 / ( WPM ); // todo: need to be changed. Wrong formula

    const timerId = setInterval(() => {
      this.getShowingText(groupSize);
    }, speedInMS);

    return timerId;
  }

  private getShowingText(groupSize): void {
    const fullTextArray = this.fullText.split(' ');
    const wordsArray = fullTextArray.splice(0, groupSize);
    this.fullText = fullTextArray.join(' ');
    this.showingText = wordsArray.join(' ');

    if (fullTextArray.length === 0) {
      clearTimeout(this.internalTimer);
      this.gameOver = true;
      const results = {
        status_points: 10,
        status_percent: true,
        howFast: 7,
        howWell: 25,
        show_end_screen: true,
        // overall: [{testValue: 10}] // todo: do we need it?
        };
      this.activityService.sendResults(results, true);
    }
  }

  private preferencesChanged(data: any) {
    switch (data.type) {
      case 'bgColor':
        // this.setBackgroundColor(data.value);
        break;
      case 'fontName':
        // this.setTypingFontName(data.value);
        break;
      case 'fontSize':
        // this.setTypingFontSize(data.value);
        break;
    }
  }

  private gameStarts(): void {
    this.internalTimer = this.runGame(this.speedWPM, this.groupSize);
  }
}
