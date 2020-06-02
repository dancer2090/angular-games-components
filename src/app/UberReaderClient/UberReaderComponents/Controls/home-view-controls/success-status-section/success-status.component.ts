import { Component, ViewChild, OnInit, ElementRef, HostListener, Input } from '@angular/core';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { StatusLevel } from '../../../../../UberReaderData/DataClasses/other/StatusLevel';
import { CircularProgressbar } from '../../../SharedModules/circular-progress-bar-module/components/circular-progressbar.component';
import { StatusPointsEvent } from '../../../../../UberReaderData/Events/StatusPointsEvent';
import { TypesyStatusLevel } from '../../../../../UberReaderData/DataClasses/db/Typesy_Status_Level';
import { UserTypingCompetency } from '../../../../../UberReaderData/DataClasses/db/User_Typing_Competency';
import { UserStatusService } from '../../status-points-control/user-status.service';

@Component({
    selector: 'success-status',
    styleUrls: ['./success-status.component.css'],
    templateUrl: './success-status.component.html',
    providers: [UserStatusService]
})
export class SuccessStatus {
    //@ViewChild('progressbar') progressbar: CircularProgressbar;
    @ViewChild('progressbar', { static: true }) progressbar:CircularProgressbar;
    @ViewChild('donutChart', { static: true }) donutChart: ElementRef;
    @Input('isTooltip') isTooltip: boolean = false;

    public currentLevel: TypesyStatusLevel;
    public currentLevelMedal: string;
    public nextLevel: TypesyStatusLevel;
    public nextLevelMedal: string;
    //public pointsToGo:number;
    public currentStatusPoints: number;
    public currentStatusProgress: number;
    public forPublicProfile: boolean = false;

    private model: UberApplication;
    
    constructor(private userStatusService: UserStatusService) {
        this.model = UberApplication.GetInstance();
    }

    private progressTimeoutId: any;
    public UpdateStatusPoints(statusPoints?: number, statusLevels?: TypesyStatusLevel[]): void {
        this.forPublicProfile = statusPoints != null;

        /*if (this.forPublicProfile) {
            this.currentStatusPoints = statusPoints;
            //TO DO! this.statusLevels = status_levels;
        }
        else {*/
            let userStatusData: any = this.userStatusService.update(statusPoints, statusLevels);
            this.currentStatusPoints = statusPoints != null ? statusPoints : this.model.UserStatusPoints;
            this.currentLevel = userStatusData.currentLevel;
            this.nextLevel = userStatusData.nextLevel;

            if (this.nextLevel != null) {
                this.currentStatusProgress = Math.min(Math.trunc(this.currentStatusPoints / this.nextLevel.RequiredStatusPoints * 100), 100);
            }
            else {
                this.currentStatusProgress = 100;
            }
            
            this.updateStatusPointsMedals();
            //this.model.GetUserStatusPoints(this.statPointsReceived, this.errorGettingStatPoints);
        //}

        /*this.currentStatusPoints = statusPoints ? statusPoints : this.model.GetStatusPoints();
        let statusLevels: StatusLevel[] = status_levels ? status_levels : this.model.GetStatusLevels();
        let nextLevel: StatusLevel, currentLevel: StatusLevel;

        for (let level of statusLevels) {
            if (this.currentStatusPoints < Math.trunc(level.Points_required)) {
                nextLevel = level;
                break;
            }
            else if (this.currentStatusPoints >= level.Points_required) {
                currentLevel = level;
            }
        }

        this.currentLevel = currentLevel.Name;

        if (nextLevel) {
            this.nextLevel = nextLevel.Name;                      
            this.pointsToGo = nextLevel.Points_required - this.currentStatusPoints;
            console.log(this.currentStatusPoints + " " + nextLevel.Points_required);
            
            if (this.progressTimeoutId) clearTimeout(this.progressTimeoutId);
            this.progressTimeoutId = setTimeout(() => {
                this.progressbar.progress(this.currentStatusPoints, nextLevel.Points_required);
                this.model.drawSuccessStatusChart(this.donutChart, this.currentStatusPoints, nextLevel);
            }, 200);
        }
        else {
            this.nextLevel = "-";
            
            if (this.progressTimeoutId) clearTimeout(this.progressTimeoutId);
            this.progressTimeoutId = setTimeout(() => {
                this.progressbar.progress(100);
                this.model.drawSuccessStatusChart(this.donutChart, this.currentStatusPoints);
            }, 200);

            console.log("FINISHED LEVEL");
            //statusProgressContainer.setPointsLeft(0);
            //statusProgressContainer.setValue(100);
        }
        this.updateStatusPointsMedals();*/
    }

    /*private statPointsReceived = (event: StatusPointsEvent) => {
        event.target.removeEventListener(StatusPointsEvent.STATUS_POINTS_RECEIVED, this.statPointsReceived);
        event.target.removeEventListener(StatusPointsEvent.STATUS_POINTS_RECEIVE_ERROR, this.errorGettingStatPoints);
        this.currentStatusPoints = event.StatusPoints;        
        let statusLevels: TypesyStatusLevel[] = this.model.TypesyStatusLevels;
        let userTypingCompetency: UserTypingCompetency = this.model.UserTypingCompetency;

        for (let level of statusLevels) {
            if (this.currentStatusPoints < Math.trunc(level.RequiredStatusPoints)) { //|| userTypingCompetency.Competency < level.RequiredTypingCompetency) {
                this.nextLevel = level;
                break;
            }
            else if (this.currentStatusPoints >= level.RequiredStatusPoints) { //&& userTypingCompetency.Competency >= level.RequiredTypingCompetency) {
                this.currentLevel = level;
            }
        }

        this.model.UserCurrentStatusLevel = this.currentLevel;
        if (this.nextLevel != null) {
            this.currentStatusProgress = Math.min(Math.trunc(this.currentStatusPoints / this.nextLevel.RequiredStatusPoints * 100), 100);
        }
        else {
            this.currentStatusProgress = 100;
        }
        
        this.updateStatusPointsMedals();
    }

    private errorGettingStatPoints = (event: StatusPointsEvent) => {
        event.target.removeEventListener(StatusPointsEvent.STATUS_POINTS_RECEIVED, this.statPointsReceived);
        event.target.removeEventListener(StatusPointsEvent.STATUS_POINTS_RECEIVE_ERROR, this.errorGettingStatPoints);

    }*/

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (!this.model.hasLoggedIn) return;
        this.UpdateStatusPoints();
    }

    private updateStatusPointsMedals(): void {
        this.currentLevelMedal = this.nextLevelMedal = "assets/icon/medals/";
        switch (this.currentLevel.Name) {
            case "Bronze":
                this.currentLevelMedal += "bronze-trophy.svg";
                this.nextLevelMedal += "silver-trophy.svg";
                break;
            case "Silver":
                this.currentLevelMedal += "silver-trophy.svg";
                this.nextLevelMedal += "gold-trophy.svg";
                break;
            case "Gold":
                this.currentLevelMedal += "gold-trophy.svg";
                this.nextLevelMedal += "platinum-trophy.svg";
                break;
            case "Platinum":
                this.currentLevelMedal += "platinum-trophy.svg";
                this.nextLevelMedal += "diamond-trophy.svg";
                break;
            case "Diamond":
            default:
                this.currentLevelMedal += "diamond-trophy.svg";
                this.nextLevelMedal = "";
                break;
        }
    }

    public resizeRoundBar(): void {
        //this.progressbar.resizeHandler();
    }
}