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

export async function getStoreByIdCwh(storeId) {
    try {
        const response = await instanceByStoreCwh.get(`/getStore/${storeId}`);
        return response.data[0];
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getStoreByIdTwc(storeId) {
    try {
        const response = await instanceByStoreTwc.get('getStore/' + storeId);
        return response.data[0];
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getStoresByPostCodeCwh(postCode) {
    try {
        const response = await instanceByPostCwh.get('getStoreByPostcode/' + postCode);
        return response.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getStoresByPostCodeTwc(postCode) {
    try {
        const response = await instanceByPostTwc.get(`getStoreByPostcode/${postCode}`);
        return response.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}