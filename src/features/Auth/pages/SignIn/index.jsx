import Banner from 'components/Banner';
import Images from 'constants/images';
import LoginForm from 'features/Auth/components/LoginForm';
import firebase from 'firebase';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useHistory } from 'react-router';
import { Button } from 'reactstrap';
import './SignIn.scss';

SignIn.propTypes = {

};

const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/photos',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
};
const handleLogoutSubmit = () => {
  return firebase.auth().signOut();
}

function SignIn({ setToken }) {

  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver();
  }, []);

  const history = useHistory();
  const initialValues = {
    email: '',
    password: ''
  }

  const handleSubmit = (values) => {

    return new Promise(resolve => {
      console.log('Form submit: ', values);

      setTimeout(() => {
        const formValue = {
          ...values,
        }
        const token = queryString.stringify(formValue);
        console.log(token);
        // setToken(token);
        localStorage.setItem('token', token);
        history.push('/photos');
        resolve(true);

      }, 2000);
    });
  }

  return (
    <div>
      <Banner title="🎉 Join With Us 🎉" backgroundUrl={Images.BLUE_BG} />
      {!isSignedIn ?
        <div className="login-body">
          <h2>Login Form</h2>

          <LoginForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
          />

          <p>or login with</p>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div >
        :
        <div className="user-profile">
          <h2>Hello {firebase.auth().currentUser.displayName}</h2>
          <p>Email: {firebase.auth().currentUser.email} </p>
          <div className="user-profile__img">
            <p>Avatar:</p>
            <img src={firebase.auth().currentUser.photoURL} alt="Avatar" />
          </div>

          <Button color="danger" onClick={handleLogoutSubmit}>Logout</Button>
        </div>
      }
    </div >
  )
}

export default SignIn;