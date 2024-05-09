import {DashboardPage, ForgotPasswordPage, LoginPage, RegisterPage} from "../../pages";

const appRoute = {
    dashboard: {
        path: '/',
        component: DashboardPage,
        requiredLogin: true,
    },
    login: {
        path: '/login',
        component: LoginPage,
        requiredLogin: false,
    },
    register: {
        path: '/register',
        component: RegisterPage,
        requiredLogin: false,
    },
    forgotPassword: {
        path: '/forgot-password',
        component: ForgotPasswordPage,
        requiredLogin: false,
    },
}

export default appRoute;
