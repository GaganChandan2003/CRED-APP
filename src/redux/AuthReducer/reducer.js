import { getLocalData, localData } from "../../utlits/localstroage";
import { LOGIN_F, LOGIN_R, LOGIN_S, REGISTER_F, REGISTER_R, REGISTER_S } from "./actiontypes";

const initialState={
    isAuth:getLocalData("token")? true:false,
    token:getLocalData("token")||"",
    isLoading:false,
    isError:false
}


export const reducer=(state=initialState,{type,payload})=>
{
    switch(type){
        case REGISTER_R:
            {
                return {...state,isLoading:true,isError:false}
            }
            case REGISTER_S:
            {
                    return{...state,isLoading:false,isError:false}
            }
            case REGISTER_F:
            {
                return {...state,isLoading:false,isError:true}
            }
            case LOGIN_R:
            {
                return{...state,isLoading:true,isError:false}
            }
            case LOGIN_S:
                {
                    localData("token",payload)
                    return{...state,isLoading:false,isError:false,token:payload,isAuth:true}
                }
            case LOGIN_F:
                {
                    return{...state,isLoading:false,isError:true}
                }
        default:
            {
                return state;
            }
    }
}