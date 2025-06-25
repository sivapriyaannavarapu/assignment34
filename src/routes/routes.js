import { Children, lazy } from "react"

const Login = lazy(()=> import("../components/Login"));
const Student = lazy(()=> import("../components/Student"));

export const routes = [

    {
        path:"/login",
        element:<Login/>,
    },
    {
        path:'/student',
        element:<Student/>,
        Children:[{

        }]
    }

]