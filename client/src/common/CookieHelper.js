import Cookies from 'universal-cookie';
const cookies = new Cookies();

class CookieHelper {

    cleanAccessToken() {
        cookies.remove('access_token', {
            path: '/'
        });
        cookies.remove('user_code', {
            path: '/'
        });
        cookies.remove('user_type', {
            path: '/'
        });
    }

    cleanSessionCookies() {
        cookies.remove('access_token', {
            path: '/'
        });
        cookies.remove('refresh_token', {
            path: '/'
        });
        cookies.remove('user_code', {
            path: '/'
        });
        cookies.remove('user_type', {
            path: '/'
        });
    }

    setOAuthCookies(data) {

        let access_token = data.access_token;
        let expires_in = data.expires_in;
        let refresh_token = data.refresh_token;

        var cookieDate = new Date();
        cookieDate.setSeconds(cookieDate.getSeconds() + expires_in);

        var cookie24HDate = new Date();
        cookie24HDate.setSeconds(cookie24HDate.getSeconds() + 86400 * 10);

        cookies.set('access_token', access_token, {
            path: '/',
            expires: cookieDate
        });
        cookies.set('refresh_token', refresh_token, {
            path: '/',
            expires: cookie24HDate
        });
    }

    setSessionCookies(data) {
        var cookie24HDate = new Date();
        cookie24HDate.setSeconds(cookie24HDate.getSeconds() + 86400 * 7);

        cookies.set('user_type', data.userType, {
            path: '/',
            expires: cookie24HDate
        });

        cookies.set('user_code', data.userCode, {
            path: '/',
            expires: cookie24HDate
        });

        cookies.set('name', data.name, {
            path: '/',
            expires: cookie24HDate
        });

        cookies.set('surname', data.surname, {
            path: '/',
            expires: cookie24HDate
        });

        cookies.set('emailAddress', data.emailAddress, {
            path: '/',
            expires: cookie24HDate
        });
    }

    getUserData() {
        if (this.getUserCode()) {
            let userData = {
                code: this.getUserCode(),
                type: this.getUserType()
            }
            return userData;
        }
        return null;
    }

    getUserCode() {
        return cookies.get('user_code');
    }

    getUserType() {
        return cookies.get('user_type');
    }

    getName() {
        return cookies.get('name');
    }

    getSurname() {
        return cookies.get('surname');
    }

    getEmailAddress() {
        return cookies.get('emailAddress');
    }

    getAccessToken() {
        return cookies.get('access_token');
    }

    getRefreshToken() {
        return cookies.get('refresh_token');
    }
}

export default new CookieHelper();