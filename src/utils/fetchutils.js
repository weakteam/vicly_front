import {BACKEND_URL} from "../common";


export const fetchWithToken = (method, url, params) => {
    let p = {
        method: 'GET',
        headers: {
            'Authorization': this.accountStore.token,
            'Content-Type': 'application/json'
        }
    };
    return fetch(BACKEND_URL + url, {
        ...p,
        ...params
    });
};
