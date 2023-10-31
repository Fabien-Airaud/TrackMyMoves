import * as FileSystem from 'expo-file-system';

export const getActivityTypes = async (userId) => {
    // Get user directory info
    const userDirUri = FileSystem.documentDirectory + userId;
    const dirUserInfo = await FileSystem.getInfoAsync(userDirUri);

    if (!dirUserInfo.isDirectory) { // if isn't a directory
        console.log("User directory doesn't exists");
        return [];
    }

    const files = await FileSystem.readDirectoryAsync(userDirUri); // return elements in user directory
    return files;
}