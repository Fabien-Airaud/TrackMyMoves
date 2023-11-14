import * as FileSystem from 'expo-file-system';

const ensureDirExists = async (dirUri) => {
    const dirInfo = await FileSystem.getInfoAsync(dirUri);

    if (!dirInfo.exists || !dirInfo.isDirectory) { // if doesn't exists or isn't a directory
        await FileSystem.makeDirectoryAsync(dirUri);
    }
}

export const saveActivity = async (activity) => {
    // Check or add account directory
    const dirAccountUri = FileSystem.documentDirectory + activity.accountId;
    await ensureDirExists(dirAccountUri).catch(() => console.log('Failed to create ' + dirAccountUri));

    // Check or add activity type directory
    const dirActivityTypeUri = dirAccountUri + '/' + activity.activityType;
    await ensureDirExists(dirActivityTypeUri).catch(() => console.log('Failed to create ' + dirActivityTypeUri));

    // Add the activity in the activity type directory
    const fileActivityUri = dirActivityTypeUri + '/' + activity.id + '.json';
    console.log('Activity: ' + JSON.stringify(activity));
    await FileSystem.writeAsStringAsync(fileActivityUri, JSON.stringify(activity)).catch(() => console.log('Failed to write ' + fileActivityUri));
}