import apiClient from "./apiClient";
<<<<<<< HEAD

export const AuthService = {
  loginWithGoogle: () => {
    window.location.href = `${apiClient.defaults.baseURL}auth/google`;
  },

=======
import { supabase } from "@/lib/supabaseClient";

export const AuthService = {
  // Google OAuth login via Supabase
  loginWithGoogle: async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth?mode=callback`
        }
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    }
  },

  // Sign out from Supabase
  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  // Get current session
  getSession: async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    } catch (error) {
      console.error("Get session error:", error);
      return null;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      if (data.user) {
        // Store user in localStorage for easy access
        localStorage.setItem("user", JSON.stringify({
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.full_name,
          profilePic: data.user.user_metadata?.avatar_url
        }));
      }
      
      return data.user;
    } catch (error) {
      console.error("Get user error:", error);
      return null;
    }
  },

  // Handle auth redirect and complete signup if needed
>>>>>>> e392e5fab30ba2dbd59534e6e4e954a3d8dfc686
  completeSignup: async (data: {
    googleId: string;
    username: string;
    phone: string;
  }) => {
    try {
<<<<<<< HEAD
=======
      // Update Supabase user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          username: data.username,
          phone: data.phone,
          has_completed_signup: true
        }
      });
      
      if (updateError) throw updateError;
      
      // Also update backend if needed
>>>>>>> e392e5fab30ba2dbd59534e6e4e954a3d8dfc686
      const response = await apiClient.post("/auth/complete-signup", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  cancelSignup: async () => {
    try {
      await apiClient.post("/auth/cancel-signup");
<<<<<<< HEAD
      localStorage.removeItem("token");
=======
      await supabase.auth.signOut();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
>>>>>>> e392e5fab30ba2dbd59534e6e4e954a3d8dfc686
    } catch (error) {
      throw error;
    }
  },

  getSessionUser: () => {
<<<<<<< HEAD
    // This should match the user object structure from your backend
=======
>>>>>>> e392e5fab30ba2dbd59534e6e4e954a3d8dfc686
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