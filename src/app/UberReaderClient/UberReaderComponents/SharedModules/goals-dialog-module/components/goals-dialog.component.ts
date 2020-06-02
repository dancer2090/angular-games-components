import { Component, OnInit, ComponentRef, ComponentFactoryResolver, Inject } from '@angular/core';
import { ParentDialog } from 'app/UberReaderClient/UberReaderComponents/Dialogs/ParentDialog';
import { Group } from 'app/UberReaderData/DataClasses/db/Group';
import { DictionaryString } from 'app/UberReaderData/Utils/Dictionary';
import { Activity } from 'app/UberReaderData/DataClasses/db/Activity';
import { UberApplication } from 'app/UberReaderData/UberApplication';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MdlDialogService } from '@angular-mdl/core';
import { ProductInfo } from 'app/UberReaderData/DataClasses/db/ProductInfo';
import { StringUtils } from 'app/UberReaderData/Utils/StringUtils';
import { AppSettings } from 'app/UberReaderData/AppSettings';
import { UberReader } from 'app/UberReaderClient/UberReader';


@Component({
    selector: 'goals-dialog',
    styleUrls: ['./goals-dialog.component.css'],
    templateUrl: './goals-dialog.component.html'
})
export class GoalsDialog extends ParentDialog implements OnInit {
    public goal1Name: string;
    public goal1Value: number;
    public goal1Description: string;
    public goal1MaxValue: number = 100;
    public goal1MinValue: number = 0;

    public goal2Name: string;
    public goal2Value: number;
    public goal2Description: string;
    public goal2MaxValue: number = 100;
    public goal2MinValue: number = 0;

    public recommendGoals:boolean = false;
    public userDisplayName:string = "";
    public instructionText:string = "";
    public classData: Group;
    public bulkSetting: boolean = false; 

    private componentRef:ComponentRef<any>;
    private activityRef:any;
    private methodArgsStart:DictionaryString<string> = {};
    private activity:Activity;
    private model: UberApplication;

    constructor(public dialogRef: MatDialogRef<GoalsDialog>, private matDialog: MatDialog, private resolver:ComponentFactoryResolver,
        private mdlDialogService:MdlDialogService,
        @Inject(MAT_DIALOG_DATA) data: any,
        /* @Inject('data') classData: Group, @Inject('bulkSetting') bulkSetting: boolean */) {
        super(dialogRef);
        this.model = UberApplication.GetInstance();
        if (data.classData) this.classData = data.classData;
        this.bulkSetting = data.bulkSetting;
    }

    ngOnInit() {
        this.Init();
    }

    public Init(): void {
        if (this.classData) {
            this.instructionText = "Please set the goals for " + this.classData.Group_name + " and press SET to save.";
        }
        else if (this.bulkSetting) {
            this.instructionText = "Please set the goals for the selected classes and press SET to save.";
        }
        else {
            this.instructionText = "Please set your typing goals. If you’re unsure, just press SET to use the defaults, and you can always change them later.";
        }

        this.userDisplayName = this.model.CurrentUserData.DisplayName;
        let product: ProductInfo = this.model.CurrentProduct;
        this.goal1Name = StringUtils.substitute(this.model.GetUiTextByKey("LBL_GOAL_NAME_BLOCK"), product.Goal_1_name, product.Goal_1_unit);
        this.goal1Description = product.Goal_1_desc;

        if (product.Goal_1_max > 2000) {
            this.goal1MaxValue = product.Goal_1_max;
            this.goal1MinValue = product.Goal_1_min;
            //goal1Slider.maximum = 100;
            //goal1Slider.minimum = 0;
            //goal1Slider.snapInterval = 1;
        }
        else {
            this.goal1MaxValue = product.Goal_1_max;
            this.goal1MinValue = product.Goal_1_min;
        }

        if (this.model.CurrentUserData.Goal_1) {
            this.goal1Value = this.model.CurrentUserData.Goal_1;
            /*if(usingLinearSliderForGoal1)
            {
                CreateLinearSlider(this.model.CurrentUserData.Goal_1.Value());
            }
            else
            {
                goal1Slider.value = this.model.CurrentUserData.Goal_1.Value();
            }*/
        }
        else {
            this.goal1Value = product.Goal_1_default;
            /*if(usingLinearSliderForGoal1)
            {
                CreateLinearSlider(product.Goal_1_default.Value());
            }
            else
            {
                goal1Slider.value = product.Goal_1_default.Value();
            }*/
        }

        if (product.Goal_2_default) {
            this.goal2Name = StringUtils.substitute(this.model.GetUiTextByKey("LBL_GOAL_NAME_BLOCK"), product.Goal_2_name, product.Goal_2_unit);
            this.goal2Description = product.Goal_2_desc;
            if (this.model.CurrentUserData.Goal_2) {
                this.goal2Value = this.model.CurrentUserData.Goal_2;
                this.goal2MaxValue = product.Goal_2_max;
                this.goal2MinValue = product.Goal_2_min;
            }
            else {
                this.goal2Value = product.Goal_2_default;
                this.goal2MaxValue = product.Goal_2_max;
                this.goal2MinValue = product.Goal_2_min;
            }
        }
        else {
            //g2DescTextBlock.visible = goal2Container.visible = goal2Slider.visible = false;
            //g2DescTextBlock.includeInLayout = goal2Container.includeInLayout = goal2Slider.includeInLayout = false;
        }
    }

    public setGoals(): void {
        if (this.model.CurrentProduct.Goal_1_default != null || this.model.CurrentProduct.Goal_2_default != null) {
            this.model.SetGoalsTarget(this.goal1Value, this.goal2Value);
        }
        this.closeDialog({speed: this.goal1Value, accuracy: this.goal2Value});
    }

    public recommend(): void {
        if(!this.model.CurrentUser.Is_trial || this.model.IsTrialActivityEnabled(AppSettings.RecommendGoalsActivityId)) {
            this.closeDialog();
        }
        else {
            UberReader.GetInstance().ActivateAccount();
            this.closeDialog();
            return;
        }
    }

    public dispose(): void { }
}