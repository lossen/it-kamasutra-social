import 'antd/dist/antd.css';
import './App.css';
import {NavLink, Route, Routes} from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {initialisedSuccessfulThunkCreator} from './redux/appReducer';
import Loader from './components/common/Loader/Loader';
import {withSuspense} from './components/hocs/WithSuspense/WithSuspense';
import {AppStateType, TThunkDispatch} from './redux/reduxStore';
import type {MenuProps} from 'antd';
import {Breadcrumb, Button, Layout, Menu} from 'antd';
import {DesktopOutlined, UserOutlined,} from '@ant-design/icons';
import {ProfileTwoTone, SettingOutlined, ShakeOutlined} from "@ant-design/icons/lib/icons";
import AppHeader from "./components/Header/AppHeader";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Profile', '1',  <NavLink to="/profile"><ProfileTwoTone /></NavLink>),
    getItem('Dialogs', '2', <NavLink to="/dialogs"><DesktopOutlined /></NavLink>),
    getItem('News', '3', <NavLink to="/news"><DesktopOutlined /></NavLink>),
    getItem('Users', '4', <NavLink to="/users"><UserOutlined /></NavLink>),
    getItem('Music', '5', <NavLink to="/music"><ShakeOutlined /></NavLink>),
    getItem('Settings', '6', <NavLink to="/settings"><SettingOutlined /></NavLink>),
    // getItem('User', 'sub1', <UserOutlined />, [
    //     getItem('Tom', '3'),
    //     getItem('Bill', '4'),
    //     getItem('Alex', '5'),
    // ]),
    // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    // getItem('Files', '9', <FileOutlined />),
];

const DialogsContainer = withSuspense(React.lazy(() => import('./components/Dialogs/DialogsContainer')));
const ProfileContainer = withSuspense(React.lazy(() => import('./components/Profile/ProfileContainer')));
const UsersPage = withSuspense(React.lazy(() => import('./components/Users/UsersPage')));
const App:React.FC = (props) => {
    useEffect(() => {
       dispatch(initialisedSuccessfulThunkCreator())
    },[])
    const [collapsed, setCollapsed] = useState(false);
    const dispatch:TThunkDispatch = useDispatch()
    const initialised = useSelector((state:AppStateType) => state.app.initialised)

    if (!initialised) {
        return <Loader isFetching/>;
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <AppHeader/>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                        <Routes>
                            <Route path="/profile/:user_id"
                                   element={<ProfileContainer/>}/>
                            <Route path="/profile/"
                                   element={<ProfileContainer/>}/>
                            <Route path="/dialogs/*"
                                   element={<DialogsContainer/>}/>
                            <Route path="/users/*"
                                   element={<UsersPage/>}/>
                            <Route path="/login/*"
                                   element={<LoginPage/>}/>
                            <Route path="*" element={<div>404 NOT FOUND
                                <Button type={'primary'}>OK</Button></div>}/>
                        </Routes>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
)
}

export default App;
