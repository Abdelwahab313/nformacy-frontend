import Axios from 'axios';

class AuthManager {
  retrieveUserToken = () => {
    const loadedTokenString = localStorage.getItem('tokens');
    let authToken = !!loadedTokenString
      ? JSON.parse(loadedTokenString)
      : undefined;
    this.setAuthorizationHeader(authToken);

    const loadedUserString = localStorage.getItem('user');
    const user = !!loadedUserString
      ? JSON.parse(loadedUserString)
      : undefined;

    return { authToken, user };
  };

  login = (userToken) => {
    localStorage.setItem('tokens', JSON.stringify(userToken));
    this.setAuthorizationHeader(userToken);
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
