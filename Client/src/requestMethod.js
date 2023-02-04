import axios from 'axios';

const BASE_URL="https://ecommerce-qmhd.onrender.com/api/"

const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?.accessToken || "";


export const publicRequest = axios.create({  ///// to Fetch data, and login process
    baseURL: BASE_URL,
});

export const userRequest = axios.create({  /// to create order id from the stripe payment
    baseURL: BASE_URL,
    headers: {token:`Bearer ${TOKEN}`}
});

