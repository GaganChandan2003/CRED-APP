import { Box,Button,Flex,Stack,Text } from '@chakra-ui/react'
import React,{useState} from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {useSearchParams} from 'react-router-dom'

const SideBar = () => {
    const isAuth=useSelector((state)=>state.auth.isAuth);
    const tasks=useSelector((state)=>state.app.tasks);
    const personalTasks=tasks.filter((item)=>item.tags.includes('Personal'));
    const officaltasks=tasks.filter((item)=>item.tags.includes('Official'));
    const othersTasks=tasks.filter((item)=>item.tags.includes('Others'));
    const [searchParams,setSearchParams]=useSearchParams();
    const [selectedtag, setselectedtag] = useState(searchParams.getAll("tags")||[]);
    useEffect(()=>
    {
        if(selectedtag)
        {
            setSearchParams({tags:selectedtag});
        }
    },[selectedtag,setSearchParams])
    
    const handleChange=(tag)=>
    {
        let newSelectedTag=[...selectedtag];
        if(selectedtag.includes(tag))
        {
            newSelectedTag.splice(newSelectedTag.indexOf(tag),1)
        }
        else{
            newSelectedTag.push(tag);
        }
        setselectedtag(newSelectedTag);
    }
  return <Box border=" 1px solid red" width ="250px" height="100vh">
    <Stack direction="column">
        <Box height="15vh" border="1px solid red"></Box>
        <Box height="70vh" border="1px solid blue">
            <Flex direction="column" gap={"5px"} margin={"5px"}>
            <Box border="1px solid blue" backgroundColor={
                selectedtag.includes("All")?"blue.400":"blue.100"
            }  padding="5px 0" cursor={"pointer"} onClick={()=>{handleChange("All")}} >
                <Flex padding="0px 10px">
                    <Text>All</Text>
                    <Text marginLeft="auto">{tasks.length}</Text>
                </Flex>
            </Box>
            <Box border="1px solid blue"  padding="5px 0" backgroundColor={
                selectedtag.includes("Personal")?"green.400":"green.100"
            }  cursor={"pointer"}  onClick={()=>{handleChange("Personal")}}>
                <Flex padding="0px 10px">
                    <Text>Personal</Text>
                    <Text marginLeft="auto">{personalTasks.length}</Text>
                </Flex>
            </Box>
            <Box border="1px solid blue"  padding="5px 0" backgroundColor={
                selectedtag.includes("Official")?"purple.400":"pruple.100"
            }   cursor={"pointer"} onClick={()=>{handleChange("Official")}}>
                <Flex padding="0px 10px">
                    <Text>Official</Text>
                    <Text marginLeft="auto">{officaltasks.length}</Text>
                </Flex>
            </Box>
            <Box 
                border="1px solid blue"  
                padding="5px 0" 
                cursor={"pointer"} 
                backgroundColor={selectedtag.includes("Others")?"orange.400":"orange.100"} 
                onClick={()=>{handleChange("Others")}}>
                <Flex padding="0px 10px">
                    <Text>Others</Text>
                    <Text marginLeft="auto">{othersTasks.length}</Text>
                </Flex>
            </Box>
            </Flex>
        </Box>
        <Box height="10vh" border="1px solid red"  padding="5px 0">
            <Button width="100%">{isAuth&&"LOGOUT"}</Button>
        </Box>
    </Stack>
  </Box>
}

export default SideBar