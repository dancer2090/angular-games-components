import { UberApplication } from '../../../../UberReaderData/UberApplication';
import { TypesyStatusLevel } from '../../../../UberReaderData/DataClasses/db/Typesy_Status_Level';

export interface FeaturesUnlocked {
    avatarFeatures: string[];
    backgrounds: string[];
    games: string[];
}

export class UserStatusService {
    private model: UberApplication = UberApplication.GetInstance();
   
    public update(currentTypesyPoints?: number, typesyStatusLevels?: TypesyStatusLevel[]): any {
        let nextLevel: TypesyStatusLevel, currentLevel: TypesyStatusLevel;
        let currentStatusPoints: number = currentTypesyPoints != null ? currentTypesyPoints : this.model.UserStatusPoints;        
        let statusLevels: TypesyStatusLevel[] = typesyStatusLevels != null ? typesyStatusLevels : this.model.TypesyStatusLevels;
        //let userTypingCompetency: UserTypingCompetency = this.model.UserTypingCompetency;

        for (let level of statusLevels) {
            if (currentStatusPoints < Math.trunc(level.RequiredStatusPoints)) { //|| userTypingCompetency.Competency < level.RequiredTypingCompetency) {
                nextLevel = level;
                break;
            }
            else if (currentStatusPoints >= level.RequiredStatusPoints) { //&& userTypingCompetency.Competency >= level.RequiredTypingCompetency) {
                currentLevel = level;
            }
        }

        let previousLevel: string = this.model.GetUserPref("current_status_level");
        this.model.UpdateUserPref("current_status_level", currentLevel.Name, true);
        if (previousLevel != "" && currentLevel.Name != previousLevel) {            
            let featuresUnlocked: FeaturesUnlocked = this.newUnlockedFeatures(previousLevel, currentLevel, statusLevels);
            return {nextLevel: nextLevel, currentLevel: currentLevel, newFeatures: featuresUnlocked};
        }
        else {
            return {nextLevel: nextLevel, currentLevel: currentLevel};
        }
    }

    public newUnlockedFeatures(previousLevelName: string, currentLevel: TypesyStatusLevel, statusLevels: TypesyStatusLevel[]): FeaturesUnlocked {
        let previousLevel: TypesyStatusLevel = statusLevels.find(level => level.Name == previousLevelName);
        let featuresUnlocked: FeaturesUnlocked = {avatarFeatures: [], backgrounds: [], games: []};

        for (let feature of currentLevel.AvailableAvatarFeatures) {
            if (previousLevel.AvailableAvatarFeatures.indexOf(feature) == -1) {
                featuresUnlocked.avatarFeatures.push(feature);
            }
        }

        for (let bg of currentLevel.AvailableBackgrounds) {
            if (previousLevel.AvailableBackgrounds.indexOf(bg) == -1) {
                featuresUnlocked.backgrounds.push(bg);
            }
        }

        for (let game of currentLevel.AvailableActivityIDs) {
            if (previousLevel.AvailableActivityIDs.indexOf(game) == -1) {
                featuresUnlocked.games.push(game);
            }
        }        

        return featuresUnlocked;
    }
}