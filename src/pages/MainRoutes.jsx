import { Stack } from '@chakra-ui/react'
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import SideBar from '../components/SideBar'
import ReqAuth from '../ReqAuth'
import Editpage from './Editpage'
import Homepage from './Homepage'
import Login from './Login'
import SignUp from './SignUp'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<ReqAuth>
          <Stack direction="row">
          <SideBar/>
          <Homepage/>
          </Stack>
          </ReqAuth>}/>
          <Route path='/task/:id' element={<ReqAuth>
          <Stack direction="row">
          <SideBar/>
          <Editpage/>
          </Stack>
          </ReqAuth>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
    </Routes>
  )
}

export default MainRoutes