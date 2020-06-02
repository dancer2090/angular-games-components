export class PrepEdCourseFilter
{
    public Levels:string[];
    
    public Features:string[];

    public Price:string[];

    constructor()
    {
        this.Levels = [];
        this.Features = [];
        this.Price = [];
    }

    public isEmpty():boolean
    {
        return this.Levels.length == 0 && this.Features.length == 0 && this.Price.length == 0;
    }
    
    public toJson():any
    {
        var jsonObject:any = 
        {
            Levels: this.Levels,
            Features: this.Features,
            Price: this.Price
        };
        return jsonObject;
    }
}