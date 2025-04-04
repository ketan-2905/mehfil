import apiClient from "./apiClient";
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
  completeSignup: async (data: {
    googleId: string;
    username: string;
    phone: string;
  }) => {
    try {
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
      const response = await apiClient.post("/auth/complete-signup", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  cancelSignup: async () => {
    try {
      await apiClient.post("/auth/cancel-signup");
      await supabase.auth.signOut();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      throw error;
    }
  },

  getSessionUser: () => {
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