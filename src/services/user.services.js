import axios from 'axios';

export const userService = {
    login, getUser, getgroups, getrols, getusers,
    getQueryRolFilter, getQueryUserFilter, getFilterbyDataType,
    getCompanys, getLocations
};
async function login(username, password) {

    const url = `/api/users/login`;
    let axiosConfig = { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*' } };
    const user = { user: username, pass: password };
    return await axios.post(url, user, axiosConfig);
};

async function getUser(userid) {
    const url = `/api/users/getAllUserById/${userid}`;
    let axiosConfig = { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*' } };
    return await axios.get(url, axiosConfig);
}

async function getgroups() {
    const url = `/api/Groups/getAllGroups`;
    let axiosConfig = { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*' } };
    return await axios.get(url, axiosConfig);
}

async function getusers() {
    const url = `/api/users/getAllUsers`;
    let axiosConfig = { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*' } };
    return await axios.get(url, axiosConfig);
}

async function getrols() {
    const url = `/api/Rols/getAllRols`;
    let axiosConfig = { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*' } };
    return await axios.get(url, axiosConfig);
}

async function getQueryRolFilter(query) {
    const url = `api/Groups/getAllGroupFilter`;
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Authorization': localStorage.getItem('token')
        }
    };
    const data = { query: query };
    return await axios.post(url, data, axiosConfig);
}

async function getQueryUserFilter(query) {
    const url = `api/users/getAllUserFilter`;
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Authorization': localStorage.getItem('token')
        }
    };
    const data = { query: query };
    return await axios.post(url, data, axiosConfig);
}

async function getFilterbyDataType(typeData) {
    const url = `api/Utils/getFilterbyDataType`;
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Authorization': localStorage.getItem('token')
        }
    };
    const data = { typeData: typeData };
    return await axios.post(url, data, axiosConfig);
}

async function getCompanys() {
    const url = `api/companys/getAllCompanys`;
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
        }
    };
    return await axios.get(url, axiosConfig);
}

async function getLocations() {
    const url = `api/locations/getAllLocations`;
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
        }
    };
    return await axios.get(url, axiosConfig);
}


