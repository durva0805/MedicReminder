import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyC5gwIIZxf4PFAJoACcqXysUSQHdufeygw",
    authDomain: "medicreminder.firebaseapp.com",
    databaseURL: "https://medicreminder-default-rtdb.firebaseio.com",
    projectId: "medicreminder",
    storageBucket: "medicreminder.firebasestorage.app",
    messagingSenderId: "1074904948452",
    appId: "1:1074904948452:web:65bf85fb1bdf6a2ed296f1"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
