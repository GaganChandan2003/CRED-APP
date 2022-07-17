import { GET_TASK_S,GET_TASK_R,GET_TASK_F } from "./actiontype";
const initialState={
    tasks:[],
    isLoading:false,
    isError:false
}

export const reducer=(state=initialState,{type,payload})=>
{
    switch(type){
        case GET_TASK_R:
            {
                return{
                    ...state,isLoading:true,isError:false
                }
            }
        case GET_TASK_S:
            {
                return{
                    ...state,isLoading:false,isError:false,tasks:payload
                }
            }
        case GET_TASK_F:
            {
                return{
                    ...state,isLoading:false,isError:true
                }
            }
        default:
            {
                return state;
            }
    }
}