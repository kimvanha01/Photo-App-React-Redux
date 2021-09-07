import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import './Header.scss';

Header.propTypes = {

};

function Header() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver();
    }, []);

    return (
        <header className="header">
            <Container>
                <Row className="justify-content-between">
                    <Col xs="auto">
                        <a className="header__link header__title"
                            href="/">
                            Mars
                        </a>
                    </Col>
                    <Col xs="auto">
                        <NavLink
                            exact
                            className="header__link"
                            to="/sign-in"
                            activeClassName="header__link--active"
                        >
                            {!isSignedIn ? 'Sign In' : firebase.auth().currentUser.displayName }
                        </NavLink>
                    </Col>
                </Row>
            </Container>
        </header>
    );
}

export default Header;