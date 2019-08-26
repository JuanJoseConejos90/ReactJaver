import axios from 'axios';

export const userService = {
    login, getUser, getgroups, getrols, getusers, getInfotbUsers,
    getQueryRolFilter, getQueryUserFilter, getFilterbyDataType,
    getCompanys, getLocations, getDepartments, getGroups, createdUser, updatedUser, getUserbyRols,
    getUserbyGroup, createdUserbyRol, createdUserbyGroup, deleteUserbyRol, deleteUserbyGroup, getJobs
};

async function getInfotbUsers() {
    const url = '/api/Utils/getInfotbUsers';
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Authorization': localStorage.getItem('token')
        }
    };
    const data = {};
    return await axios.post(url, data, axiosConfig);
}


async function login(username, password) {

    const url = '/api/users/login';
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
    const url = '/api/Groups/getAllGroups';
    let axiosConfig = { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*' } };
    return await axios.get(url, axiosConfig);
}

async function getusers() {
    const url = '/api/users/getAllUsers';
    let axiosConfig = { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*' } };
    return await axios.get(url, axiosConfig);
}

async function getrols() {
    const url = '/api/Rols/getAllRols';
    let axiosConfig = { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*' } };
    return await axios.get(url, axiosConfig);
}

async function getQueryRolFilter(query) {
    const url = 'api/Groups/getAllGroupFilter';
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
    const url = 'api/users/getAllUserFilter';
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
    const url = 'api/Utils/getFilterbyDataType';
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
    const url = '/api/companys/getAllCompanys';
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    };
    return await axios.get(url, axiosConfig);
}

async function getLocations() {
    const url = '/api/locations/getAllLocations'
    let axiosConfig = {
        headers: {
            'Content-TypAccess-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept',
            'Access-Control-Allow-Origin': '*'
        }
    };
    return await axios.get(url, axiosConfig);
}

async function getDepartments() {
    const url = '/api/departments/getalldepartments';
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    };
    return await axios.get(url, axiosConfig);
}

async function getGroups() {
    const url = '/api/Groups/getAllGroups';
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    };
    return await axios.get(url, axiosConfig);
}

async function createdUser(nickName, fistName, lastName, title, photo, manager, departmentId, costCenter, location,
    company, businessPhone, homephone, mobilePhone, email, gender, createdBy, created, updateBy,
    updated, timeFormat, timeZone, passWord, vip, state, lockedOut, role, groupId, sessionId, job) {

    const url = '/api/users/createUser';
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Authorization': localStorage.getItem('token')
        }
    };

    const data = { fistName: fistName, lastName: lastName, title: title, photo: photo, manager: manager, departmentId: departmentId, costCenter: costCenter, locationId: location, companyId: company, businessPhone: businessPhone, homephone: homephone, mobilePhone: mobilePhone, email: email, gender: gender, createdBy: createdBy, created: created, updateBy: updateBy, updated: updated, timeFormat: timeFormat, timeZone: timeZone, passwordUser: passWord, vip: vip, state: state, lockedOut: lockedOut, rolId: role, groupId: groupId, sessionId: sessionId, nickName: nickName, job: job };
    return await axios.post(url, data, axiosConfig);
}

async function updatedUser(userId, nickName, fistName, lastName, title, photo, manager, departmentId, costCenter, location,
    company, businessPhone, homephone, mobilePhone, email, gender, createdBy, created, updateBy,
    updated, timeFormat, timeZone, passWord, vip, state, lockedOut, role, groupId, sessionId, job) {

    const url = '/api/users/updateUser';
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Authorization': localStorage.getItem('token')
        }
    };

    const data = { userId: userId, fistName: fistName, lastName: lastName, title: title, photo: photo, manager: manager, departmentId: departmentId, costCenter: costCenter, locationId: location, companyId: company, businessPhone: businessPhone, homephone: homephone, mobilePhone: mobilePhone, email: email, gender: gender, createdBy: createdBy, created: created, updateBy: updateBy, updated: updated, timeFormat: timeFormat, timeZone: timeZone, passwordUser: passWord, vip: vip, state: state, lockedOut: lockedOut, rolId: role, groupId: groupId, sessionId: sessionId, nickName: nickName, job: job };
    return await axios.put(url, data, axiosConfig);
}

async function getUserbyRols(userid) {
    const url = `/api/Utils/getUserbyRol/${userid}`;
    let axiosConfig = { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*' } };
    return await axios.get(url, axiosConfig);
}

async function getUserbyGroup(userid) {
    const url = `/api/Utils/getUserbyGroup/${userid}`;
    let axiosConfig = { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*' } };
    return await axios.get(url, axiosConfig);
}

async function createdUserbyRol(userByRol) {
    const url = `/api/Utils/createdUserByRol`;
    let axiosConfig = { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*' } };
    const data = {
        userId: userByRol.userId,
        rolId: userByRol.rolId,
        createdBy: userByRol.createdBy,
        created: 'CURDATE()',
        updateBy: userByRol.updateBy,
        updated: 'CURDATE()'
    };
    return await axios.post(url, data, axiosConfig);
};

async function createdUserbyGroup(userByGroup) {
    const url = `/api/Utils/createdUserByGroup`;
    let axiosConfig = { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*' } };
    const data = {
        userId: userByGroup.userId,
        groupId: userByGroup.groupId,
        createdBy: userByGroup.createdBy,
        created: 'CURDATE()',
        updateBy: userByGroup.updateBy,
        updated: 'CURDATE()'
    };
    return await axios.post(url, data, axiosConfig);
};

async function deleteUserbyRol(userId) {
    const url = `/api/Utils/deleteUserbyRol/${userId}`;
    let axiosConfig = { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*' } };
    return await axios.delete(url, axiosConfig);
};

async function deleteUserbyGroup(userId) {
    const url = `/api/Utils/deleteUserbyGroup/${userId}`;
    let axiosConfig = { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*' } };
    return await axios.delete(url, axiosConfig);
}

async function getJobs() {
    const url = '/api/Utils/getAllJobs';
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    };
    return await axios.get(url, axiosConfig);
}


