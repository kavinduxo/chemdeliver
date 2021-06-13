import axios from "axios";

const instance = axios.create({
    baseURL: 'https://s7cuai2n69.execute-api.us-east-2.amazonaws.com/',
    timeout: 1000000,
    headers: { 'Content-Type': 'application/json' }
})

const instanceDrugsByPrescription = axios.create({
    baseURL: 'http://ec2-54-66-253-23.ap-southeast-2.compute.amazonaws.com:6500',
    timeout: 1000000,
    headers: { Authorization: `Bearer c60812f728a3356b4ee2b69b5bf4f14d` }
});

export const getDrugs = async (prescriptionId) => {
    try {
        const response = await instanceDrugsByPrescription.get(`/getSpecificRecord/${prescriptionId}`);
        return response.data[0];
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getOrders() {
    try {
        const response = await instance.get('orders');
        return response.data.Items;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function createOrder(data) {
    try {
        const response = await instance.put('order', data);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}
