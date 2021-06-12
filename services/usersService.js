import axios from "axios";

const instance = axios.create({
    baseURL: 'https://s7cuai2n69.execute-api.us-east-2.amazonaws.com/',
    timeout: 1000000,
    headers: {'Content-Type': 'application/json'}
})

export async function createUser(data) {
    try{
        const response = await instance.put('user', data);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function getUser(id) {
    try{
        const response = await instance.get('user/' + id);
        return response.data.Item;
    } catch (err) {
        console.log(err);
        return null;
    }
}