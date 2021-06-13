import axios from "axios";

const instance = axios.create({
    baseURL: 'https://s7cuai2n69.execute-api.us-east-2.amazonaws.com/',
    timeout: 1000000,
    headers: { 'Content-Type': 'application/json' }
})

export async function getOrders() {
    try {
        const response = await instance.get('orders');
        return response.json().data.Items;
    } catch (err) {
        console.log(err);
        return null;
    }
}
