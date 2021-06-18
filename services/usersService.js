import axios from "axios";

const instance = axios.create({
    baseURL: 'https://s7cuai2n69.execute-api.us-east-2.amazonaws.com/',
    timeout: 1000000,
    headers: {'Content-Type': 'application/json'}
});

const eHealthInstance = axios.create({
    baseURL: 'http://ec2-54-66-253-23.ap-southeast-2.compute.amazonaws.com:6500',
    timeout: 1000000,
    headers: { Authorization: `Bearer c60812f728a3356b4ee2b69b5bf4f14d` }
});

export async function createUser(data) {
    try{
        const response = await instance.put('user', data);
        return true;
    } catch (err) {
        return false;
    }
}

export async function getUser(id) {
    try{
        const response = await instance.get('user/' + id);
        return response.data.Item;
    } catch (err) {
        return null;
    }
}

export async function getUserEHealth(id) {
    try{
        const response = await eHealthInstance.get('/getUser/' + id);
        return response.data[0];
    } catch (err){
        return null;
    }
}