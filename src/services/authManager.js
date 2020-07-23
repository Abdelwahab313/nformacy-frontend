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

  login = (userToken) => {
    this.setAuthorizationHeader(userToken);
    localStorage.setItem('tokens', JSON.stringify(userToken));
  };

  logout = () => {
    console.log('logout -------------');
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
