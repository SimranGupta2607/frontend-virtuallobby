import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isLogin } from '../Utils';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogin() && restricted ?
                <Navigate to="/profile/folders" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;