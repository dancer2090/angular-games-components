import { Directive, ElementRef, Input, HostListener, Output, EventEmitter } from '@angular/core';

import { StringUtils } from '../../../../../UberReaderData/Utils/StringUtils';

@Directive({
    selector: '[vocabEnable]',
    host: { '[class]': 'vocabReady ? "vocabEnabledText" : ""',}
 })
export class VocabDirective {
    private _elem:ElementRef;
    @Input('content') content:string;
    @Input('vocabReady') vocabReady:boolean = false;
    @Output() wordClicked = new EventEmitter();
    constructor(el: ElementRef) {
        this._elem = el;
    }

    ngOnInit():void
    {
        this.Init();
    }

    refresh():void
    {
        if(this.content && this.content.length > 0)
        {
            this.spanWrapper();
        }

        setTimeout(() => {
            this.Init();
        }, 0);
    }

    private Init():void
    {
        if(this.content && this.content.length > 0)
        {
            this.spanWrapper();
        }
    }

    private independentTags:string[] = [
        "<b>",
        "<i>",
        "<u>",
        "<a>",
        "</b>",
        "</i>",
        "</u>",
        "<a>",
        "<br/>",
        "<br>"
    ];

    private startLockTags:string[] = [
        "<img"
    ];

    private endLockTags:string[] = [
        "/>",
        "</img>"
    ];

    spanWrapper():void
    {
        //if(BuildSettings.isDevBuild)
        //{
            this.content = this.content.replace(new RegExp("([^\s])\<", "g"), "$1 <")
            this.content = this.content.replace(new RegExp("[\\s]+", "g"), " ")
            //console.log("this.content: ", this.content);

            let words:string[] = this.content.split(" ");
            let text:string = "";

            let textToWrap:string = "";
            let wrap:boolean = true;
            let wrapWithSpan:boolean = true;
            let digitsRegEx = new RegExp("[\\d]+", "g");
            let unallowedCharactersRegEx = new RegExp("[^a-zA-Z-’'\.:]", "g");
            for(let word of words)
            {
                let w = StringUtils.TrimString(word);
                textToWrap += w;

                let unallowedCharacters = w.match(unallowedCharactersRegEx);
                if(unallowedCharacters && unallowedCharacters.length > 0)
                {
                    wrap = true;
                    wrapWithSpan = false;
                }
                else if(this.startLockTags.indexOf(w) > -1)
                {
                    wrap = false;
                    wrapWithSpan = false;
                }
                else if(this.endLockTags.indexOf(w) > -1)
                {
                    wrap = true;
                }
                else if(this.independentTags.indexOf(w) > -1)
                {
                    wrap = true;
                    wrapWithSpan = false;
                }

                let digits = w.match(digitsRegEx);
                if (digits && digits.length > 0) {
                    wrap = true;
                    wrapWithSpan = false;
                }

                if(wrap)
                {
                    if(wrapWithSpan && (textToWrap.endsWith("'s") || textToWrap.endsWith("’s")) && textToWrap.length > 6)
                    {
                        text += '<span>' + textToWrap.substr(0, textToWrap.length - 2) + "</span>" + textToWrap.substr(-2, 2) + " ";
                    }
                    else if(wrapWithSpan && textToWrap.length > 4)
                    {
                        text += '<span>' + textToWrap + "</span> ";
                    }
                    else
                    {
                        text += textToWrap + " ";
                    }
                    
                    textToWrap = "";
                    wrapWithSpan = true;
                }
                else 
                {
                    textToWrap += " ";
                }
            }
            //console.log("safsafaslkfjas ", text)
            this._elem.nativeElement.innerHTML = text;
    }

    @HostListener('click',  ['$event.target']) onMouseClick(e) {
        if(this.vocabReady/* && BuildSettings.isDevBuild*/)
        {
            if(e.textContent != null && e.textContent.length > 0 && !(e instanceof HTMLDivElement || e instanceof HTMLParagraphElement))
            {
                let content = StringUtils.TrimString(e.textContent);
                this.wordClicked.emit(content);
            }
            else
            {
                //this.wordClicked.emit(e);
            }
        }
    }

    // private lastTarget:HTMLSpanElement;
    // @HostListener('mousemove',  ['$event.target']) onMouseMove(e) {
    //     if(this.vocabReady)
    //     {
    //         if(this.lastTarget)
    //         {
    //             //this._elem.nativeElement.style.backgroundColor = 'white';
    //             this.lastTarget.style.color = 'black';
    //             this.lastTarget.style.textDecoration = 'none';
    //         }

    //         if(e instanceof HTMLSpanElement && e.textContent != null && e.textContent.length > 0 /*&& !(e instanceof HTMLDivElement)*/)
    //         {
    //             (e as HTMLSpanElement).className = "activeWord";
    //             this.lastTarget = e;
    //             e.style.color = 'blue';
    //             e.style.textDecoration = 'underline';
    //         }
    //     }
    // }

    // @HostListener('mouseout',  ['$event.target']) onMouseOut(e) {
    //     if(this.vocabReady/* && BuildSettings.isDevBuild*/)
    //     {
    //        if(this.lastTarget)
    //         {
    //             //this._elem.nativeElement.style.backgroundColor = 'white';
    //             this.lastTarget.style.color = 'black';
    //             this.lastTarget.style.textDecoration = 'none';
    //         }
    //     }
    // }
}