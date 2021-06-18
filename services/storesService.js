import axios from "axios";


const apiUrlCwh = 'http://ec2-54-66-253-23.ap-southeast-2.compute.amazonaws.com:6700';
const apiUrlTwc = 'http://ec2-54-66-253-23.ap-southeast-2.compute.amazonaws.com:6800';
const accessTokeneHealth = 'bb9f876927470be6eba9d6612431a210';


const instanceByPostCwh = axios.create({
    baseURL: apiUrlCwh,
    timeout: 1000000,
    headers: { Authorization: `Bearer ${accessTokeneHealth}` }

})

const instanceByPostTwc = axios.create({
    baseURL: apiUrlTwc,
    timeout: 1000000,
    headers: { Authorization: `Bearer ${accessTokeneHealth}` }

})

const instanceByStoreCwh = axios.create({
    baseURL: apiUrlCwh,
    timeout: 1000000,
    headers: { Authorization: `Bearer ${accessTokeneHealth}` }

})

const instanceByStoreTwc = axios.create({
    baseURL: apiUrlTwc,
    timeout: 1000000,
    headers: { Authorization: `Bearer ${accessTokeneHealth}` }

})

const intanceAllStoreTwc = axios.create({
    baseURL: apiUrlTwc,
    timeout: 1000000,
    headers: {Authorization: `Bearer ${accessTokeneHealth}` }
})

const intanceAllStoreCwh = axios.create({
    baseURL: apiUrlCwh,
    timeout: 1000000,
    headers: {Authorization: `Bearer ${accessTokeneHealth}` }
})

export async function getAllStoreTwc() {
    try {
        const response = await intanceAllStoreTwc.get(`/getAll`);
        return response.data;
    } catch (err) {
        return null;
    }
}

export async function getAllStoreCwh() {
    try {
        const response = await intanceAllStoreCwh.get(`/getAll`);
        return response.data;
    } catch (err) {
        return null;
    }
}

export async function getStoreByIdCwh(storeId) {
    try {
        const response = await instanceByStoreCwh.get(`/getStore/${storeId}`);
        return response.data[0];
    } catch (err) {
        return null;
    }
}

export async function getStoreByIdTwc(storeId) {
    try {
        const response = await instanceByStoreTwc.get('getStore/' + storeId);
        return response.data[0];
    } catch (err) {
        return null;
    }
}

export async function getStoresByPostCodeCwh(postCode) {
    try {
        const response = await instanceByStoreCwh.get('getStoreByPostcode/' + postCode);
        return response.data;
    } catch (err) {
        return null;
    }
}

export async function getStoresByPostCodeTwc(postCode) {
    try {
        const response = await instanceByStoreTwc.get(`getStoreByPostcode/${postCode}`);
        return response.data;
    } catch (err) {
        return null;
    }
}