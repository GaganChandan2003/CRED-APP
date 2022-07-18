import React,{useState} from 'react'
import { Box,Text, Checkbox,CheckboxGroup,Editable, EditablePreview,Button,RadioGroup,Radio, EditableTextarea, Flex, Input,Stack } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {addSubtasks, getTasks,updateTask} from '../redux/AppReducer/action';
import { useDispatch } from 'react-redux';
const Editpage = () => {
    const {id}=useParams();
    const dispatch=useDispatch();
    const tasks=useSelector((state)=>state.app.tasks)
    const [taskTitle, settaskTitle] = useState('');
    const [taskDescription, settaskDescription] = useState('');
    const [taskStatus, settaskStatus] = useState('');
    const [taskTags, settaskTags] = useState([]);
    const [currentSubTask, setCurrentSubTask] = useState('');
    const [subTasks, setsubTasks] = useState([]);
    const [checkbox, setcheckbox] = useState([]);
    
    
    const addSubTask=(e)=>
    {
        e.preventDefault();
        if(currentSubTask)
        {
          
            const newSubTasks=[...subTasks,{subTaskTitle:currentSubTask,status:false}] 
          dispatch(addSubTask(id,{subTasks:newSubTasks})).then(()=>dispatch(getTasks()))
          .then(()=>setCurrentSubTask(""));
        }

    };
    const updateHandler=(type,value)=>
    {
        if(type==="textAndDescription")
        {
            dispatch(updateTask(id,{
                title:taskTitle,
                description:taskDescription,
            })).then(()=>dispatch(getTasks()));
        }
        else if(type==="taskStatus")
        {
            dispatch(updateTask(id,{
                task_status:value
            })).then(()=>dispatch(getTasks()));
        }
        else if(type==="tags")
        {
            dispatch(updateTask(id,
                {
                    tags:value
                })).then(()=>dispatch(getTasks()));
        }
    }

    const updateSubTaskStatus=(checkboxValue)=>
    {
        let newData=subTasks.map((item)=>{
            if(checkboxValue.includes(item.subTaskTitle))
            {
                return{
                    ...item,status:true
                }
            }
            return {...item,status:false}
        })
        dispatch(addSubtasks(id,{subTasks:newData})).then(()=>dispatch(getTasks()));
    }
    useEffect(()=>
    {
        if(tasks.length===0){
            dispatch(getTasks());
        }
    },[dispatch,tasks.length])
    
    useEffect(()=>
    {
        if(tasks)
        {
            const currentTask=tasks.find(item=>item.id===Number(id));
            if(currentTask)
            {
                settaskTitle(currentTask.title);
                settaskDescription(currentTask.description);
                settaskStatus(currentTask.task_status);
                settaskTags(currentTask.tags);
                setsubTasks(currentTask.subTasks);
                let data=currentTask.subTasks.filter(item=>{
                    return item.status&&item.subTaskTitle;
                }).map(item=>item.subTaskTitle);
                setcheckbox(data);
            }
        }
    },[id,tasks])
    
    
  return (
    <Box border={"1px solid red"} width="100%">
        <Flex justifyContent={"space-around"}>
            <Box border={"1px solid red"} height="90vh" width="200px">
                <Box>
                    <Stack direction={"column"}>
                        <Input value={taskTitle} placeholder="Title"  onChange={(e)=>settaskTitle(e.target.value)}/>
                        <Editable value={taskDescription}>
                            <EditablePreview/>
                            <EditableTextarea value={taskDescription} onChange={(e)=>settaskDescription(e.target.value)}/>
                        </Editable>
                        <Button onClick={()=>{updateHandler("textAndDescription")}}>Update</Button>
                    </Stack>
                </Box>
                <Box>
                <RadioGroup onChange={(value)=>
                {
                    settaskStatus(value)
                    updateHandler("taskStatus",value)
                }} value={taskStatus}>
                    <Stack direction='column'>
                        <Radio value='todo'>Todo</Radio>
                        <Radio value='in-progress'>In-Progress</Radio>
                        <Radio value='done'>Done</Radio>
                    </Stack>
                </RadioGroup>
                </Box>
                <Box>
                    <Text>Tags</Text>
                    <CheckboxGroup variantColor="green" onChange={(value)=>{settaskTags(value) ;updateHandler("tags",value)}} value={taskTags}>
                        <Stack spacing={[1,5]} direction="column">
                            <Checkbox value="Official">Official</Checkbox>
                            <Checkbox value="Personal">Personal</Checkbox>
                            <Checkbox value="Others">Others</Checkbox>
                        </Stack>
                    </CheckboxGroup>
                </Box>
            </Box>
            <Box border={"1px solid blue"} height="90vh" width="350px">
                <form onSubmit={addSubTask}>
                    <Flex>
                        <Input placeholder='Add new subtask' value={currentSubTask} onChange={(e)=>setCurrentSubTask(e.target.value)}/>
                        <Button ml={"0.5rem"} type='submit'>Add</Button>
                    </Flex>
                </form>
                <Flex direction={"column"} p={"1rem"} gap={"1rem"}>
                <CheckboxGroup value={checkbox} onChange={(value)=>{setcheckbox(value);updateSubTaskStatus(value)}}>
                    {
                    subTasks.length&&subTasks.map((item,ind)=>(
                        <Flex key={ind} justifyContent={"space-between"} >
                            <Checkbox  value={item.subTaskTitle} key={ind} size="md">{item.subTaskTitle}</Checkbox>
                            <DeleteIcon/>
                        </Flex>
                    ))
                    }
                </CheckboxGroup>
                
                </Flex>
            </Box>
            <Box border={"1px solid black"} height="90vh" width="250px"></Box>
        </Flex>
    </Box>
  )
}

export default Editpage