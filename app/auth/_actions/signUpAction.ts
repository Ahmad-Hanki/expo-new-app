import { auth } from "@/config/firebaseConfig";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface SignUpActionProps {
  name: string;
  email: string;
  password: string;
}

const signUpAction = async ({ name, email, password }: SignUpActionProps) => {
  try {
    if (!email || !name || !password) {
      console.error("name. email and password are required");
      return 0;
    }

    const account = await createUserWithEmailAndPassword(auth, email, password);

    if (!account.user) {
      console.error("No user account found");
      return 0;
    }

    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_ENDPOINT}/api/auth/signup`,
      {
        name,
        email,
        firebaseId: account.user.uid,
      }
    );
    console.log("Sign up response", await response.data);
    return response.status;
  } catch (error) {
    console.error("Error signing up", error);
    return 0;
  }
};

export default signUpAction;
