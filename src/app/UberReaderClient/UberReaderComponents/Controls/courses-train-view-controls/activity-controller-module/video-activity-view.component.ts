import { Component, OnDestroy, ViewChild, EventEmitter, Output } from '@angular/core';
import { Activity } from '../../../../../UberReaderData/DataClasses/db/Activity';
import { AppSettings } from '../../../../../UberReaderData/AppSettings';
import { UberReader } from '../../../../UberReader';

@Component({
    selector: 'video-activity-view',
    styleUrls: ['./video-activity-view2.component.css'],
    template: `
       <div id="activityWrapper"> 
       <div id="activityMainContainer"> 
            <!--mdl-card class="card--activity card--transparent" [class.hide]="maximize">
               <div style="height: 100%;">
              
                        <section class="section--card mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">											
                           							  			
                                <div class="left-section mdl-cell">              							
                                    <div class="bottom-row-card mdl-card">
                                        <div class="title-container">
                                            <div class="mdl-typography--display-1 title-div">{{ videoTitle }}</div>
                                            <br/>             									    
                                        </div>
                                    </div>
                                </div>										  		
                                <div class="right-section mdl-cell">												
                                    <div class="bottom-row-card mdl-card">
                                        <div class="content-container-top">
                                            <img src="{{ videoLessonImage }}" class="video-img"/>
                                        </div>
                                    </div>
                                </div>										  		
                            
                        </section>
             
                        <section class="section--card mdl-grid mdl-grid--no-spacing mdl-shadow--2dp tmargin">
                           
                                <div class="left-section mdl-cell">
                                    <div class="bottom-row-card mdl-card">             									    
                                        <div class="title-container">
                                            <img src="{{ videoScreenshot }}" class="video-ss"/>
                                            <div style="text-align: center;">
                                            <button mdl-button mdl-button-type="raised" mdl-ripple mdl-colored="accent" class="button--secondary" (click)="goFullScreen()">
                                                    <i class="material-icons">play_circle_outline</i>	Click here (or press spacebar) to play video
                                                </button>

                                             
                                            </div>
                                        </div>
                                    </div>
                                </div>                            
                                <div class="right-section mdl-cell">
                                    <div class="bottom-row-card mdl-card">
                                        <div class="content-container">
                                            <div class="content-inner">
                                                <div class="content-inner" #videoLessonText></div>
                                            </div>             									    		
                                            <button *ngIf="!isPublic" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored="accent" class="button--primary button--primary-courseRunner" (click)="finished.emit()">
                                                <span id="lblBtn">Continue</span><i class="material-icons">arrow_forward</i>
                                            </button>
                                        </div>
                                    </div>
                                </div>										  		
                         
                        </section>
                 
                </div>
            </mdl-card-->

            <mdl-card *ngIf="useMultimediaScreen" class="card--activity mdl-shadow--2dp" [class.hide]="maximize">
               	  <div class="mdl-grid section--top-column" style="">
      					<div class="mdl-cell mdl-cell--12-col" style="height: 100%;">
      						
      							<div class="mdl-grid " style="width: 100%; padding: 0px; box-sizing: border-box; height: 100%;">
      								<div class="mdl-cell mdl-cell--5-col section--wrap" >
      									<div id="wrap--video-ss" (click)="goFullScreen()">
      									<div id="wrap--video-ss-overlay">
      										<i class="material-icons">play_circle_outline</i><br/>
      											Click here (or press spacebar) to play video 
      									</div>
      									<img src="{{ videoScreenshot }}" class="video-ss"/>
      									</div>
      								</div>
      								<div class="mdl-cell mdl-cell--7-col section--wrap">
      									<img src="{{ videoLessonImage }}" class="video-img"/>
      								</div>
      							</div>
      					</div>
      				</div>
           
           			<div class="mdl-grid section--top-bottom" >
      					<div class="mdl-cell mdl-cell--12-col" style="height: 100%;">
      						
      							
      									<div _ngcontent-grt-c10="" class="mdl-typography--display-1 title-div">{{ videoTitle }}</div>
      								
      								
      						   <div class="content-inner" #videoLessonText></div>
      						
      						<div class="container--button-action">
									 <!--button *ngIf="!isPublic" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored="accent" class="button--primary button--primary-courseRunner" (click)="finished.emit()">
                                                <span id="lblBtn">Continue</span><i class="material-icons">arrow_forward</i>
                                     </button-->

                                     <button *ngIf="!isPublic" mat-raised-button class="button--primary button--primary-courseRunner" (click)="finished.emit()">
                                        <span id="lblBtn">Continue</span><i class="material-icons">arrow_forward</i>
                                     </button>
							</div>		
      					</div>
      					
      				</div>
            </mdl-card>

            <mdl-card mdl-shadow="2" class="card--activity" [class.card--activity-full]="!useMultimediaScreen || maximize" [class.hide]="useMultimediaScreen && !maximize">
                <button *ngIf="useMultimediaScreen" class="x-button close" (click)="minimize()" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored>
                    <mdl-icon>close</mdl-icon>   
                </button>
                <div id="activityVideoWrap">
                    
                </div>
              
            </mdl-card>
            </div>
            </div>
    `
})
export class VideoActivityView implements OnDestroy {
    @ViewChild('videoLessonText', { static: false }) videoLessonText:any;    
    @Output() finished = new EventEmitter;

    private currentActivity: Activity;
    private videoPlayTimeout: any;

    public videoLessonImage: string = "";
    public useMultimediaScreen: boolean = false;
    public maximize:boolean = false;
    public videoTitle:string = "";
    public videoScreenshot: string = "";
    public localFailed: boolean = false;
    public tryLocal: boolean = false;
    public isPublic: boolean = false;

    constructor() {
    }
    
    ngAfterViewInit() {
    }

    public Init(activity: Activity, videoTitle:string): void {
        console.log('VideoActivityView INIT()');
        this.currentActivity = activity;
        this.videoTitle = videoTitle;
        UberReader.GetInstance().titleHeader = this.videoTitle;
        this.useMultimediaScreen = this.currentActivity.Display_multimedia_screen == null? false : this.currentActivity.Display_multimedia_screen;
        this.localFailed = false;
        //console.log("use new vid screen? " + this.useMultimediaScreen);
        setTimeout(this.setUpScreen, 0);
    }

    public Init2(activity: Activity, videoTitle:string) { // initialization for public display of activity - used in nearpod integration
        this.isPublic = true;
        this.Init(activity, videoTitle);
    }

    private setUpScreen = () => {
        if(this.useMultimediaScreen) {
            this.videoLessonText.nativeElement.innerHTML = this.currentActivity.Video_lesson_text != null ? this.currentActivity.Video_lesson_text : "";
            this.videoLessonImage = this.currentActivity.Video_lesson_image != null ? AppSettings.getVideoLocationURLByType(AppSettings.WEB_MEDIA) + this.currentActivity.Video_lesson_image : "";
            this.videoScreenshot = this.currentActivity.Video_lesson_screenshot != null ? AppSettings.getVideoLocationURLByType(AppSettings.WEB_MEDIA) + this.currentActivity.Video_lesson_screenshot : "";
        }
        
        let url: string;
        let localUrl: string;
        //let useAdaptive: boolean = false;
        // if available try to load locally first and then load from web aserver if it failed
        
        //if (!this.localFailed && this.tryLocal) {
            let quality: string = "high";
            let dllName = this.currentActivity.Dll_name;            
            let extensionIndex: number = dllName.lastIndexOf('.');
            let caption = AppSettings.GetAssetLocation() + 'assets/captions/' + dllName.substring(0, extensionIndex) + '.vtt';
            console.log('dllName. ', dllName, caption);
            let extension: string = dllName.substr(extensionIndex);
            localUrl = dllName.replace(extension, "_" + quality + extension);
            localUrl = AppSettings.getVideoLocationURLByType(AppSettings.LOCAL_MEDIA) + localUrl;
        //}
        //if (url == null) {
            let useAdaptive = this.currentActivity.Adaptive_streaming_url != null;
            let nonAdaptiveVideo;
            nonAdaptiveVideo = dllName.replace(extension, "_" + quality + extension);
            nonAdaptiveVideo = AppSettings.getVideoLocationURLByType(AppSettings.WEB_MEDIA) + nonAdaptiveVideo;
            //nonAdaptiveVideo = 'http://techslides.com/demos/sample-videos/small.mp4';            
            if (useAdaptive) {
                url = this.currentActivity.Adaptive_streaming_url;
                console.log("adaptive streaming url: " + url);
            }
            else {
                //let quality: string = "high"; // TO DO!!! UberReaderAccessor.GetUberReader().GetVideoQuality();
                //let dllName = this.currentActivity.Dll_name;
                //let extensionIndex: number = dllName.lastIndexOf('.');
                //let extension: string = dllName.substr(extensionIndex);
                /* url = dllName.replace(extension, "_" + quality + extension);
                url = AppSettings.getVideoLocationURLByType(AppSettings.WEB_MEDIA) + url; */
                url = nonAdaptiveVideo;
            }
        //}
        
    }

    public videoReady() {
    }

    // if it was trying to laod locally and failed, then repeat but load from server
    public videoLoadError() {
        console.log('videoLoadError videoLoadError.');
        if (!this.localFailed)
        {
            this.localFailed = true;
            this.setUpScreen();
        }
        else
        {
            // display some kind of error
        }
    }

    public videoPlayed(played:boolean): void {
        if(played) {            
            this.maximize = true;
        }
    }

    public Pause(): void {
    }

    public minimize(): void {
        if (this.maximize) {
            clearTimeout(this.videoPlayTimeout);
            this.Pause();
            this.maximize = false;
        }
    }

    public goFullScreen(): void {        
        this.videoPlayTimeout = setTimeout(() => {
            this.maximize = true;
        }, 200);
    }

    private pause: boolean = false;
    public toggleVideo(): void {
        if (!this.maximize) {
            this.goFullScreen();
        }
    }

    public finishVideo(): void {
        this.Pause();
        this.pause = false;
        this.maximize = false;
        this.finished.emit();
    }

    ngOnDestroy(): void {
        clearTimeout(this.videoPlayTimeout);
        try {
            console.log("video destroyed");
        }
        catch (e) {
            console.log("Error on video destroy");
        }
    }
}