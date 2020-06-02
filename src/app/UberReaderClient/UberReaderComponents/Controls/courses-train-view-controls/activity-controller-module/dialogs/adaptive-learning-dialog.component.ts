import { Component, Inject, OnInit } from '@angular/core';
import { ParentDialog } from 'app/UberReaderClient/UberReaderComponents/Dialogs/ParentDialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClosePopUpEvent } from '../../../../../../UberReaderData/Events/ClosePopUpEvent';

@Component({
    selector: 'adaptive-learning-dialog',
    styleUrls: ['./adaptive-learning-dialog.component.css'],
    templateUrl: './adaptive-learning-dialog.component.html'
})
export class AdaptiveLearningDialog extends ParentDialog {
    public userSpeed: number;
    public userAccuracy: number;
    public requiredSpeed: number;
    public requiredAccuracy: number;
    public forceRepeat: boolean;

    constructor(public dialogRef: MatDialogRef<AdaptiveLearningDialog>,
                @Inject(MAT_DIALOG_DATA) data: any) {
        super(dialogRef);
        this.userSpeed = data.speed;
        this.userAccuracy = data.accuracy;
        this.requiredSpeed = data.requiredSpeed;
        this.requiredAccuracy = data.requiredAccuracy;
        this.forceRepeat = data.forceRepeat;
    }

    public redoActivity(): void {
        this.closeDialog(new ClosePopUpEvent(ClosePopUpEvent.CLOSE, ClosePopUpEvent.OK));
    }

    public continueNextActivity(): void {
        this.closeDialog(new ClosePopUpEvent(ClosePopUpEvent.CLOSE, ClosePopUpEvent.CANCEL));
    }
}