import { Directive, ElementRef, Input } from '@angular/core';
import { Http } from '@angular/http';

@Directive({ selector: '[preloadDirective]' })
export class PreloaderDirective
{
    @Input('sources') sources:string[];
    private counter:number = 0;
    constructor(private http:Http, private el:ElementRef)
    {
        this.el.nativeElement.addEventListener("load", this.imageLoaded);
        this.el.nativeElement.addEventListener("error", this.imageLoaded);
    }

    ngOnInit():void
    {
        if(this.sources && this.sources.length)
        {
            this.el.nativeElement.src = this.sources[this.counter];
        }
    }

    imageLoaded = () => 
    {
        this.counter++;
        if(this.counter < this.sources.length)
        {
            this.el.nativeElement.src = this.sources[this.counter];
        }
    }
    
    ngOnDestroy():void
    {
        this.el.nativeElement.removeEventListener("load", this.imageLoaded);
        this.el.nativeElement.removeEventListener("error", this.imageLoaded);
    }
}