import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivityService} from '../../../activity.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'new-activity',
  styleUrls: ['./new-activity.component.css'],
  template: `
      <div id="newActivityWrapper">
          <div id="newActivityMainContainer">

              <div class="temp-modal">
                  <div class="content-grid mdl-grid" *ngIf="settingsView">
                      <div class="mdl-cell">
                          <mdl-slider [(ngModel)]="speedWPM" [min]="50" [max]="5000"  [step]="5"></mdl-slider>
                          <div>Reading Speed (WPM): {{speedWPM}}</div>
                      </div>
                      <div class="mdl-cell">
                          <mdl-slider [(ngModel)]="groupSize" [max]="10" [min]="1" [step]="1"></mdl-slider>
                          <div>GroupSize: {{groupSize}}</div>
                      </div>
                  </div>

                  <mdl-icon  class="material-icons navigate-up" (click)="toggle()" *ngIf="!settingsView">expand_less</mdl-icon>
                  <mdl-icon  class="material-icons navigate-up" (click)="toggle()" *ngIf="settingsView">expand_more</mdl-icon>
              </div>
              

              <mdl-card class="card--activity mdl-shadow--2dp card--activity-full mdl-card"
                        mdl-shadow="2">
                  <div class="content-div" *ngIf="!gameOver">{{showingText}}</div>
                  <div *ngIf="gameOver" class="gameOver">{{finalText}}</div>
              </mdl-card>
          </div>
      </div>
  `
})
export class NewActivity implements OnInit, OnDestroy {
  private fullText: string;
  private showingText: string;
  private speedWPM: number = 50;
  private groupSize: number = 2;
  private internalTimer: any;

  private settingsView: boolean = false;

  public preferencesChangedSubscriber: Subscription;
  public finalText: string = 'You completed "Text Flash"! )';
  public gameOver: boolean = false;

  constructor(protected activityService: ActivityService) {
  }

  ngOnInit() {
    this.fullText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium assumenda autem consectetur ' +
      'dignissimos dolore doloribus ex explicabo fuga fugiat hic ipsam magni molestiae neque nisi odio pariatur quibusdam ' +
      'quod ratione, repellat rerum sed suscipit tenetur voluptate. Ad aliquam explicabo facere labore magnam maxime omnis ' +
      'possimus provident ratione. Architecto quas, sed.';

    if (this.preferencesChangedSubscriber) {
      this.preferencesChangedSubscriber.unsubscribe();
    };

    this.preferencesChangedSubscriber = this.activityService.preferencesChangedSubject.subscribe(data => this.preferencesChanged(data));

    setTimeout(() => {
      let results = {
        howFast: -1,
        howWell: -1
      };
      this.activityService.sendResults(results, true);
    }, 10000);

    const fullTextArray = this.fullText.split(' ');
    const wordsArray = fullTextArray.splice(0, this.groupSize);
    this.fullText = fullTextArray.join(' ');
    this.showingText = wordsArray.join(' ');

    this.gameStarts();
  }

  private runGame(WPM: number, groupSize: number): any {
    const speedInMS = 100000 / ( WPM ); //todo: need to be changed. Wrong formula

    const timerId = setInterval(() => {
      this.getShowingText(groupSize);
    }, speedInMS);

    return timerId;
  }

  private getShowingText(groupSize): void{
    const fullTextArray = this.fullText.split(' ');
    const wordsArray = fullTextArray.splice(0, groupSize);
    this.fullText = fullTextArray.join(' ');
    this.showingText = wordsArray.join(' ');

    if (fullTextArray.length === 0) {
      clearTimeout(this.internalTimer);
      this.gameOver = true;
    }
  }

  private preferencesChanged(data: any) {
    switch (data.type) {
      case 'bgColor':
        //this.setBackgroundColor(data.value);
        break;
      case 'fontName':
        //this.setTypingFontName(data.value);
        break;
      case 'fontSize':
        //this.setTypingFontSize(data.value);
        break;
    }
  }

  private gameStarts(): void {
    this.internalTimer = this.runGame(this.speedWPM, this.groupSize);
  }

  private toggle(): void {
    this.settingsView = !this.settingsView;
    if (this.settingsView) {
      clearTimeout(this.internalTimer);
    } else {
      this.gameStarts();
    }
  }

  ngOnDestroy() {
    if (this.preferencesChangedSubscriber) this.preferencesChangedSubscriber.unsubscribe();
  }
}
