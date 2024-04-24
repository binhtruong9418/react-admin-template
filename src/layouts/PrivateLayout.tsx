import React, {useEffect, useState} from "react";
import type {MenuProps} from "antd";
import {Layout, Menu} from "antd";
import './index.css';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {AppHeader} from "../components";
import {BiCategory} from "react-icons/bi";
import {FaChalkboardTeacher, FaRegUser} from "react-icons/fa";
import {IoMdAdd, IoMdHome} from "react-icons/io";
import {CiBoxList} from "react-icons/ci";
import Logo from '../assets/react.svg'
import {useWindowSize} from "@uidotdev/usehooks";

const {Header, Content, Sider} = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const itemRoute = {
    "1": "/",
    "2": "/category",
    "3.1": "/courses",
    "3.2": "/courses/add",
    "4": "/users",
}

const PrivateLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeKey, setActiveKey] = useState(["1"]);
    const [openKey, setOpenKey] = useState<any[] | undefined>(undefined);
    const navigate = useNavigate()
    //sync current route with menu
    const location = useLocation();
    const currentRoute = location.pathname;

    const {width} = useWindowSize();


    const items: MenuItem[] = [
        getItem("Home", "1", <IoMdHome/>),
        getItem("Menu 1", "2", <BiCategory/>),
        getItem("Menu 2", "3", <FaChalkboardTeacher/>, [
            getItem("Sub Menu 1", "3.1", <CiBoxList/>),
            getItem("Sub Menu 2", "3.2", <IoMdAdd/>),
        ]),
        getItem("Menu 3", "4", <FaRegUser/>)
    ];


    useEffect(() => {
        const currentKey = Object.keys(itemRoute).find(key => itemRoute[key as keyof typeof itemRoute] === currentRoute)
        if (currentKey) {
            if (currentKey.includes(".")) {
                const parentKey = currentKey.split(".")[0]
                setOpenKey([parentKey])
            }
            setActiveKey([currentKey])
        } else {
            setActiveKey(["0"])
        }
    }, [currentRoute]);

    return (
        <Layout hasSider className='app-layout'>
            <Sider
                breakpoint='lg'
                collapsible
                collapsedWidth="0"
                collapsed={collapsed}
                onCollapse={() => setCollapsed(!collapsed)}
                trigger={null}
                style={{
                    display: collapsed ? "none" : "block",
                    overflow: "hidden",
                    height: "98vh",
                    position: "fixed",
                    left: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    borderRadius: "1rem",
                    zIndex: 2000,
                }}
            >
                <div className="logo-vertical" style={{
                    justifyContent: "space-between",
                }}>
                    <img
                        onClick={() => {
                            navigate("/")
                        }}
                        src={Logo}
                        alt="logo"
                        style={{
                            width: 35,
                            height: 35,
                            objectFit: "cover",
                            cursor: "pointer",
                        }}
                    />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={activeKey}
                    selectedKeys={activeKey}
                    openKeys={openKey}
                    items={items}
                    style={{
                        height: "100%",
                        borderRadius: "1rem",
                        background: "#111 !important",
                    }}
                    onSelect={(item) => {
                        setActiveKey([item.key as string]);
                        navigate(itemRoute[item.key as string as keyof typeof itemRoute])
                    }}
                    onOpenChange={(keys) => {
                        setOpenKey(keys as any)
                    }}
                    className="menu"
                />
            </Sider>
            <Layout
                className="site-layout min-h-screen"
                style={{background: "#ebebeb",}}
                onClick={() => {
                    if (!collapsed && width && width < 768) {
                        setCollapsed(true)
                    }
                }}
            >
                <Header className="header">
                    <AppHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
                </Header>
                <Content
                    style={{
                    marginLeft: 22,
                }}>
                    <div style={{
                        paddingTop: 16,
                        paddingRight: 24,
                    }}>
                        <Outlet/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );

};

export default PrivateLayout;
