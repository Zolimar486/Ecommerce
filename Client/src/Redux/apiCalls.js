import {logingStart, logingSuccess, logingFailure} from './userRedux';

import { publicRequest } from '../requestMethod';

export const login = async(dispatch, user) => {
    dispatch(logingStart());
    try{
        const res = await publicRequest.post('/auth/login', user) /// user, means all the user information, username, email, password, that is in the login component
        dispatch(logingSuccess(res.data, window.location.replace("/"))) // this logginSucces contains the action.payload in the userReducer, so res.data is the action payload, so the user information

 
    }catch(err) {
        dispatch(logingFailure());
    }

}