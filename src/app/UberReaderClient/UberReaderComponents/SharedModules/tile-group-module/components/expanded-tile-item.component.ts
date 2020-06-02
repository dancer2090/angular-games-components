import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { CachedData } from '../../../../../UberReaderData/UberDataAccess/CachedData';
import { ProxyLessonPlan } from '../../../../../UberReaderData/DataClasses/other/ProxyLessonPlan';

@Component({
    selector: 'expanded-tile-item',
    styleUrls: ['./expanded-tile-item.component.css'],
    templateUrl: './expanded-tile-item.component.html'
})
export class ExpandedTileItem implements OnInit {
    @Input('data') data: any | ProxyLessonPlan;
    @Output() start = new EventEmitter();
    @Output() enroll = new EventEmitter();
    @Output() seeInfo = new EventEmitter();

    public startBtnLbl: string = "Start";
    public percentFinished: number = 0;
    public progressDescription: string;

    private model: UberApplication;

    constructor(
        private router: Router,
        private cachedData: CachedData
    ) {
        this.model = UberApplication.GetInstance();
    }

    ngOnInit() {
        let userLessonPlan = this.cachedData.getUserLessonPlanByID(this.data.Lesson_plan_id);
        if (userLessonPlan && userLessonPlan.Enabled) {
            // get first the EXACT float value of percentFinished
            // some users might have a progress greater than 0 but less than 1
            // truncing the progress right away would not include user's with progress > 0 but < 1 
            // this amount of progress will not show the progress bar yet but will set the button to "Continue"
            let _percentFinished: number = userLessonPlan.StepsCompleted / this.data.num_course_activities * 100;
            if (_percentFinished > 0) {
                this.startBtnLbl = _percentFinished == 100 ? "View" : "Continue";
                this.percentFinished = Math.trunc(_percentFinished);
                this.progressDescription = this.percentFinished == 100 ? "Completed" : this.percentFinished + "% Completed";
            }
        }
        else {
            this.startBtnLbl = "Enroll";
        }
    }

    public startCurriculum(): void {
        if (this.startBtnLbl == "Enroll") {
            this.enroll.next(this.data);
        }
        else {
            this.start.next(this.data);
        }
    }

    public moreInfo() {
        this.seeInfo.next(this.data.Lesson_plan_id);
    }
}