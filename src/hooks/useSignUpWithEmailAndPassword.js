import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, firestore } from "/src/firebase/firebase.js";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { useEffect } from "react";

const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  useEffect(() => {
    if (error) {
      showToast("Error", error.message, "error");
    }
  }, [error, showToast]);

  const signup = async (inputs) => {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.username ||
      !inputs.fullname
    ) {
      showToast("Error", "Please fill all the fields", "error");
      return;
    }
    //username authentication
    const userRef = collection(firestore, "users");
    const q = query(userRef, where("username", "==", inputs.username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      showToast("Error", "Username already exists", "error");
    }

    //  below try catch checks user only with email
    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (!newUser) {
        showToast("Error", "Failed to create user", "error");
        return;
      }

      const userDoc = {
        uid: newUser.user.uid,
        email: inputs.email,
        username: inputs.username,
        fullname: inputs.fullname,
        bio: "",
        profilePicURL: "",
        followers: [],
        following: [],
        posts: [],
        createdAt: Date.now(),
      };

      await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);

      // Store user data in local storage (consider using tokens instead)
      localStorage.setItem("user-info", JSON.stringify(userDoc));
      loginUser(userDoc);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
