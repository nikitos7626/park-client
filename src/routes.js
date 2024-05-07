import { Component } from "react"
import Admin from "./pages/Admin"
import AddAttraction from "./pages/AddAttractions"
import { AddAttraction_route, Admin_Route, Attractions_route, MainMenu_Route, Registration_Route, login_route } from "./utils/consts"
import Mainmenu from "./pages/MainMenu"
import Auth from "./pages/Auth"
import Attractions from "./pages/Attractions"

export const authRoutes= [
    {
        path: Admin_Route,
        Component : Admin
    },
    {
        path:AddAttraction_route,
        Component : AddAttraction
    }
]


export const publicRoutes=[
    {
        path: MainMenu_Route,
        Component : Mainmenu
    },
    {
        path:login_route,
        Component : Auth
    },
    {
        path:Registration_Route,
        Component : Auth
    },
    {
        path:Attractions_route + '/:id',
        Component : Attractions
    }

    

]