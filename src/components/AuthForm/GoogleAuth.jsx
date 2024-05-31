import { Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";

const GoogleAuth = ({ prefix }) => {
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.loginUser);

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }
      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        //if user is login with google
        const userDoc = userSnap.date();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      } else {
        //if user is new user or new user or sign up
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          username: newUser.user.email.split("@")[0],
          fullName: newUser.user.displayName,
          bio: "",
          profilePicURL: newUser.user.photoURL,
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };

        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);

        // Store user data in local storage (consider using tokens instead)
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      cursor={"pointer"}
      onClick={handleGoogleAuth}
    >
      <Image src="/google.png" w={5} alt="Google logo" />
      <Text mx={2} color={"blue.500"}>
        {prefix} in with Google
      </Text>
    </Flex>
  );
};

export default GoogleAuth;
