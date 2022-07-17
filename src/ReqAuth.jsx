import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

const ReqAuth=({children})=>
{
    let location =useLocation();
    const isAuth=useSelector((state)=>state.auth.isAuth)

    if(!isAuth)
    {
        return <Navigate to={"/login"} state={{from:location}}></Navigate>
    }
    else{
        return children;
    }
}

export default ReqAuth;