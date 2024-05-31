import { auth } from "../firebase/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useLogout = () => {
  const [signOut, isLoggingOut] = useSignOut(auth);
  const showToast = useShowToast();
  const logoutUser = useAuthStore((state) => state.logout);
  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      logoutUser();
      showToast("Success", "You have been logged out.", "success");
    } catch (error) {
      console.error("Logout error:", error);
      showToast("Error", error.message, "error");
    }
  };

  return { handleLogout, isLoggingOut };
};

export default useLogout;
