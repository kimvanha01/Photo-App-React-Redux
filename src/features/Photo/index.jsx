import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch
  } from "react-router-dom";


import NotFound from 'components/NotFound';
import MainPage from './pages/Main';
import AddEditPage from './pages/AddEdit';

Photo.propTypes = {
    
};

function Photo(props) {
    const match = useRouteMatch();
    console.log({match});

    return (
        <Switch>
            <Route exact path={match.url} component={MainPage} />

            <Route  path={`${match.url}/add`} component={AddEditPage} />
            <Route path={`${match.url}/:photoId`} component={AddEditPage} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default Photo;