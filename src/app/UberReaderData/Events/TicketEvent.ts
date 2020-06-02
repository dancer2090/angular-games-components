import { UberApplicationEvent } from './UberApplicationEvent';

export class TicketEvent extends UberApplicationEvent
{
    public static TICKET_CREATED:string = "ticketCreated";
    public static TICKET_ERROR:string = "ticketError";
    
    constructor(type:string)
    {
        super(type);
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new TicketEvent(this.type);
    }
}