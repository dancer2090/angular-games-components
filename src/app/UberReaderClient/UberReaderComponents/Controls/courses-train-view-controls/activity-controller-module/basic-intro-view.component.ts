import { Component, Input, ViewChild } from '@angular/core';


@Component({
    selector: 'basic-intro-view',
    styleUrls: ['./basic-intro-view.component.css'],
    template: `
        <!--<div #mainContainer>
            <div id="imgContainer"><img #introImage style="height: 300px;" [src]="introImageSrc" (load)="introImage.style.display = 'inline'" (error)="introImage.style.display = 'none'" ></div>
            <div id="title" class="mdl-typography--display-3">{{ title }}</div>
            <div id="bodyText" class="mdl-typography--display-1">{{ bodyText }}</div>
            <div id="extraContainer"><ng-content></ng-content></div>
        </div>

        <mdl-card class="mainContainer" [class.shorterMainCont]="isIntroCounter">
            <mdl-card-title mdl-card-expand class="card-title">
                <div class="imgContainer">
                    <img #introImage class="card-title-img" [src]="introImageSrc" (load)="introImage.style.display = 'inline'" (error)="introImage.style.display = 'none'" >
                </div>
                <h1 mdl-card-title-text class="card-title-text">{{ title }}</h1>
            </mdl-card-title>

            <mdl-card-supporting-text class="cardDescription"> 
                {{ bodyText }}
            </mdl-card-supporting-text>

            <mdl-card-actions>
                <div class="extraContainer"><ng-content></ng-content></div>
            </mdl-card-actions>
        </mdl-card>-->

        <div class="page-content-outer">
            <div class="page-content">
                <mdl-card class="card--intro-screen" mdl-shadow="2">
                    <mdl-card-title [ngStyle]="{'background-image': 'url(' + introImageSrc + ')'}">
                        <h2 mdl-card-title-text class="mdl-typography--font-thin course-title">{{ title }}</h2>
                    </mdl-card-title>

                    <mdl-card-supporting-text> 
                        <div class="course-description">{{ bodyText }}</div>
                        <div class="extraContainer"><ng-content></ng-content></div>
                    </mdl-card-supporting-text>
                </mdl-card>
            </div>
        </div>
    `
})
export class BasicIntroView {  
    @Input() introImageSrc:string = "";
    @Input() title:string = "";
    @Input() bodyText:string = "";
    @Input() isIntroCounter:boolean = false;
}