import Axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/'
    : '//localhost:3000/'


var axios = Axios.create({
    withCredentials: true
});

export default {
    get(endpoint, data) {
        console.log('data', data);
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        console.log('data:', data);

        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint, method = 'get', data = null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data
        })
        return res.data;
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`);
        console.dir(err);
        if (err.response && err.response.status === 401) {
            window.location.assign('/#/');
        }
        throw err;
    }
}