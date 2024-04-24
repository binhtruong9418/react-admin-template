import {
    Navigate,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import {PrivateLayout} from "./index.ts";
import {useMemo} from "react";
import {JWT_LOCAL_STORAGE_KEY} from "../helper/constant";
import {NotFoundPage} from "../pages";
import appRoute from "../routes/appRoute.ts";

const AppLayout = () => {
    const location = useLocation();
    const authed = useMemo(
        () => {
            return !!window.localStorage.getItem(JWT_LOCAL_STORAGE_KEY)
        },
        [location.pathname]
    );
    return (
        <Routes>
            <Route>
                {Object.values(appRoute).map(
                    ({path, component: Component, requiredLogin}) => (
                        !requiredLogin && (
                            <Route
                                key={path}
                                element={
                                    !requiredLogin && !authed ? (
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
                                    authed ? (
                                        <Component/>
                                    ) : (
                                        <Navigate to="/login"/>
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
