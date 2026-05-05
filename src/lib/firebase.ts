import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDVTz7SMeLu3pr8uHByF63LYWkS6bV4Wqo",
  authDomain: "it-service-c6adc.firebaseapp.com",
  projectId: "it-service-c6adc",
  storageBucket: "it-service-c6adc.firebasestorage.app",
  messagingSenderId: "181886407045",
  appId: "1:181886407045:web:86926e105dad85d007b4ec",
  measurementId: "G-2X1722HSQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

async function testConnection() {
  try {
    // Just a placeholder to check connection
    await getDocFromServer(doc(db, '_connection_test_', 'check'));
  } catch (error: any) {
    if (error?.message?.includes('the client is offline')) {
      console.error("Please check your Firebase configuration or internet connection.");
    }
  }
}

testConnection();
