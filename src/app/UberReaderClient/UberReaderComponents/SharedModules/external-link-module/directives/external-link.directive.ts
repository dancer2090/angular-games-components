import { Directive, Input, ElementRef } from '@angular/core';
import { UrlLoaderService } from '../../shared-components-module/services/UrlLoader.service';
import { AppSettings } from 'app/UberReaderData/AppSettings';

@Directive({ selector: '[externalLink]' })
export class ExternalLinkDirective
{
    constructor(private urlLoaderService: UrlLoaderService, private el:ElementRef)
    {
        this.el.nativeElement.addEventListener("click", this.linkClicked);
        this.el.nativeElement.addEventListener("auxclick", this.linkAuxClicked);
    }

    linkClicked = (event) => 
    {
        event.preventDefault();
        var href = this.el.nativeElement.href;
        if (href != null && href.length > 0)
        {
            this.urlLoaderService.OpenUrlNewWindow(href);
        }
    }

    linkAuxClicked = (event) => 
    {
        
    }
    
    ngOnDestroy():void
    {
        this.el.nativeElement.removeEventListener("click", this.linkClicked);
        this.el.nativeElement.removeEventListener("auxclick", this.linkAuxClicked);
    }
}