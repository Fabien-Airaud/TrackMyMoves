const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const dateToStringAPIDate = (date) => {
    let stringAPIDate = "";

    stringAPIDate += date.getFullYear();
    stringAPIDate += "-";
    stringAPIDate += date.getMonth() + 1;
    stringAPIDate += "-";
    stringAPIDate += date.getDate();
    return stringAPIDate;
};

export const stringAPIDateToDate = (stringAPIDate) => {
    const splitDate = stringAPIDate.split('-');
    
    const date = new Date(splitDate[0], splitDate[1]-1, splitDate[2]);
    return date;
};


/* ----------------------------------------------------------------------------------------------------
    register
---------------------------------------------------------------------------------------------------- */
export const registerAPI = async (email, password, first_name, last_name, birthdate, height, weight, country) => {
    let helpers = undefined;

    const response = await fetch(apiUrl + "/register", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
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
        })
    });

    if (!response.ok) helpers = await response.json();
    return helpers;
};


/* ----------------------------------------------------------------------------------------------------
    logIn
---------------------------------------------------------------------------------------------------- */
export const logInAPI = async (email, password) => {
    let data = {};

    const response = await fetch(apiUrl + "/logIn", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    });

    if (response.ok) data.ok = await response.json();
    else data.helpers = await response.json();
    return data;
};


/* ----------------------------------------------------------------------------------------------------
    logOut
---------------------------------------------------------------------------------------------------- */
export const logOutAPI = async (token) => {
    let message = undefined;

    const response = await fetch(apiUrl + "/logOut", {
        method: "GET",
        headers: {
            Authorization: "token " + token
        }
    });

    if (!response.ok) message = "Log out failed";
    return message;
};


/* ----------------------------------------------------------------------------------------------------
    accounts
---------------------------------------------------------------------------------------------------- */
export const retrieveAccountAPI = async (token, id) => {
    let account = undefined;

    const response = await fetch(apiUrl + "/accounts/" + id + "/", {
        method: "GET",
        headers: {
            Authorization: "token " + token
        }
    });

    if (response.ok) account = await response.json();
    return account;
};

export const patchAccountAPI = async (token, id, body) => {
    let data = {};

    const response = await fetch(apiUrl + "/accounts/" + id + "/", {
        method: "PATCH",
        headers: {
            Authorization: "token " + token,
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
    });

    if (response.ok) data.ok = await response.json();
    else data.helpers = await response.json();
    return data;
};

export const deleteAccountAPI = async (token, id) => {
    let message = undefined;

    const response = await fetch(apiUrl + "/accounts/" + id + "/", {
        method: "DELETE",
        headers: {
            Authorization: "token " + token
        }
    });

    if (!response.ok) {
        json = await response.json();
        message = json?.message ? json.message : "Delete account failed: " + response.status;
    }
    return message;
};


/* ----------------------------------------------------------------------------------------------------
    activityTypes
---------------------------------------------------------------------------------------------------- */
export const listActivityTypeAPI = async (token) => {
    let activityTypes = undefined;

    const response = await fetch(apiUrl + "/activityTypes/", {
        method: "GET",
        headers: {
            Authorization: "token " + token
        }
    });

    if (response.ok) activityTypes = await response.json();
    return activityTypes;
};