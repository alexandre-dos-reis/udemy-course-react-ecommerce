// https://firebase.google.com/docs/firestore/quickstart?authuser=0#web-version-9_1
// https://firebase.google.com/docs/auth/web/google-signin

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";

const config = {
  apiKey: "AIzaSyDZPczKg3Tl0qnC6xI7UUuBYP0dlIVOVCo",
  authDomain: "udemy-course-crown-db.firebaseapp.com",
  projectId: "udemy-course-crown-db",
  storageBucket: "udemy-course-crown-db.appspot.com",
  messagingSenderId: "989478773520",
  appId: "1:989478773520:web:bef944afcfd041d757bb95"
};

const app = initializeApp(config);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () =>
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(firestore, `users/${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (e) {
      console.log("Error creating user", e.message);
    }
  }

  return userRef;
};
