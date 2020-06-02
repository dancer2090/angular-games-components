import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { VisualComponent } from './UberReaderComponents/VisualComponent';
import { UberApplication } from '../UberReaderData/UberApplication';
import { ScreenState } from '../UberReaderData/Utils/ScreenState';
import { UberReader } from './UberReader';
import { ProxyWordlist } from '../UberReaderData/DataClasses/other/ProxyWordlist';

import { DropDownList } from './UberReaderComponents/SharedModules/shared-components-module/components/DropDownList';
import { UrlLoaderService } from './UberReaderComponents/SharedModules/shared-components-module/services/UrlLoader.service';

import { AppSettings } from '../UberReaderData/AppSettings';
import { User } from 'app/UberReaderData/DataClasses/db/User';
import { Router } from '@angular/router';
@Component({
    selector: 'side-menu-bar',
    template: `
        <nav class="mdl-navigation">
            <mdl-list>
                <mdl-list-item *ngFor="let item of sideMenuItems" (click)="closeDrawer.emit(); sideMenuItemSelected(item)">
                    <mdl-list-item-primary-content>
                        <!--<mdl-icon style="margin-right:30px; color:rgb(117,117,117);" *ngIf="item.icon != null">{{ item.icon }}</mdl-icon>
                        <span>{{ item.label }}</span>-->
                        <span class="{{item.styleClass}} icons" style="margin-right:30px; color:rgb(117,117,117);"></span>{{ item.label }}    
                    </mdl-list-item-primary-content>
                </mdl-list-item>
            </mdl-list>
        </nav>
        
        <div [@backgroundTrigger]="state" id="sideMenuOverlay" class="{{visible ? 'hide' : 'hide'}}" style="height:100%;">
            <div id="sideMenuDiv" (clickOutside)="clickOutside($event)" [@sideMenuTrigger]="state">                
                
                <div *ngIf="loggedIn" class="{{showHomeButtonBar ? '' : 'hide'}}">
                    <button class="sideMenuItem" (click)="redirect('About')">About</button>
                    <button class="sideMenuItem" (click)="redirect('Help')">Help</button>
                    
                </div>
                
            </div>
        </div>
    `,
    animations: [
        trigger('backgroundTrigger', [
            state('active', style([{
                opacity:'1'
            }])),
            state('inactive', style([{
                opacity:'0'
            }])),
            transition('inactive <=> active', animate('300ms ease-out'))
        ]),
        trigger('sideMenuTrigger', [
            state('active', style([{
                transform: 'translateX(0%)'
            }])),
            state('inactive', style([{
                transform: 'translateX(-80%)'
            }])),
            transition('inactive <=> active', animate('300ms ease-out'))
        ])
    ]
})

export class SideMenu extends VisualComponent
{    
    public exam_types:any[];
    public state:string = 'inactive';
    public currentExam:any;

    public isDiscover:boolean = true;
    public visible:boolean = false;
    @Input('showHomeButtonBar') showHomeButtonBar:boolean = true;
    @Input('loggedIn') loggedIn:boolean = false;
    @Input('sideMenuItems') sideMenuItems: any[] = [];
    @Output() changeScreen = new EventEmitter();
    @Output() closeDrawer = new EventEmitter();

    @ViewChild('examTypeList', { static: true }) examTypeList:DropDownList;

    private _model:UberApplication;    

    private currentState:number = null;
    public discoverState:number = ScreenState.PREP_ED_DISCOVER;
    private wishlistState:number = ScreenState.PREP_ED_WISHLIST;
    private profileState:number = ScreenState.PREP_ED_PROFILE;
    public coursesState:number = ScreenState.PREP_ED_COURSES;
    private chartState:number = ScreenState.VIEWING_CHART;
    private vocabState:number = ScreenState.MANAGING_WORDLIST;

    private homeState:number = ScreenState.DEFAULT_VIEW;
    private typesyCoursesState:number = ScreenState.RUNNING_COURSE;
    private activityState:number = ScreenState.SHOWING_ACTIVITY;
    private libraryState:number = ScreenState.MANAGING_TEXT;
    private adminState:number = ScreenState.ADMIN_VIEW;
    private hallOfFameState:number = ScreenState.TYPESY_HALL_OF_FAME;
    private typesyMyTasksState: number = ScreenState.TYPESY_MY_TASKS_VIEW;

    private currentExamType:string;

    public static _instance:SideMenu;
    public userWordlists:any[];
    public currentUser: User;
        
    constructor(
        private urlLoaderService:UrlLoaderService,
        private router: Router
    ) {
        super();
        this._model = UberApplication.GetInstance();
        
        SideMenu._instance = this;
    }

    ngAfterViewInit():void
    {
          
    }

    public sideMenuItemSelected(item) {
        let data = item.data;
        if (item.fromAdmin == true) {
            this.router.navigate([ { outlets: { recommendOutlet: null, primary: ['admin', data] } } ]);
            return;
        }

        switch (data) {
            /*TYPESY SCREENS*/
            case 'Home':
                this.NavigationChange(this.homeState);
                break;
            case 'Courses':
                this.NavigationChange(this.typesyCoursesState);
                break;
            case 'Play':
                this.NavigationChange(this.activityState);
                break;
            case 'Exercises':
                this.NavigationChange(this.libraryState);
                break;
            case 'Admin':
                this.NavigationChange(this.adminState);
                break;
            case 'Stats':
                this.NavigationChange(this.chartState);
                break;
            case 'MyTasks':
                this.NavigationChange(this.typesyMyTasksState);
                break;
            case 'HallOfFame':
                this.NavigationChange(this.hallOfFameState);
                break;


            /* TYPESY PUBLIC PROFILE PAGE */
            case 'typesy-public-profile-home':
                this.urlLoaderService.OpenUrlNewWindow("https://www.typesy.com/");
                break;
            case 'typesy-public-profile-schools':
                this.urlLoaderService.OpenUrlNewWindow("https://www.typesy.com/edu");
                break;
            case 'typesy-public-profile-homeschool':
                this.urlLoaderService.OpenUrlNewWindow("https://www.typesy.com/homeschool");
                break;
            case 'typesy-public-profile-individuals':
                this.urlLoaderService.OpenUrlNewWindow("https://www.typesy.com/individuals");
                break;
        }
    }

    public static GetInstance():SideMenu
    {
        return SideMenu._instance;
    }

    public NavigationChange(screen:number):void
    {
        UberReader.GetInstance().SwitchScreenState(screen);
        this.Hide();
    }

    public redirect(val:string):void
    {

    }


    /****** UTILITIES ********************/
    public Show():void
    {
        this.visible = true;
        this.state = 'active';
    }

    public Hide():void
    {
        this.visible = false;        
    }

    public clickOutside(event):void
    {
        if(event.target.id == "sideMenuOverlay")
        {
            this.state = 'inactive';
            setTimeout(() => {
                 this.Hide();
            }, 500);
           
        }
    }

    private userWordlistChanged(event):void {
        UberReader.GetInstance().UserWordlistChanged(event);
        this.Hide();
    }

    public deleteWordlist(wordlist:ProxyWordlist):void {
        UberReader.GetInstance().DeleteWordlist(wordlist);
    }

    public changeSideMenuToDefault(): void {
        this.currentUser = null;
        this.sideMenuItems = UberReader.GetInstance().typesySideMenuItems;
    }

    public updateSideMenuToAdmin(menus: any[]): void {       
        this.currentUser = this._model.CurrentUser; 
        /* let typesyAdminSideMenuItems: MenuItem[] = [];
        typesyAdminSideMenuItems.push({label: "Home", data: "TypesyAdminHome", icon: "home", styleClass: "icon-home_outline"});
        typesyAdminSideMenuItems.push({label: "Users", data: "Users", icon: "person", styleClass: "icon-person_outline"});
        typesyAdminSideMenuItems.push({label: "Classes", data: "Classes", icon: "group", styleClass: "icon-group_outline"});
        typesyAdminSideMenuItems.push({label: "Account", data: "Subscription", icon: "assignment", styleClass: "icon-assignment_outline"});
        typesyAdminSideMenuItems.push({label: "Reports", data: "Reports", icon: "description", styleClass: "icon-description_outline"});
        typesyAdminSideMenuItems.push({label: "Support", data: "Support", icon: "contact_phone", styleClass: "icon-contact_phone_outline"}); */
        this.sideMenuItems = menus;
    }
}