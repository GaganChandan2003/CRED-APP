import  * as types  from "./actiontypes";
import axios from 'axios'

export const register = (payload) => (dispatch) => {
    dispatch({ type: types.REGISTER_R });
    return axios
      .post("http://masai-api-mocker.herokuapp.com/auth/register", payload)
      .then((res) => {
        dispatch({ type: types.REGISTER_S, payload: res.data });
        return types.REGISTER_S;
      })
      .catch((e) => {
        dispatch({ type: types.REGISTER_F, payload: e });
        return types.REGISTER_F;
      });
  };
  export const login = (params) => (dispatch) => {
    console.log(params)
    dispatch({ type: types.LOGIN_R });
    return axios
      .post("http://masai-api-mocker.herokuapp.com/auth/login",params)
      .then((res) => {
        dispatch({ type: types.LOGIN_S, payload: res.data.token });
        return types.LOGIN_S;
      })
      .catch((e) => {
        dispatch({ type: types.LOGIN_F, payload: e });
        return types.LOGIN_F;
      });
  };