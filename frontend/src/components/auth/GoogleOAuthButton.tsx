<<<<<<< HEAD
import { Link } from "react-router-dom";

const handleGoogleAuth = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/google`;
  };

const GoogleOAuthButton = () => (
    <button
    type="button"
    onClick={handleGoogleAuth}
    className="w-full mb-6 flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 text-white py-2 px-4 rounded-md border border-white/20 transition-colors"
  >
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z"
      />
    </svg>
    Continue with Google
  </button>
);
=======
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Button from "@/components/ui-components/Button";

const GoogleOAuthButton = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth?mode=callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      if (error) throw error;
    } catch (error) {
      console.error("Google login failed:", error);
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full mb-4 flex items-center justify-center gap-2"
      onClick={handleGoogleLogin}
      isLoading={loading}
    >
      {!loading && (
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.4-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0C5.763 0 .48 5.223.48 11.647s5.283 11.647 11.76 11.647c6.782 0 11.26-4.773 11.26-11.49c0-.766-.085-1.353-.189-1.938H12.24z"
          />
        </svg>
      )}
      Continue with Google
    </Button>
  );
};
>>>>>>> e392e5fab30ba2dbd59534e6e4e954a3d8dfc686

export default GoogleOAuthButton;