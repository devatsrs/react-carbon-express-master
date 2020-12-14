import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    //console.log(config);
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {

    //grid output 
    const response_data = response.data;

    if (typeof (response_data.totalItems) === "undefined") {
        return {
            data: response_data.data,
            res: response
        };

    }

    let headerData = [];

    Object.entries(response_data.data[0]).forEach(([key, value]) => {
        if (key !== "id") {
            headerData.push({ key: key, header: key });
        }
    });
    Object.entries(response_data.data).forEach(([key, row]) => {
        response_data.data[key].id = row.id.toString();
    });
    const grid_res = {
        data: response_data.data,
        header: headerData,
        data_count: response_data.data.length,
        total_count: response_data.totalItems,
    };

    return grid_res;

}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default axios;
