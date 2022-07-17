import { Badge, Stack ,Text,Box, Flex, CheckboxGroup, Checkbox} from '@chakra-ui/react'
import React from 'react'
import {EditIcon} from "@chakra-ui/icons"
import { useState } from 'react'
import { Link } from 'react-router-dom'
const TaskCard = ({
     id,
     title,
     description,
     tags,
     colorScheme="green",
     subTasks
    }) => {

      const [checkbox, setcheckbox] = useState(()=>
      {
        let data=subTasks.filter(item=>{
          return item.status&&item.subTaskTitle
        }).map(item=>item.subTaskTitle)
        return data;
      });
      
  return <Box width="230px" padding="10px" border="1px solid red" margin="auto">
    
    <Flex  justifyContent={"space-between"}>
    <Text>{title}</Text>
    <Link to={`/task/${id}`}><EditIcon/></Link>
    </Flex>
    <Box>
        <Stack direction={"row"}>
            {
                tags.length && tags.map((el,ind)=>
                {
                    return (<Badge key={ind} colorScheme={colorScheme}>{el}</Badge>)
                })
            }
        </Stack>
    </Box>
    <Text>{description}</Text>
    <Box>
      <CheckboxGroup value={checkbox}>
        {
          subTasks.length&&subTasks.map((item,ind)=>(
            <Checkbox  value={item.subTaskTitle} key={ind} size="md">{item.subTaskTitle}</Checkbox>
          ))
        }
      </CheckboxGroup>
    </Box>
  </Box>
}

export default TaskCard