import axios from "axios";

const instanceByPostCwh = axios.create({
    baseURL: 'ec2-54-66-253-23.ap-southeast-2.compute.amazonaws.com:6700/',
    timeout: 1000000,
    headers: { 'Authorization': 'Bearer bb9f876927470be6eba9d6612431a210' }

})

const instanceByPostTwc = axios.create({
    baseURL: 'ec2-54-66-253-23.ap-southeast-2.compute.amazonaws.com:6800/',
    timeout: 1000000,
    headers: { 'Authorization': 'Bearer bb9f876927470be6eba9d6612431a210' }

})

const instanceByStoreCwh = axios.create({
    baseURL: 'ec2-54-66-253-23.ap-southeast-2.compute.amazonaws.com:6800/',
    timeout: 1000000,
    headers: { 'Authorization': 'Bearer bb9f876927470be6eba9d6612431a210' }

})

const instanceByStoreTwc = axios.create({
    baseURL: 'ec2-54-66-253-23.ap-southeast-2.compute.amazonaws.com:6700/',
    timeout: 1000000,
    headers: { 'Authorization': 'Bearer bb9f876927470be6eba9d6612431a210' }

})

export async function getStoreByIdCwh(storeId) {
    try {
        const response = await instanceByStoreCwh.get('getStore/' + storeId);
        console.log(response)
        return response;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getStoreByIdTwc(storeId) {
    try {
        const response = await instanceByStoreTwc.get('getStore/' + storeId);
        console.log(response)
        return response;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getStoresByPostCodeCwh(postCode) {
    try {
        const response = await instanceByPostCwh.get('getStoreByPostcode/' + postCode);
        console.log(response)
        return response;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getStoresByPostCodeTwc(postCode) {
    try {
        const response = await instanceByPostTwc.get('getStoreByPostcode/' + postCode);
        console.log(response)
        return response;
    } catch (err) {
        console.log(err);
        return null;
    }
}