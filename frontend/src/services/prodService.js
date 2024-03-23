import axios from 'axios';
const backendURL = 'http://localhost:3001';

async function addProducts(data) {
    try {
        const res = await axios.post(backendURL + "/prod/addProducts", { data });
        console.log('Products added successfully');
        return (res);
    } catch (err) {
        if (err.response && err.response.status === 400)
            return (err.response.data.message);
        else
            console.error(err);
        return (err.message); // returning "network error" if server is down
    }
}

async function getAllProducts(data) {
    try {
        const res = await axios.post(backendURL + "/prod/getAllProducts", { data });
        console.log('Get all products works successfully');
        return (res);
    } catch (err) {
        if (err.response && err.response.status === 400)
            return (err.response.data.message);
        else
            console.error(err);
        return (err.message); // returning "network error" if server is down
    }
}

export { addProducts, getAllProducts };