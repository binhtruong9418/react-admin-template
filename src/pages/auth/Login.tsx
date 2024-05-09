import "./login.css";
import {Button, Form, Image, Input} from "antd";
import Logo from '../../assets/react.svg'
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";
import {isValidEmail} from "../../helper/utils";
import {useLocalStorage} from "@uidotdev/usehooks"
import {JWT_LOCAL_STORAGE_KEY} from "../../config/constant";
import toast from "react-hot-toast";

const Login = () => {
    const [form] = Form.useForm();
    const {t} = useTranslation()
    const navigate = useNavigate()
    const [, setJwtToken] = useLocalStorage(JWT_LOCAL_STORAGE_KEY, '');
    const handleLogin = async (values: {email: string, password: string}) => {
        const {email} = values
        // add your code here
        if(!isValidEmail(email)) {
            form.setFields([
                {
                    name: 'email',
                    errors: [t('The input is not valid E-mail!')],
                }
            ])
        }

        setJwtToken('test-token')
        toast.success(t('Login successfully!'))

        navigate('/')
    }
    return (
        <main className="login-page">
            <div className="login-card">
                <div className="login-card-header">
                    <div>
                        <Image width={200} src={Logo} preview={false}/>
                    </div>
                    <div className="login-title">{t('Welcome')}</div>
                    <p className="login-description">{t("Login with your account to continue!")}</p>
                </div>
                <Form
                    form={form}
                    name="login"
                    layout="vertical"
                    onFinish={handleLogin}
                >
                    <Form.Item
                        style={{
                            marginBottom: "2.5rem",
                        }}
                        label={<span className="text-base font-medium">{t("Email")}</span>}
                        name="email"
                        rules={[
                            {required: true, message: t("Please input your email!")},
                        ]}
                    >
                        <Input placeholder={t("Email")} className="login-form-input border-black"/>
                    </Form.Item>

                    <Form.Item
                        label={<span className="text-base font-medium">{t("Password")}</span>}
                        name="password"
                        rules={[
                            {required: true, message: t("Please input your password!")},
                        ]}
                    >
                        <Input.Password
                            placeholder={t("Password")}
                            className="login-form-input border-black"
                        />
                    </Form.Item>
                </Form>
                <Link to={'/forgot-password'} className={'text-sm'}>
                    Forgot password?
                </Link>
                <Button
                    type="primary"
                    onClick={form.submit}
                    className="login-btn bg-black mt-3"
                    size="large"
                >
                    {t("Login")}
                </Button>
                <div className={'mt-3 text-center'}>
                    <span className={'text-sm'}>{t("Don't have an account?")}</span>
                    <Link to={'/register'} className={'text-blue-500 text-sm'}>
                        {t(" Register")}
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Login;
