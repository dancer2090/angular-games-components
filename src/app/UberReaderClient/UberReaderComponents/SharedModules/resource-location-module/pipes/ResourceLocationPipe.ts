import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppSettings } from 'app/UberReaderData/AppSettings';

@Pipe({
    name: 'resourceLoc'
})

export class ResourceLocationPipe implements PipeTransform {
    transform(value:string): string {
        return value ? AppSettings.GetAssetLocation() + value : value;
    }
}

@Pipe({ name: 'localResource' })
export class LocalResourcePipe implements PipeTransform
{
    constructor(private sanitizer:DomSanitizer) {}
    
    transform(value:string, type?:string)
    {
        if (value == null)
            return null;
        
        var localUrl = value;
        var remoteUrl = value;
        if (type == "courseIcon")
        {
            localUrl = "assets/icon/course-icons/" + AppSettings.ShortProductName + "/" + value
            remoteUrl = "assets/icon/course-icons/" + value;
        }
        else if (type == "activityIcon")
        {
            localUrl = "assets/icon/activity-icons/" + AppSettings.ShortProductName + "/" + value
            remoteUrl = "assets/icon/activity-icons/" + value;
        }

        return AppSettings.GetAssetLocation() + remoteUrl;
    }
}

@Pipe({ name: 'localResourceAsync' })
export class LocalResourceAsyncPipe implements PipeTransform
{
    constructor(private sanitizer:DomSanitizer) {}
    
    transform(value:string, type?:string)//: Observable<string>
    {
        if (value == null)
            return null;
        
        var localUrl = value;
        var remoteUrl = value;
        if (type == "courseIcon")
        {
            localUrl = "assets/icon/course-icons/" + AppSettings.ShortProductName + "/" + value
            remoteUrl = "assets/icon/course-icons/" + value;
        }
        else if (type == "activityIcon")
        {
            localUrl = "assets/icon/activity-icons/" + AppSettings.ShortProductName + "/" + value
            remoteUrl = "assets/icon/activity-icons/" + value;
        }
        console.log('AppSettings.GetAssetLocation() + remoteUrl: ', AppSettings.GetAssetLocation() + remoteUrl);
        return AppSettings.GetAssetLocation() + remoteUrl;

        //var localObserver = this.electronService.getLocalResourceAsync(localUrl);
        // if (localObserver == null)
        // {
        //     return remoteUrl;
        // }
        // else
        // {
            //return localObserver.map(item => this.sanitizer.bypassSecurityTrustUrl(item)).defaultIfEmpty(AppSettings.GetAssetLocation() + remoteUrl);
        //}
    }
}
