import axios from 'axios';
import UrlData from '../UrlData';

export const GetAllDesignation = () => {
    return axios({
        method: "get",
        url: new URL(UrlData + 'DesignationMaster/GetAll?status=1'),
    })
    .then((response) => {
        console.log("response", response.data.data);
        return response.data.data;
    })
    .catch((error) => {
        console.log(error);
        return [];
    });
};

export const getAllDepartment = () => {
    return axios({
        method: "get",
        url: new URL(UrlData + 'DepartmentMaster/GetAll?status=1'),
    })
    .then((response) => {
        console.log("response", response.data.data);
        return response.data.data;
    })
    .catch((error) => {
        console.log(error);
        return [];
    });
};