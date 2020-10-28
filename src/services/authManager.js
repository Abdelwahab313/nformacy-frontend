import Axios from 'axios';

class AuthManager {
  retrieveUserToken = () => {
    const loadedTokenString = localStorage.getItem('tokens');
    let authToken = !!loadedTokenString
      ? JSON.parse(loadedTokenString)
      : undefined;
    this.setAuthorizationHeader(authToken);
    let user = undefined;
    try {
      const loadedUserString = localStorage.getItem('user');
      user = !!loadedUserString
        ? JSON.parse(loadedUserString)
        : undefined;
    } catch (e) {
    }
    return { authToken, user };
  };

  isNormalUser = () => {
    let user;
    try {
      const loadedUserString = localStorage.getItem('user');
      user = !!loadedUserString
        ? JSON.parse(loadedUserString)
        : undefined;
      return user.roles.some((role) => role.name === 'freelancer');
    } catch (e) {
      return false
    }
  };

  isAdmin = () => {
    let user;
    try {
      const loadedUserString = localStorage.getItem('user');
      user = !!loadedUserString
        ? JSON.parse(loadedUserString)
        : undefined;
      return user.roles.some((role) => role.name === 'admin');
    } catch (e) {
      return false
    }
  };

  isAdviser = () => {
    let user;
    try {
      const loadedUserString = localStorage.getItem('user');
      user = !!loadedUserString
        ? JSON.parse(loadedUserString)
        : undefined;
      return user.roles.some((role) => role.name === 'adviser');
    } catch (e) {
      return false
    }
  };

  updateUserInLocalStorage = (currentUser, updatedFields) => {
    localStorage.setItem(
      'user',
      JSON.stringify({ ...currentUser, ...updatedFields }),
    );
  };

  login = (userToken) => {
    this.setAuthorizationHeader(userToken);
    localStorage.setItem('tokens', JSON.stringify(userToken));
  };

  logout = () => {
    this.setAuthorizationHeader();
    return localStorage.setItem('tokens', '');
  };

  setAuthorizationHeader = (token = null) => {
    if (token) {
      Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete Axios.defaults.headers.common.Authorization;
    }
  };
}

const authManager = new AuthManager();
export default authManager;
