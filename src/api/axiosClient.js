import axios from 'axios';
import firebase from 'firebase';
import queryString from 'query-string';

const getFirebaseToken = async () => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) return currentUser.getIdToken();

  // Not Login
  const hasRememberedAccount = localStorage.getItem('firebaseui::rememberedAccounts');
  if (!hasRememberedAccount) return null;

  //Logged but current user is not fetched -> wait 10s
  return new Promise((resolve, reject) => {
    const waitTimer = setTimeout(() => {
      reject(null);
      console.log('Reject timeout');
    }, 10000);

    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        reject(null);
      }

      try {
        const token = await user.getIdToken();
        // console.log('[AXIOS] Logged in user token: ', token);
        resolve(token);

        unregisterAuthObserver();
        clearTimeout(waitTimer);
      } catch (error) {
        console.log(error);
      }
    });
  });

}

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),  // chuyeern object param thanh string
});



axiosClient.interceptors.request.use(async (config) => {
  const token = await getFirebaseToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }
  return response;
}, (error) => {
  // Handle errors
  throw error;
});

export default axiosClient;