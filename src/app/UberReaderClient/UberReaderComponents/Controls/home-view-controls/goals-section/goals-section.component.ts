import { Component, ViewChild, OnInit, ElementRef, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { SemiCircleProgressbar } from './semi-circle-progressbar/semi-circle-progressbar.component';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { ProductInfo } from '../../../../../UberReaderData/DataClasses/db/ProductInfo';
import { Result } from '../../../../../UberReaderData/DataClasses/db/Result';
import { SemiCircleProgressbar2 } from './semi-circle-progressbar/semi-circle-progressbar2.component';
import { UberReader } from '../../../../UberReader';
import { UserSettingSyncEvent } from '../../../../../UberReaderData/Events/UserSettingSyncEvent';
import { TypesyPublicProfile } from '../../../../../UberReaderData/DataClasses/db/TypesyPublicProfile';
import { ExternalResourceLoaderService } from '../../../SharedModules/shared-components-module/services/ExternalResourceLoader.service';
import { Subscription } from 'rxjs';

declare var google;

@Component({
    selector: 'goals-section',
    styleUrls: ['./goals-section.component.css'],
    templateUrl: './goals-section.component.html'
})
export class GoalsSection implements AfterViewInit, OnDestroy {
    //@ViewChild('currentSpeed') currentSpeed: SemiCircleProgressbar;
    //@ViewChild('targetSpeed') targetSpeed: SemiCircleProgressbar;
    //@ViewChild('speedDial') speedDial: SemiCircleProgressbar2;
    //@ViewChild('accuracyDial') accuracyDial: SemiCircleProgressbar2;
    @ViewChild('odometer', { static: true }) odometer: ElementRef;
    @ViewChild('speedChartDiv', { static: true }) speedChartDiv: ElementRef;
    @ViewChild('accuracyChartDiv', { static: true }) accuracyChartDiv: ElementRef;

    private model: UberApplication;

    public currentGoal1: number = 0;
    public targetGoal1: number = 0;
    public maxTargetGoal1: number = 0;
    public currentGoal2: number;
    public targetGoal2: number;
    public maxTargetGoal2: number = 100;
    public forPublicProfile: boolean = false;

    private speedChart: any;    
    private speedChartData;    
    private speedChartOptions;
    private accuracyChart: any;
    private accuracyChartData;
    private accuracyChartOptions;
    private odometerLoader: Subscription;

    constructor(private externalResourceLoader: ExternalResourceLoaderService) {
        this.model = UberApplication.GetInstance();
        this.model.addEventListener(UserSettingSyncEvent.USER_SETTING_SYNC, this.UpdateGoals);
        
        let speedGaugeMajorTicks: number[] = [];
        for (let num: number = 0; num <= 100; num += 50) {
            speedGaugeMajorTicks.push(num);
        }

        this.speedChartOptions = {
            chartArea: { 'width': '100%', 'height': '100%' },
            max: 100,
            greenFrom: 100,
            greenTo: 100,
            majorTicks: speedGaugeMajorTicks,
            minorTicks: 5,
            fontSize: 16
        };

        let accuracyGaugeMajorTicks: number[] = [];
        for (let num: number = 0; num <= 100; num += 25) {
            accuracyGaugeMajorTicks.push(num);
        }

        this.accuracyChartOptions = {
            chartArea: { 'width': '100%', 'height': '100%' },
            max: 100,
            greenFrom: 100,
            greenTo: 100,
            majorTicks: accuracyGaugeMajorTicks,
            minorTicks: 5,
            fontSize: 16
        };
        
        this.odometerLoader = this.externalResourceLoader.LoadOdometerFiles().subscribe(() => {
            setTimeout(() => {
                if (!this.forPublicProfile) this.odometer.nativeElement.innerHTML = this.model.UserTypingCompetency;  
            }, 1000);
        });

        //google.charts.setOnLoadCallback(this.initGoogleCharts);           
    }

    ngAfterViewInit() {         
        //this.updateGaugeControls();
        this.externalResourceLoader.GetGoogleCharts(this.initGoogleCharts);
    }

    public clickMe() {
        UberReader.GetInstance().isDesktopToolbar = !UberReader.GetInstance().isDesktopToolbar;
    }

    public UpdateGoals = () => {
        let productInfo: ProductInfo = this.model.CurrentProduct;
        let useClassGoals: boolean = this.model.GetUserPref("enable_class_goals") == "True" ? true : false;
        this.maxTargetGoal1 = productInfo.Goal_1_max;

        if (productInfo.Goal_1_name != null) {
            let lastResult: Result = this.model.getLastResultForCurrentUser(productInfo.Goal_1_key);
            this.currentGoal1 = lastResult == null ? 0 : lastResult.Value;
            //console.log("current goal1: " + this.currentGoal1)

            if (useClassGoals) {
                this.targetGoal1 = parseInt(this.model.GetUserPref("class_speed_goal"));
            }
            else {
                this.targetGoal1 = this.model.CurrentUserData.Goal_1 ? this.model.CurrentUserData.Goal_1 : this.model.CurrentProduct.Goal_1_default;
            }
            this.model.CurrentUserData.Goal_1 = this.targetGoal1;
            //console.log("target goal1: " + this.targetGoal1);
        }

        if (productInfo.Goal_2_name != null) {
            let lastResult: Result = this.model.getLastResultForCurrentUser(productInfo.Goal_2_key);
            this.currentGoal2 = lastResult == null ? 0 : lastResult.Value;
            //console.log("current goal2: " + this.currentGoal2);

            if (useClassGoals) {
                this.targetGoal2 = parseInt(this.model.GetUserPref("class_accuracy_goal"));
            }
            else {
                this.targetGoal2 = this.model.CurrentUserData.Goal_2 ? this.model.CurrentUserData.Goal_2 : this.model.CurrentProduct.Goal_2_default;
            }
            this.model.CurrentUserData.Goal_2 = this.targetGoal2;
            //console.log("target goal12 " + this.targetGoal2);
        }

        //this.currentSpeed.progress(this.currentGoal1, this.targetGoal1);
        //this.targetSpeed.progress(this.targetGoal1, this.maxTargetGoal1);
        /*
        if (this.speedDial) {
            //this.speedDial.maximumValue = this.maxTargetGoal1;
            //this.speedDial.currentValue = this.currentGoal1;
            //this.speedDial.targetValue = this.targetGoal1;            
        }
        
        if (this.accuracyDial) {
            //this.accuracyDial.currentValue = this.currentGoal2;
            //this.accuracyDial.targetValue = this.targetGoal2;            
        }        
        */
       if (this.speedChartDiv && this.accuracyChartDiv) {            
            //this.model.drawTypingSpeedGauge(this.speedChartDiv, this.currentGoal1, this.targetGoal1, 100, 5, 50, 190, 190);
            //this.model.drawTypingAccuracyGauge(this.accuracyChartDiv, this.currentGoal2, this.targetGoal2, 5, 25, 190, 190);
        }

        setTimeout(() => {
            if (!this.forPublicProfile) this.odometer.nativeElement.innerHTML = this.model.UserTypingCompetency;   
        }, 1000);
        this.updateGaugeControls();
    }

    public UpdateGoals2 = (goal1Value: number, goal1Target: number, goal2Value: number, goal2Target: number, typingCompetency: number) => {
        this.forPublicProfile = true;
        
        let productInfo: ProductInfo = this.model.CurrentProduct;
        this.maxTargetGoal1 = productInfo.Goal_1_max;

        if (productInfo.Goal_1_name != null) {            
            this.currentGoal1 = goal1Value== null ? 0 : goal1Value;
            this.targetGoal1 = goal1Target ? goal1Target : this.model.CurrentProduct.Goal_1_default;         
        }

        if (productInfo.Goal_2_name != null) {
            this.currentGoal2 = goal2Value == null ? 0 : goal2Value;
            this.targetGoal2 = goal2Target ? goal2Target : this.model.CurrentProduct.Goal_2_default;         
        }

        setTimeout(() => {
            this.odometer.nativeElement.innerHTML = typingCompetency;   
        }, 1000);
        this.updateGaugeControls();
    }

    private gaugeTimeoutId: any;
    private updateGaugeControls() {        
        clearTimeout(this.gaugeTimeoutId);
        this.gaugeTimeoutId = setTimeout(() => {
            if (this.speedChart) {
                this.speedChartData.setValue(0, 1, this.currentGoal1);
                this.speedChartOptions.greenFrom = this.targetGoal1 >= 100 ? 100 : this.targetGoal1;
                this.speedChart.draw(this.speedChartData, this.speedChartOptions);                
            }
            
            if (this.accuracyChart) {
                this.accuracyChartData.setValue(0, 1, this.currentGoal2);
                this.accuracyChartOptions.greenFrom = this.targetGoal2 >= 100 ? 100 : this.targetGoal2;
                this.accuracyChart.draw(this.accuracyChartData, this.accuracyChartOptions);                
            }
        }, 100);      
    }

    private initGoogleCharts = () => {
        this.speedChartData = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['', 0],    
        ]);

        this.accuracyChartData = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['', 0],    
        ]);

        this.speedChart = new google.visualization.Gauge(this.speedChartDiv.nativeElement);
        this.accuracyChart = new google.visualization.Gauge(this.accuracyChartDiv.nativeElement);
        this.updateGaugeControls();        
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {        
        this.updateGaugeControls();            
    }    

    ngOnDestroy() {
        this.externalResourceLoader.RemoveOdometerResources();
        this.model.removeEventListener(UserSettingSyncEvent.USER_SETTING_SYNC, this.UpdateGoals);
        if (this.odometerLoader) this.odometerLoader.unsubscribe();
    }
}