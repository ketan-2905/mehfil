import apiClient from "./apiClient";

export const AuthService = {
  loginWithGoogle: () => {
    window.location.href = `${apiClient.defaults.baseURL}auth/google`;
  },

  completeSignup: async (data: {
    googleId: string;
    username: string;
    phone: string;
  }) => {
    try {
      const response = await apiClient.post("/auth/complete-signup", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  cancelSignup: async () => {
    try {
      await apiClient.post("/auth/cancel-signup");
      localStorage.removeItem("token");
    } catch (error) {
      throw error;
    }
  },

  getSessionUser: () => {
    // This should match the user object structure from your backend
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  handleAuthRedirect: () => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("googleId")) {
      return {
        googleId: params.get("googleId"),
        email: params.get("email"),
        name: params.get("name"),
        profilePic: params.get("profilePic")
      };
    }
    return null;
  }
};