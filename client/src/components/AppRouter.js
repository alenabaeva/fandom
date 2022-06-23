import React, { useContext } from "react";
import {Route, Routes, Navigate} from 'react-router-dom'
import { Context } from "..";
import { publicRoutes } from "../routes";
import { SERIAL_ROUTE } from "../utils/consts";

const AppRouter = () => {
    const {user} = useContext(Context)

    console.log(user)
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component} exact/>
            )}
            <Route path="*" element={<Navigate to={SERIAL_ROUTE}/>} />
        </Routes>
    );
};

export default AppRouter;