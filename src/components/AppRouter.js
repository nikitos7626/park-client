import React from "react";
import { Routes, Route,Navigate} from 'react-router-dom'
import { authRoutes, publicRoutes} from "../routes";

const AppRouter = () => {
    const isAuth = false;

    return (
        <Routes>
            {isAuth === true && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
             {!isAuth && <Route path="*" element={<Navigate to="/" />} />}
        </Routes>
    )
}

export default AppRouter;
