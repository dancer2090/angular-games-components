import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { UberApplication } from 'app/UberReaderData/UberApplication';
import { CharacterCompetency } from 'app/UberReaderData/DataClasses/db/CharacterCompetency';
import { CharacterCompetencyEvent } from 'app/UberReaderData/Events/CharacterCompetencyEvent';

@Component({
    selector: 'keyboard-svg-component',
    styleUrls: ['./keyboard-svg.component.css'],
    templateUrl: './keyboard-svg.component.html'
})
export class KeyboardSVGComponent {
    @Input('userId') userId: number;
    @ViewChild('keyboardSVG', { static: true }) keyboardSVG: ElementRef;

    private model: UberApplication;

    public characterCompetencies: CharacterCompetency[] = [];

    constructor() {
        this.model = UberApplication.GetInstance();  
    }

    ngOnInit() {
        console.log('userId: ', this.userId);
        if (this.userId) {
            this.model.GetKeyboardCompetency(this.userId, this.GetKeyboardCompetencyReceived, this.GetKeyboardCompetencyError);
        }        
    }

    ngAfterViewInit() {
        console.log('userId (ngAfterViewInit): ', this.userId, this.keyboardSVG);
        /* bug fix for save as pdf - saving as pdf does not recognize styles declared in the css so we need to manually add the styles */
        let st0 = document.getElementsByClassName('st0');
        for (let i=0; i<st0.length; i++) {
            (st0[i] as HTMLElement).style.fill = '#999999';
        }

        let st1 = document.getElementsByClassName('st1');
        for (let i=0; i<st1.length; i++) {
            (st1[i] as HTMLElement).style.fill = '#B3B3B3';
        }

        let st2 = document.getElementsByClassName('st2');
        for (let i=0; i<st2.length; i++) {
            (st2[i] as HTMLElement).style.fill = '#FFFFFF';
        }

        let st3 = document.getElementsByClassName('st3');
        for (let i=0; i<st3.length; i++) {
            (st3[i] as HTMLElement).style.fill = '#CCCCCC';
        }

        let st4 = document.getElementsByClassName('st4');
        for (let i=0; i<st4.length; i++) {
            (st4[i] as HTMLElement).style.fill = '#444444';
        }

        let st5 = document.getElementsByClassName('st5');
        for (let i=0; i<st5.length; i++) {
            (st5[i] as HTMLElement).style.enableBackground = 'new';
        }

        let st6 = document.getElementsByClassName('st6');
        for (let i=0; i<st6.length; i++) {
            (st6[i] as HTMLElement).style.fill = 'none';
        }

        let st7 = document.getElementsByClassName('st7');
        for (let i=0; i<st7.length; i++) {
            (st7[i] as HTMLElement).style.fontFamily = 'MyriadPro-Semibold';
        }

        let st8 = document.getElementsByClassName('st8');
        for (let i=0; i<st8.length; i++) {
            (st8[i] as HTMLElement).style.fontSize = '18px';
        }

        let st9 = document.getElementsByClassName('st9');
        for (let i=0; i<st9.length; i++) {
            (st9[i] as HTMLElement).style.fill = 'url(#SVGID_1_)';
        }
    }

    public Init(userId) {
        console.log('KeyboardSVGComponent Init() called. ', userId);
        this.userId = userId;
        this.model.GetKeyboardCompetency(this.userId, this.GetKeyboardCompetencyReceived, this.GetKeyboardCompetencyError);
    }

    public Init2(characterCompetencies: CharacterCompetency[]) { // Typesy Public Profile Page
        this.GetKeyboardCompetencyReceived(new CharacterCompetencyEvent('', characterCompetencies));
    }
    
    private GetKeyboardCompetencyReceived = (event: CharacterCompetencyEvent) => {
        if (event.target) {
            event.target.removeEventListener(CharacterCompetencyEvent.CHARACTER_COMPETENCY_RECEIVED, this.GetKeyboardCompetencyReceived);
            event.target.removeEventListener(CharacterCompetencyEvent.CHARACTER_COMPETENCY_ERROR, this.GetKeyboardCompetencyError);
        }        

        this.characterCompetencies = event.Character_competencies;
        //console.log('this.characterCompetencies:: ', this.characterCompetencies);

        for (let cc of this.characterCompetencies) {            
            let el = this.keyboardSVG.nativeElement.getElementById('key_' + cc.Character);
            //console.log('asdfjskf: ', cc, el);
            if (el) {
                el.style.fill = this.heatMapColorforValue(cc.Total_competency);
            }
            else {
                switch (cc.Character) {
                    case ';':
                    case ':':
                        this.keyboardSVG.nativeElement.getElementById('key_colon').style.fill = this.heatMapColorforValue(cc.Total_competency);
                        break;
                    case "'":
                    case "\"":
                        this.keyboardSVG.nativeElement.getElementById('key_quote').style.fill = this.heatMapColorforValue(cc.Total_competency);
                        break;
                    case '{':
                    case '[':
                        this.keyboardSVG.nativeElement.getElementById('key_openingbrace').style.fill = this.heatMapColorforValue(cc.Total_competency);
                        break;
                    case '}':
                    case ']':
                        this.keyboardSVG.nativeElement.getElementById('key_closingbrace').style.fill = this.heatMapColorforValue(cc.Total_competency);
                        break;
                    case '|':
                    case '\\':
                        this.keyboardSVG.nativeElement.getElementById('key_backslash').style.fill = this.heatMapColorforValue(cc.Total_competency);
                        break;
                    case ',':
                    case '<':
                        this.keyboardSVG.nativeElement.getElementById('key_comma').style.fill = this.heatMapColorforValue(cc.Total_competency);
                        break;
                    case '.':
                    case '>':
                        this.keyboardSVG.nativeElement.getElementById('key_period').style.fill = this.heatMapColorforValue(cc.Total_competency);
                        break;
                    case '/':
                    case '?':
                        this.keyboardSVG.nativeElement.getElementById('key_slash').style.fill = this.heatMapColorforValue(cc.Total_competency);
                        break;
                    case '-':
                    case '_':
                        this.keyboardSVG.nativeElement.getElementById('key_minus').style.fill = this.heatMapColorforValue(cc.Total_competency);
                        break;
                    case '=':
                    case '+':
                        this.keyboardSVG.nativeElement.getElementById('key_plus').style.fill = this.heatMapColorforValue(cc.Total_competency);
                        break;
                }
            }
        }        
    }

    private GetKeyboardCompetencyError = (event: CharacterCompetencyEvent) => {
        event.target.removeEventListener(CharacterCompetencyEvent.CHARACTER_COMPETENCY_RECEIVED, this.GetKeyboardCompetencyReceived);
        event.target.removeEventListener(CharacterCompetencyEvent.CHARACTER_COMPETENCY_ERROR, this.GetKeyboardCompetencyError);
    }

    private heatMapColorforValue(value): string {
        let h = value * 120 + 2;
        return "hsl(" + h + ", 52%, 54%)";
    }
}