export const dateToStringAPIDate = (date) => {
    let stringAPIDate = "";
    new Date().getUTCDate;
    stringAPIDate += date.getFullYear();
    stringAPIDate += "-";
    stringAPIDate += date.getMonth() + 1;
    stringAPIDate += "-";
    stringAPIDate += date.getDate();
    return stringAPIDate;
}