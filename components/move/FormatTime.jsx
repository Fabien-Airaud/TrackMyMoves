/**
 * Format the time received in a string to display
 * @param {number} time - The time to format, in milliseconds
 * @returns {string} a string representing the time in hours, minutes and seconds
 */
export const formatTime = (time) => {
    // Time in seperated variables
    const hours = Math.floor(time / 1000 / 60 / 60);
    const mins = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor(time / 1000 % 60);

    // Time in string variables
    const stringHours = hours < 10 ? `0${hours}` : `${hours}`
    const stringMins = mins < 10 ? `0${mins}` : `${mins}`
    const stringSecs = seconds < 10 ? `0${seconds}` : `${seconds}`

    return `${stringHours} : ${stringMins} : ${stringSecs}`;
}