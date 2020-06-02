import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UberApplication } from 'app/UberReaderData/UberApplication';
import { UploadEvent } from '../UberReaderData/Events/UploadEvent';

interface FileUpload {
    id: number;
    filename: string;
    progress: number;
    status: string;
}

@Component({
    selector: 'background-upload',
    styleUrls: ['./background-upload.component.css'],
    templateUrl: './background-upload.component.html'
})
export class BackgroundUploadComponent implements OnInit, OnDestroy {
    private _model: UberApplication;
    
    public fileUploads: FileUpload[] = [];
    public headerText: string = "";
    public hide: boolean = true;

    constructor() {
        this._model = UberApplication.GetInstance();              
    }

    ngOnInit() {
        this._model.addEventListener(UploadEvent.UPLOAD_START, (event: UploadEvent) => {
            console.log('UploadEvent.UPLOAD_START: ', event);        
            this.fileUploads.splice(0, 0, {
                id: event.Running_task_id,
                filename: event.filename,
                progress: Math.ceil(event.Progress),
                status: 'Uploading...'
            });
            let num = this.fileUploads.filter(file => file.progress < 100).length;
            this.headerText = 'Uploading ' + num + ' item' + (num > 1 ? 's' : '');
            this.hide = false;            
        });
    
        this._model.addEventListener(UploadEvent.UPLOAD_PROGRESS, (event: UploadEvent) => {
            console.log('UploadEvent.UPLOAD_PROGRESS: ', event);
            let fileUpload = this.fileUploads.find(file => file.id == event.Running_task_id);
            fileUpload.progress = Math.ceil(event.Progress);
        });
    
        this._model.addEventListener(UploadEvent.UPLOAD_END, (event: UploadEvent) => {
            console.log('UploadEvent.UPLOAD_END: ', event);
            let fileUpload = this.fileUploads.find(file => file.id == event.Running_task_id);
            fileUpload.progress = Math.ceil(event.Progress);
            fileUpload.status = 'Completed';
            let num = this.fileUploads.filter(file => file.progress < 100).length;
            this.headerText = 'Uploading ' + num + ' item' + (num > 1 ? 's' : '');

            let num_complete = this.fileUploads.filter(file => file.progress == 100).length;
            if (num_complete) {
                this.headerText = num_complete + ' upload' + (num_complete > 1 ? 's' : '') + ' complete';
            }            
        });
    
        this._model.addEventListener(UploadEvent.UPLOAD_ERROR, (event: UploadEvent) => {
            console.log('UploadEvent.UPLOAD_ERROR: ', event);
            let fileUpload = this.fileUploads.find(file => file.id == event.Running_task_id);
            fileUpload.progress = Math.ceil(event.Progress);
            fileUpload.status = 'Failed!';
            this._model.showMdlAlertDialog(event.ErrorMessage, "", true);
        });
    }

    ngAfterViewInit() {
        //this.dragElement(document.getElementById("uploadDiv"));
    }

    public close_clickHandler() {
        this.hide = true;
    }

    public dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;        

        let dragMouseDown = (e) => {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;            
        }

        if (document.getElementById(elmnt.id + "header")) {
          // if present, the header is where you move the DIV from:
          document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
          // otherwise, move the DIV from anywhere inside the DIV: 
          elmnt.onmousedown = dragMouseDown;
        }

        let elementDrag = (e) => {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            elmnt.style.bottom = 'unset';
        }    

        let closeDragElement = () => {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    ngOnDestroy() {
        
    }
}