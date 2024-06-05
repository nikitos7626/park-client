import Admin from "./pages/Admin"
import AddAttraction from "./pages/AddAttractions"
import { AddAttraction_route, Admin_Route, Attendance_route, Attractions_route, MainMenu_Route,Profile_route,login_route} from "./utils/consts"
import Mainmenu from "./pages/MainMenu"
import Auth from "./pages/Auth"
import Attractions from "./pages/Attractions"
import Profile from "./pages/Profile"
import Report from "./pages/Report"

export const authRoutes= [
    {
        path: Admin_Route,
        Component : Admin
    },
    {   
        path:AddAttraction_route,
        Component : AddAttraction
    },
    {
        path:Attendance_route,
        Component: Report
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
        path:Attractions_route,
        Component : Attractions
    },
    {
        path:Profile_route,
        Component : Profile
    }
]