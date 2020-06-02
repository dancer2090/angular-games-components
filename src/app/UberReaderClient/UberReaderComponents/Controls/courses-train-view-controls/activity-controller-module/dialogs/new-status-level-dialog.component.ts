
import { Component, ViewChild, AfterViewInit, Inject, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ParentDialog } from '../../../../Dialogs/ParentDialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TypesyStatusLevel } from '../../../../../../UberReaderData/DataClasses/db/Typesy_Status_Level';
import { Activity_Category } from '../../../../../../UberReaderData/DataClasses/db/Activity_Category';
import { UberApplication } from '../../../../../../UberReaderData/UberApplication';
import { FeaturesUnlocked } from '../../../status-points-control/user-status.service';
import { ExternalResourceLoaderService } from 'app/UberReaderClient/UberReaderComponents/SharedModules/shared-components-module/services/ExternalResourceLoader.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'new-status-level-dialog',
    styleUrls: ['./new-status-level-dialog.component.css'],
    templateUrl: 'new-status-level-dialog.component.html'
})
export class NewStatusLevelDialog extends ParentDialog implements OnInit, AfterViewInit, OnDestroy{
    @ViewChild('success', { static: true }) success:any;
    @ViewChild('odometer', { static: true }) odometer: ElementRef;

    public newLevel: TypesyStatusLevel;
    public newBackgrounds: string;
    public newAvatarFeatures: string;
    public newGames: string;
    public username: string;

    private model: UberApplication;
    private odometerLoader: Subscription;
    private userStatusData: any;
    
    constructor(public dialogRef: MatDialogRef<NewStatusLevelDialog>, 
                @Inject(MAT_DIALOG_DATA) userStatusData: any,
                private externalResourceLoader: ExternalResourceLoaderService,) {
        super(dialogRef);
        this.userStatusData = userStatusData;
    }    

    ngOnInit() {
        this.model = UberApplication.GetInstance();
        this.odometerLoader = this.externalResourceLoader.LoadOdometerFiles().subscribe(() => {});
        this.username = this.model.CurrentUserData.DisplayName;
        this.newLevel = this.userStatusData.currentLevel;        

        this.newAvatarFeatures = (this.userStatusData.newFeatures as FeaturesUnlocked).avatarFeatures.toString().replace(new RegExp(",", "ig"), ", ");
        
        let newBackgrounds = (this.userStatusData.newFeatures as FeaturesUnlocked).backgrounds.map(background => background.replace("-", " ").replace("_", " ").replace(".svg", "").replace(".jpg", ""));
        this.newBackgrounds = newBackgrounds.toString().replace(new RegExp(",", "ig"), ", ");
        
        let newGames = this.getAvailableGames((this.userStatusData.newFeatures as FeaturesUnlocked).games);
        this.newGames = newGames.toString().replace(new RegExp(",", "ig"), ", ");
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.success.nativeElement.play();            
        }, 1000);

        setTimeout(() => {
            this.success.nativeElement.load();            
            this.success.nativeElement.play();            
        }, 2000);

        setTimeout(() => {
            this.odometer.nativeElement.innerHTML = this.model.UserStatusPoints;
        }, 2000);
    }

    private getAvailableGames(newGames: string[]): string[] {
        let games: string[] = [];
        let gameCategories: Activity_Category[] = this.model.getAllActivityCategories();
        for (let id of newGames) {
            for (let category of gameCategories) {
                for (let activity of category.ProxyActivities) {
                    if (activity.Activity_id == parseInt(id)) {
                        games.push(activity.Activity_name);
                        break;
                    }
                }
            }
        }
        return games;        
    }

    ngOnDestroy() {
        if (this.odometerLoader) this.odometerLoader.unsubscribe();
    }
}