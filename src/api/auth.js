import { FirebaseApp } from "utils/firebase";
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export class AuthAPI {
  static async signin(email, password) {
    const response = await signInWithEmailAndPassword(
      FirebaseApp.auth,
      email,
      password
    );
    return response.user.toJSON();
  }

  static async signup(email, password) {
    const response = await createUserWithEmailAndPassword(
      FirebaseApp.auth,
      email,
      password
    );
    return response.user.toJSON();
  }
  static async signout() {
    signOut(FirebaseApp.auth);
  }
}
// The code begins by importing the necessary dependencies, including FirebaseApp from utils/firebase and authentication functions from the Firebase firebase/auth module.
// The AuthAPI class is exported, encapsulating authentication-related methods.
// The signin method performs user sign-in. It calls the signInWithEmailAndPassword function from Firebase authentication, passing the FirebaseApp.auth object, email, and password as parameters. It awaits the response and returns the user information as a JSON object.
// The signup method performs user sign-up. It calls the createUserWithEmailAndPassword function from Firebase authentication, passing the FirebaseApp.auth object, email, and password as parameters. It awaits the response and returns the user information as a JSON object.
// The signout method simply calls the signOut function from Firebase authentication, passing the FirebaseApp.auth object, to sign the user out.