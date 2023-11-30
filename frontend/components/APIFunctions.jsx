const apiUrl = process.env.EXPO_PUBLIC_API_URL;

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

export const registerAPI = async (email, password, first_name, last_name, birthdate, height, weight, country) => {
    let helpers = undefined;

    const response = await fetch(apiUrl + "/register", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user: {
                email: email,
                password: password
            },
            first_name: first_name,
            last_name: last_name,
            birthdate: dateToStringAPIDate(birthdate),
            height: height,
            weight: weight,
            country: country
        }),
    });

    if (!response.ok) helpers = await response.json();
    return helpers;
}