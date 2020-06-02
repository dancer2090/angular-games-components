//http://stackoverflow.com/questions/36325212/angular-2-dynamic-tabs-with-user-click-chosen-components/36325468#36325468

import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild, ComponentRef, Type } from '@angular/core';

import { VisualComponent } from '../../../VisualComponent';
import { UberReaderDialog } from '../../../Dialogs/UberReaderDialog';
import { UberApplicationEvent } from '../../../../../UberReaderData/Events/UberApplicationEvent';

@Component({
    selector: 'dialog-manager',
    template: `
        <div>
            <div #dialogLocation>
            </div>
        </div>
    `
})

export class DialogManager extends VisualComponent
{
    public static DESTROY_DIALOG:string = "destroyDialog";

    @ViewChild('dialogLocation', { read: ViewContainerRef, static: true }) dialogLocation;
    //cmpRef:ComponentRef<any>;
    
    public static _title:string = "";

    private static _instance:DialogManager;
    //public static GetInstance():DialogManager
    //{
    //    return DialogManager._instance;
    //}

    constructor(private resolver:ComponentFactoryResolver)
    {
        super();
        DialogManager._instance = this;
    }

    /*public static openDialog(modalService:NgbModal, type:Type<UberReaderDialog>, initFunction:(dialog:any) => void):void
    {
        console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz!");
        const modalRef = modalService.open(type);
        let dialog:UberReaderDialog = modalRef.componentInstance;
        initFunction(dialog);

         dialog.addEventListener(DialogManager.DESTROY_DIALOG, (event:UberApplicationEvent) =>
        {
            setTimeout(() =>
            {
                dialog.removeAllListeners();
                modalRef.close();
            }, 100);
            
        });
    }*/

    public static AddPopup(type:Type<UberReaderDialog>, initFunction:(dialog:any) => void):void
    {        
        let instance = DialogManager._instance;
        
        let factory = instance.resolver.resolveComponentFactory(type);
        let componentRef:ComponentRef<any> = instance.dialogLocation.createComponent(factory);
        let dialog:UberReaderDialog = componentRef.instance;
        initFunction(dialog);

        dialog.addEventListener(DialogManager.DESTROY_DIALOG, (event:UberApplicationEvent) =>
        {
            setTimeout(() =>
            {
                dialog.removeAllListeners();
                componentRef.destroy();    
            }, 100);
            
        });

        //dialog.addEventListener(DialogManagerEvent.TITLE_CHANGE, (event:DialogManagerEvent) => 
        //{
        //    setTimeout(() =>
        //    {
        //        this._title = event.Title;
        //    }, 100);
        //});
    }

    public static AddPopup2(resolver:ComponentFactoryResolver, type:Type<UberReaderDialog>, initFunction:(dialog:any) => void):void
    {        
        let instance = DialogManager._instance;
        
        let factory = resolver.resolveComponentFactory(type);
        let componentRef:ComponentRef<any> = instance.dialogLocation.createComponent(factory);
        let dialog:UberReaderDialog = componentRef.instance;
        initFunction(dialog);

        dialog.addEventListener(DialogManager.DESTROY_DIALOG, (event:UberApplicationEvent) =>
        {
            setTimeout(() =>
            {
                dialog.removeAllListeners();
                componentRef.destroy();    
            }, 100);
            
        });
    }

    public static RemoveAllPopUp():void
    {
        let instance = DialogManager._instance;
        instance.dialogLocation.clear();
    }
    
    public dispose():void
    {

    }
}