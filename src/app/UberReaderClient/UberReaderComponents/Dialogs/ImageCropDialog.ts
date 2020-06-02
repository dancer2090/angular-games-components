import { Component, ViewChild } from '@angular/core';

import { UberReaderDialog } from './UberReaderDialog';
import { AppSettings } from '../../../UberReaderData/AppSettings';

@Component({
    selector: 'image-crop-dialog',
    template:`
        <div class="alertDialogOverlay">
            <div>
                <div class="profileTitleContainer">
                    <label>Image Crop</label>
                    <button (click)="closeDialog()" class="closeBtn"></button>
                </div>
                <div class="contentDiv">                    
                    <canvas #imageCanvas style="max-width:800px;max-height:660px;">                    
                    </canvas>
                </div>
            <div #buttonGroup id="buttonGroupDiv">
                    <div class="col"><button #cancelButton (click)="closeDialog()" class="outlineGreyFilledW120Btn">Close</button></div>
                    <div class="col"><button #okButton [disabled]="!saveButtonEnabled" (click)="saveButton_clickHandler()" class="outlineBlueW120Btn">Save</button></div>
                </div>   
            </div>
        </div>
    `
})

export class ImageCropDialog extends UberReaderDialog{
    @ViewChild('imageCanvas', { static: true }) imageCanvas:any;

    enlarge():void
    {

    }   

    public saveButtonEnabled:boolean = false;

    public saveButton_clickHandler():void{}

    private _image:any;

    constructor() {
        super();
    }

    ngAfterViewInit():void
    {        
        //this.imageSrc.nativeElement.src = this._image;

        let img = document.createElement("img");
        img.src = this._image;

        var ctx = this.imageCanvas.nativeElement.getContext("2d");
        if(img.height > 600 || img.width > 800)
        {       
            img.width = 800;
            img.height = 600;     
        }
        this.imageCanvas.nativeElement.width = Math.min(img.width, 800);
        this.imageCanvas.nativeElement.height = Math.min(img.height, 600);
        ctx.drawImage(img, 0, 0, img.width, img.height);
    }

    public Init(file:any)
    {
        this._image = file;
    }

    public closeDialog():void
    {
        super.close();
        super.destroy();
    }

    public dispose()
    {}
}
