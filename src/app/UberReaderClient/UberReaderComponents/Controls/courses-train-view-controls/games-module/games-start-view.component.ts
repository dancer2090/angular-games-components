import { UberReader } from '../../../../UberReader';
import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { HtmlService } from '../../../../../UberReaderData/Utils/Services/HtmlService';
import { UberApplicationEventTypes } from '../../../../../UberReaderData/Events/UberApplicationEventTypes';
import { UberApplicationEvent } from '../../../../../UberReaderData/Events/UberApplicationEvent';
import { Activity_Category } from '../../../../../UberReaderData/DataClasses/db/Activity_Category';
import { UberReaderLoadingMessage } from '../../../Dialogs/UberReaderLoadingMessage';
import { ActivityEvent } from '../../../../../UberReaderData/Events/ActivityEvent';
import { ErrorMessage } from '../../../../../UberReaderData/Utils/ErrorMessage';
import { AppSettings } from '../../../../../UberReaderData/AppSettings';
import { ScreenState } from '../../../../../UberReaderData/Utils/ScreenState';
import { TileGroup } from '../../../SharedModules/tile-group-module/components/tile-group.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'games-start-view',
    styleUrls: ['./games-start-view.component.css'],
    template: `  
        <div class="page-content-courses" [class.invisible]="!isViewReady" [class.fadeIn]="isViewReady">
            <div class="page-content-courses-inner">
                <tile-group *ngFor="let category of categories" [category]="category" (tileClicked)="tileClickHandler($event)"></tile-group>
            </div>
            <!--<app-footer></app-footer>-->
        </div>        
    `
})
export class GamesStartView implements OnInit {    
    @ViewChildren(TileGroup) tileGroups:QueryList<TileGroup>;
      
    private model: UberApplication;    
    private tempCategories: Activity_Category[] = [];
    private tileGroupsArray:TileGroup[] = [];
    private queryParamsObservable: Subscription;

    public categories: Activity_Category[] = [];
    public isViewReady: boolean = false;

    constructor(private router: Router,  private route: ActivatedRoute, private htmlService: HtmlService) {
        this.model = UberApplication.GetInstance();
    }

    ngOnInit() {
        this.htmlService.setTitle("Typesy");
        UberReader.GetInstance().SetNavScreenState(ScreenState.SHOWING_ACTIVITY);
        this.Init();        
        /*if(this.model.hasLoggedIn) {
            this.Init();
        }
        else {           
            this.model.addEventListener(UberApplicationEventTypes.NEW_USER, this.loggedIn);
        }*/
    }

    private loggedIn = (event:UberApplicationEvent) => {
        this.model.removeEventListener(UberApplicationEventTypes.NEW_USER, this.loggedIn);
        this.Init();
    }

    private Init() {
        this.isViewReady = false;
        setTimeout(() => {
            this.isViewReady = true;
        }, 300);
        this.model.UpdateUserWorkingOn("Play");

        if(this.model.CurrentUser && this.model.CurrentUser.IsEduUser) {
            AppSettings.schoolBuild = true;
        }
        else {
            AppSettings.schoolBuild = false;
        }
        
        this.model.addEventListener(UberApplicationEventTypes.USER_ACCOUNT_ACTIVATED, this.unlockGames);

        this.categories = [];
        this.tempCategories = [];
        this.tempCategories = this.model.getAllActivityCategories();
        
        for (let category of this.tempCategories) {
            let index = this.tempCategories.indexOf(category);
            if (category.ProxyActivities.length == 0) {
                this.tempCategories.splice(index, 1);
            }
        }

        this.categories = this.tempCategories;
        setTimeout(() => {
            this.tileGroupsArray = this.tileGroups.toArray();
        }, 0);      
        
        if (this.queryParamsObservable) this.queryParamsObservable.unsubscribe();
        this.queryParamsObservable = this.route.queryParams
            .subscribe( (queryParams: Params) => {
                if (queryParams['replay']) {
                    this.tileClickHandler(queryParams['replay']);
                }
            });
    }

    /*private addMoreCategories(): void {
        clearTimeout(this.loadingTimeout);
        let startIndex = this.categories.length;
        this.maxCategoriesPerLoad += startIndex;

        if (this.maxCategoriesPerLoad > this.tempCategories.length)
            this.maxCategoriesPerLoad = this.tempCategories.length

        this.categories = this.categories.concat(this.tempCategories.slice(startIndex, this.maxCategoriesPerLoad));

        if (this.categories.length < this.tempCategories.length) {
            this.loadingTimeout = setTimeout(() => {
                                    this.addMoreCategories();
                                }, 500);
        }
    }*/

    public tileClickHandler(activityName: string): void {
        /* if(this.model.getActivityById(tileItemID) == null) {
            UberReaderLoadingMessage.GetInstance().Show(this.model.GetUiTextByKey("STAT_GETTING_ACTIVITY"));
        }
        this.model.GetActivityData(tileItemID, this.startActivity, this.activityCallFailed); */
        this.router.navigate(['/play', activityName.toLowerCase().replace(new RegExp(" ", "ig"), "-")]);
    }

    private startActivity = (event: ActivityEvent) => {
        event.target.removeEventListener(ActivityEvent.ACTVITY_DATA_RECEIVED, this.startActivity);
        event.target.removeEventListener(ActivityEvent.ACTVITY_DATA_ERROR, this.activityCallFailed);
        UberReaderLoadingMessage.GetInstance().Hide();

        this.model.CurrentActivity = event.activity;
        let activityName:string = event.activity.Activity_name.toLowerCase().replace(' ', '-');
        this.model.UpdateUserWorkingOn(event.activity.Activity_name);
        this.router.navigate(['/play', activityName]);
    }

    private activityCallFailed = (event: ActivityEvent) => {
        event.target.removeEventListener(ActivityEvent.ACTVITY_DATA_RECEIVED, this.startActivity);
        event.target.removeEventListener(ActivityEvent.ACTVITY_DATA_ERROR, this.activityCallFailed);

        UberReaderLoadingMessage.GetInstance().Hide();

        if (event.ErrorMessage == ErrorMessage.TRIAL_VERSION_ERROR) {
            UberReader.GetInstance().ActivateAccount();
            //TO DO UberReaderAccessor.GetUberReader().ActivateAccount(null, _model.GetUiTextByKey("TRIAL_ACTIVITY_ERROR_MESSAGE"));
        }
        else {
            this.model.showMdlAlertDialog(this.model.GetUiTextByKey("HTTPSERVICE_FAULT2"), this.model.GetUiTextByKey("HTTPSERVICE_FAULT_TITLE"),true);
        }
    }
    
    private unlockGames = (event:UberApplicationEvent) => {
        event.target.removeEventListener(UberApplicationEventTypes.USER_ACCOUNT_ACTIVATED, this.unlockGames)
        for(let categoryGroup of this.tileGroupsArray) {
            categoryGroup.unlock();
        }
    }

    ngOnDestroy() {
        if (this.queryParamsObservable) this.queryParamsObservable.unsubscribe();
        this.model.removeEventListener(UberApplicationEventTypes.USER_ACCOUNT_ACTIVATED, this.unlockGames);
    } 
}