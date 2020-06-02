import { UberApplication } from '../../UberApplication';

export class Word_PartOfSpeech
{
    public static Noun:Word_PartOfSpeech = new Word_PartOfSpeech();
    public static Adj:Word_PartOfSpeech = new Word_PartOfSpeech();
    public static Verb:Word_PartOfSpeech = new Word_PartOfSpeech();
    public static Adv:Word_PartOfSpeech = new Word_PartOfSpeech();
    public static Preposition:Word_PartOfSpeech = new Word_PartOfSpeech();
    public static Conjunction:Word_PartOfSpeech = new Word_PartOfSpeech();
    
    public get Type():string
    {
        switch(this)
        {
            case Word_PartOfSpeech.Noun:
            {
                //return UberApplication.GetInstance().GetUiTextByKey("EDIT_SENSE_POS_COMBO_NOUN");//"Noun";
                return "Noun";
            }
            case Word_PartOfSpeech.Adj:
            {
                //return UberApplication.GetInstance().GetUiTextByKey("EDIT_SENSE_POS_COMBO_ADJ");//"Adjective";
                return "Adjective";
            }
            case Word_PartOfSpeech.Verb:
            {
                //return UberApplication.GetInstance().GetUiTextByKey("EDIT_SENSE_POS_COMBO_VERB");//"Verb";
                return "Verb";
            }
            case Word_PartOfSpeech.Adv:
            {
                //return UberApplication.GetInstance().GetUiTextByKey("EDIT_SENSE_POS_COMBO_ADV");//"Adverb";
                return "Adverb";
            }
            case Word_PartOfSpeech.Preposition:
            {
                //return UberApplication.GetInstance().GetUiTextByKey("EDIT_SENSE_POS_COMBO_PREP");//"Preposition";
                return "Preposition";
            }
            case Word_PartOfSpeech.Conjunction:
            {
                //return UberApplication.GetInstance().GetUiTextByKey("EDIT_SENSE_POS_COMBO_CONJ");//"Conjunction";
                return "Conjunction";
            }
        }
        return null;
    }
    
    public static getWordPartOfSpeech(str:string):Word_PartOfSpeech
    {
        switch(str)
        {
            case "Noun":
            {
                return Word_PartOfSpeech.Noun;
            }
            case "Adj":
            case "Adjective":
            {
                return Word_PartOfSpeech.Adj;
            }
            case "Verb":
            {
                return Word_PartOfSpeech.Verb;
            }
            case "Adv":
            case "Adverb":
            {
                return Word_PartOfSpeech.Adv;
            }
            case "Preposition":
            {
                return Word_PartOfSpeech.Preposition;
            }
            case "Conjunction":
            {
                return Word_PartOfSpeech.Conjunction;
            }
        }
        return null;
    }
}