import * as FileSystem from 'expo-file-system';

import { ActivityTypes } from "../move/TopMove";

const createActivityTypesForList = (activityTypeValue) => {
    const activityType = ActivityTypes.find(type => type.value === activityTypeValue);

    return activityType;
};

export const getActivityTypes = async (userId) => {
    // Get user directory info
    const userDirUri = FileSystem.documentDirectory + userId;
    const dirUserInfo = await FileSystem.getInfoAsync(userDirUri);

    if (!dirUserInfo.isDirectory) { // if isn't a directory
        console.log("User directory doesn't exists");
        return [];
    }

    const elements = await FileSystem.readDirectoryAsync(userDirUri); // return elements in user directory

    // Filter elements, keep directories
    const activityTypes = [];
    for (let element of elements) {
        const fileInfo = await FileSystem.getInfoAsync(userDirUri + '/' + element);
        if (fileInfo.isDirectory) activityTypes.push(createActivityTypesForList(element));
    }
    return activityTypes; // Return all directories in user directory

}