import { SideMenu } from './SideMenu';
import { ClosePopUpEvent } from '../UberReaderData/Events/ClosePopUpEvent';
import { Component, Output, EventEmitter, Input, ViewChild, ComponentFactoryResolver, ViewContainerRef, ElementRef } from '@angular/core';
import { VisualComponent } from './UberReaderComponents/VisualComponent';
import { UberApplication } from '../UberReaderData/UberApplication';
import { UberApplicationEventTypes } from '../UberReaderData/Events/UberApplicationEventTypes';
import { UberApplicationEvent } from '../UberReaderData/Events/UberApplicationEvent';
import { ScreenState } from '../UberReaderData/Utils/ScreenState';
import { UberReaderLoadingMessage } from './UberReaderComponents/Dialogs/UberReaderLoadingMessage';
import { BuildSettings } from './BuildSettings';
import { UberReader } from './UberReader';
import { ProxyWordlist } from '../UberReaderData/DataClasses/other/ProxyWordlist';
import { WordlistEvent } from '../UberReaderData/Events/WordlistEvent';
import { NavigationBarButtonEvent } from '../UberReaderData/Events/NavigationBarButtonEvent';
import { NewWordsAddedToListEvent } from '../UberReaderData/Events/NewWordsAddedToListEvent';
import { AppSettings } from '../UberReaderData/AppSettings';
import { DevUtils } from '../UberReaderData/DevUtils';
import { HistoryNavigation } from '../UberReaderData/uber.navigation.service';
import { LoginDialog2 } from './UberReaderComponents/Dialogs/LoginDialog2';
import { Router } from '@angular/router';
import { NewTypingTestEvent } from '../UberReaderData/Events/NewTypingTestEvent';
import { UserTypingTestResult } from '../UberReaderData/DataClasses/db/User_Typing_Test_Result';
import { UrlLoaderService } from './UberReaderComponents/SharedModules/shared-components-module/services/UrlLoader.service';
import { TypingTasksDataSyncEvent } from '../UberReaderData/Events/TypingTasksDataSyncEvent';
import { ProxyTypingTask } from '../UberReaderData/DataClasses/other/ProxyTypingTask';
import { User } from '../UberReaderData/DataClasses/db/User';
import { MatDialog } from '@angular/material';
import { FeedbackDialog } from './UberReaderComponents/Dialogs/shared-dialogs/user-menu-dialogs/feedback-dialog.component';
import { ExternalResourceLoaderService } from './UberReaderComponents/SharedModules/shared-components-module/services/ExternalResourceLoader.service';
import { PreferencesDialog } from './UberReaderComponents/Dialogs/shared-dialogs/user-menu-dialogs/preferences-dialog.component';
import { ActivityService } from 'app/UberReaderActivities/activity.service';
import { VocabSharedDialogsService } from './UberReaderComponents/Dialogs/vocab-shared-dialogs/vocab-shared-dialogs.service';
import { GameExerciseService } from 'app/services/game-exercise.service';
import { UserStatusService } from './UberReaderComponents/Controls/status-points-control/user-status.service';
import { SuccessStatus } from './UberReaderComponents/Controls/home-view-controls/success-status-section/success-status.component';


@Component({
    selector: 'navigation-bar',
    styleUrls: ['./NavigationBar.css'],
    template: `
    <mdl-layout-header [class.typesy-header]="currentProduct==TYPESY && !isDesktopToolbar" [class.typesy-desktop-header]="currentProduct==TYPESY && isDesktopToolbar" [class.typesy-admin-header]="currentState == adminState" [class.bg-transparent]="transparent">
        <mdl-layout-header-row [class.preped-header-row]="currentProduct==PREPED" [class.typesy-desktop-header-row]="currentProduct==TYPESY && isDesktopToolbar" [class.typesy-header-row]="currentProduct==TYPESY && !isDesktopToolbar" [class.typesy-public-profile-header-row]="isTypesyPublicProfile" [class.bg-transparent]="transparent">
            <div (click)="logo_clickHandler()"
                 id="homeMenuBtn">
                <img *ngIf="currentProduct==TYPESY && !isDesktopToolbar && organizationName == ''" src="{{'assets/icon/typesy-logo.svg' | resourceLoc}}" width="100" height="64" class="typesy-logo desktop"/>
                <img *ngIf="currentProduct==TYPESY && isDesktopToolbar && organizationName == ''" [class.hide]="isDarkTheme" src="{{'assets/icon/typesy-desktop-logo.svg' | resourceLoc}}" width="100" height="64" class="typesy-logo desktop"/>
                <img *ngIf="currentProduct==TYPESY && isDesktopToolbar && organizationName == ''" [class.hide]="!isDarkTheme" src="{{'assets/icon/typesy-desktop-white-logo.svg' | resourceLoc}}" width="100" height="64" class="typesy-logo desktop"/>
                <img *ngIf="currentProduct==TYPESY && organizationName == ''" src="{{'assets/icon/typesy-icon.svg' | resourceLoc}}" class="logo-row2 mobile"/>

                <!-- ADMIN LOGO -->
                <div id="admin-logo-wrapper" *ngIf="organizationName != ''" >
                    <div class="logo-row mobile"><img src="{{'assets/icon/typesy-icon.svg' | resourceLoc}}"></div>
                    <div [class.hide]="isDarkTheme" class="logo-row desktop"><img src="{{'assets/icon/typesy-admin-logo.svg' | resourceLoc}}"></div>
                    <div [class.hide]="!isDarkTheme" class="logo-row desktop"><img src="{{'assets/icon/typesy-admin-white-logo.svg' | resourceLoc}}"></div>
                    <div class="logo-row desktop school" ><span id="schoolName">{{ organizationName }}</span></div>
                </div>

            </div>
            <img *ngIf="currentProduct==TYPESY && organizationLogo" class="school-logo" [src]="organizationLogo">
            <div *ngIf="currentProduct==TYPESY && showDoTestNowPrompt" class="test-message">You have been assigned a test.<br/><span id="test-dialog-link" (click)="showTestDialog()"> Do test {{ repeatTest ? 'again' : 'now' }}</span></div>
            <div *ngIf="currentProduct==TYPESY && repeatTest" class="test-message">{{ remainingAttempts > 1 ? remainingAttempts + ' attempts' :  '1 attempt'}} remaining <span id="test-dialog-link" (click)="showTestDialog()">Do test again</span></div>

            <div *ngIf="showBackButton && backButtonLabel.length > 0" (click)="backButton_clickHandler()" id="backButton" [mdl-tooltip]="backBtnTooltip">
                <mdl-icon [class.back-button-grey]="isDesktopToolbar">arrow_back</mdl-icon>
                <h6 class="mdl-typography--title back-button" [class.mdl-color-text--white]="!isDesktopToolbar" [class.typesy-text-grey]="isDesktopToolbar">{{ backButtonLabel }}</h6>

                <mdl-tooltip #backBtnTooltip="mdlTooltip" [class.hide]="backButtonTooltip.length == 0"> <!-- class="{{ backButtonTooltip.length > 0 ? '' : 'hide' }}" -->
                    {{ backButtonTooltip }}
                </mdl-tooltip>
            </div>


            <mdl-layout-spacer *ngIf="showBackButton && !isDesktopToolbar"></mdl-layout-spacer>
            <div *ngIf="showTitleHeader" id="headerTitleDiv">
                <h6 class="header-title-main" [class.mdl-color-text--white]="!isDesktopToolbar" [class.typesy-text-grey]="isDesktopToolbar">
                    {{titleHeader}}
                    <div *ngFor="let breadcrumb of breadcrumbs; index as i; last as isLast" class="breadcrumbDiv">
                        <div class="breadcrumbmainLabel ellipsis reverse-ellipsis">
                           <div class="ellipsis__content">
                                <a (click)="breadcrumb_clickHandler(breadcrumb)" class="{{(breadcrumbs.length==1 || isLast) ? 'breadcrumbLabel' : 'breadcrumbLabelWithHover'}}" >
                                    {{ breadcrumb.label }}
                                </a>
                           </div>
                        </div>
                        <div class="breadCrubmSeparator">{{ addBreadcrumbSeparator(i) }}</div>
                    </div>
                </h6>
                <button *ngIf="currentState == activityState && activityService.IsActivityView" class="mdl-button mdl-js-button button--icon-next-game"  mdl-tooltip="next recommended game" (click)="skipToNextRecommendedActivity()"><mdl-icon>videogame_asset</mdl-icon><mdl-icon style="padding-left: 3px;">navigate_next</mdl-icon></button>
            </div>

            <mdl-layout-spacer></mdl-layout-spacer>

            <div class="headerActionContent" #headerActionContentDiv [class.hide]="!showHeaderActionContent">
                <!--<div class="headerActionButtons" *ngIf="loggedIn && currentProduct==TYPESY">
                    <mdl-icon class="nav-arrows" (click)="previousCourseActivity()">keyboard_arrow_left</mdl-icon>
                    <mdl-icon class="nav-arrows" (click)="nextCourseActivity()">keyboard_arrow_right</mdl-icon>
                </div>-->
                <mdl-icon id="btnShareLinkCourseRunner" *ngIf="showCourseRunnerActionButtons && shareCourseStepButtonVisible" class="options-icon" mdl-tooltip="Share this course step via a public link" (click)="shareCourseStep_clickHandler()">share</mdl-icon>
                <mdl-icon *ngIf="showCourseRunnerActionButtons" class="options-icon" mdl-tooltip="Flag this content if you find a problem, and we’ll fix it ASAP" (click)="flagCourseStep_clickHandler()">flag</mdl-icon>
                <!-- <mdl-icon id="btnCalculatorCourseRunner" *ngIf="showCourseRunnerActionButtons && showCalculator" class="options-icon" mdl-tooltip="Show the calculator" (click)="calculator_clickHandler()">apps</mdl-icon> -->
                <h6 class="mdl-typography--title steps-text" [class.mdl-color-text--white]="!isDesktopToolbar" [class.typesy-text-grey]="isDesktopToolbar">{{headerActionContent}}</h6>
                <!--
                <button mdl-button mdl-ripple [mdl-tooltip]="wishlistButtonText" class="{{inWishlist ? 'wishlistRemoveBtn' : 'wishlistBtn'}}" (click)="wishlistButton_clickHandler()"></button>
                -->
                <div *ngIf="currentState == activityState" id="container--header-functions">
                    <div class="exerciseLabel" [mdl-tooltip]="currentTextTt" (click)="gameExerciseService.OpenExercises()">
                        <div class="exercise-headline">
                            <span id="ttHeadline">{{ gameExerciseService.CurrentTextExercise?.Title }}</span>
                        </div>
                        <mdl-tooltip #currentTextTt="mdlTooltip">Current content text used for typing games. This is chosen automatically based on your skills and progress. Or click to select a custom exercise.</mdl-tooltip>
                    </div>
                    <div class="mainButtons">
                        <button [class.hide]="gameExerciseService.HideNextButton" mdl-button mdl-button-type="mini-fab" class="main-btns" [mdl-tooltip]="prevBtn" [disabled]="gameExerciseService.PreviousExercises.length < 2" (click)="[gameExerciseService.GetPrevExercise(), gameExerciseService.PrevBtn_mouseover()]" (mouseover)="gameExerciseService.PrevBtn_mouseover()"><mdl-icon>navigate_before</mdl-icon></button>
                        <button [class.hide]="gameExerciseService.HideNextButton" mdl-button mdl-button-type="mini-fab" class="main-btns" [mdl-tooltip]="nextBtn" (click)="activityService.goToNextRecommendedExercise.next()"><mdl-icon>navigate_next</mdl-icon></button>
                        <!--<button mdl-button mdl-button-type="mini-fab" class="main-btns" [mdl-tooltip]="newBtn" #addTextBtn="mdlButton" [class.hide]="gameExerciseService.DisableTextCreation"
                            (click)="addTextMenu.toggle($event, addTextBtn); gameExerciseService.ToggleNewExerciseMenu();"
                            (mouseover)="gameExerciseService.ToggleNewExerciseMenu()">
                            <span class="icon-library_add_outline"></span>
                        </button>
                        <mdl-menu #addTextMenu="mdlMenu" mdl-menu-position="bottom-right">
                            <mdl-menu-item *ngFor="let addTextOption of gameExerciseService.AddTextOptions" mdl-ripple (click)="gameExerciseService.AddTextSelectionChanged(addTextOption)">{{ addTextOption.label }}</mdl-menu-item>
                        </mdl-menu>-->
                    </div>
                    <mdl-tooltip #prevBtn="mdlTooltip" [class.hide]="gameExerciseService.HidePrevBtnTooltip">Previous exercise</mdl-tooltip>
                    <mdl-tooltip #nextBtn="mdlTooltip">Next recommended exercise</mdl-tooltip>
                    <mdl-tooltip #newBtn="mdlTooltip" [class.hide]="gameExerciseService.HideNewExerciseTooltip">Create new exercise</mdl-tooltip>
                </div>
                <div id="container--status-info" [class.hide]="currentState == adminState">
                    <div class="row1" id="status-info">
                        <div id="inner-row1">
                            <div #miniOdometer id="odometer-mini" class="odometer">0</div>
                        </div>
                        <div id="inner-row2">
                            <img src="{{ 'assets/icon/mini-trophies/' + currentLevel + '-trophy.svg' | resourceLoc }}" style="width: 32px; margin: 2px 3px; display: inline-block;"/>
                        </div>
                    </div>
                    <mdl-tooltip #typesyLeveltt="mdlTooltip" class="typesyLeveltt"> Use Typesy, have fun, and earn Typesy Points. You get points by doing courses and playing games. Earn enough points and you will progress to the next level. With each new level you will unlock new games, avatar features, content, and backgrounds.</mdl-tooltip>


                    <div id="bubble--status-level" [class.ipad--bubble-position]="isIPAD && !isAdminView">
                        <success-status #successStatus isTooltip="true"></success-status>
                    </div>
                </div>
                <div class="row" [class.hide]="currentState == adminState">
                    <button #btnAppSettings class="mdl-button mdl-js-button mdl-button--icon" style="margin-top: 4px;" (click)="openPreferences()">
                        <!--img src="{{ 'assets/icon/settings-icon.svg' | resourceLoc }}" style="width: 24px; height: 32px; cursor: pointer;" /-->
                        <span class="icon-settings_outline" style="font-size: 30px; cursor: pointer; color: #616161;" ></span>
                    </button>
                </div>
            </div>

            <nav class="mdl-navigation mdl-layout--large-screen-only navigation" [class.typesy-desktop-navigation]="isDesktopToolbar">

                <!--TYPESY TOP MENU LINKS-->
                <div id="typesy-desktop-menu-container">
                    <div class="{{showNavLinks ? currentState == homeState ? 'nav-tabs active' : 'nav-tabs' : 'hide'}}" *ngIf="loggedIn && currentProduct==TYPESY && isDesktopToolbar" (click)="NavigationChange(homeState)">
                        <div class="nav-icons">
                            <!--mdl-icon>home</mdl-icon-->
                            <span class="icon-home_outline"></span>
                        </div>
                        <div class="nav-text">
                            Home
                        </div>
                    </div>
                    <div class="{{showNavLinks ? currentState == courseState ? 'nav-tabs active' : 'nav-tabs' : 'hide'}}" *ngIf="loggedIn && currentProduct==TYPESY && isDesktopToolbar" (click)="NavigationChange(courseState)">
                        <div class="nav-icons">
                            <!--mdl-icon>lightbulb_outline</mdl-icon-->
                            <span class="icon-wb_incandescent_outline flip2"></span>
                        </div>
                        <div class="nav-text">
                            Courses
                        </div>
                    </div>
                    <div class="{{showNavLinks ? currentState == activityState ? 'nav-tabs active' : 'nav-tabs' : 'hide'}}" *ngIf="loggedIn && currentProduct==TYPESY && isDesktopToolbar && !hidePlaySection" (click)="NavigationChange(activityState)">
                        <div class="nav-icons">
                            <!--mdl-icon>keyboard</mdl-icon-->
                            <span class="icon-keyboard_outline"></span>
                        </div>
                        <div class="nav-text">
                            Play
                        </div>
                    </div>

                    <div class="{{showNavLinks ? currentState == chartState ? 'nav-tabs active' : 'nav-tabs' : 'hide'}}" *ngIf="loggedIn && currentProduct==TYPESY && isDesktopToolbar" (click)="NavigationChange(chartState)">
                        <div class="nav-icons">
                            <!--mdl-icon>insert_chart</mdl-icon-->
                            <span class="icon-assessment_outline"></span>
                        </div>
                        <div class="nav-text">
                            Stats
                        </div>
                    </div>
                    <div class="{{showNavLinks ? currentState == hallOfFameState ? 'nav-tabs active' : 'nav-tabs' : 'hide'}}" *ngIf="loggedIn && currentProduct==TYPESY && isDesktopToolbar && showHallOfFame" (click)="NavigationChange(hallOfFameState)">
                        <div class="nav-icons">
                            <!--mdl-icon>star</mdl-icon-->
                            <span class="icon-star_outline"></span>
                        </div>
                        <div class="nav-text">
                            Hall of Fame
                        </div>
                    </div>

                    <div class="{{showNavLinks ? currentState == myTasksState ? 'nav-tabs active' : 'nav-tabs' : 'hide'}}" *ngIf="_model?.CurrentUser?.IsEduUser && loggedIn && currentProduct==TYPESY && isDesktopToolbar" (click)="NavigationChange(myTasksState)">
                        <div class="nav-icons">
                            <span class="icon-assignment_outline"></span>
                        </div>
                        <div class="nav-text">
                            My Tasks
                        </div>
                        <div *ngIf="numTodoTasks > 0" class="notification-dot">{{ numTodoTasks }}</div>
                    </div>

                    <div class="{{showNavLinks ? currentState == adminState ? 'nav-tabs admin-tab active' : 'nav-tabs admin-tab' : 'hide'}}" *ngIf="userIsAdmin && loggedIn && currentProduct==TYPESY && isDesktopToolbar" (click)="goToAdminPage()">
                        <div class="nav-icons">
                            <!--mdl-icon>person</mdl-icon-->
                            <span class="icon-person_outline"></span>
                        </div>
                        <div class="nav-text">
                            Admin
                        </div>
                    </div>
                </div>



                <div class="{{showNavLinks ? currentState == homeState ? 'navLinkDiv typesyNavLinkActive' : 'navLinkDiv' : 'hide'}} {{ userIsAdmin ? 'one' : 'oneUser'}}" *ngIf="loggedIn && currentProduct==TYPESY && !isDesktopToolbar" (click)="NavigationChange(homeState)">
                    <a mdl-ripple class="mdl-button mdl-js-button mdl-navigation__link typesyNavLink desktop-navigation">
                        <span>{{ 'Home' | uppercase }}</span>
                    </a>
                </div>
                <div class="{{showNavLinks ? currentState == courseState ? 'navLinkDiv typesyNavLinkActive' : 'navLinkDiv' : 'hide'}} {{ userIsAdmin ? 'two' : 'twoUser'}}" *ngIf="loggedIn && currentProduct==TYPESY && !isDesktopToolbar" (click)="NavigationChange(courseState)">
                    <a mdl-ripple class="mdl-button mdl-js-button mdl-navigation__link typesyNavLink desktop-navigation" >
                        <span>{{ 'Courses' | uppercase }}</span>
                    </a>
                </div>
                <div class="{{showNavLinks ? currentState == activityState ? 'navLinkDiv typesyNavLinkActive' : 'navLinkDiv' : 'hide'}} {{ userIsAdmin ? 'three' : 'threeUser'}}" *ngIf="loggedIn && currentProduct==TYPESY && !isDesktopToolbar && !hidePlaySection" (click)="NavigationChange(activityState)">
                    <a mdl-ripple class="mdl-button mdl-js-button mdl-navigation__link typesyNavLink desktop-navigation" >
                        <span>{{ 'Play' | uppercase }}</span>
                    </a>
                </div>
                <!--
                <div class="{{showNavLinks ? currentState == libraryState ? 'navLinkDiv typesyNavLinkActive' : 'navLinkDiv' : 'hide'}} {{ userIsAdmin ? 'four' : 'fourUser'}}" *ngIf="loggedIn && currentProduct==TYPESY && !isDesktopToolbar" (click)="NavigationChange(libraryState)">
                    <a mdl-ripple class="mdl-button mdl-js-button mdl-navigation__link typesyNavLink desktop-navigation" >
                        <span>{{ 'Exercises' | uppercase }}</span>
                    </a>
                </div>
                -->
                <div class="{{showNavLinks ? currentState == adminState ? 'navLinkDiv typesyNavLinkActive' : 'navLinkDiv' : 'hide'}} five" *ngIf="userIsAdmin && loggedIn && currentProduct==TYPESY && !isDesktopToolbar" (click)="goToAdminPage()">
                    <a mdl-ripple class="mdl-button mdl-js-button mdl-navigation__link typesyNavLink desktop-navigation" >
                        <span>{{ 'Admin' | uppercase }}</span>
                    </a>
                </div>
                <div class="{{showNavLinks ? currentState == chartState ? 'navLinkDiv typesyNavLinkActive' : 'navLinkDiv' : 'hide'}} {{ userIsAdmin ? 'six' : 'sixUser'}}" *ngIf="loggedIn && currentProduct==TYPESY && !isDesktopToolbar" (click)="NavigationChange(chartState)">
                    <a mdl-ripple class="mdl-button mdl-js-button mdl-navigation__link typesyNavLink desktop-navigation" >
                        <span>{{ 'Stats' | uppercase }}</span>
                    </a>
                </div>
                <div class="{{showNavLinks ? currentState == hallOfFameState ? 'navLinkDiv typesyNavLinkActive' : 'navLinkDiv' : 'hide'}} {{ userIsAdmin ? 'seven' : 'sevenUser'}}" *ngIf="loggedIn && currentProduct==TYPESY && !isDesktopToolbar && showHallOfFame" (click)="NavigationChange(hallOfFameState)">
                    <a mdl-ripple class="mdl-button mdl-js-button mdl-navigation__link typesyNavLink desktop-navigation" >
                        <span>{{ 'Hall Of Fame' | uppercase }}</span>
                    </a>
                </div>
                <!--
                <div class="{{showNavLinks ? currentState == schoolsState ? 'navLinkDiv typesyNavLinkActive' : 'navLinkDiv' : 'hide'}} {{ userIsAdmin ? 'seven' : 'sevenUser'}}" *ngIf="loggedIn && currentProduct==TYPESY && !isDesktopToolbar && showSchoolsButton" (click)="NavigationChange(schoolsState)"
                        (mouseover)="typesySchoolsMenu.show($event)" (mouseleave)="typesySchoolsMenu.hide($event)">
                    <a mdl-ripple class="mdl-button mdl-js-button mdl-navigation__link typesyNavLink desktop-navigation" >
                        <span>{{ 'Schools' | uppercase }}</span>
                    </a>

                    <mdl-popover #typesySchoolsMenu>
                        <div mdl-shadow="6" (mouseover)="typesySchoolsMenu.show($event)" (mouseleave)="typesySchoolsMenu.hide($event)">
                            <mdl-list>
                                <mdl-list-item *ngFor="let item of typesySchoolsMenuList" (click)="homeMenuButtonBarChanged(item, $event)">
                                    <mdl-list-item-primary-content>
                                        <span>{{ item.label }}</span>
                                    </mdl-list-item-primary-content>
                                </mdl-list-item>
                            </mdl-list>
                        </div>
                    </mdl-popover>
                </div>
                -->
                <hr [class.hide]="currentState == adminState || !showNavLinks || isDesktopToolbar"/>
                <!--TYPESY TOP MENU LINKS-->

                <!-- MOVED TO THE CARDS OCTOBER VERSION
                <div class="container--searchField" [class.hide]="adminSearchLabel == null">
                    <mdl-icon class="searchField--icon">search</mdl-icon>
                    <mdl-textfield id="adminSearchField" class="searchField" [(ngModel)]="searchInput" (keyup)="callSearch()" [label]="adminSearchLabel"></mdl-textfield>
                    <mdl-icon [class.hide]="searchInput?.length == 0" class="usersClearSearchBtn" [mdl-tooltip]="clearBtn"
                        (click)="searchInput = ''; callSearch();">clear</mdl-icon>
                    <mdl-tooltip #clearBtn="mdlTooltip" class="mdlClearBtn">Clear search</mdl-tooltip>
                </div>

                <mdl-textfield id="expandable-textfield" icon="search" [class.hide]="adminSearchLabel == null" [(ngModel)]="searchInput" (keyup)="callSearch()" [label]="adminSearchLabel"></mdl-textfield>-->

                <button [class.hide]="currentState != adminState" id="button--admin-help" mdl-button mdl-ripple #tourOptionsBtn="mdlButton" (click)="tourOptionsMenu.toggle($event, tourOptionsBtn)">

                    Help
                    <mdl-icon>arrow_drop_down</mdl-icon>
                </button>
                <mdl-menu #tourOptionsMenu="mdlMenu" mdl-menu-position="bottom-right">
                    <mdl-menu-item mdl-ripple (click)="goToTypesyCommunity()">Typesy Community</mdl-menu-item>
                    <mdl-menu-item mdl-ripple (click)="openSupport()">Support</mdl-menu-item>
                    <mdl-menu-item mdl-ripple (click)="submitBug()">Submit Bug/Feedback</mdl-menu-item>
                </mdl-menu>
                <!--
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
					<label class="mdl-button mdl-js-button mdl-button--icon" for="sample6">
						<i class="search-icon material-icons">search</i>
					</label>
					<div class="mdl-textfield__expandable-holder">
						<input class="mdl-textfield__input" type="text" id="sample6" [(ngModel)]="searchInput" (keyup)="callSearch()">
						<label class="mdl-textfield__label">{{ adminSearchLabel }}</label>
					</div>
                </div>
                -->
                <div class="{{ ( loggedIn && showNavLinks ) || showProfilePicMenu ? 'navLinkDiv mobileProfile' : 'hide' }}"
                    (click)="showRightDrawerHandler()">
                    <div class="navLink">
                        <span [mdl-badge]="totalUnseenItems > 0 ? totalUnseenItems : null" mdl-badge-overlap>
                            <img [class.hide]="profilePicture == profilePictureWeb || profilePicture == profilePictureDesktop"
                                src="{{profilePicture}}" class="profileImg"/>
                            <span [class.hide]="profilePicture != profilePictureWeb && profilePicture != profilePictureDesktop"
                                class="icon-account_circle_outline profileImg"></span>
                        </span>
                    </div>
                </div>

                <div class="{{showHomeButtonBar && loggedIn == false ? 'navLinkDiv mobilelogin' : 'hide'}}"
                     (click)="profileOptionChanged('login')">
                    <a class="mdl-navigation__link navLink">LOGIN</a>
                </div>

                <div *ngIf="allowSignup" class="{{showHomeButtonBar && loggedIn == false ? 'navLinkDiv mobilelogin' : 'hide'}}"
                     (click)="profileOptionChanged('signup')">
                     <a class="mdl-navigation__link navLink">SIGN UP</a>
                </div>

                <div class="{{ isTypesyPublicProfile ? 'typesyPublicProfileNavDiv' : 'hide' }}">
                     <a class="mdl-navigation__link typesyPublicProfileLink" href="https://www.typesy.com/">Home</a>
                </div>

                <div class="{{ isTypesyPublicProfile ? 'typesyPublicProfileNavDiv' : 'hide' }}">
                     <a class="mdl-navigation__link typesyPublicProfileLink" href="https://www.typesy.com/edu">For Schools</a>
                </div>

                <div class="{{ isTypesyPublicProfile ? 'typesyPublicProfileNavDiv' : 'hide' }}">
                     <a class="mdl-navigation__link typesyPublicProfileLink" href="https://www.typesy.com/homeschool">For Homeschool</a>
                </div>

                <div class="{{ isTypesyPublicProfile ? 'typesyPublicProfileNavDiv' : 'hide' }}">
                     <a class="mdl-navigation__link typesyPublicProfileLink" href="https://www.typesy.com/individuals">For Individuals</a>
                </div>

            </nav>
        </mdl-layout-header-row>
    </mdl-layout-header>
    `,
    providers: [UserStatusService]
})

export class NavigationBar extends VisualComponent
{
    @ViewChild('miniOdometer', { static: true }) miniOdometer: ElementRef;
    @ViewChild('btnAppSettings', { static: true }) btnAppSettings: ElementRef;
    @ViewChild('successStatus', { static: true }) successStatus: SuccessStatus;

    @Input('visible') visible:boolean = true;
    @Input('showTitleHeader') showTitleHeader:boolean = true;
    @Input('showHeaderActionContent') showHeaderActionContent:boolean;
    @Input('showNavLinks') showNavLinks:boolean = true;
    @Input('showHomeButtonBar') showHomeButtonBar:boolean = true;
    @Input('showCourseRunnerActionButtons') showCourseRunnerActionButtons:boolean = false;
    @Input('shareCourseStepButtonVisible') shareCourseStepButtonVisible:boolean = false;
    @Input('showCalculator') showCalculator:boolean = false;
    @Input('showProfilePicMenu') showProfilePicMenu:boolean = false;
    @Input('loggedIn') loggedIn:boolean = false;
    @Input('showSchoolLogo') showSchoolLogo:boolean = false;
    @Input('numOfCourses') numOfCourses:number = 0;
    @Input('myPrepTooltip') myPrepTooltip:string = "";
    @Input('numOfUnviewedWords') numOfUnviewedWords:number = 0;
    @Input('totalUnseenItems') totalUnseenItems:number = 0;
    @Input('profileLoggedInItems') profileLoggedInItems:any[];
    @Input('transparent') transparent: boolean = false;
    @Input('isDesktopToolbar')
    public set isDesktopToolbar(val:boolean) {
        this._isDesktopToolbar = val;
        this.profilePicture = this.isDesktopToolbar ? this.profilePictureDesktop : this.profilePictureWeb;
    };

    public get isDesktopToolbar() {
        return this._isDesktopToolbar;
    }
    private _isDesktopToolbar: boolean;

    @Output() changeScreen = new EventEmitter();
    @Output() sideMenuEmitter = new EventEmitter();
    @Output() showRightDrawer = new EventEmitter();

    @ViewChild('headerActionContentDiv', {read: ViewContainerRef, static: true}) headerActionContentDiv;

    @Input('showBackButton') showBackButton:boolean = false;
    @Input('backButtonLabel') backButtonLabel:string = "back";
    @Input('backButtonTooltip') backButtonTooltip:string = "";
    @Input('titleHeader') titleHeader:string = "";
    @Input('breadcrumbs') breadcrumbs:any[] = [];
    @Input('headerActionContent') headerActionContent:string = "";
    @Input('allowSignup') allowSignup: boolean = true;
    @Input('userIsAdmin') userIsAdmin: boolean = false;
    @Input('showSchoolsButton') showSchoolsButton:boolean = true;
    @Input('showHallOfFame') showHallOfFame: boolean = true;
    @Input('hidePlaySection') hidePlaySection: boolean = false;
    @Input('isTypesyPublicProfile') isTypesyPublicProfile:boolean = false;
    @Input('isNearpodBuild') isNearpodBuild: boolean = false;
    @Input('isDarkTheme') isDarkTheme: boolean = false;
    @Input('isAdminView') isAdminView: boolean = false;

    public homeMenuButtonBarList:any[] = [{label: "APP HOME", data: "APP HOME"} , {label: "SITE HOME", data: "SITE HOME"}];

    public prepEdExamList:any[] = [
        {label:"ALL", data: "ALL"},
        {label:"GRE", data: "GRE"},
        {label:"SAT", data: "SAT"},
        {label:"GMAT", data: "GMAT"},
        {label:"IELTS", data: "IELTS"},
        {label:"ACT", data: "ACT"},
        {label:"LSAT", data: "LSAT"},
        {label:"TOEFL", data: "TOEFL"},
        {label:"POSTAL", data: "POSTAL"}
    ];

    public typesySchoolsMenuList:any[] = [
        {label:"Typesy EDU Admin", data: "edu_admin"},
        {label:"Typesy EDU Help", data: "edu_help"},
        {label:"Learn About Typesy EDU", data: "edu_learn"}
    ];

    public _model:UberApplication;

    public profilePictureWeb:string = AppSettings.GetAssetLocation() + "assets/icon/profile_32_filled.svg";
    public profilePictureDesktop:string = AppSettings.GetAssetLocation() + "assets/icon/profile_32_filled-desktop.svg";
    public profilePicture:string = this.profilePictureWeb;
    private profileButtonLabel:string = "Sign In";

    public userWordlists:any[];

    public currentState:number = ScreenState.PREP_ED_DISCOVER;
    public discoverState:number = ScreenState.PREP_ED_DISCOVER;
    public wishlistState:number = ScreenState.PREP_ED_WISHLIST;
    public profileState:number = ScreenState.PREP_ED_PROFILE;
    public prepedCoursesState:number = ScreenState.PREP_ED_COURSES;
    public chartState:number = ScreenState.VIEWING_CHART;
    public vocabState:number = ScreenState.MANAGING_WORDLIST;
    public notesState:number = ScreenState.PREP_ED_NOTES;

    public homeState:number = ScreenState.DEFAULT_VIEW;
    public courseState:number = ScreenState.RUNNING_COURSE;
    public activityState:number = ScreenState.SHOWING_ACTIVITY;
    public libraryState:number = ScreenState.MANAGING_TEXT;
    public adminState:number = ScreenState.ADMIN_VIEW;
    public myTasksState:number = ScreenState.TYPESY_MY_TASKS_VIEW;
    public hallOfFameState:number = ScreenState.TYPESY_HALL_OF_FAME;
    public schoolsState:number = ScreenState.TYPESY_SCHOOLS;

    public TYPESY:number = AppSettings.TYPESY;

    public currentProduct:number;
    public currentExam:any;
    public showDoTestNowPrompt: boolean = false;
    public repeatTest: boolean = false;
    public remainingAttempts: number;
    public organizationLogo: string;
    public organizationName: string = "";
    /*public searchInput:string = "";
    public adminSearchLabel: string;*/
    public numTodoTasks: number = 0;
    public currentUser: User;
    public currentLevel: string = "";
    public isIPAD: boolean;

    constructor(
        private historyNavigator: HistoryNavigation,
        private router: Router,
        private urlLoaderService:UrlLoaderService,
        private matDialog: MatDialog,
        private externalResourceLoader: ExternalResourceLoaderService,
        public activityService: ActivityService,
        public gameExerciseService: GameExerciseService,
        private vocabDialogService: VocabSharedDialogsService,
        private userStatusService: UserStatusService
    ) {
        super();
        this.isIPAD = AppSettings.ClientType == AppSettings.IPAD_ANGULAR;
        DevUtils.ShowTime("NavigationBar", "constructor");
        this._model = UberApplication.GetInstance();
        this.currentProduct = BuildSettings.productId;
        this.profilePicture = this.isDesktopToolbar ? this.profilePictureDesktop : this.profilePictureWeb;

        if(this.currentProduct == this.TYPESY) {
            //this._model.addEventListener(NewTypingTestEvent.FORCE_START_TYPING_TEST, this.doTestNow);
            //this._model.addEventListener(NewTypingTestEvent.ACTIVE_TYPING_TEST, this.doTestNow);
            //this._model.addEventListener(NewTypingTestEvent.REPEAT_TYPING_TEST, this.doTestNow);
            this._model.addEventListener(UberApplicationEventTypes.ORGANIZATION_LOGO_LOADED, this.updateOrganizationLogo);
            this._model.addEventListener(TypingTasksDataSyncEvent.USER_TASKS_DATA_SYNC, this.GetProxyTypingTasks);
        }
    }

    private forcedTaskDialogClosed: boolean = true;
    private forcedTasks: ProxyTypingTask[] = [];
    private GetProxyTypingTasks = (event: TypingTasksDataSyncEvent) => {
        let typingTaskResults = event.TypingTaskResults;
        let toDoTasks: ProxyTypingTask[] = event.TypingTasks.filter(task => {
            return typingTaskResults.findIndex(result => result.TypingTaskId == task.TypingTaskId && result.Speed != null) == -1;
            /* let result = typingTaskResults.find(result => result.TypingTaskId == task.TypingTaskId);
            let attemptsMade: number = result != null ? result.Attempts : 0;
            let remainingAttempts: number = task.AllowedAttempts - attemptsMade;
            let today: Date = new Date();
            return (task.Active == true || ((task.StartDate && task.EndDate) ? (today >= task.StartDate && today <= task.EndDate) : false)) && remainingAttempts == task.AllowedAttempts; */
        });
        this.numTodoTasks = toDoTasks.length;

        this.forcedTasks = toDoTasks.filter(task => task.ForceStart == true && typingTaskResults.find(result => result.TypingTaskId == task.TypingTaskId) == null);
        if (this.forcedTasks.length > 0 && this.currentState != ScreenState.TYPESY_MY_TASKS_VIEW && this.forcedTaskDialogClosed && this._model.CurrentUser && this._model.CurrentUser.Is_admin == false) {
            this._model.showMdlAlertDialog('This is a compulsory task. Please go to my tasks screen.', 'You have been assigned to a task', false, 'Go to My Tasks',
                event => {
                    UberReader.GetInstance().SwitchScreenState(ScreenState.TYPESY_MY_TASKS_VIEW);
                    this.forcedTaskDialogClosed = true;
                }, null, true);
            this.forcedTaskDialogClosed = false;
        }
    }

    public GetForcedTypingTasks(): ProxyTypingTask[] {
        return this.forcedTasks;
    }

    private updateOrganizationLogo = (event: UberApplicationEvent) => {
        this.organizationLogo = this._model.GetOrganizationLogoUrl();
    }

    public SetCurrentUser(user: User) {
        this.currentUser = user;
    }

    public homeMenuBtnClick(event) {
        event.stopPropagation();
        this.NavigationChange(this.discoverState);
    }

    public NavigationChange(screen:number):void
    {
        if (this.forcedTasks.length > 0 && this.currentState == ScreenState.TYPESY_MY_TASKS_VIEW && this._model.CurrentUser && this._model.CurrentUser.Is_admin == false) {
            UberApplication.GetInstance().showMdlAlertDialog('There are compulsory tasks assigned to you, you cannot leave this page unless you complete them.', 'Compulsory Tasks Pending', false, 'OK');
            return;
        }

        if(screen == this.discoverState && this.currentState == this.discoverState)
        {
            this.dispatchEvent(new NavigationBarButtonEvent(NavigationBarButtonEvent.BUTTON_BAR_CLICKED, screen));
        }

        this.changeScreen.emit(screen);
        //this.currentState = screen;
    }

    public goToAdminPage():void {
        this.urlLoaderService.OpenAdminInterface();
    }

    public backButton_clickHandler():void {
        this.historyNavigator.back();
        //this.dispatchEvent(new UberApplicationEvent("navigate_back"));
    }

    public shareCourseStep_clickHandler() {
        this._model.dispatchEvent(new UberApplicationEvent("shareCourseStep"));
    }

    public flagCourseStep_clickHandler() {
        this._model.dispatchEvent(new UberApplicationEvent("flagCourseStep"));
    }

    public calculator_clickHandler() {
        this._model.dispatchEvent(new UberApplicationEvent("calculator"));
    }

    public CurrentState(state:number):void
    {
        DevUtils.LogFunction("NavigationBar", "CurrentState", [{"current state": state}]);
        this.currentState = state;
    }

    public UpdateProfile():void
    {
        if(this._model.CurrentUserData)
        {
            if(this._model.CurrentUserData.ProfilePictureUrl)
            {
                this.profilePicture = this._model.CurrentUserData.ProfilePictureUrl;
            }
            else
            {
                this.profilePicture = this.isDesktopToolbar ? this.profilePictureDesktop : this.profilePictureWeb;
            }

            let displayName:string = this._model.CurrentUserData.DisplayName;
			if (displayName.length <= 20)
			{
			    this.profileButtonLabel = displayName;
			}
			else
			{
				this.profileButtonLabel = displayName.substr(0, 17) + "...";
			}
        }
    }

    public CreateMenu = (event:UberApplicationEvent = null) =>
    {

    }

    private examTypesChangeTrigger = (event:UberApplicationEvent) =>
    {
        this.refreshCourses();
    }

    private refreshCourses():void
    {

    }

    public logo_clickHandler() {
        if (this.isNearpodBuild) {
            this.urlLoaderService.OpenUrlNewWindow("https://www.typesy.com/");
            return;
        }

        switch(this.currentProduct) {
            default:
                this.urlLoaderService.OpenMainApp();
        }
    }

    public homeMenuButtonBarChanged(item, event):any
    {
        if(item)
        {
            switch(item.data)
            {
                case "SITE HOME":
                    switch(this.currentProduct) {
                        case this.TYPESY:
                            this.urlLoaderService.OpenUrlNewWindow("https://www.typesy.com/");
                            break;
                    }
                    event.stopPropagation();
                    break;
                case "APP HOME":
                    switch(this.currentProduct) {
                        default:
                            this.NavigationChange(this.homeState);
                    }
                    event.stopPropagation();
                    break;
                default:
                    //do nothing
            }
        }
    }

    //best to put the sign out and profile dialog code here because:
    //this component is always available in dom
    public profileOptionChanged(event):any
    {
        if(event == "login")
        {
            LoginDialog2.OpenScreenState = 0;
            this.NavigationChange(this.profileState);
        }
        else if(event == "signup")
        {
            LoginDialog2.OpenScreenState = 1;//sign up
            this.NavigationChange(this.profileState);
        }
    }


    public vocabLink_clickHandler() {
        let currentWordlist:any = this._model.currentlySelectedWordlist;
        currentWordlist = currentWordlist == null ? UberApplication.GetInstance().GetUserProxyWordlists()[0] : currentWordlist;
        if (currentWordlist) {
            UberReaderLoadingMessage.GetInstance().Show(this._model.GetUiTextByKey("STAT_RETRIEVING_WORD_LIST"), false);
			this._model.GetAllWordlistData(currentWordlist.Wordlist_id, this.wordlistDataReceived, this.wordlistDataError);
        }
        else {
            /* let pDialog = this.mdlDialogService.showCustomDialog({
                providers: [{provide: "data", useValue: {}}],
                component: ChangeWordlistDialog,
                isModal: true,
                styles: {'width': '450px'}
            }); */
            this.vocabDialogService.showChangeWordlistDialog();
        }
    }

	public UserWordlistChanged(event):void {
        /*if(event instanceof ProxyWordlist) {
            let wordlist:ProxyWordlist = event;
            this._model.currentlySelectedWordlist = wordlist;

            UberReaderLoadingMessage.GetInstance().Show(this._model.GetUiTextByKey("STAT_RETRIEVING_WORD_LIST"), false);
			this._model.GetAllWordlistData(wordlist.Wordlist_id, this.wordlistDataReceived, this.wordlistDataError);
		}
        else {
            let scopeFunction = this.createWordlistHandler;
            DialogManager.AddPopup2(this.componentFactoryResolver, CreateWordlistDialog, function(createWordlistDialog:CreateWordlistDialog)
            {
                scopeFunction(createWordlistDialog);
            });
        }*/
    }

    /*private createWordlistHandler = (createWordlistDialog:CreateWordlistDialog) =>
    {
        var wordlistCreated = (event:WordlistEvent) =>
        {
            event.target.removeEventListener(WordlistEvent.WORDLIST_CREATED, wordlistCreated);
            UberApplication.GetInstance().NewWordsAddedToList(event.numOfNewWordsAdded);
            this.UpdateUserWordlists();
        }
        createWordlistDialog.willNavigate = true;
        createWordlistDialog.addEventListener(WordlistEvent.WORDLIST_CREATED, wordlistCreated);
    }*/

    private wordlistDataReceived = (event:WordlistEvent) => {
        event.target.removeEventListener(WordlistEvent.WORDLIST_DATA_RECEIVED, this.wordlistDataReceived);
        event.target.removeEventListener(WordlistEvent.WORDLIST_DATA_ERROR, this.wordlistDataError);

        UberReaderLoadingMessage.GetInstance().Hide();

        if (event.Wordlist != null) {
		    this._model.CurrentWordlist = event.Wordlist;
            this.numOfUnviewedWords = 0;
            this._model.UpdateWordsSeen(this._model.CurrentWordlist.Wordlist_id);
            this._model.UpdateUserPref('num_of_unviewed_words', "0", true);
            UberReader.GetInstance().SwitchScreenState(this.vocabState, true);
        }
        else {
            //AlertDialog.show(this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_MESSAGE"), this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_TITLE"),true);
            this._model.showMdlAlertDialog(this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_MESSAGE"), this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_TITLE"), true);
        }
    }

    private wordlistDataError = (event:WordlistEvent) => {
        event.target.removeEventListener(WordlistEvent.WORDLIST_DATA_RECEIVED, this.wordlistDataReceived);
        event.target.removeEventListener(WordlistEvent.WORDLIST_DATA_ERROR, this.wordlistDataError);

        UberReaderLoadingMessage.GetInstance().Hide();
        //AlertDialog.show(this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_MESSAGE"), this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_TITLE"),true);
        this._model.showMdlAlertDialog(this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_MESSAGE"), this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_TITLE"), true);
	}

    public DeleteWordlist(wordlist:ProxyWordlist):void {
       if (this._model.CurrentWordlist && (this._model.CurrentWordlist.Wordlist_id == wordlist.Wordlist_id)) {
            //AlertDialog.show(this._model.GetUiTextByKey("ERR_DELETING_CURRENT_WORDLIST_MESSAGE").replace("{0}", wordlist.Name), this._model.GetUiTextByKey("ERR_DELETING_CURRENT_WORDLIST_TITLE"), true);
            this._model.showMdlAlertDialog(this._model.GetUiTextByKey("ERR_DELETING_CURRENT_WORDLIST_MESSAGE").replace("{0}", wordlist.Name), this._model.GetUiTextByKey("ERR_DELETING_CURRENT_WORDLIST_TITLE"), true);
        }
        else {
            //AlertDialog.show(this._model.GetUiTextByKey("WARNING_DELETE_WORD_LIST_MESSAGE").replace("{0}", wordlist.Name), this._model.GetUiTextByKey("WARNING_DELETE_WORD_LIST_TITLE"),
              //      false, 2, this._model.GetUiTextByKey("BTN_OK_LABEL"), this._model.GetUiTextByKey("BTN_CANCEL_LABEL"), this.deleteWordlistHandler, {wordlistToDelete:wordlist});
            this._model.showMdlConfirmDialog(this._model.GetUiTextByKey("WARNING_DELETE_WORD_LIST_MESSAGE").replace("{0}", wordlist.Name), this._model.GetUiTextByKey("WARNING_DELETE_WORD_LIST_TITLE"),
                this._model.GetUiTextByKey("BTN_CANCEL_LABEL"), this._model.GetUiTextByKey("BTN_OK_LABEL"), this.deleteWordlistHandler, {wordlistToDelete:wordlist});
        }
    }

    private deleteWordlistHandler = (event:ClosePopUpEvent) => {
        if(event.target)
            event.target.removeEventListener(event.type, this.deleteWordlistHandler);
        if (event.detail == ClosePopUpEvent.OK) {
            try {
                var wordlist:ProxyWordlist = event.Params.wordlistToDelete;
                UberReaderLoadingMessage.GetInstance().Show(this._model.GetUiTextByKey("STAT_DELETE_WORDLIST"), false);
                this._model.DeleteCustomWordlist(wordlist.Wordlist_id, this.wordlistDeleted, this.wordlistDeleteError);
            }
            catch(Error) {
                //AlertDialog.show(this._model.GetUiTextByKey("ERR_DELETING_TEXT_LIST_MESSAGE"), this._model.GetUiTextByKey("ERR_DELETING_TEXT_LIST_TITLE"), true, 2,
                  //  this._model.GetUiTextByKey("BTN_TRY_AGAIN"), this._model.GetUiTextByKey("BTN_CANCEL_LABEL"), this.deleteWordlistHandler);
                this._model.showMdlConfirmDialog(this._model.GetUiTextByKey("ERR_DELETING_TEXT_LIST_MESSAGE"), this._model.GetUiTextByKey("ERR_DELETING_TEXT_LIST_TITLE"),
                    this._model.GetUiTextByKey("BTN_CANCEL_LABEL"), this._model.GetUiTextByKey("BTN_TRY_AGAIN"), this.deleteWordlistHandler);
            }
        }
    }

    private wordlistDeleted = (event:UberApplicationEvent) => {
        event.target.removeEventListener(UberApplicationEventTypes.WORDLIST_DELETED, this.wordlistDeleted);
        event.target.removeEventListener(UberApplicationEventTypes.WORDLIST_DELETE_ERROR, this.wordlistDeleteError);
        UberReaderLoadingMessage.GetInstance().Hide();
        this.UpdateUserWordlists();
    }

    private wordlistDeleteError = (event:UberApplicationEvent) => {
        event.target.removeEventListener(UberApplicationEventTypes.WORDLIST_DELETED, this.wordlistDeleted);
        event.target.removeEventListener(UberApplicationEventTypes.WORDLIST_DELETE_ERROR,this.wordlistDeleteError);
        UberReaderLoadingMessage.GetInstance().Hide();
        //AlertDialog.show("Error deleting wordlist.", this._model.GetUiTextByKey("ERR_DELETING_WORDLIST_TITLE"), true);
        this._model.showMdlAlertDialog("Error deleting wordlist.", this._model.GetUiTextByKey("ERR_DELETING_WORDLIST_TITLE"), true);
    }

    public UpdateUserWordlists():void {
        if(this._model.CurrentUserData){
            this.userWordlists = this._model.GetUserProxyWordlists();
            this.userWordlists.push({Name: 'Create New', forceHideIcon: true});
            SideMenu.GetInstance().userWordlists = this.userWordlists;
        }
    }

    private NewWordsAddedNotification = (event:NewWordsAddedToListEvent) => {
        if (this._model.CurrentWordlist) {
            this.numOfUnviewedWords = this._model.GetUnseenWords(this._model.CurrentWordlist.Wordlist_id);
        }
        else {
            this.numOfUnviewedWords = parseInt(this._model.GetUserPref('num_of_unviewed_words')) + event.numOfNewWordsAdded;
        }
        this._model.UpdateUserPref('num_of_unviewed_words', this.numOfUnviewedWords.toString(), true);
        UberReader.GetInstance().UpdateStatus();
    }

    public Restart():void
    {
        //this.profilePicture = AppSettings.GetAssetLocation() + "assets/icon/profile_32_filled.svg";
        this.profilePicture = this.isDesktopToolbar ? this.profilePictureDesktop : this.profilePictureWeb;
        this.profileButtonLabel = "Sign In";
        this.showDoTestNowPrompt = false;
        this.repeatTest = false;
        this._model.TestDispatched = false;
        this.gameExerciseService.dispose();
        this.gameExerciseService.addNewUserEvent();
    }

    showRightDrawerHandler():void {
        this.showRightDrawer.emit();
    }

    public breadcrumb_clickHandler(breadcrumb: any) {
        console.log('breadcrumb_clickHandler: ', breadcrumb);
        let data = breadcrumb.data;
        if (data) {
            this.router.navigate([ { outlets: { recommendOutlet: null, primary: data } } ]);
        }
    }

    public addBreadcrumbSeparator(idx: number): string {
        return idx < this.breadcrumbs.length - 1 ? ' > ' : '';
    }

    private doTestNow = (event: NewTypingTestEvent) => {
        if (event.type == NewTypingTestEvent.ACTIVE_TYPING_TEST) {
            this.showDoTestNowPrompt = true;
        }
        else if (event.type == NewTypingTestEvent.REPEAT_TYPING_TEST) {
            let result: UserTypingTestResult = this._model.GetResultByID(this._model.GetCurrentTypingTest().TypingTestId);
            this.remainingAttempts = this._model.GetCurrentTypingTest().AllowedAttempts - result.Attempts;

            //If user's attempts has exceeded the allowed number of attempts, force the user to do the test
            if (this.remainingAttempts <= 0) {
                this.showTestDialog();
            }
            else {
                this.repeatTest = true;
            }
        }
        else if (event.type == NewTypingTestEvent.FORCE_START_TYPING_TEST) {
            this.showTestDialog();
        }
    }

    public showTestDialog(): void {
        this.showDoTestNowPrompt = false;
        this.repeatTest = false;

        /* let typingTestDialog = this.mdlDialogService.showCustomDialog({
            component: RecommendGoalsDialog,
            providers: [{provide: 'dialogType', useValue: 'typingTest'}, {provide: "typingTaskId", useValue: AppSettings.RecommendGoalsActivityId}],
            isModal: true,
            clickOutsideToClose: false
        });

        typingTestDialog.subscribe((dialogRef) => {
            this._model.CurrentMdlDialogRef = dialogRef;
            dialogRef.onHide().subscribe((attemptsRemaining: number) => {
                this.activityService.pause(false);
                this._model.CurrentMdlDialogRef = null;
                let result: UserTypingTestResult = this._model.GetResultByID(this._model.GetCurrentTypingTest().TypingTestId);

                if (attemptsRemaining > 0) {
                    this.remainingAttempts = attemptsRemaining;
                    this.showDoTestNowPrompt = false;
                    this.repeatTest = true;
                }
                else {
                    if (result && result.Speed == null && result.Accuracy == null) {
                        this.showDoTestNowPrompt = true;
                    }
                    else {
                        this.endTest();
                    }
                }
            });
        }); */
    }

    public endTest(): void {
        this.showDoTestNowPrompt = false;
        this.repeatTest = false;
        this._model.TestDispatched = false;
    }

    /***
     * admin classes view search function
     * october 2019: moved back to admin */

    public goToTypesyCommunity(): void {
        this.urlLoaderService.OpenUrlNewWindow("https://community.typesy.com");
    }

    public openSupport(): void {
        //this.urlLoaderService.OpenUrlNewWindow(this._model.CurrentProduct.HelpFile);
        this.router.navigate([ { outlets: { recommendOutlet: null, primary: ['admin', 'support'] } } ]);
    }

    public submitBug(): void {
        this.matDialog.open(FeedbackDialog, {
            width: '650px'
        });
    }

    public updateMiniOdometer(): void {
        if (this.miniOdometer) {
            this.currentLevel = this.userStatusService.update().currentLevel.Name.toLowerCase();
            this.successStatus.UpdateStatusPoints();
            setTimeout(() => {
                this.miniOdometer.nativeElement.innerHTML = this._model.UserStatusPoints;
            }, 1000);
        }
        else {
            this.externalResourceLoader.LoadOdometerFiles();
        }
    }

    public openPreferences(): void {
        this.btnAppSettings.nativeElement.blur();
        if (!this.activityService.ActivityIsPaused) {
            this.activityService.pause(true);
        }

        this.matDialog.open(PreferencesDialog, {
            width: '500px',
            height: '550px',
            panelClass: 'preferences-dialog',
            disableClose: true
        });
    }

    public skipToNextRecommendedActivity(): void {
        this.activityService.skipToNextRecommendedActivity.next();
    }

    /*
    public previousCourseActivity():void {
        let userCourse = this._model.CurrentUserCourse;
        console.log("prev: ");
        console.log(this._model.CurrentUserCourse);
        let courseName = userCourse.course.Course_name.toLowerCase().replace(' ', '-');
        let currentStep = userCourse.Sequence_upto;

        if(--currentStep >= 0) {
            userCourse.Sequence_upto--;
            let stepNumber = userCourse.Sequence_upto + 1;
            this.router.navigate(['/courses', courseName], {queryParams: {step : stepNumber}});
        }
    }

    public nextCourseActivity():void {
        let userCourse = this._model.CurrentUserCourse;
        console.log("next: ");
        console.log(this._model.CurrentUserCourse);
        let courseName = userCourse.course.Course_name.toLowerCase().replace(' ', '-');
        let currentStep = userCourse.Sequence_upto;

        if(++currentStep < userCourse.course.Course_Activities.length) {
            userCourse.Sequence_upto++;
            let stepNumber = userCourse.Sequence_upto + 1;
            this.router.navigate(['/courses', courseName], {queryParams: {step : stepNumber}});
        }
    }*/
}
