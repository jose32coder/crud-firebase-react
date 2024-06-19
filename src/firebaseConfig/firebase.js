import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAO_pidCuGh_ulHmiK1ax8vhCwusSzbibA",
  authDomain: "crud-fire-react-3b671.firebaseapp.com",
  projectId: "crud-fire-react-3b671",
  storageBucket: "crud-fire-react-3b671.appspot.com",
  messagingSenderId: "143687727783",
  appId: "1:143687727783:web:581e7fb571239d15b9f982"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);