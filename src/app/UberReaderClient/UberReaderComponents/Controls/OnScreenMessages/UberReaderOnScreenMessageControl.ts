import { VisualComponent } from '../../VisualComponent';

export abstract class UberReaderOnScreenMessageControl extends VisualComponent
{

    public _screenImage:string;
    public _title:string;
    public _content:string;

    public leftButtonEnabled:boolean = true;
    public leftButtonVisible:boolean = false;
    public leftButtonLabel:string;
    public leftButtonStyleName:string = "outlineBlueW120Btn";
    
    public rightButtonLabel:string;
    public rightButtonEnabled:boolean = true;
    public rightButtonStyleName:string = "outlineBlueW120Btn";

    protected setImage(img:string/*, backgroundColor:uint = 0xFFFFFF, backgroundAlpha:Number = 1*/):void
    {
        this._screenImage = img;
        //screenImage.source = _screenImage;
        //imageBackground.alpha = backgroundAlpha;
        //imageBackground.color = backgroundColor;
    }

    protected populateExtraContainer():void
    {
        //extraContainer.visible = true;
    }

    protected setUpButton():void
    {
        
    }
    
    protected abstract leftButtonFunction():void;
    
    protected abstract rightButtonFunction():void;
    
    // protected set Content(desc:string)
    // {				
    //     content.text = desc;
    // }

    // protected set Title(_title:string)
    // {	
    //     //title.setStyle("fontSize", largeFont);
    //     titleFont = largeFont;
    //     title.text = _title;	
    //     //title.invalidateSize();
    //     title.validateNow();				
    //     if(this.parentDocument.width < title.getExplicitOrMeasuredWidth())
    //     {
    //         //title.setStyle("fontSize", smallFont);
    //         titleFont = smallFont;
    //         title.maxDisplayedLines = MaxDisplayTitleLine;
    //     }
    //     //trace(title.measureText(_title).width);
    //     //callLater(checkIfTruncated, [title, 0]);
    // }
}