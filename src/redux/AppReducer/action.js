import * as types from './actiontype';
import axios from "axios";

const getTasks=()=>(dispatch)=>
{
    dispatch({type:types.GET_TASK_R})
    return axios.get("http://localhost:8080/tasks")
    .then((res)=>{dispatch({type:types.GET_TASK_S,payload:res.data})})
    .catch((err)=>dispatch({type:types.GET_TASK_F}))
}
export default getTasks;