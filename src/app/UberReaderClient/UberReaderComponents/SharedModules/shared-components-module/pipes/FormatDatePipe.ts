import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform
{
    private months:string[] = [
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
        ];
        
    /**
     * format not supported yet
     * 
     */
    transform(date:Date, format?:string):string
    {
        let retVal:string = "";

        if(date != null)
        {
            return this.months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
        }

        return retVal;
    }
}