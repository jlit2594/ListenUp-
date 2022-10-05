import decode from 'jwt-decode';

class AuthService {
    login(idToken) {
        localStorage.setItem('id_token');

        window.location.assign('/');
    }
}

export default new AuthService();