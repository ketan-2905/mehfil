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

export default GoogleOAuthButton;