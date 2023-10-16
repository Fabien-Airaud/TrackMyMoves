/**
 * An account
 * @typedef {Object} Account
 * @property {string} id
 * @property {string} emailAddress
 * @property {string} password
 * @property {string} firstName
 * @property {string} lastName
 * @property {Date} birthdate
 * @property {number} height
 * @property {number} weight
 * @property {string} country
 */


/**
 * Log in if the `email` and `password` correspond to an account
 * @param {Account[]} accounts - The list of accounts in the redux state
 * @param {string} email - The email to check
 * @param {string} password - The password to check
 * @returns {boolean} `true` if the account is logged in
 */
export const logInAccount = (accounts, email, password) => {
    if (accounts.length === 0) return false;

    // Try to find the relative account for the email given
    const account = accounts.find(account => account.emailAddress === email);

    // No account found for the email
    if (account == undefined) {
        console.log("Email not found.");
        return false;
    }

    if (account.emailAddress === email && account.password === password) {
        console.log("Email and password are correct.");
        return true;
    }
    console.log("Invalid password");
    return false;
}