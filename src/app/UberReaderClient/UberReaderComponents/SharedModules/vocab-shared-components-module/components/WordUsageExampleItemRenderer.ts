import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';

import { VisualComponent } from '../../../VisualComponent';
import { WordUsageExample } from '../../../../../UberReaderData/DataClasses/db/WordUsageExample';
import { AppSettings } from '../../../../../UberReaderData/AppSettings';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { Word_Pos } from '../../../../../UberReaderData/DataClasses/db/Word_Pos';

@Component({
    selector: 'word-usage-example',
    styleUrls: ['./WordUsageExampleItemRenderer.css'],
    template: `
         <div id="wordExampleBox">
            <div [innerHTML]="contentText"></div>
            <button id="showInfoBtn" *ngIf="showInfoButton" (click)="showExampleInfoBox()"></button>

            <div id="exampleInfoBox" *ngIf="showInfo" [class.hideInfoBox]="startFadeOut" class="showInfoBox">
                <label id="lblwordTitle">{{ wordUsageExample.Source_title }}</label>
                <label id="lblwordYear">{{ wordUsageExample.Year }}</label>
                <div id="exampleInfoMid">
                    <div class="col1"><img [src]="genreIconSource" width="40" height="40"></div>
                    <div class="col2"><label id="lblwordCategory">{{ genre }}</label></div>
                </div>
                <label id="lbldataText">{{ dataSourceText }}</label>
            </div>  
        </div>
    `
})

export class WordUsageExampleItemRenderer extends VisualComponent implements OnInit {
     @Input('example') wordUsageExample: WordUsageExample;

     public genre:string;
     public genreIconSource:string;
     public dataSourceText:string;
     public showInfo:boolean = false;
     public startFadeOut:boolean = false;
     public contentText:string;
     
    @Input('showInfoButton') showInfoButton:boolean = true;

     ngOnInit() {
        switch(this.wordUsageExample.Genre) {
            case "SPOK": 	this.genre = "Spoken";
                            break;
            case "FIC": 	this.genre = "Fiction";
                            break;
            case "NEWS": 	this.genre = "News";
                            break;
            case "ACAD": 	this.genre = "Academic";
                            break;
            case "MAG": 	this.genre = "Magazine";
        }
        this.genreIconSource = AppSettings.GetAssetLocation() + "assets/icon/" + this.genre + ".svg";
        this.dataSourceText = UberApplication.GetInstance().GetUiTextByKey("WORD_USAGE_SOURCE_INFO");

		this.contentText = UberApplication.GetInstance().processTextRemoveNewLines(this.wordUsageExample.Example);        
        var wordPos:Word_Pos = UberApplication.GetInstance().GetWordPosByIds(this.wordUsageExample.Word_Pos_id);
        var wordToHighlight:string = UberApplication.GetInstance().GetWordById(wordPos.Word_id).Word_text;
        this.highlightWord(wordToHighlight);
     }

     private highlightWord (wordToHighlight:string ):void {
         var wordsArray:string[] = this.contentText.split(" ");
         var regEx:RegExp = new RegExp('[^0-9a-zA-Z]', "g");
         
         this.contentText = "<p>";
         for(var i:number=0; i< wordsArray.length; i++) {   
             var word:string = wordsArray[i].replace(regEx, "").toLowerCase();
             wordsArray[i] = wordsArray[i].replace('<', '&lt;');
            
             if(word == wordToHighlight.toLowerCase() || wordsArray[i].toLowerCase() == (wordToHighlight + "'s").toLowerCase()) {
                 //this.contentText +=  "<font color='#0662FA'>" + wordsArray[i] + "</font> ";
                 this.contentText +=  "<span class='lblmainWord'>" + wordsArray[i] + "</span> ";
             }
             else {
                 this.contentText += wordsArray[i] + " ";
             }
         }
         this.contentText += "</p>";
     }

     public showExampleInfoBox() {
         this.showInfo = true;
         setTimeout(() => {
            this.startFadeOut = true;
            //wait for another 2s for the animation to finish, then reset variables 
            setTimeout(() => {
                this.showInfo = false;
                this.startFadeOut = false;
            }, 2000);
        }, 2000); 
     }
}