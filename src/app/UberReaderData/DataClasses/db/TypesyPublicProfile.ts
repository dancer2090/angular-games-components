import { Chart } from './Chart';
import { DictionaryNumber } from '../../Utils/Dictionary';
import { CharacterCompetency } from './CharacterCompetency';
import { Result } from './Result';
import { CategoryCompletionCertificate } from './CategoryCompletionCertificate';
import { TypesyStatusLevel } from './Typesy_Status_Level';

export class TypesyPublicProfile {

    private first_name: string;
	private last_name: string;
	private profile_pic: string;
	private goal_1_value: number;
	private goal_2_value: number;
	private goal_1_target: number;
	private goal_2_target: number;
	private status_points: number;
	private status_levels: TypesyStatusLevel[];
	private chart: Chart;
	private chart_data: DictionaryNumber<any>;
    private character_competencies: CharacterCompetency[];
    private category_completion_certificates: CategoryCompletionCertificate[];
    private typing_competency: number;


    public get First_name(): string {
        return this.first_name;
    }

    public set First_name(value:string) {
        this.first_name = value;
    }

    public get Last_name(): string {
        return this.last_name;
    }

    public set Last_name(value:string) {
        this.last_name = value;
    }

    public get Profile_pic(): string {
        return this.profile_pic;
    }

    public set Profile_pic(value:string) {
        this.profile_pic = value;
    }

    public get Goal_1_value(): number {
        return this.goal_1_value;
    }

    public set Goal_1_value(value:number) {
        this.goal_1_value = value;
    }

    public get Goal_2_value(): number {
        return this.goal_2_value;
    }

    public set Goal_2_value(value:number) {
        this.goal_2_value = value;
    }

    public get Goal_1_target(): number {
        return this.goal_1_target;
    }

    public set Goal_1_target(value:number) {
        this.goal_1_target = value;
    }

    public get Goal_2_target(): number {
        return this.goal_2_target;
    }

    public set Goal_2_target(value:number) {
        this.goal_2_target = value;
    }

    public get Status_points(): number {
        return this.status_points;
    }

    public set Status_points(value:number) {
        this.status_points = value;
    }

    public get Status_levels(): TypesyStatusLevel[] {
        return this.status_levels;
    }

    public set Status_levels(value:TypesyStatusLevel[]) {
        this.status_levels = value;
    }

    public get Chart(): Chart {
        return this.chart;
    }

    public set Chart(value:Chart) {
        this.chart = value;
    }

    public get Chart_data(): DictionaryNumber<any> {
        return this.chart_data;
    }

    public set Chart_data(value:DictionaryNumber<any>) {
        this.chart_data = value;
    }

    public get Character_competencies(): CharacterCompetency[] {
        return this.character_competencies;
    }

    public set Character_competencies(value:CharacterCompetency[]) {
        this.character_competencies = value;
    }

    public get Category_completion_certificates(): CategoryCompletionCertificate[] {
        return this.category_completion_certificates;
    }

    public set Category_completion_certificates(value: CategoryCompletionCertificate[]) {
        this.category_completion_certificates = value;
    }
    
    public get Fullname():string
    {
        return this.First_name + ( this.Last_name ? ' ' + this.Last_name : '');
    }

    public get TypingCompetency(): number {
        return this.typing_competency;
    }

    public set TypingCompetency(value: number) {
        this.typing_competency = value;
    }
 
    public static fromJson(jsonObject:any): TypesyPublicProfile {
        let retVal:TypesyPublicProfile = new TypesyPublicProfile();

        retVal.First_name = jsonObject.First_name;
        retVal.Last_name = jsonObject.Last_name;
        retVal.Profile_pic = jsonObject.Profile_pic;
        retVal.Goal_1_value = jsonObject.Goal_1_value;
        retVal.Goal_2_value = jsonObject.Goal_2_value;
        retVal.Goal_1_target = jsonObject.Goal_1_target;
        retVal.Goal_2_target = jsonObject.Goal_2_target;
        retVal.Status_points = jsonObject.Status_points;
        retVal.Chart = Chart.fromJson(jsonObject.Chart);
        retVal.TypingCompetency = jsonObject.Typing_competency;
        
        retVal.Status_levels = [];
        for (var obj of jsonObject.Status_levels) {
            retVal.Status_levels.push(TypesyStatusLevel.fromJson(obj));
        }
                 
        retVal.Chart_data = {};
        for (var chartResults of jsonObject.Chart_data)
        {
            var results: Result[] = new Array<Result>();
            for (var resultObject of chartResults.Results)
            {
                results.push(Result.fromJson(resultObject));
            }
            var seriesData:any = {Name: chartResults.Name, Results: results};
            retVal.Chart_data[chartResults.Series_id] = seriesData;
        }

        retVal.Character_competencies = [];        
        for (let cc of jsonObject.Character_competencies) {
            retVal.Character_competencies.push(CharacterCompetency.fromJson(cc));
        }

        retVal.Category_completion_certificates = [];
        for (var obj of jsonObject.Category_completion_certificates) {
            retVal.Category_completion_certificates.push(CategoryCompletionCertificate.fromJson(obj));
        }

        return retVal;
    }
}