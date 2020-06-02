export class MenuItem
{
    public data?:any;
    public children?:MenuItem[];
    public label?:string;
    public separator?:boolean = false;
    public visible?:boolean = true;
    public unseen?:number = 0;
    /* this should only be declared to parent menu items */
    public multiple?:boolean = false;
    public lockSelection?:boolean = false;
    public labelSrc?:boolean = false;

    /* this should only be declared to child menu items */
    public selected?:boolean = false;

    public isHR?:boolean = false;
    public icon?:string;
    public styleClass?:string;
}