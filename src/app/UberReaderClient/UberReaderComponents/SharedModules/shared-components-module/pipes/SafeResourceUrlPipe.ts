import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'saferesourceurl' })
export class SafeResourceUrlPipe implements PipeTransform
{
    constructor(private sanitizer: DomSanitizer) {}
    
    transform(url)
    {
        if (url == null)
            return null;
        else
            return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}