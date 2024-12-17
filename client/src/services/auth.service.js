import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const API_URL = `${apiUrl}/api/user`;

class AuthService {
  login(email, password) {
    return axios.post(API_URL + '/login', {
      email, 
      password,
    });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(username, email, password) {
    return axios.post(API_URL + '/register', {
      username, 
      email, 
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();