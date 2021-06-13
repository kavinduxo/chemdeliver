import axios from "axios";

const instance = axios.create({
    baseURL: 'https://s7cuai2n69.execute-api.us-east-2.amazonaws.com/',
    timeout: 1000000,
    headers: {'Content-Type': 'application/json'}
})

export async function createOrder(data) {
    try{
        const response = await instance.put('order', data);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function updateUserStore(id, store) {
    try{
        const response = await instance.put('user/' + id, store);
        return response;
    } catch (err) {
        console.log(err);
        return null;
    }
}