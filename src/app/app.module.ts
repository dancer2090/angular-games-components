import { BuildSettings } from './UberReaderClient/BuildSettings';
import BugsnagErrorHandler from 'bugsnag-angular'
import bugsnag from 'bugsnag-js'

export const bugsnagClient = bugsnag({
  apiKey: '3599c4745b1611fe693637f78c958a24',
  //apiKey: '5602f8b2f59272e887e914ab1006d321',
  appVersion: BuildSettings.ClientVersion
})

export function errorHandlerFactory() {
  return new BugsnagErrorHandler(bugsnagClient)
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UberApplication } from './UberReaderData/UberApplication';
import { AppComponent } from './app.component';
import { TypesyRoutingModule } from './typesy-routing.module';
import { SharedComponentsModule } from './UberReaderClient/UberReaderComponents/SharedModules/shared-components-module/shared-components.module';
import { UberDataAccessRemoteService } from './UberReaderData/UberDataAccess/uber-data-access-remote.service';
import { HtmlService } from './UberReaderData/Utils/Services/HtmlService';
import { HeapService } from './UberReaderData/Utils/Services/HeapService';
import { UberReader } from './UberReaderClient/UberReader';
import { GameExerciseService } from './services/game-exercise.service';
import { NavigationBar } from './UberReaderClient/NavigationBar';
import { SideMenu } from './UberReaderClient/SideMenu';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { CreateUserControl } from './UberReaderClient/UberReaderComponents/Controls/CreateUserControl';
import { PasswordChange } from './UberReaderClient/UberReaderComponents/Controls/PasswordChange';
import { UberReaderLoadingMessage } from './UberReaderClient/UberReaderComponents/Dialogs/UberReaderLoadingMessage';
import { PasswordChangeDialog } from './UberReaderClient/UberReaderComponents/Dialogs/PasswordChangeDialog';
import { LoginDialog2 } from './UberReaderClient/UberReaderComponents/Dialogs/LoginDialog2';
import { PreloadSelectedModulesList } from './PreloadSelectedModulesList';
import { HistoryNavigation } from './UberReaderData/uber.navigation.service';
import { ActivityService } from './UberReaderActivities/activity.service';
// import * as $ from 'jquery';
import { ConfirmDialog } from './UberReaderClient/UberReaderComponents/Dialogs/ConfirmDialog';
import { MatSnackBarDialog } from './UberReaderClient/UberReaderComponents/Dialogs/MatSnackBarDialog';
import { UserMenuDialogsModule } from './UberReaderClient/UberReaderComponents/Dialogs/shared-dialogs/user-menu-dialogs/user-menu-dialogs.module';
import { ExternalResourceLoaderService } from './UberReaderClient/UberReaderComponents/SharedModules/shared-components-module/services/ExternalResourceLoader.service';
import { UrlLoaderService } from './UberReaderClient/UberReaderComponents/SharedModules/shared-components-module/services/UrlLoader.service';
import { PrintService } from './UberReaderClient/UberReaderComponents/SharedModules/shared-components-module/services/Print.service';
import { TrialLoginModule } from './UberReaderClient/UberReaderComponents/Controls/TrialControl/trial-login.module';
import { Media } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from 'ionic-angular';
import { ExportService } from './UberReaderClient/UberReaderComponents/SharedModules/shared-components-module/services/export.service';
import { BackgroundUploadComponent } from './background-upload/background-upload.component';
import { DocumentPicker } from '@ionic-native/document-picker/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ExternalLinkModule } from './UberReaderClient/UberReaderComponents/SharedModules/external-link-module/external-link.module';
import { PreloaderModule } from './UberReaderClient/UberReaderComponents/SharedModules/preloader-module/preloader.module';
import { ResourceLocationModule } from './UberReaderClient/UberReaderComponents/SharedModules/resource-location-module/resource-location.module';
import { MdlModule } from '@angular-mdl/core';
import { MdlPopoverModule } from '@angular-mdl/popover';
import { MdlSelectModule } from '@angular-mdl/select';
import { MatDialogModule, MatButtonModule, MatMenuModule, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { SafeResourceUrlPipe } from './UberReaderClient/UberReaderComponents/SharedModules/shared-components-module/pipes/SafeResourceUrlPipe';
import { GoalsDialogModule } from './UberReaderClient/UberReaderComponents/SharedModules/goals-dialog-module/goals-dialog.module';
import { GamesViewModule } from './UberReaderClient/UberReaderComponents/Controls/courses-train-view-controls/games-module/games-view.module';
import { RouterModule } from '@angular/router';
import { TypesyRouteGuardService } from './typesy-route-guard.service';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
import { ExercisesDialogModule } from './UberReaderClient/UberReaderComponents/SharedModules/exercises-dialog-module/exercises-dialog.module';
import { AddWebUrlTextDialogModule } from './UberReaderClient/UberReaderComponents/SharedModules/add-web-url-text-dialog-module/add-web-url-text-dialog.module';
import { CachedData } from './UberReaderData/UberDataAccess/CachedData';
import { AppRoutingModule } from './app-routing.module';
import { PrepEdSharedComponentsModule } from './UberReaderClient/UberReaderComponents/SharedModules/preped-shared-components-module/preped-shared-components.module';
import { PrepEdDiscoverViewModule } from './UberReaderClient/UberReaderComponents/Controls/PrepEdControls/DiscoverView/preped-discover-view.module';
import { VocabSharedDialogsModule } from './UberReaderClient/UberReaderComponents/Dialogs/vocab-shared-dialogs/vocab-shared-dialogs.module';
import { PrepEdSharedDialogsModule } from './UberReaderClient/UberReaderComponents/Dialogs/preped-shared-dialogs/preped-shared-dialogs.module';
import { PrepEdDialogService } from './UberReaderClient/UberReaderComponents/Controls/PrepEdControls/PrepView/Services/PrepEdDialogService';
import { VocabSharedDialogsService } from './UberReaderClient/UberReaderComponents/Dialogs/vocab-shared-dialogs/vocab-shared-dialogs.service';
import { SuccessStatusModule } from './UberReaderClient/UberReaderComponents/Controls/home-view-controls/success-status-section/success-status.module';

declare var $:any;

window["$"] = $;
window["jQuery"] = $;

@NgModule({
  declarations: [
    AppComponent,
    UberReader,
    NavigationBar,
    SideMenu,
    UberReaderLoadingMessage,
    CreateUserControl,
    ConfirmDialog,
    MatSnackBarDialog,
    PasswordChangeDialog,
    LoginDialog2,
    PasswordChange,
    BackgroundUploadComponent,
    SafeResourceUrlPipe

  ],
  entryComponents: [
    ConfirmDialog,
    MatSnackBarDialog,
    PasswordChangeDialog,
    LoginDialog2

  ],
  imports: [
    SuccessStatusModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    Ng2PageScrollModule.forRoot(),
    SharedComponentsModule,
    MdlModule,
    MdlPopoverModule,
    MdlSelectModule,
    ExternalLinkModule,
    PreloaderModule,
    ResourceLocationModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatSnackBarModule,
    RouterModule,
    VocabSharedDialogsModule,

    TypesyRoutingModule,
    UserMenuDialogsModule,
    GoalsDialogModule,
	  //TrialLoginModule,
    ExercisesDialogModule,
    AddWebUrlTextDialogModule,
    //GamesLibraryModule
    //END LINE FOR TYPESY MODULES
  ],
  providers: [
    UberApplication,
    TypesyRouteGuardService,
    VocabSharedDialogsService,
    //PrepEdDialogService,
    CachedData,
    UberDataAccessRemoteService,
    HtmlService,
    ExternalResourceLoaderService,
    HeapService,
    PreloadSelectedModulesList,
    HistoryNavigation,
    /* TYPESY SERVICES */
    ActivityService,
    /* GamesLibraryService, */
    UrlLoaderService,
    PrintService,
    GameExerciseService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000} },
    !BuildSettings.isLocalBuild ? { provide: ErrorHandler, useFactory: errorHandlerFactory } : [],
    InAppPurchase,
    //Media,
    //File,
    //FileTransfer,
    //FileOpener,
    //DocumentPicker,
    //ImagePicker
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
