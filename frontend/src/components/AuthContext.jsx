import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isGuest: false,
  loading: true,
  signup: async () => {},
  login: async () => {},
  loginWithGoogle: async () => {},
  completeGoogleProfile: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Slight delay to prevent race condition if they just signed up via Email/Password
          await new Promise((resolve) => setTimeout(resolve, 800));

          // Fetch extra profile data from firestore
          const docRef = doc(db, "users", firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setUser({ ...firebaseUser, ...docSnap.data(), isGuest: false, needsProfile: false });
          } else {
            // If no doc exists, they might have just logged in with Google for the first time
            setUser({ ...firebaseUser, isGuest: false, needsProfile: true });
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
          // If Firestore is not enabled or permission denied, sign out so they don't get stuck
          await signOut(auth);
          setUser(null);
        }
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = useCallback(async (userData) => {
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    const { password, confirmPassword, ...profileData } = userData;
    
    await setDoc(doc(db, "users", userCredential.user.uid), {
      ...profileData,
      createdAt: new Date().toISOString(),
    });
    
    sessionStorage.removeItem("fz_preloaded");
    return userCredential.user;
  }, []);

  const login = useCallback(async (credentials) => {
    // Note: Since Firebase Auth uses email, users must enter their email as identifier.
    const userCredential = await signInWithEmailAndPassword(auth, credentials.identifier, credentials.password);
    sessionStorage.removeItem("fz_preloaded");
    return userCredential.user;
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    sessionStorage.removeItem("fz_preloaded");
    return result.user;
  }, []);

  const completeGoogleProfile = useCallback(async (additionalData) => {
    if (!auth.currentUser) throw new Error("No authenticated user");
    
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      ...additionalData,
      createdAt: new Date().toISOString(),
    });
    
    // Update local state to reflect complete profile
    setUser((prev) => ({ ...prev, ...additionalData, needsProfile: false }));
  }, []);



  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isGuest: user?.isGuest === true,
        loading,
        signup,
        login,
        loginWithGoogle,
        completeGoogleProfile,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
