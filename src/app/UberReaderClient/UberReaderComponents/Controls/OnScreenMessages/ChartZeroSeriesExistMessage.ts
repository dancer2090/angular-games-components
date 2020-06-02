import { Component, Input } from '@angular/core';

import { UberReaderOnScreenMessageControl } from './UberReaderOnScreenMessageControl';

@Component({
    selector: `empty-chart-message`,
    template: `
        <div *ngIf="visible" class="coursePromptContainer">
            <!--img src="{{'assets/icon/empty-chart.svg' | resourceLoc}}" width="150" height="150" /-->
            
            <div class="empty-screen-icon-div"><!--mdl-icon class="empty-screen-icon">equalizer</mdl-icon--><span class="icon-assessment_outline empty-screen-icon"></span></div><Br/>
            <label class="mdl-typography--display-1 mdl-color-text--grey-600 empty-screen-headline">Not Enough Data</label><Br/><Br/>
            <label class="mdl-typography--subhead mdl-typography--font-medium mdl-color-text--grey-600 empty-screen-label">We don't have enough data to display your stats yet.</label><Br/>
            <label class="mdl-typography--subhead mdl-typography--font-medium mdl-color-text--grey-600 empty-screen-label">Use the app for a while and come back soon.</label>
        </div>
    `
})

export class ChartZeroSeriesExistMessage extends UberReaderOnScreenMessageControl
{
    public visible:boolean = false;
    protected leftButtonFunction():void{}
    
    protected rightButtonFunction():void{}
}
