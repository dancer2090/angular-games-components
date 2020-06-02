import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class HtmlService
{
    constructor(private titleService:Title, private meta:Meta, private sanitizer:DomSanitizer, @Inject(DOCUMENT) private document: any) {}

    getTitle():string
    {
        return this.titleService.getTitle();
    }

    setTitle(title:string)
    {
        this.titleService.setTitle(title);
    }  

    getMetaDescription():string
    {
        return this.meta.getTag('name=description').content;
    }

    setMetaDescription(description:string)
    {
        this.meta.updateTag({name:'description', content: description});
    }

    getMetaRobots():string
    {
        return this.meta.getTag('name=robots').content;
    }

    setMetaRobots(index:boolean, follow:boolean)
    {
        this.meta.updateTag({name:'robots', content: (index == false ? "no" : "") + "index, " + (follow == false ? "no" : "") + "follow"});
    }


    getMetaTagContent(metaTagName:string):string
    {
        return this.meta.getTag('name=' + metaTagName).content;
    }

    setMetaTagContent(metaTagName:string, description:string)
    {
        this.meta.updateTag({name: metaTagName, content: description});
    }

    // loadHtmlInHeadTag(html:string)
    // {
    //     const head = this._dom.getElementsByTagName(this._dom.defaultDoc(), 'head')[0];
    //     this.sanitizer.bypassSecurityTrustHtml(html);
    // }


    loadCSSFile(url)
    {
        
        //const head = this._dom.getElementsByTagName(this._dom.defaultDoc(), 'head')[0];
        //     this.sanitizer.bypassSecurityTrustHtml(html);
       // this.document.createElement()
    }
}