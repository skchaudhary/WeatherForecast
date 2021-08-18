// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return userStr;
    else return null;
}
   
// return the token from the session storage
export const getToken = () => {
    const token = sessionStorage.getItem('token');
    if(token) return token;
    else return null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
}

// set the token and user from the session storage
export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token);
    // sessionStorage.setItem('Authorization', "Bearer " + token);
    sessionStorage.setItem('user', JSON.stringify(user));
}