import { AppSettings } from 'app/UberReaderData/AppSettings';
import { DateFormatter } from 'app/UberReaderClient/UberReaderComponents/Controls/admin-view-controls/utils/date-formatter';
import { Injectable } from '@angular/core';
import { PrintService } from 'app/UberReaderClient/UberReaderComponents/SharedModules/shared-components-module/services/Print.service';

@Injectable()
export class TypesyCertificateService {

    constructor(
        private printService: PrintService
    ) {

    }

    public print(printContents: string) {
        let printTitle = "Certicate of Completion";
        let printStylesheetUrl = "https://code.getmdl.io/1.3.0/material.indigo-blue.min.css";        
        this.printService.printDocument(printTitle, [printStylesheetUrl], this.printStyling, printContents);
    }

    public getPrintContents(
        certificateOwner: string,
        certificateTitle: string,
        certificateSpeed: number,
        certificateAccuracy: number,
        certificateScore: number,
        certificateDate: Date
    ): string {
        let data: string;
        let certificateIcon = AppSettings.GetAssetLocation() + 'assets/icon/certificate.svg';
        let date = certificateDate != null ? DateFormatter.formatDate(certificateDate) : DateFormatter.formatDate(new Date());
        let bluebg = AppSettings.GetAssetLocation() + 'assets/icon/blue-bg.png';
        data = `
            <div id="certificateMainContainer">
                <img src="${certificateIcon}"/>
                <div id="contentContainer">
                    <div class="certificateText">
                        This is to certify that
                    </div>
                    <div class="studentName">
                        ${certificateOwner}
                    </div>
                    <div class="certificateText">
                        has successfully completed the <span class="courseTestName">${certificateTitle}</span>
                    </div>		
                    <div class="certificateText">
                        and has achieved the skill levels noted below as documented and verified by Typesy on the date of <span class="courseTestName">${date}</span>
                    </div>
            `;

        if (certificateSpeed != null && certificateAccuracy != null) {
            data += `
                <div class="skillLevelContainer">
                    <div class="col" >                        
                        <div class="skillContent1">
                            <div class="skillLevelHeadline">
                                Typing Speed
                            </div>
                            <div class="skillLevel">
                                ${Math.round(certificateSpeed)} <span class="smallText1">wpm</span>
                            </div>
                        </div>
                    </div>

                    <div class="col">                            
                        <div class="skillContent2">
                            <div class="skillLevelHeadline">
                                Typing Accuracy
                            </div>
                            <div class="skillLevel">
                                ${Math.round(certificateAccuracy)} <span class="smallText">%</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (certificateScore != null ) {
            data += `
                <div class="skillLevelContainer2">
                    <div class="col">
                        <img src="${bluebg}"/>
                        <div class="skillContent3" style="text-align: center;">
                            <div class="skillLevelHeadline">
                                Score
                            </div>

                            <div class="skillLevel">
                                ${certificateScore} <span class="smallText1"> points</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }                    
        data += `</div></div>`;
        return data;
    }

    private get printStyling(): string {
        return `@page { size: 11.5in 8.5in; margin: 0px; padding: 0; }
        #certificateMainContainer { width: 1650px; height: 1075px; position: relative; }
        html { margin: 0; padding: 0; width: 100%; }
        body { margin: 0; padding: 0; }
        #contentContainer { width: 1300px; height: 700px; position: absolute; top: 280px; margin-left: -650px; left: 50%; }
        .certificateText { font-size: 35px; text-align: center; color: #212121; line-height: 50px; overflow: hidden; }
        .studentName { margin-top: 10px; margin-bottom: 10px; font-size: 90px; text-align: center; color: #212121; font-weight: bold; 
                    height: 200px; display: flex; align-items: center; justify-content: center; line-height: 90px; overflow: hidden; }
        .courseTestName { font-weight: bold; }
        .skillLevelContainer { width: 1500px; height: 300px; margin-top: 40px; margin-left: 150px; position: relative; }
        .skillLevelContainer2 { width: 600px; height: auto; margin-top: 40px; position: relative; margin: 40px auto 0px; display: flex; align-items: center; justify-content: center; }
        .col { width: 300px; height: 180px; display: inline-block; background: #c5e3fa; border: 5px solid #4593cf; border-radius: 5px; margin: 5px 25px; position: relative; }
        .col img{ width: 300px; height: 180px; }
        .skillLevelHeadline { font-size: 25px; font-weight: bold; color: #212121; float: left; width: 100%; margin-top: 20px; }
        .skillLevel { font-size: 80px; font-weight: bold; color: #212121; float: left; width: 100%; margin-top: 70px; }
        .smallText { font-size: 30px;margin-left: -20px; }
        .smallText1 { font-size: 18px; margin-left: -20px; }
        .skillContent1 { position: absolute; top: 0px; right: 0px; left: 70px; }
        .skillContent2 { position: absolute; top: 0px; right: 0px; left: 55px; }
        .skillContent3 { position: absolute; top: 0px; width: 100%; }
        .hide { display: none; }

        @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
            #certificateMainContainer { margin-top: 20px; }
            .certificateText { font-size: 32px; line-height: 45px; }
            .skillLevelContainer { margin-top: 30px; }
            #contentContainer { top: 250px; width: 1150px; margin-left: -575px; }
        }
            
        @media only screen and (max-width: 1650px) {
            #certificateMainContainer { width: 1100px; height: 700px; }
            #contentContainer { width: 880px; height: 500px; top: 180px; margin-left: -440px; }
            .certificateText { font-size: 22px; line-height: 30px; }
            .studentName { font-size: 60px; height: 120px; line-height: 60px; }
            .skillLevelContainer { width: 700px; height: 200px; margin-top: 30px; margin-left: 50px; }
            .skillLevelContainer2 { margin-top: 30px; }
            .col, .col img { width: 220px; height: 150px; }
            .skillContent1 { left: 45px; }	
            .skillContent2 { left: 30px; }
            .skillLevelHeadline { font-size: 20px; }
            .skillLevel { margin-top: 55px; font-size: 60px; }
            .smallText { font-size: 20px; margin-left: -10px; }                        
            .smallText1 { font-size: 15px; margin-left: -10px; }
        }   
            
        @media only screen and (max-height: 920px)  {
            #certificateMainContainer { width: 1100px; height: 700px; }
            #contentContainer { width: 880px; height: 500px; top: 180px; margin-left: -440px; } 
            .certificateText { font-size: 22px; line-height: 30px; }
            .studentName { font-size: 60px; height: 120px; line-height: 60px; }
            .skillLevelContainer { width: 700px; height: 200px; margin-top: 30px; margin-left: 50px; }
            .skillLevelContainer2 { margin-top: 30px; }
            .col, .col img{ width: 220px; height: 150px; }                        
            .skillContent1 { left: 45px; }	
            .skillContent2 { left: 30px; }
            .skillLevelHeadline { font-size: 20px; }
            .skillLevel { margin-top: 55px; font-size: 60px; }                        
            .smallText { font-size: 20px; margin-left: -10px; }
            .smallText1 { font-size: 15px; margin-left: -10px; }
        } 

        @media only screen and (max-height: 920px) and (max-width: 1650px) {
            #certificateMainContainer { width: 1100px; height: 700px; }
            #contentContainer { width: 880px; height: 500px; top: 180px; margin-left: -440px; }
            .certificateText { font-size: 22px; line-height: 30px; }
            .studentName { font-size: 60px; height: 120px; line-height: 60px; }
            .skillLevelContainer { width: 700px; height: 200px; margin-top: 30px; margin-left: 50px; }
            .skillLevelContainer2 { margin-top: 30px; }
            .col, .col img { width: 220px; height: 150px; }
            .skillContent1 { left: 45px; }
            .skillContent2 { left: 30px; }
            .skillLevelHeadline { font-size: 20px; }
            .skillLevel {  margin-top: 55px; font-size: 60px; }
            .smallText { font-size: 20px; margin-left: -10px; }
            .smallText1 { font-size: 15px; margin-left: -10px; }
        }

        @media only screen and  (max-width: 1100px)  {
            #certificateMainContainer {  width: 792px; height: 612px; }
            #contentContainer { width: 620px; height: 400px; margin-left: -310px; top: 130px; }
            .certificateText { font-size: 16px; line-height: 25px; }
            .studentName { font-size: 40px; height: 80px; line-height: 40px; }
            .skillLevelContainer { width: 450px; height: 150px; margin-top: 20px; margin-left: 20px; }
            .skillLevelContainer2 { margin-top: 20px; }
            .col, .col img { width: 160px; height: 95px; }
            .skillContent1 { left: 30px; }
            .skillContent2 { left: 15px; }
            .skillLevelHeadline { font-size: 16px; margin-top: 10px; }
            .skillLevel { margin-top: 25px; font-size: 40px; }
            .smallText1 { font-size: 12px; }
            .smallText { font-size: 18px; }
        }

        @media only screen and (max-height: 700px)   {
            #certificateMainContainer { width: 792px; height: 612px; }
            #contentContainer { width: 620px; height: 400px; margin-left: -310px; top: 130px; }
            .certificateText { font-size: 16px; line-height: 25px; }
            .studentName { font-size: 40px; height: 80px; line-height: 40px; }
            .skillLevelContainer { width: 450px; height: 150px; margin-top: 20px; margin-left: 20px; }
            .skillLevelContainer2 { margin-top: 20px; }
            .col, .col img { width: 160px; height: 95px; }
            .skillContent1 { left: 30px; }	
            .skillContent2 { left: 15px; }
            .skillLevelHeadline { font-size: 16px; margin-top: 10px; }
            .skillLevel { margin-top: 25px; font-size: 40px; }
            .smallText1 { font-size: 12px; }
            .smallText { font-size: 18px; }
        }

        @media only screen and (max-height: 700px) and (max-width: 1100px) {
            #certificateMainContainer { width: 792px;height: 612px; }
            #contentContainer { width: 620px; height: 400px; margin-left: -310px; top: 130px;}
            .certificateText { font-size: 16px;line-height: 25px; }
            .studentName { font-size: 40px; height: 80px; line-height: 40px;
            .skillLevelContainer { width: 450px; height: 150px; margin-top: 20px; margin-left: 20px; }
            .skillLevelContainer2 { width: 450px; height: 150px; margin-top: 20px; }
            .col, .col img{ width: 160px; height: 95px; }
            .skillContent1 { left: 30px; }	
            .skillContent2 { left: 15px; }
            .skillLevelHeadline { font-size: 16px; margin-top: 10px; }
            .skillLevel { margin-top: 25px; font-size: 40px; }
            .smallText1 { font-size: 12px; }
            .smallText { font-size: 18px; }
        }`;
    }
}