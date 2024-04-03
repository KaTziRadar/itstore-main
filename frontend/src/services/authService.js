import axios from 'axios';
const backendURL = 'http://localhost:3001'; //'https://itstore-main.onrender.com' 

async function registration(data) {
    try {
        const res = await axios.post(backendURL + "/auth/register", { data });
        alert("Registration successfully!");
        return (res);
    } catch (err) {
        if (err.response && err.response.status === 400)
            return (err.response.data.message);
        else
            console.error(err);
        return (err.message); // returning "network error" if server is down
    }
}

async function login(data) {
    try {
        const res = await axios.post(backendURL + "/auth/login", { data });
        alert("Login successfully!");
        return (res);
    } catch (err) {
        if (err.response && err.response.status === 400)
            return (err.response.data.message);
        else
            console.error(err);
        return (err.message); // returning "network error" if server is down
    }
}

async function deleteUser(data) {
    try {
        const res = await axios.post(backendURL + "/auth/delUser", { data });
        alert("User deleted successfully!");
        return (res);
    } catch (err) {
        if (err.response && err.response.status === 400)
            return (err.response.data.message);
        else
            console.error(err);
        return (err.message); // returning "network error" if server is down
    }
}


export { registration, login, deleteUser };