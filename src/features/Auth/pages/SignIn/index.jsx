import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
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
function SignIn() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
      const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
          setIsSignedIn(!!user);
      });
      return () => unregisterAuthObserver();
  }, []);
  if(!isSignedIn){
    return (
      <div>
        <div className="text-center">
          <h2>Login Form</h2>
  
          <p>or login with social accounts</p>
        </div>
  
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
  return(
    <div className="user-profile">
      <h2>Hello {firebase.auth().currentUser.displayName}</h2>
      <p>Email: {firebase.auth().currentUser.email} </p>
      <div className="user-profile__img">
        <p>Avatar:</p>
        <img src={firebase.auth().currentUser.photoURL} alt="Avatar" />
      </div>
      
      <Button onClick={handleLogoutSubmit}>Logout</Button>
    </div>
  )
}

export default SignIn;