import { VisualComponent } from '../VisualComponent';
import { MdlDialogReference } from '@angular-mdl/core';
import { UberApplication } from '../../../UberReaderData/UberApplication';

export abstract class UberReaderDialog extends VisualComponent
{
    public visible:boolean = false;
    public _title:string = "";
    //public _closeButtonVisible:boolean = true;
    public okButtonLabel:string;
	public cancelButtonLabel:string;

    constructor(public dialog?: MdlDialogReference)
    {
        super();
        this.visible = false;
        if(dialog) {
            UberApplication.GetInstance().AddToOpenedDialogRefs(dialog);
        }
    }

    public open():void
    {
        this.visible = true;
    }

    public closeDialog(data?:any) {               
        if (this.dialog) {
            UberApplication.GetInstance().RemoveFromOpenedDialogs(this.dialog);
            this.dialog.hide(data);
        }            
    }

    public close():void
    {
        this.visible = false;
    }

    public destroy():void
    {
        //this.dispatchEvent(new UberApplicationEvent(DialogManager.DESTROY_DIALOG));
    }

    abstract dispose():void;
}