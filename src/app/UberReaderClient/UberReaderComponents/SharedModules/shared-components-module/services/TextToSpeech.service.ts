import Speech from 'speak-tts';
import { UberApplication } from 'app/UberReaderData/UberApplication';
import { Subject } from 'rxjs';

export class TextToSpeechService {
    public readyToStart: Subject<boolean> = new Subject();

    private speech;
    private model: UberApplication;
    private text: string;
    private chunkedText: string[];
    private textIndex: number;
    private isInitialized: boolean = false;
    private isDestroyed: boolean = false;

    public setupSpeech(text?: string, pronounceByCharacter?: boolean, instruction?: string): void {
        this.isDestroyed = false;
        
        if (!this.isInitialized) {
            this.isInitialized = true;
            this.speech = new Speech();
            //this.readyToStart = new Subject();
            this.model = UberApplication.GetInstance();
        }

        if (text != null) {
            this.text = pronounceByCharacter == true ? text.toUpperCase() : text;
            this.text = this.text.replace(new RegExp(" ", "g"), " space ").replace(new RegExp("┘", "g"), "┘ ");
            this.textIndex = 0;
        }

        if (!this.speech.hasBrowserSupport()) {
            this.model.showMdlAlertDialog("Your browser doesn't support speech synthesis.", "", true, "OK", () => {
                this.readyToStart.next(false);
            });
        }
        else {
            this.speech.
                init({
                    volume: 1,
                    lang: "en-US",
                    rate: 1,
                    pitch: 1,
                    //voice: 'Alex',
                    //'splitSentences': false,
                    listeners: {
                        onvoiceschanged: voices => {
                            console.log("Voices changed", voices);
                        }
                    }
                }).then((data) => {
                    // The "data" object contains the list of available voices and the voice synthesis params
                    console.log("Speech is ready, voices are available", data);
                    if (data.voices.find(voice => voice.name == "Alex") != null) {
                        this.speech.setVoice("Alex");
                    }
                    else if (data.voices.find(voice => voice.name == "Google US English") != null) {
                        this.speech.setVoice("Google US English");
                    }
                    
                    if (text != null) { 
                        this.splitTextIntoGroupOf(1);
                    }

                    if (instruction == null) {
                        this.speak("Please type the words that I'm going to dictate.");
                    }
                    else {
                        this.speak(instruction);
                    }
                    
                    setTimeout(() => {
                        this.readyToStart.next(true);
                    }, 3000);
                }).catch(e => {
                    this.readyToStart.next(false);
                    console.error("An error occured while initializing : ", e)
                })
        }
    }

    public setSpeechText(text: string, pronounceByCharacter: boolean): void {
        this.text = pronounceByCharacter == true ? text.toUpperCase() : text;
        this.text = this.text.replace(new RegExp(" ", "g"), " space ").replace(new RegExp("┘", "g"), "┘ ");
        this.textIndex = 0;
        this.splitTextIntoGroupOf(1);
    }

    private splitTextIntoGroupOf(groupOf: number): void {
        if (groupOf == 1) {
            this.chunkedText = this.text.split(" ");
        }
        else {
            this.chunkedText = [];
            let textArr: string[] = this.text.split(" ");

            while (textArr.length != 0) {
                this.chunkedText.push(textArr.splice(0, groupOf).join(" "));
            }
        }
        console.log("Chunked text: ", this.chunkedText);
    }
    
    private checkForNonAlpha(word: string): string {
        let newWord: string = "";
        word.split("").forEach(
            item => {                    
                switch (item) {
                    case " ":
                        item = ".";
                        break;
                    case "┘":
                        item = ". enter";
                        break;
                    case '!':
                        item = " exclamation point";
                        break;
                    case '@':
                        item = " at";
                        break;
                    case '#':
                        item = " hashtag";
                        break;
                    case '$':
                        item = " dollar sign";
                        break;
                    case '%':
                        item = " percent";
                        break;
                    case '^':
                        item = " caret";
                        break;
                    case '&':
                        item = " ampersand";
                        break;
                    case '*':
                        item = " asterisk";
                        break;
                    case '(':
                        item = " open parenthesis";
                        break;
                    case ')':
                        item = " close parenthesis";
                        break;
                    case '-':
                        item = " dash";
                        break;
                    case '_':
                        item = " underscore";
                        break;
                    case '+':
                        item = " plus sign";
                        break;
                    case '=':
                        item = " equal sign";
                        break;
                    case '{':
                        item = " open curly bracket";
                        break;
                    case '}':
                        item = " close curly bracket";
                        break;
                    case '[':
                        item = " open square bracket";
                        break;
                    case ']':
                        item = " close square bracket";
                        break;
                    case ':':
                        item = " colon";
                        break;
                    case ';':
                        item = " semi colon";
                        break;
                    case '"':
                        item = " double quotation mark";
                        break;
                    case '\'':
                        item = " single quotation mark";
                        break;
                    case '\\':
                        item = " back slash";
                        break;
                    case '<':
                        item = " less than symbol";
                        break;
                    case ',':
                        item = " comma";
                        break;
                    case '>':
                        item = " greater than symbol";
                        break;
                    case '.':
                        item = " period";
                        break;
                    case '?':
                        item = " question mark";
                        break;
                    case '/':
                        item = " forward slash";
                        break;
                }
                newWord += item; 
        })
        return newWord;
    }

    public playNextWords(): void {
        if (this.textIndex < this.chunkedText.length) {
            let word = this.checkForNonAlpha(this.chunkedText[this.textIndex++]);
            if (word == "") {
                this.playNextWords();
            }
            else {
                this.speak(word);
            }
        }
    }

    public speak(textToSpeak: string): void {
        if (this.isDestroyed) return;
        this.speech
            .speak({
                text: textToSpeak,
                queue: false,
                listeners: {
                    onstart: () => {
                        //console.log("Start utterance");
                    },
                    onend: () => {
                        //console.log("End utterance");
                    },
                    onresume: () => {
                        //console.log("Resume utterance");
                    },
                    onboundary: event => {
                        // console.log(
                        //     event.name +
                        //     " boundary reached after " +
                        //     event.elapsedTime +
                        //     " milliseconds."
                        // );
                    }
                }
            })
            .then(data => {
                //console.log("Success !", data);
            })
            .catch(e => {
                //console.error("An error occurred :", e);
            });
    }

    public get CurrentSpeechText(): string {
        return this.chunkedText[this.textIndex - 1] == "space" ? " " : this.chunkedText[this.textIndex - 1];
    }

    public get CurrentSpeechTextLength(): number {
        let speechText: string = this.chunkedText[this.textIndex - 1];
        return speechText == "space" ? 1 : this.chunkedText[this.textIndex - 1].length;
    }

    public playBack(): void {
        this.textIndex--;
    }

    public destroy(): void {
        console.log("SPEECH ON DESTROY");
        if (this.speech != null) {
            this.speech.cancel();
        }
        this.isDestroyed = true;
    }
}