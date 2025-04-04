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

export default GoogleOAuthButton;