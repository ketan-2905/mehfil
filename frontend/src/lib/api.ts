export enum UserRole {
  AUDIENCE = 'audience',
  PERFORMER = 'performer',
  VENUE = 'venue',
  ADMIN = 'admin'
}

export const authAPI = {
  syncUser: async (userData: {
    supabaseId: string;
    email: string;
    name: string;
    role: UserRole;
    profilePic?: string;
  }) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
      credentials: 'include'
    });
    return response.json();
  },

  completeSignup: async (signupData: {
    googleId: string;
    email: string;
    name: string;
    role: UserRole;
    profilePic?: string;
  }) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/complete-signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupData),
      credentials: 'include'
    });
    return response.json();
  },

  registerUser: async (userData: {
    supabaseId: string;
    email: string;
    name: string;
    role: UserRole;
  }) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
      credentials: 'include'
    });
    return response.json();
  },

  logout: async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
      method: 'POST',
      credentials: 'include'
    });
  }
};