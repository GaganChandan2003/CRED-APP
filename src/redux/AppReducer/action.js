import * as types from './actiontype';
import axios from "axios";

const getTasks=()=>(dispatch)=>
{
    dispatch({type:types.GET_TASK_R})
    return axios.get("http://localhost:8080/tasks")
    .then((res)=>{dispatch({type:types.GET_TASK_S,payload:res.data})})
    .catch((err)=>dispatch({type:types.GET_TASK_F}))
}

const updateTask=(id,payload)=>(dispatch)=>
{
  dispatch({type:types.UPDATE_TASK_R});
  return axios.patch(`http://localhost:8080/tasks/${id}`,payload)
  .then((res)=>{dispatch({type:types.UPDATE_TASK_S,payload:res.data})})
  .catch((e)=>{dispatch({type:types.UPDATE_TASK_F})})

}

const addSubtasks=(id,payload)=>(dispatch)=>
{
    dispatch({type:types.ADD_SUBTASK_R});
    return axios.patch(`http://localhost:8080/tasks/${id}`,payload) 
    .then((res)=>{dispatch({type:types.ADD_SUBTASK_S,payload:payload})})
    .catch((res)=>{dispatch({type:types.ADD_SUBTASK_F})})
};


const deleteSubTasks=(id,payload)=>(dispatch)=>
{
  dispatch({type:types.DELETE_SUBTASK_R});
  return axios.patch(`http://localhost:8080/tasks/${id}`,payload)
  .then((res)=>{dispatch({type:types.DELETE_SUBTASK_S,payload:res})})
  .catch((res)=>{dispatch({type:types.DELETE_SUBTASK_F})})
}
export {getTasks,updateTask,addSubtasks,deleteSubTasks};