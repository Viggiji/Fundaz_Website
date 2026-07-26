import { createContext, useCallback, useContext, useState } from "react";

/*
  Auth context — placeholder implementation using localStorage.
  Replace with real backend auth (JWT, OAuth, etc.) when ready.
  The storage device and auth backend will be provided later.
*/

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  signup: async () => {},
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("fundaz_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const signup = useCallback(async (userData) => {
    // PLACEHOLDER — store in localStorage, no backend call yet
    const newUser = {
      id: `user_${Date.now()}`,
      name: userData.name,
      email: userData.email,
      regNo: userData.regNo,
      phone: userData.phone,
      course: userData.course,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage list of users (for login check)
    const users = JSON.parse(localStorage.getItem("fundaz_users") || "[]");
    const exists = users.find(
      (u) => u.email === newUser.email || u.regNo === newUser.regNo
    );
    if (exists) {
      throw new Error("An account with this email or registration number already exists.");
    }
    users.push({ ...newUser, password: userData.password });
    localStorage.setItem("fundaz_users", JSON.stringify(users));

    // Set current user (without password)
    localStorage.setItem("fundaz_user", JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  }, []);

  const login = useCallback(async (credentials) => {
    // PLACEHOLDER — check against localStorage
    const users = JSON.parse(localStorage.getItem("fundaz_users") || "[]");
    const found = users.find(
      (u) =>
        (u.email === credentials.identifier || u.regNo === credentials.identifier) &&
        u.password === credentials.password
    );
    if (!found) {
      throw new Error("Invalid credentials. Please check your email/registration number and password.");
    }
    const { password, ...userWithoutPw } = found;
    localStorage.setItem("fundaz_user", JSON.stringify(userWithoutPw));
    setUser(userWithoutPw);
    return userWithoutPw;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("fundaz_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
