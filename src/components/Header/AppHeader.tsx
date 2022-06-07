import React from 'react';
// @ts-ignore
import Logo from '../../images/logo.png';
import classes from './Header.module.css';
import {NavLink} from 'react-router-dom';
import {Avatar, Col, Row, Typography} from "antd";
import {Header} from "antd/lib/layout/layout";
import {useDispatch, useSelector} from "react-redux";
import {TThunkDispatch} from "../../redux/reduxStore";
import {logout} from '../../redux/authReducer';
import {selectIsAuth, selectLogin} from "../../redux/authSelectors";

const { Text, Link } = Typography;
const AppHeader: React.FC<{}> = () => {
    const login = useSelector(selectLogin)
    const isAuth = useSelector(selectIsAuth)
    const dispatch:TThunkDispatch = useDispatch()
    const onLogout = () => {
        dispatch(logout)
    }
    return (
        <Header className="site-layout-background" style={{ padding: 0 }}>
            <Row>
                <Col span={20}>
                    <img className={classes.logo} src={Logo} alt=""/>
                </Col>
                <Col span={4}>

                    {isAuth ? <div>
                        <Avatar src="https://joeschmoe.io/api/v1/random"/>
                        <Text style={{color: 'white'}}>{login}</Text>
                        <button onClick={onLogout}>logout</button>
                    </div> : <NavLink to={'/login'}>Login</NavLink>}
                </Col>


            </Row>

        </Header>
    );
};

export default AppHeader;