import { UberReader } from '../../../../UberReader';
import { Component, ViewChild, Inject } from '@angular/core';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { AppSettings } from '../../../../../UberReaderData/AppSettings';
import { UberReaderLoadingMessage } from '../../UberReaderLoadingMessage';
import { UserAppBgImgUpdateEvent } from '../../../../../UberReaderData/Events/UserAppBgImgUpdateEvent';
import { DOCUMENT } from '@angular/common';
import { PageScrollService, PageScrollInstance } from 'ng2-page-scroll';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ParentDialog } from '../../ParentDialog';
import { MatDialogRef } from '@angular/material';
import { UserStatusService } from '../../../Controls/status-points-control/user-status.service';

@Component({
    selector: 'change-background-dialog',
    styleUrls: ['./change-background-dialog.component.css'],
    template: `
        <h3 class="mdl-typography--headline mdl-color-text--grey-800 dialog-headline">Change Background</h3>
        <button mdl-button mdl-button-type="raised" mdl-ripple class="x-button close" (click)="closeDialog()"><mdl-icon>close</mdl-icon></button>

            <div class="mdl-dialog__content">
            <div id="dialog-content">
                <div id="inner-dialog-content" #bgContainer>
                    <div id="bg-container">
                        <img id="bgImg1" class="bg-images" [src]="currentBG" [class.active]="selectedBG == 'currentBG'" (click)="selectedBG = 'currentBG'">

                        <div *ngFor="let bgImg of allTypesyBgImages; index as i" class="bgDiv" id="bgImg{{i+2}}">
                            <img class="lock-img" [class.hide]="!bgImg.disabled" src="{{ 'assets/icon/medals/avatar-' + bgImg.level.toLowerCase() + '-trophy.svg' | resourceLoc }}">
                            <img (mouseover)="onMouseOverImg(bgImg)" (mouseout)="tooltipMsg = ''" (click)="setSelectedBG(bgImg)"
                                [mdl-tooltip]="tt" class="bg-images" [class.enabled]="!bgImg.disabled" [class.disabledImg]="bgImg.disabled" [class.hide]="bgImg == ''" [class.active]="bgImg == selectedBG"
                                src="{{ 'assets/icon/background-images/' + bgImg.fileName | resourceLoc }}"/>
                        </div>

                        <mdl-tooltip #tt="mdlTooltip" [class.hide]="tooltipMsg.length == 0">{{ tooltipMsg }}</mdl-tooltip>
                        <a class="frame prev" id="prevbtn" (click)="scroll('left')"><i class="material-icons">keyboard_arrow_left</i></a>
                        <a class="frame next" id="nextbtn" (click)="scroll('right')"><i class="material-icons">keyboard_arrow_right</i></a>
                    </div>
                </div>
                <!--button mdl-button mdl-button-type="raised" mdl-ripple class="browse-btn" (click)="browseImages($event)">Browse</button-->
                <button mat-raised-button class="button--mat-secondary browse-btn" (click)="browseImages($event)">Browse</button>
            </div>
            <input #bgImageSelector type="file" height="20" (change)="bgImageSelectedFromFolders()" accept="image/*" class="hide">
            </div>
        <div class="mdl-dialog__actions">
            <!--button mdl-button mdl-button-type="raised" mdl-ripple class="green-button login-button" (click)="bgImageSelected()">Apply</button>
            <button mdl-button mdl-button-type="raised" mdl-ripple class="close" (click)="closeDialog()">Cancel</button-->

            <button mat-raised-button class="button--primary login-button" (click)="bgImageSelected()">Apply</button>
            <button mat-raised-button mdl-ripple class="button--mat-secondary close" (click)="closeDialog()">Cancel</button>
        </div>
    `,
    providers: [UserStatusService]
})
export class ChangeBackgroundDialog extends ParentDialog {
    @ViewChild('bgImageSelector', { static: true }) bgImageSelector: any;
    @ViewChild('bgContainer', { static: true }) bgContainer: any;

    private model: UberApplication;
    private bgImgIDcounter: number = 1;
    private defaultBackgroundImg: string = AppSettings.GetAssetLocation() + "assets/icon/background-images/default-bg.svg";
    private typesyBgImages: any[] = [];

    public allTypesyBgImages: any[] = [
        {displayName: 'Typesy Clouds Blue', fileName: 'default-bg.svg', level: 'Bronze'},
        {displayName: 'Typesy Clouds Green', fileName: 'typesy_clouds_green.svg', level: 'Bronze'},
        {displayName: 'Typesy Icon', fileName: 'typesy_icon.svg', level: 'Bronze'},
        {displayName: 'Balloons', fileName: 'balloons.jpg', level: 'Gold'},
        {displayName: 'Bunny', fileName: 'bunny.jpg', level: 'Platinum'},
        {displayName: 'Chess', fileName: 'chess.jpg', level: 'Gold'},
        {displayName: 'Color Paper', fileName: 'color-paper.jpg', level: 'Silver'},
        {displayName: 'Color Pencils', fileName: 'color-pencils.jpg', level: 'Silver'},
        {displayName: 'Dark Planet', fileName: 'dark-planet.jpg', level: 'Diamond'},
        {displayName: 'Geometry', fileName: 'geometry.jpg', level: 'Silver'},
        {displayName: 'Gokart', fileName: 'gokart.jpg', level: 'Gold'},
        {displayName: 'Lego', fileName: 'legos.jpg', level: 'Gold'},
        {displayName: 'Pinwheel', fileName: 'pinwheel.jpg', level: 'Silver'},
        {displayName: 'Space rocket', fileName: 'space-rocket.jpg', level: 'Platinum'},
        {displayName: 'Star burst', fileName: 'starburst.jpg', level: 'Diamond'},
        {displayName: 'Cute Teddy', fileName: 'cute-teddy.jpg', level: 'Platinum'},
        {displayName: 'Underwater', fileName: 'underwater.jpg', level: 'Platinum'},
        {displayName: 'Universe', fileName: 'universe.jpg', level: 'Diamond'},
        {displayName: 'Beige', fileName: 'beige.svg', level: 'Bronze'},
        {displayName: 'Black', fileName: 'black.svg', level: 'Bronze'},
        {displayName: 'Dark blue', fileName: 'dark-blue.svg', level: 'Bronze'},
        {displayName: 'Green', fileName: 'green.svg', level: 'Bronze'},
        {displayName: 'Grey', fileName: 'grey.svg', level: 'Bronze'},
        {displayName: 'Light blue', fileName: 'light-blue.svg', level: 'Bronze'},
        {displayName: 'Light green', fileName: 'light-green.svg', level: 'Bronze'},
        {displayName: 'Mustard', fileName: 'mustard.svg', level: 'Bronze'},
        {displayName: 'Pink', fileName: 'pink.svg', level: 'Bronze'},
        {displayName: 'Purple', fileName: 'purple.svg', level: 'Bronze'},
        {displayName: 'Red', fileName: 'red.svg', level: 'Bronze'},
        {displayName: 'Tangerine', fileName: 'tangerine.svg', level: 'Bronze'},
    ];

    public selectedBG: any;
    public currentBG: string = "";
    public tooltipMsg: string = "";

    constructor(public dialogRef: MatDialogRef<ChangeBackgroundDialog>, @Inject(DOCUMENT) private document:any,
                private pageScrollService:PageScrollService, private imagePicker: ImagePicker, private userStatusService: UserStatusService) {
        super(dialogRef);
        this.model = UberApplication.GetInstance();

        //initialize typesyBgImages here to status level available backgrounds
        this.typesyBgImages = this.userStatusService.update().currentLevel.AvailableBackgrounds.slice();
        if (this.typesyBgImages[0] != "all") {
            this.allTypesyBgImages.forEach((image) => {
                if (this.typesyBgImages.find(img => img.replace(/\r?\n|\r/g, '') == image.fileName) == null) {
                    image.disabled = true;
                }
            });
        }

        this.currentBG = this.model.GetUserPref("background_image") != "" ? this.model.GetUserPref("background_image") : this.defaultBackgroundImg;
        this.selectedBG = 'currentBG';

        //check if current background image is from defaults and remove it from the set of images
        //current background should always be displayed on the first box
        if(this.currentBG.indexOf('assets/icon/background-images/') != -1) {
            let indx: number = 0;
            for (let image of this.allTypesyBgImages) {
                if(this.currentBG.indexOf(image.fileName) != -1) {
                    console.log(image + "-" + indx);
                    this.allTypesyBgImages.splice(indx,1);
                    break;
                }
                indx++;
            }
        }
    }

    public browseImages(event: MouseEvent): void {
        console.log('browseImages: ');
        if (this.model.GetDeviceInfo().platform == 'ios' || this.model.GetDeviceInfo().platform == 'android') {
            this.iosPickBackgroundImage();
        }
        else {
            this.bgImageSelector.nativeElement.click();
        }
    }

    private iosPickBackgroundImage() {
        let pickerOptions = {
            maximumImagesCount: 1,
            outputType: 1
        }
        this.imagePicker.getPictures(pickerOptions).then((results) => {
            console.log('imagePicker uri:: ', results);
            let uri = results[0];
            let dataURL = uri;
            let idx = dataURL.indexOf("base64,");
            if (idx != -1) {
                dataURL = dataURL.substr(idx + 7);
            }
            console.log('dataURL: ', dataURL);
            UberReaderLoadingMessage.GetInstance().Show("Loading.");
            UberApplication.GetInstance().UpdateUserAppBackgroundImg(dataURL, "", this.bgImageUploaded, this.bgImageUploadError);
        }, err => console.log('errrrr: ', err));
    }

    public bgImageSelectedFromFolders(): void {
        var uploadSuccessFunction = this.bgImageUploaded;
        var uploadFailedFunction = this.bgImageUploadError;
        if (this.bgImageSelector.nativeElement.files && this.bgImageSelector.nativeElement.files[0]) {
            if (this.bgImageSelector.nativeElement.files[0].type.substr(0, 5) != "image") {
                setTimeout(() => {
                    this.model.showMdlAlertDialog(this.model.GetUiTextByKey("ERR_INVALID_IMAGE_MESSAGE"), this.model.GetUiTextByKey("ERR_INVALID_IMAGE_TITLE"), true);
                }, 0);
                return;
            }
            else {
                let fileName = this.bgImageSelector.nativeElement.files[0].name;
                let reader = new FileReader();
                reader.onload = function (event) {
                    let target: any = event.target;
                    let dataURL:string = target.result;
                    dataURL = dataURL.substr(dataURL.indexOf("base64,") + 7);
                    UberReaderLoadingMessage.GetInstance().Show("Loading.");
                    UberApplication.GetInstance().UpdateUserAppBackgroundImg(dataURL, fileName, uploadSuccessFunction, uploadFailedFunction);
                }
                reader.readAsDataURL(this.bgImageSelector.nativeElement.files[0]);
            }
        }
    }

    private bgImageUploaded = (event: UserAppBgImgUpdateEvent) => {
        event.target.removeEventListener(UserAppBgImgUpdateEvent.BG_IMG_UPDATED, this.bgImageUploaded);
        event.target.removeEventListener(UserAppBgImgUpdateEvent.BG_IMG_UPDATE_ERROR, this.bgImageUploadError);
        UberReaderLoadingMessage.GetInstance().Hide();
        this.model.UpdateUserPref(event.BgImageUserPref.Key, event.BgImageUrl, true);
        UberReader.GetInstance().UpdateAppBackground();
        this.closeDialog(event.BgImageUrl);
    }

    private bgImageUploadError = (event: UserAppBgImgUpdateEvent) => {
        event.target.removeEventListener(UserAppBgImgUpdateEvent.BG_IMG_UPDATED, this.bgImageUploaded);
        event.target.removeEventListener(UserAppBgImgUpdateEvent.BG_IMG_UPDATE_ERROR, this.bgImageUploadError);
        UberReaderLoadingMessage.GetInstance().Hide();
        this.model.showMdlAlertDialog(this.model.GetUiTextByKey("HTTPSERVICE_FAULT2"), this.model.GetUiTextByKey("HTTPSERVICE_FAULT_TITLE"), true);
    }

    public bgImageSelected(): void {
        let bg: string = AppSettings.GetAssetLocation() + "assets/icon/background-images/" + this.selectedBG.fileName;
        this.model.UpdateUserPref("background_image", bg, true);
        UberReader.GetInstance().UpdateAppBackground();
        this.closeDialog(bg);
    }

    public scroll(direction: string): void {
        if(direction == 'right') {
            //this.bgContainer.nativeElement.scrollLeft += this.bgContainer.nativeElement.offsetWidth;
            if (this.bgImgIDcounter < this.allTypesyBgImages.length / 2 - 3) {
                this.bgImgIDcounter += 3;
            }
            else {
                return;
            }
        }
        else {
            //this.bgContainer.nativeElement.scrollLeft -= this.bgContainer.nativeElement.offsetWidth;
            if (this.bgImgIDcounter >= 3) {
                this.bgImgIDcounter -= 3;
            }
            else {
                return;
            }
        }

        let pageScrollInstance:PageScrollInstance;
        pageScrollInstance = PageScrollInstance.newInstance({
            document: this.document,
            scrollTarget: "#bgImg" + this.bgImgIDcounter,
            scrollingViews: [this.bgContainer.nativeElement],
            verticalScrolling: false,
            pageScrollOffset: 40,
            pageScrollInterruptible: false,
            pageScrollDuration: 400
        });
        this.pageScrollService.start(pageScrollInstance);
    }

    public setSelectedBG(bgImg: any): void {
        if (bgImg.disabled == true) {
            return;
        }
        this.selectedBG = bgImg;
    }

    public onMouseOverImg(bgImg: any): void {
        if (bgImg.disabled == true) {
            this.tooltipMsg = "You need to reach "  + bgImg.level + " level to unlock this background.";
        }
    }

    public dispose(): void { }
}
