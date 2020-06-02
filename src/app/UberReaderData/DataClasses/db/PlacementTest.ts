import { StringUtils } from '../../Utils/StringUtils';
import { PlacementTestQuestion } from './PlacementTestQuestion';
import { Text } from './Text';

export class PlacementTest {
    private placementTestID: number;
    private test: PlacementTestQuestion;
    private text: Text;
    private requiredSpeed: number;
    private requiredAccuracy: number;    
    private beginnerLessonPlanID: number;
    private beginnerCourseCategoryID: number;
    private beginnerCourseID: number;
    private advancedLessonPlanID: number;
    private advancedCourseCategoryID: number;
    private advancedCourseID: number;

    public get PlacementTestID(): number {
        return this.placementTestID;
    }

    public set PlacementTestID(value: number) {
        this.placementTestID = value;
    }

    public get Test(): PlacementTestQuestion {
        return this.test;
    }

    public set Test(value: PlacementTestQuestion) {
        this.test = value;
    }

    public get Text(): Text {
        return this.text;
    }

    public set Text(value: Text) {
        this.text = value;
    }

    public get RequiredSpeed(): number {
        return this.requiredSpeed;
    }

    public set RequiredSpeed(value: number) {
        this.requiredSpeed = value;
    }

    public get RequiredAccuracy(): number {
        return this.requiredAccuracy;
    }

    public set RequiredAccuracy(value: number) {
        this.requiredAccuracy = value;
    }

    public get BeginnerLessonPlanID(): number {
        return this.beginnerLessonPlanID;
    }

    public set BeginnerLessonPlanID(value: number) {
        this.beginnerLessonPlanID = value;
    }

    public get BeginnerCourseCategoryID(): number {
        return this.beginnerCourseCategoryID;
    }

    public set BeginnerCourseCategoryID(value: number) {
        this.beginnerCourseCategoryID = value;
    }

    public get BegginerCourseID(): number {
        return this.beginnerCourseID;
    }

    public set BegginerCourseID(value: number) {
        this.beginnerCourseID = value;
    }

    public get AdvancedLessonPlanID(): number {
        return this.advancedLessonPlanID;
    }

    public set AdvancedLessonPlanID(value: number) {
        this.advancedLessonPlanID = value;
    }

    public get AdvancedCourseCategoryID(): number {
        return this.advancedCourseCategoryID;
    }

    public set AdvancedCourseCategoryID(value: number) {
        this.advancedCourseCategoryID = value;
    }

    public get AdvancedCourseID(): number {
        return this.advancedCourseID;
    }

    public set AdvancedCourseID(value: number) {
        this.advancedCourseID = value;
    }
    
    public static fromJson(jsonObject: any): PlacementTest {
        var retVal: PlacementTest = new PlacementTest();
        retVal.PlacementTestID = jsonObject.Placement_test_id;
        retVal.Test = PlacementTestQuestion.fromJson(jsonObject.Test);
        retVal.Text = jsonObject.Text;
        retVal.RequiredSpeed = jsonObject.Required_speed;
        retVal.RequiredAccuracy = jsonObject.Required_accuracy;
        retVal.BeginnerLessonPlanID = jsonObject.Beginner_lesson_plan_id;
        retVal.BeginnerCourseCategoryID = jsonObject.Beginner_course_category_id;
        retVal.BegginerCourseID = jsonObject.Beginner_course_id;
        retVal.AdvancedLessonPlanID = jsonObject.Advanced_lesson_plan_id;
        retVal.AdvancedCourseCategoryID = jsonObject.Advanced_course_category_id;
        retVal.AdvancedCourseID = jsonObject.Advanced_course_id;
        return retVal;
    }
}