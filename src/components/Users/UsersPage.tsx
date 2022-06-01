import {useSelector} from 'react-redux';
import React from 'react';
import Users from './Users';
import Loader from '../common/Loader/Loader';
import {getIsFetching} from '../../redux/usersSelectors';

const UsersPage = () => {
    const isFetching = useSelector(getIsFetching)
    return(
      <>
          <Loader isFetching={isFetching}/>
          <Users/>
      </>
  )
}

export default UsersPage;