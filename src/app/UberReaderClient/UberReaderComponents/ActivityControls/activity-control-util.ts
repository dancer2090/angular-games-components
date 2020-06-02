import { Setting } from '../../../UberReaderData/DataClasses/db/Setting';
import { DictionaryString } from '../../../UberReaderData/Utils/Dictionary';

export class AControlUtil {
    public static CombineSettings(original:Setting[], overwriteWithUser:Setting[], overwriteWithGroup:Setting[]):Setting[]
    {
        let combinedSettingsDict:DictionaryString<Setting> = {};
        
        //put the original settings in the map
        if(original) {
            for (let setting of original) {
                if (combinedSettingsDict[setting.CombinedKey] == null) {
                    combinedSettingsDict[setting.CombinedKey] = setting;
                }
            }
        }
        
        //overwrite with group settings where value is false
        if(overwriteWithGroup) {
            for (let groupSetting1 of overwriteWithGroup) {
                if(groupSetting1.Force_setting != null && !groupSetting1.Force_setting) {
                    combinedSettingsDict[groupSetting1.CombinedKey] = groupSetting1;
                }
            }
        }
        
        //overwrite with user settings
        if(overwriteWithUser) {
            for (let userSetting of overwriteWithUser) {
                combinedSettingsDict[userSetting.CombinedKey] = userSetting;
            }
        }
                
        //overwrite with group settings where value is true
        if(overwriteWithGroup) {
            for (let groupSetting2 of overwriteWithGroup) {
                if(groupSetting2.Force_setting != null && groupSetting2.Force_setting) {
                    combinedSettingsDict[groupSetting2.CombinedKey] = groupSetting2;
                }
            }
        }
        
        //put settings into a Vector
        let combinedSettings:Setting[] = [];
        for (let key in combinedSettingsDict) {
            combinedSettings.push(combinedSettingsDict[key]);
        }
        return combinedSettings;
    }

    public static CombineSettingsBasic(settingsLists:Setting[][]):Setting[]
    {
        let combinedSettingsDict:DictionaryString<Setting> = {};
        
        for (let settings of settingsLists)
        {
            for (let setting of settings)
            {
                combinedSettingsDict[setting.CombinedKey] = setting;
            }
        }

        //put settings into a Vector
        let combinedSettings:Setting[] = [];
        for (let key in combinedSettingsDict) {
            combinedSettings.push(combinedSettingsDict[key]);
        }
        return combinedSettings;
    }
}