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
 * Check if the `email` is already used in a registered account
 * @param {Account[]} accounts - The list of accounts in the redux state
 * @param {string} email - The email to check
 * @returns {boolean} `true` if the email is already used
 */
export const usedEmail = (accounts, email) => {
    if (accounts.length === 0) return false;

    let sameEmail = accounts.filter(account => account.emailAddress === email);
    return sameEmail.length > 0;
}