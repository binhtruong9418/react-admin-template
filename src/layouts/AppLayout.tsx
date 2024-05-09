import {Navigate, Route, Routes, useLocation,} from "react-router-dom";
import {PrivateLayout} from "./index.ts";
import {JWT_LOCAL_STORAGE_KEY} from "../config/constant";
import {NotFoundPage} from "../pages";
import appRoute from "../config/routes/appRoute.ts";
import {useLocalStorage} from "@uidotdev/usehooks";

const AppLayout = () => {
    const location = useLocation();
    const [token = ''] = useLocalStorage(JWT_LOCAL_STORAGE_KEY, '');
    return (
        <Routes>
            <Route>
                {Object.values(appRoute).map(
                    ({path, component: Component, requiredLogin}) => (
                        !requiredLogin && (
                            <Route
                                key={path}
                                element={
                                    !token ? (
                                        <Component/>
                                    ) : (
                                        <Navigate to={appRoute.dashboard.path} replace={true}/>
                                    )
                                }
                                path={path}
                            />
                        )
                    )
                )}
            </Route>

            <Route element={<PrivateLayout/>}>
                {Object.values(appRoute).map(
                    ({path, component: Component, requiredLogin}) => (
                        requiredLogin && (
                            <Route
                                key={path}
                                element={
                                    token && location.pathname === path ? (
                                        <Component/>
                                    ) : (
                                        <Navigate to={appRoute.login.path}/>
                                    )
                                }
                                path={path}
                            />
                        )
                    )
                )}
            </Route>

            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
};

export default AppLayout;
