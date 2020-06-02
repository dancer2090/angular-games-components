import { OnDestroy, OnInit } from '@angular/core';
import { Component} from '@angular/core';
import { ActivityService } from '../../../activity.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'new-activity',
    template: `
<div>
    <span>Hello</span>
<div>
  `
})
export class NewActivity implements OnInit, OnDestroy {

    public preferencesChangedSubscriber: Subscription;
    
    constructor(protected activityService: ActivityService) {
    }

    ngOnInit() {
        if (this.preferencesChangedSubscriber) this.preferencesChangedSubscriber.unsubscribe();
        this.preferencesChangedSubscriber = this.activityService.preferencesChangedSubject.subscribe(data => this.preferencesChanged(data));


        setTimeout(() => {
            let results = {
                howFast : -1,
                howWell : -1
            };
            this.activityService.sendResults(results, true);
        }, 10000)
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


    ngOnDestroy() {
        if (this.preferencesChangedSubscriber) this.preferencesChangedSubscriber.unsubscribe();
    }
}
