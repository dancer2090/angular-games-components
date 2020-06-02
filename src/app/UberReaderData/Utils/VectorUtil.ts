export class VectorUtil
{    
    public static getArrayOfProperty(inputArray:any[], property:string):any[]
    {
        let propertyArray:any[] = new Array();
        for (let element of inputArray)
        {
            if (element.hasOwnProperty(property)) {
                propertyArray.push(element[property]);
            }
        }
        return propertyArray;
    }

    public static duplicateArray<T>(arrayToChange:T[]):T[]
    {
        if(arrayToChange && arrayToChange.length > 0)
        {
            let retVal:T[] = [];
            for(let item of arrayToChange)
            {
                retVal.push(item);
            }

            return retVal;
        }
        else
        {
            return arrayToChange;
        }
    }

    public static shuffleArray<T>(arrayToShuffle:T[]):T[]
    {
        if (arrayToShuffle.length <= 1) return arrayToShuffle;
        //let shuffledArray = duplicateArray(arrayToShuffle)
        let counter = arrayToShuffle.length;
        while (counter > 0)
        {
            let index = Math.floor(Math.random() * counter);
            counter--;
            let temp = arrayToShuffle[counter];
            arrayToShuffle[counter] = arrayToShuffle[index];
            arrayToShuffle[index] = temp;
        }

        return arrayToShuffle;
    }
}
