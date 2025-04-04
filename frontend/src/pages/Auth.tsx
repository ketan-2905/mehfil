
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Laugh, Mail, Lock, User, ArrowLeft, Eye, EyeOff, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/ui-components/GlassCard";
import Button from "@/components/ui-components/Button";
import AnimatedElement from "@/components/ui-components/AnimatedElement";
import GoogleOAuthButton from "@/components/auth/GoogleOAuthButton";
<<<<<<< HEAD

type AuthMode = "login" | "signup" | "reset-password";
type UserRole = "audience" | "performer" | "venue" | "admin";
=======
import { supabase } from "@/lib/supabaseClient";
import { authAPI, UserRole } from '@/lib/api';

type AuthMode = "login" | "signup" | "reset-password";
>>>>>>> e392e5fab30ba2dbd59534e6e4e954a3d8dfc686

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
<<<<<<< HEAD
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("audience");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Parse the mode from URL query params
=======
  const [loginEmail, setLoginEmail] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.AUDIENCE);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(null);
  const [oauthData, setOauthData] = useState<{
    googleId?: string;
    email?: string;
    name?: string;
    profilePic?: string;
  } | null>(null);

  const email = mode === "login" ? loginEmail : signupEmail;
  const setEmail = mode === "login" ? setLoginEmail : setSignupEmail;

>>>>>>> e392e5fab30ba2dbd59534e6e4e954a3d8dfc686
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const modeParam = queryParams.get("mode");
    
    if (modeParam === "login" || modeParam === "signup" || modeParam === "reset-password") {
      setMode(modeParam);
<<<<<<< HEAD
    }
  }, [location.search]);

  // Handle Google OAuth redirect response
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const error = queryParams.get("error");
    
    if (token) {
      // Store the token in localStorage
      localStorage.setItem("auth_token", token);
      // Redirect to dashboard
      navigate("/venue-dashboard");
    } else if (error) {
      setError(decodeURIComponent(error));
    }
  }, [location.search, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    // Validation
    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    
    // This is a mock authentication - in a real app, this would connect to a backend
    setTimeout(() => {
      setLoading(false);
      // For demo purposes, redirect to appropriate dashboard based on role
      if (role === "venue") {
        navigate("/venue-dashboard");
      } else if (role === "performer") {
        navigate("/performer-dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/audience-dashboard");
      }
    }, 1500);
=======
    } else if (modeParam === "callback") {
      setMode("signup");
    }
  }, [location.search]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const isCallback = queryParams.get("mode") === "callback";
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
              const hasCompletedSignup = user.user_metadata?.has_completed_signup;
              if (!hasCompletedSignup) {
                setMode("signup");
                setOauthData({
                  googleId: user.id,
                  email: user.email,
                  name: user.user_metadata?.full_name || user.email?.split('@')[0],
                  profilePic: user.user_metadata?.avatar_url
                });
                setEmail(user.email || "");
                setName(user.user_metadata?.full_name || user.email?.split('@')[0] || "");
                setLoading(false);
              } else {
                try {
                  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/sync`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      supabaseId: user.id,
                      email: user.email,
                      name: user.user_metadata?.full_name || user.email?.split('@')[0],
                      role: user.user_metadata?.role || 'audience',
                      profilePic: user.user_metadata?.avatar_url
                    }),
                    credentials: 'include'
                  });
                  
                  if (response.ok) {
                    const userData = await response.json();
                    setUser(userData.user);
                    navigate(`/${userData.user.role || 'audience'}-dashboard`);
                  }
                } catch (error) {
                  console.error("Backend sync error:", error);
                }
              }
            }
          } catch (error) {
            console.error("Auth state change error:", error);
            setError("Authentication failed. Please try again.");
            setLoading(false);
          }
        }
      }
    );

    const checkExistingSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const hasCompletedSignup = session.user.user_metadata?.has_completed_signup;
        if (!hasCompletedSignup) {
          setMode("signup");
          setOauthData({
            googleId: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
            profilePic: session.user.user_metadata?.avatar_url
          });
          setEmail(session.user.email || "");
          setName(session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || "");
        } else {
          try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/sync`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                supabaseId: session.user.id,
                email: session.user.email,
                name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
                role: session.user.user_metadata?.role || 'audience',
                profilePic: session.user.user_metadata?.avatar_url
              }),
              credentials: 'include'
            });
            
            if (response.ok) {
              const userData = await response.json();
              setUser(userData.user);
              navigate(`/${userData.user.role || 'audience'}-dashboard`);
            }
          } catch (error) {
            console.error("Backend sync error:", error);
          }
        }
      }
      setLoading(false);
    };

    if (!isCallback) checkExistingSession();
    return () => subscription.unsubscribe();
  }, [navigate, location.search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "signup" && password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: loginEmail,
          password
        });

        if (error || !data.user) throw error || new Error("Login failed");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/sync`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            supabaseId: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0],
            role: data.user.user_metadata?.role || 'audience',
            profilePic: data.user.user_metadata?.avatar_url
          }),
          credentials: 'include'
        });

        if (!response.ok) throw new Error(`Backend sync failed: ${response.status}`);

        const userData = await response.json();
        setUser(userData.user);
        navigate(`/${userData.user.role || 'audience'}-dashboard`);

      } else if (mode === "signup") {
        if (oauthData?.googleId) {
          const { error: updateError } = await supabase.auth.updateUser({
            data: {
              full_name: name,
              role: role,
              has_completed_signup: true
            }
          });

          if (updateError) throw updateError;

          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/complete-signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              googleId: oauthData.googleId,
              email: signupEmail,
              name,
              role,
              profilePic: oauthData.profilePic
            }),
            credentials: 'include'
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to complete signup: ${errorText}`);
          }

          const userData = await response.json();
          setUser(userData.user);
          navigate(`/${role}-dashboard`);

        } else {
          const { error: signupError, data } = await supabase.auth.signUp({
            email: signupEmail,
            password,
            options: {
              data: {
                full_name: name,
                role,
                has_completed_signup: true
              }
            }
          });

          if (signupError || !data.user) throw signupError || new Error("Signup failed");

          try {
            // Updated registration
            const userData = await authAPI.registerUser({
              supabaseId: data.user.id,
              email: signupEmail,
              name,
              role: UserRole.AUDIENCE
            });
            
            setUser(userData.user);
          } catch (backendError) {
            console.error('Backend error:', backendError);
          }

          setError("Account created! Please check your email to verify your account.");
        }

      } else if (mode === "reset-password") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`
        });

        if (error) throw error;
        setError("Password reset link sent to your email");
      }

    } catch (error) {
      console.error("Auth error:", error);
      setError(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
>>>>>>> e392e5fab30ba2dbd59534e6e4e954a3d8dfc686
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
<<<<<<< HEAD
            <AnimatedElement animation="slide-up" className="mb-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-comedy-red/20 p-4">
                  <Laugh size={32} className="text-comedy-red" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2">
                {mode === "login" ? "Welcome Back" : mode === "signup" ? "Create Account" : "Reset Password"}
              </h1>
              <p className="text-muted-foreground">
                {mode === "login"
                  ? "Sign in to access your comedy account"
                  : mode === "signup"
                  ? "Join the comedy community today"
                  : "We'll send you a link to reset your password"}
              </p>
            </AnimatedElement>
            
            <AnimatedElement animation="slide-up" delay={200}>
              <GlassCard className="p-6">
                {error && (
                  <div className="bg-red-900/20 border border-red-800 text-red-400 rounded-md p-3 mb-6">
                    {error}
                  </div>
                )}
                
                {/* Google OAuth Button */}
                <GoogleOAuthButton />
                
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-comedy-dark px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                  {mode === "signup" && (
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-comedy-red focus:border-transparent"
                          placeholder="Your name"
                          required
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Role Selection - Only show during signup */}
                  {mode === "signup" && (
                    <div className="mb-4">
                      <label htmlFor="role" className="block text-sm font-medium mb-2">
                        I am a
                      </label>
                      <div className="relative">
                        <select
                          id="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value as UserRole)}
                          className="w-full pl-4 pr-10 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-comedy-red focus:border-transparent appearance-none"
                          required
                        >
                          <option value="audience">Comedy Fan</option>
                          <option value="performer">Performer</option>
                          <option value="venue">Venue Manager</option>
                          <option value="admin">Administrator</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  )}
                  
                  {/* Rest of the form remains unchanged */}
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-comedy-red focus:border-transparent"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Rest of the component remains the same */}
                  {mode !== "reset-password" && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor="password" className="block text-sm font-medium">
                          Password
                        </label>
                        {mode === "login" && (
                          <button
                            type="button"
                            onClick={() => setMode("reset-password")}
                            className="text-xs text-comedy-red hover:underline"
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-10 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-comedy-red focus:border-transparent"
                          placeholder="Your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {mode === "signup" && (
                    <div className="mb-4">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-comedy-red focus:border-transparent"
                          placeholder="Confirm your password"
                          required
                        />
                      </div>
                    </div>
=======
            {user ? (
              <GlassCard className="p-6">
                <div className="text-center">
                  {user.profilePic && (
                    <img 
                      src={user.profilePic} 
                      alt={user.name} 
                      className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-comedy-red"
                    />
                  )}
                  <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                  <p className="text-muted-foreground mb-1">{user.email}</p>
                  {user.username && (
                    <p className="text-comedy-orange mb-4">@{user.username}</p>
>>>>>>> e392e5fab30ba2dbd59534e6e4e954a3d8dfc686
                  )}
                  
                  <div className="mt-6">
                    <Button
<<<<<<< HEAD
                      type="submit"
                      className="w-full"
                      isLoading={loading}
                    >
                      {mode === "login"
                        ? "Sign In"
                        : mode === "signup"
                        ? "Create Account"
                        : "Send Reset Link"}
                    </Button>
                  </div>
                </form>
                
                {mode !== "reset-password" && (
                  <div className="mt-6 pt-6 border-t border-white/10 text-center">
                    <p className="text-muted-foreground">
                      {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                      <button
                        type="button"
                        onClick={() => setMode(mode === "login" ? "signup" : "login")}
                        className="text-comedy-red hover:underline"
                      >
                        {mode === "login" ? "Sign up" : "Sign in"}
                      </button>
                    </p>
                  </div>
                )}
                
                {mode === "reset-password" && (
                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      className="text-comedy-red hover:underline inline-flex items-center"
                    >
                      <ArrowLeft size={16} className="mr-1" />
                      Back to login
                    </button>
                  </div>
                )}
              </GlassCard>
            </AnimatedElement>
            
            <AnimatedElement animation="fade-in" delay={400} className="mt-8 text-center">
              <p className="text-muted-foreground text-sm">
                By signing up, you agree to our{" "}
                <Link to="/terms" className="text-comedy-red hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-comedy-red hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </AnimatedElement>
=======
                      onClick={async () => {
                        await supabase.auth.signOut();
                        await fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
                          method: 'POST',
                          credentials: 'include'
                        });
                        setUser(null);
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              </GlassCard>
            ) : (
              <>
                <AnimatedElement animation="slide-up" className="mb-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-comedy-red/20 p-4">
                      <Laugh size={32} className="text-comedy-red" />
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold mb-2">
                    {mode === "login" ? "Welcome Back" : mode === "signup" ? "Create Account" : "Reset Password"}
                  </h1>
                  <p className="text-muted-foreground">
                    {mode === "login"
                      ? "Sign in to access your comedy account"
                      : mode === "signup"
                      ? "Join the comedy community today"
                      : "We'll send you a link to reset your password"}
                  </p>
                </AnimatedElement>
                
                <AnimatedElement animation="slide-up" delay={200}>
                  <GlassCard className="p-6">
                    {error && (
                      <div className="bg-red-900/20 border border-red-800 text-red-400 rounded-md p-3 mb-6">
                        {error}
                      </div>
                    )}
                    
                    {/* Show Google profile info if available */}
                    {oauthData?.profilePic && mode === "signup" && (
                      <div className="mb-6 text-center">
                        <img 
                          src={oauthData.profilePic} 
                          alt={oauthData.name || "Profile"} 
                          className="w-20 h-20 rounded-full mx-auto mb-2 border-2 border-comedy-red"
                        />
                        <p className="text-sm text-muted-foreground">
                          Complete your profile
                        </p>
                      </div>
                    )}
                    
                    {/* Only show Google button if not already in OAuth flow */}
                    {!oauthData && (
                      <>
                        <GoogleOAuthButton />
                        
                        <div className="relative mb-6">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-comedy-dark px-2 text-muted-foreground">Or continue with</span>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {/* Rest of the form remains the same */}
                    <form onSubmit={handleSubmit}>
                      {/* ... rest of the form ... */}
                      {mode === "signup" && (
                        <div className="mb-4">
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Full Name
                          </label>
                          <div className="relative">
                            <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                            <input
                              id="name"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-comedy-red focus:border-transparent"
                              placeholder="Your name"
                              required
                            />
                          </div>
                        </div>
                      )}
                      
                      {/* Role Selection - Only show during signup */}
                      {mode === "signup" && (
                        <div className="mb-4">
                          <label htmlFor="role" className="block text-sm font-medium mb-2">
                            I am a
                          </label>
                          <div className="relative">
                            <select
                              id="role"
                              value={role}
                              onChange={(e) => setRole(e.target.value as UserRole)}
                              className="w-full pl-4 pr-10 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-comedy-red focus:border-transparent appearance-none"
                              required
                            >
                              <option value="audience">Comedy Fan</option>
                              <option value="performer">Performer</option>
                              <option value="venue">Venue Manager</option>
                              <option value="admin">Administrator</option>
                            </select>
                            <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
                          </div>
                        </div>
                      )}
                      
                      {/* Rest of the form remains unchanged */}
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-comedy-red focus:border-transparent"
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                      </div>
                      
                      {/* Rest of the component remains the same */}
                      {mode !== "reset-password" && (
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <label htmlFor="password" className="block text-sm font-medium">
                              Password
                            </label>
                            {mode === "login" && (
                              <button
                                type="button"
                                onClick={() => setMode("reset-password")}
                                className="text-xs text-comedy-red hover:underline"
                              >
                                Forgot password?
                              </button>
                            )}
                          </div>
                          <div className="relative">
                            <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                            <input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full pl-10 pr-10 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-comedy-red focus:border-transparent"
                              placeholder="Your password"
                              required
                            />
                            <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {mode === "signup" && (
                        <div className="mb-4">
                          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                            <input
                              id="confirmPassword"
                              type={showPassword ? "text" : "password"}
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-comedy-red focus:border-transparent"
                              placeholder="Confirm your password"
                              required
                            />
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-6">
                        <Button
                          type="submit"
                          className="w-full"
                          isLoading={loading}
                        >
                          {mode === "login"
                            ? "Sign In"
                            : mode === "signup"
                            ? "Create Account"
                            : "Send Reset Link"}
                        </Button>
                      </div>
                    </form>
                    
                    {mode !== "reset-password" && (
                      <div className="mt-6 pt-6 border-t border-white/10 text-center">
                        <p className="text-muted-foreground">
                          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                          <button
                            type="button"
                            onClick={() => setMode(mode === "login" ? "signup" : "login")}
                            className="text-comedy-red hover:underline"
                          >
                            {mode === "login" ? "Sign up" : "Sign in"}
                          </button>
                        </p>
                      </div>
                    )}
                    
                    {mode === "reset-password" && (
                      <div className="mt-6 text-center">
                        <button
                          type="button"
                          onClick={() => setMode("login")}
                          className="text-comedy-red hover:underline inline-flex items-center"
                        >
                          <ArrowLeft size={16} className="mr-1" />
                          Back to login
                        </button>
                      </div>
                    )}
                  </GlassCard>
                </AnimatedElement>
                
                <AnimatedElement animation="fade-in" delay={400} className="mt-8 text-center">
                  <p className="text-muted-foreground text-sm">
                    By signing up, you agree to our{" "}
                    <Link to="/terms" className="text-comedy-red hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-comedy-red hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </AnimatedElement>
              </>
            )}
>>>>>>> e392e5fab30ba2dbd59534e6e4e954a3d8dfc686
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Auth;
<<<<<<< HEAD
=======

// In the logout button:
<Button
  onClick={async () => {
    await supabase.auth.signOut();
    await authAPI.logout();
window.location.reload();
  }}
>
  Sign Out
</Button>

>>>>>>> e392e5fab30ba2dbd59534e6e4e954a3d8dfc686
