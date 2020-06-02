import { UberApplicationEvent } from './UberApplicationEvent';
import { CharacterCompetency } from '../DataClasses/db/CharacterCompetency';

export class CharacterCompetencyEvent extends UberApplicationEvent {
    public static CHARACTER_COMPETENCY_RECEIVED: string = "characterCompetencyReceived";
    public static CHARACTER_COMPETENCY_ERROR: string = "characterCompetencyError";

    private character_competencies: CharacterCompetency[] = [];
    private errorMessage: string;

    public get Character_competencies(): CharacterCompetency[] {
        return this.character_competencies;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, character_competencies: CharacterCompetency[], errorMessage: string = null) {
        super(type);
        this.character_competencies = character_competencies;
        this.errorMessage = errorMessage;
    }

    public clone(): UberApplicationEvent {
        return new CharacterCompetencyEvent(this.type, this.character_competencies, this.errorMessage);
    }
}