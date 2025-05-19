import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAz78Mk72gKPTaxJAFQCWZJNaO-n-wfKww",
  authDomain: "vesti-c220a.firebaseapp.com",
  projectId: "vesti-c220a",
  storageBucket: "vesti-c220a.firebasestorage.app",
  messagingSenderId: "848928284121",
  appId: "1:848928284121:web:66718b09329e9b26738dc8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth }