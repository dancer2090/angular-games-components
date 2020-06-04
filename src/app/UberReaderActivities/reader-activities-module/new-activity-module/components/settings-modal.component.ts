import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'settings-modal',
  styleUrls: ['./new-activity.component.css'],
  styles: [`
      .temp-modal {
          position: absolute;
          top: 0px;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 10;
          background-color: rgba(195, 195, 195, 0.3);
      }

      .navigate-up {
          font-size: 3rem;
          cursor: pointer;
      }

      .settings-title {
          display: flex;
          justify-content: space-around;
      }
  `],
  template: `
      <div class="temp-modal">
          <div class="content-grid mdl-grid" *ngIf="settingsView">
              <div class="mdl-cell">
                  <mdl-slider [(ngModel)]="speedWPM" [min]="50" [max]="5000" [step]="5" (ngModelChange)="onChangeSpeedWPM($event)"></mdl-slider>
                  <div class="settings-title">
                      <div>Reading Speed (WPM):</div>
                      <div>{{speedWPM}}</div>
                  </div>
              </div>
              <div class="mdl-cell">
                  <mdl-slider [(ngModel)]="groupSize" [max]="10" [min]="1" [step]="1" (ngModelChange)="onChangeGroupSize($event)"></mdl-slider>
                  <div class="settings-title">
                      <div>GroupSize:</div>
                      <div>{{groupSize}}</div>
                  </div>
              </div>
          </div>

          <mdl-icon class="material-icons navigate-up" (click)="toggle()" *ngIf="!settingsView">expand_less</mdl-icon>
          <mdl-icon class="material-icons navigate-up" (click)="toggle()" *ngIf="settingsView">expand_more</mdl-icon>
      </div>
  `
})
export class SettingsModalComponent implements OnInit {
  @Input('settingsOpened') public inputData: any; // todo: impl it later
  @Output() public settings = new EventEmitter();

  public speedWPM: number = 50;
  public groupSize: number = 2;
  public settingsView: boolean = false;
  // todo: impl interface for settingsData
  public  settingsData: any = {
    settingsViewOpened: false,
    speedWPM: 50,
    groupSize: 2
  };

  constructor() {
    // todo: impl it later
    // this.speedWPM = this.inputData.speedWPM;
    // this.groupSize = this.inputData.groupSize;
  }

  public ngOnInit() {}

  public toggle(): void {
    this.settingsView = !this.settingsView;
    this.settingsData.settingsViewOpened = this.settingsView;
    this.settings.emit(this.settingsData);
  }

  public onChangeGroupSize(newValue) {
    this.settingsData.groupSize = newValue;
  }

  public onChangeSpeedWPM(newValue) {
    this.settingsData.speedWPM = newValue;
  }
}
