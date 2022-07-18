import { Box, Flex,Text } from '@chakra-ui/react'
import React from 'react'
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {getTasks }from '../redux/AppReducer/action';
import TaskCard from './TaskCard';



const Homepage = () => {
  const [searchParams] =useSearchParams();
  const dispatch=useDispatch();
  const tasks=useSelector((state)=>state.app.tasks);
  const getTaskHandler=useCallback(()=>
  {
     dispatch(getTasks());
  },[dispatch])

  useEffect(()=>
  {
    if(tasks.length===0)
    {
      getTaskHandler();
    }
  },[getTaskHandler,tasks.length])

  const filterByParamsTags=(task)=>
  {
    const paramsTags=searchParams.getAll('tags');
    if(paramsTags.includes("All")||paramsTags.length===0)
    {
      return task;
    }
    const data=task.tags.filter((tag)=>{
      if(paramsTags.includes(tag))
      {
        return true;
      }
      return false;
    });
    if(data.length)
    {
      return task;
    }
    return false
  }
  return <Box border="1px solid green" width="100%">
    <Flex justifyContent="space-between">
      <Box border="1px solid black" width="250px" height="95vh">
        <Box>
          <Text textAlign="center">Todo</Text>
        </Box>
        {
          tasks.length>0&&
          tasks.filter((item)=>item.task_status==="todo")
          .filter(filterByParamsTags)
          .map((item)=>
          {
            return <TaskCard key={item.id} {...item} colorScheme="green"/>
          })
        }
      </Box>
      <Box border="1px solid black" width="250px" height="95vh">
        <Box>
            <Text textAlign="center">In Progress</Text>
          </Box>
          {
          tasks.length>0&&
          tasks.filter((item)=>item.task_status==="in-progress")
          .filter(filterByParamsTags)
          .map((item)=>
          {
            return <TaskCard key={item.id} {...item}colorScheme="orange"/>
          })
        }
        </Box>
      <Box border="1px solid black" width="250px" height="95vh">
        <Box>
            <Text textAlign="center">Done</Text>
        </Box>
        {
          tasks.length>0&&
          tasks.filter((item)=>item.task_status==="done")
          .filter(filterByParamsTags)
          .map((item)=>
          {
            return <TaskCard key={item.id} {...item} colorScheme="blue"/>
          })
        }
      </Box>
    </Flex>
  </Box>
}

export default Homepage