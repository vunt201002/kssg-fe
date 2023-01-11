import axios from 'axios';
import { apiURL } from '../config';
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from './authSlice';
import { addPatientSuccess, getImageSuccess } from "./userSlice";

const { REACT_APP_ENV } = process.env;
const baseURL = REACT_APP_ENV === "PROD" ? apiURL.prod : apiURL.dev; 

export const loginUser = async(user, dispatch, navigate) => {
    dispatch(loginStart());

    try {
        const res = await axios.post( baseURL + "/v1/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/patientslist");
        return;

    } catch (err) {
        dispatch(loginFailed());
        return err.response;
    }
};

export const registerUser = async(user, dispatch, navigate) => {
    dispatch(registerStart());

    try {
        await axios.post(baseURL + "/v1/auth/register", user);
        dispatch(registerSuccess());
        navigate("/");
    } catch (err) {
        dispatch(registerFailed());
    }
};

export const addPatients = async(user, newPatient, dispatch) => {
    try {
        const res = await axios.put(baseURL + `/v1/user/addpatient/${user._id}`, newPatient);
        dispatch(addPatientSuccess(res.data));
    } catch (err) {
        console.error(err);
    }
};

export const getImages = async(id, pid, dispatch, newImage) => {
    try {
        const res = await axios.patch(baseURL + `/v1/user/getimage/${id}/${pid}`, newImage);
        dispatch(getImageSuccess(res.data));
    } catch (err) {
        console.error(err);
    }
};