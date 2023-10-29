import * as FileSystem from 'expo-file-system';

const ensureDirExists = async (dirUri) => {
    const dirInfo = await FileSystem.getInfoAsync(dirUri);

    if (!dirInfo.exists || !dirInfo.isDirectory) { // if doesn't exists or isn't a directory
        console.log("Directory doesn't exists, creating " + dirUri + " directory...");
        await FileSystem.makeDirectoryAsync(dirUri);
    }
}

export const saveActivity = async (activity) => {
    // Check or add account directory
    const dirAccountUri = FileSystem.documentDirectory + activity.accountId;
    await ensureDirExists(dirAccountUri).catch(() => console.log(dirAccountUri + ' cannot be created'));
}