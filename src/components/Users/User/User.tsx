import React from 'react';
import classes from './User.module.css';
// @ts-ignore
// import Avatar from '../../../images/avatar.placeholder.png';
import {Link, NavLink} from 'react-router-dom';
import {TUser} from '../../../types/types';
import { Skeleton, Switch, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

type PropsType = {
    user: TUser

    followingProgressQueue: Array<number>
    followUser: (user_id: number) => void
    unfollowUser: (user_id: number) => void
}
const User: React.FC<PropsType> = ({user, ...props}) => {
    const onFollow = () => {
        props.followUser(user.id);
    };
    const onUnfollow = () => {
        props.unfollowUser(user.id);
    };
    let isDisabled = props.followingProgressQueue.some(id => id === user.id);


    const FollowButton = () => {
        return(
            user.followed ? <button disabled={isDisabled} onClick={onUnfollow}>unfollow</button> :
                    <button disabled={isDisabled} onClick={onFollow}>follow</button>
        )
    }
    return <Card
        style={{ width: 300, marginTop: 16 }}
        actions={[
            <FollowButton/>,
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
        ]}
    >
        <Skeleton loading={!user} avatar active>
            <Meta
                avatar={<Link to={`/profile/${user.id}`} className={classes.avatar}>
                    <Avatar src="https://joeschmoe.io/api/v1/random"/>
                </Link>}
                title={user.name}
                description={<div>
                    {user.status}
                    <div>
                        <div>{"props.location.country"}</div>
                        <div>{"props.location.city"}</div>
                    </div>
                </div>}
            />
        </Skeleton>
    </Card>
    // <div className={classes.user}>
    //     <div className={classes.column}>
    //         <NavLink to={`/profile/${user.id}`} className={classes.avatar}>
    //             <img className={classes.avatarImage} src={user.photos.small || Avatar} alt={'avatar'}/>
    //         </NavLink>
    //         {user.followed ? <button disabled={isDisabled} onClick={onUnfollow}>unfollow</button> :
    //             <button disabled={isDisabled} onClick={onFollow}>follow</button>}
    //     </div>
    //     <div className={classes.row}>
    //         <div className={classes.column}>
    //             <div>{user.name}</div>
    //             <div>{user.status}</div>
    //         </div>
    //         {/*<div>*/}
    //         {/*    <div>{props.location.country}</div>*/}
    //         {/*    <div>{props.location.city}</div>*/}
    //         {/*</div>*/}
    //     </div>
    // </div>;
};

export default User;