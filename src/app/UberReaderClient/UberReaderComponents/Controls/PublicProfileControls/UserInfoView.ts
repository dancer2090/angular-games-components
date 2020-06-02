import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { VisualComponent } from '../../VisualComponent';
import { Author } from '../../../../UberReaderData/DataClasses/db/Author';
import { UberApplication } from '../../../../UberReaderData/UberApplication';
import { UberReader } from '../../../UberReader';
import { User } from '../../../../UberReaderData/DataClasses/db/User';
import { UberReaderLoadingMessage } from '../../Dialogs/UberReaderLoadingMessage';
import { HistoryNavigation } from '../../../../UberReaderData/uber.navigation.service';
import { HtmlService } from '../../../../UberReaderData/Utils/Services/HtmlService';
import { UserInfoEvent } from '../../../../UberReaderData/Events/UserInfoEvent';
import { ProxyWordlist } from '../../../../UberReaderData/DataClasses/other/ProxyWordlist';
import { ProxyCourse } from '../../../../UberReaderData/DataClasses/other/ProxyCourse';

@Component({
    selector: 'user-info-view',
    template: `
            <prepEd-author-info *ngIf="viewType == AUTHOR_TYPE" [author]="author" [proxyCourses]="authorCourses"></prepEd-author-info>
            <public-user-profile *ngIf="viewType == USER_TYPE" [user]="user" [wordlists]="userWordlists"></public-user-profile>
        `
})

export class UserInfoView extends VisualComponent implements OnInit
{
    public viewType:string;

    public USER_TYPE:string = "user";
    public AUTHOR_TYPE:string = "author";

    public user:User;
    public userWordlists:ProxyWordlist[];

    public author:Author;
    public authorCourses:ProxyCourse[];

    constructor(private route: ActivatedRoute, private router: Router, private location:Location, private historyNavigator:HistoryNavigation)
    {
        super();
    }

    ngOnInit()
    {        
        //UberReader.GetInstance().navBarVisible = false;        

        let webUrl = this.route.snapshot.paramMap.get('web_url');
        // if(webUrl == "testUser1" || webUrl == "testUser5")
        // {
        //     this.viewType = this.USER_TYPE;
        //     //UberApplication.GetInstance().GetPublicUserProfileByWebUrl(webUrl, this.userInfoSucceeded, this.userInfoFailed);
        // }
        // else
        // {
        //     this.viewType = this.AUTHOR_TYPE;
        //     //UberApplication.GetInstance().GetAuthorInfoByWebUrl(webUrl, this.authorInfoSucceeded, this.authorInfoFailed);
        // }
        UberReaderLoadingMessage.GetInstance().Show("", true, true, true, () => this.historyNavigator.back());
        UberApplication.GetInstance().GetPublicUserProfileByWebUrl(webUrl, this.userInfoSucceeded, this.userInfoFailed);

        // this.route.params.forEach((params: Params) =>
        // {
        //     let webUrl:string = params['web_url']; // (+) converts string 'id' to a number
        //     if(webUrl == "testUser1" || webUrl == "testUser5")
        //     {
        //         this.viewType = this.USER_TYPE;
        //         //UberApplication.GetInstance().GetPublicUserProfileByWebUrl(webUrl, this.userInfoSucceeded, this.userInfoFailed);
        //     }
        //     else
        //     {
        //         this.viewType = this.AUTHOR_TYPE;
        //         //UberApplication.GetInstance().GetAuthorInfoByWebUrl(webUrl, this.authorInfoSucceeded, this.authorInfoFailed);
        //     }            
        // });
    }
    private userInfoSucceeded = (event:UserInfoEvent) =>
    {        
        console.log("userInfoSucceeded................ ", event);
        event.target.removeEventListener(UserInfoEvent.USER_INFO_RECEIVED, this.userInfoSucceeded);
        event.target.removeEventListener(UserInfoEvent.USER_INFO_FAILED, this.userInfoFailed);
        
        UberReaderLoadingMessage.GetInstance().Hide();

        //UDPATE HERE
        if (event.User_type == UserInfoEvent.USER)
        {
            this.user = event.user;
            this.userWordlists = event.Wordlists;

            this.viewType = this.USER_TYPE;
            // this._userPicture = AppSettings.UserResroucesURL + event.user.User_id + "/profile/" + event.user.Profile_pic;
            
            // this.wordlistLabel = this.DisplayNamePosessive(event.user.Name) + " Wordlists";
            // this.htmlService.setTitle(AppSettings.ProductName + " | " + event.user.Name);
        }
        else if (event.User_type == UserInfoEvent.AUTHOR)
        {
            this.author = event.author;
            this.authorCourses = event.Proxy_courses;
            this.viewType = this.AUTHOR_TYPE;
        }
        else
        {
            this.viewType = null;
            //error;
        }
    }

    private userInfoFailed = (event:UserInfoEvent) =>
    {
        console.log("userInfoFailed................");
        event.target.removeEventListener(UserInfoEvent.USER_INFO_RECEIVED, this.userInfoSucceeded);
        event.target.removeEventListener(UserInfoEvent.USER_INFO_FAILED, this.userInfoFailed);

        UberReaderLoadingMessage.GetInstance().Hide();
        // show error message and redirect
    }
}