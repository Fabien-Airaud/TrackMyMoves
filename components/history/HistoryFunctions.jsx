import * as FileSystem from 'expo-file-system';

import { ActivityTypes } from "../move/TopMove";

const getActivities = async (activityTypeDirUri) => {
    const elements = await FileSystem.readDirectoryAsync(activityTypeDirUri); // return elements in activity type directory

    // Get JSON from files
    const activities = [];
    for (let element of elements) {
        const fileUri = activityTypeDirUri + '/' + element;
        const fileInfo = await FileSystem.getInfoAsync(fileUri);

        if (fileInfo.exists && !fileInfo.isDirectory) { // if is a file
            const fileinJSON = await FileSystem.readAsStringAsync(fileUri); // get file's content in string
            activities.push(JSON.parse(fileinJSON)); // push file's content in its object shape
        }
    }
    return activities; // Return all activities in activity type directory
}

const createActivityList = (activityTypeValue, activities) => {
    const activityType = ActivityTypes.find(type => type.value === activityTypeValue);

    return {...activityType, activities: activities};
};

export const getActivityTypes = async (userId) => {
    // Get user directory info
    const userDirUri = FileSystem.documentDirectory + userId;
    const dirUserInfo = await FileSystem.getInfoAsync(userDirUri);

    if (!dirUserInfo.isDirectory) { // if isn't a directory
        return [];
    }

    const elements = await FileSystem.readDirectoryAsync(userDirUri); // return elements in user directory

    // Filter elements, keep directories
    const activityTypes = [];
    for (let element of elements) {
        const dirUri = userDirUri + '/' + element;
        const fileInfo = await FileSystem.getInfoAsync(dirUri);

        if (fileInfo.isDirectory) {
            const activities = await getActivities(dirUri); // Get all activities in activity type directory
            activityTypes.push(createActivityList(element, activities));
        }
    }
    return activityTypes; // Return all directories in user directory
}

const checkIsEmpty = async (dirURI) => {
    const fileInfo = await FileSystem.getInfoAsync(dirURI);

    if (fileInfo.isDirectory) {
        const elements = await FileSystem.readDirectoryAsync(dirURI);
        return elements.length === 0;
    }
    return false;
}

export const deleteLocalActivity = async (accountId, activityType, activityId) => {
    const accountDirURI = FileSystem.documentDirectory + accountId;
    const activityTypeDirURI = accountDirURI + '/' + activityType;

    const fileURI = `${FileSystem.documentDirectory}${accountId}/${activityType}/${activityId}.json`;
    const fileInfo = await FileSystem.getInfoAsync(fileURI);

    if (fileInfo.exists && !fileInfo.isDirectory) { // if is a file
        await FileSystem.deleteAsync(fileURI).catch(() => false);

        let emptyDir = await checkIsEmpty(activityTypeDirURI);
        if (emptyDir) { // if activity type directory is now empty
            await FileSystem.deleteAsync(activityTypeDirURI).catch(() => false);

            emptyDir = await checkIsEmpty(accountDirURI);
            if (emptyDir) { // if account directory is now empty
                await FileSystem.deleteAsync(accountDirURI).catch(() => false);
            }
        }
        return true; // Everything to delete is deleted
    }
    return false; // if isn't a file
}