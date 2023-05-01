import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDsaUS7V91o_-Kf-acRq9hvVm1N68GWgPo',
  authDomain: 'blog-app-b53ae.firebaseapp.com',
  projectId: 'blog-app-b53ae',
  storageBucket: 'blog-app-b53ae.appspot.com',
  messagingSenderId: '959441917928',
  appId: '1:959441917928:web:51e46965bf5363ea1d765d',
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();
const timestamp = firebase.firestore.Timestamp;

export { projectAuth, projectFirestore, projectStorage, timestamp };
