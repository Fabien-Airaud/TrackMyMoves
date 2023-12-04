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
        })
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
        body: JSON.stringify(body)
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
    let activityTypes = [];

    const response = await fetch(apiUrl + "/activityTypes/", {
        method: "GET",
        headers: {
            Authorization: "token " + token
        }
    });

    if (response.ok) activityTypes = await response.json();
    return activityTypes;
};

export const retrieveActivityTypeAPI = async (token, id) => {
    let activityType = undefined;

    const response = await fetch(apiUrl + "/activityTypes/" + id + "/", {
        method: "GET",
        headers: {
            Authorization: "token " + token
        }
    });

    if (response.ok) activityType = await response.json();
    return activityType;
};


/* ----------------------------------------------------------------------------------------------------
    activities
---------------------------------------------------------------------------------------------------- */
export const listActivityAPI = async (token) => {
    let activities = [];

    const response = await fetch(apiUrl + "/activities/", {
        method: "GET",
        headers: {
            Authorization: "token " + token
        }
    });

    if (response.ok) activities = await response.json();
    console.log(JSON.stringify(activities))
    return activities;
};

export const groupedActivityListAPI = async (token) => {
    const activityTypes = await listActivityTypeAPI(token);
    const activities = await listActivityAPI(token);
    let group = [];

    for (let activityType of activityTypes) {
        const list = activities.filter(value => value.activity_type === activityType.id);

        if (list.length > 0) {
            group.push({
                ...activityType,
                activities: list
            });
        }
    }
    return group;
};

export const retrieveActivityAPI = async (token, id) => {
    let activity = undefined;

    const response = await fetch(apiUrl + "/activities/" + id + "/", {
        method: "GET",
        headers: {
            Authorization: "token " + token
        }
    });

    if (response.ok) activity = await response.json();
    return activity;
};

export const getActivityWithActivityTypeAPI = async (token, id) => {
    const activity = await retrieveActivityAPI(token, id);
    const activityType = await retrieveActivityTypeAPI(token, activity.activity_type);
    
    activity.activity_type = activityType;
    return activity;
};

export const createActivityAPI = async (token, activity) => {
    let helpers = undefined;

    const response = await fetch(apiUrl + "/activities/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "token " + token
        },
        body: JSON.stringify({
            user: activity.user,
            activity_type: activity.activity_type.id,
            start_datetime: activity.start_datetime,
            end_datetime: activity.end_datetime,
            total_time: activity.total_time,
            intervals: activity.intervals
        })
    });

    if (!response.ok) helpers = await response.json();
    else {
        data = await response.json();
        console.log(JSON.stringify(data));
    }
    return helpers;
};

export const deleteActivityAPI = async (token, id) => {
    let message = undefined;

    const response = await fetch(apiUrl + "/activities/" + id + "/", {
        method: "DELETE",
        headers: {
            Authorization: "token " + token
        }
    });

    if (!response.ok) {
        json = await response.json();
        message = json?.message ? json.message : "Delete activity failed: " + response.status;
    }
    return message;
};