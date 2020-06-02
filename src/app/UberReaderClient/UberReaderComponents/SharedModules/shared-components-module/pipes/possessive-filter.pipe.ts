import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'possessive'
})
export class PossessivePipe implements PipeTransform
{
    transform(value:string):string
    {
        if (value == null || value.trim.length == 0)
        {
            return value;
        }
        else if (value.charAt(value.length - 1) == "s" || value.charAt(value.length - 1) == "S")
        {
            return value + "'";
        }
        else
        {
            return value + "'s";
        }
    }
}