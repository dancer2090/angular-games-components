import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UberApplication } from 'app/UberReaderData/UberApplication';
import { ActivatedRoute, Params } from '@angular/router';
import { ActivityController } from '../courses-train-view-controls/activity-controller-module/activity-controller.component';
import { TypesyCourseActivityEvent } from '../../../../UberReaderData/DataClasses/db/TypesyCourseActivityEvent';
import { TypesyCourseActivity } from '../../../../UberReaderData/DataClasses/db/TypesyCourseActivity';
import { Subscription } from 'rxjs';

@Component({
    selector: 'public-activity-view-component',
    styleUrls: ['./public-activity-view.component.css'],
    templateUrl: './public-activity-view.component.html'
})
export class PublicActivityViewComponent implements OnInit, OnDestroy {
    //@ViewChild('activityControl', { static: true }) activityControl:ActivityController;
    public activityControl: ActivityController;
    
    private model: UberApplication;
    private queryParamsObservable: Subscription;

    public typesyCourseActivity: TypesyCourseActivity;
    
    constructor(private route: ActivatedRoute) {
        this.model = UberApplication.GetInstance();
    }

    ngOnInit() {
        let courseActivityId: number = this.route.snapshot.params['courseActivityId'];
        console.log('courseActivityId:: ', courseActivityId);

        if (this.queryParamsObservable) this.queryParamsObservable.unsubscribe();
        this.queryParamsObservable = this.route.queryParams
            .subscribe( (queryParams: Params) => {
                if (queryParams['replay']) {
                    let id = parseInt(queryParams['replay']);
                    console.log('replay:: ', id);                    
                    this.model.GetTypesyCourseActivity(id, this.GetTypesyCourseActivityReceived, this.GetTypesyCourseActivityError);       
                }
            });

        this.model.GetTypesyCourseActivity(courseActivityId, this.GetTypesyCourseActivityReceived, this.GetTypesyCourseActivityError);              
    }

    public onRouterOutletActivate(componentRef) {
        console.log('PublicActivityViewComponent onRouterOutletActivate: ', componentRef);
        this.activityControl = componentRef;
    }
    
    private GetTypesyCourseActivityReceived = (event: TypesyCourseActivityEvent) => {
        event.target.removeEventListener(TypesyCourseActivityEvent.TYPESY_COURSE_ACTIVITY_RECEIVED, this.GetTypesyCourseActivityReceived);
        event.target.removeEventListener(TypesyCourseActivityEvent.TYPESY_COURSE_ACTIVITY_ERROR, this.GetTypesyCourseActivityError);        

        console.log('GetTypesyCourseActivityReceived asdf:: ', event);
        this.typesyCourseActivity = event.TypesyCourseActivity;

        this.activityControl.Init2(this.typesyCourseActivity.Activity, this.typesyCourseActivity.Course_Activity, this.typesyCourseActivity.Text, this.typesyCourseActivity.AControls, this.typesyCourseActivity.Settings);
        this.activityControl.DisplayModel(false);
    }

    private GetTypesyCourseActivityError = (event: TypesyCourseActivityEvent) => {
        event.target.removeEventListener(TypesyCourseActivityEvent.TYPESY_COURSE_ACTIVITY_RECEIVED, this.GetTypesyCourseActivityReceived);
        event.target.removeEventListener(TypesyCourseActivityEvent.TYPESY_COURSE_ACTIVITY_ERROR, this.GetTypesyCourseActivityError); 
    }

    ngOnDestroy() {
    }
}