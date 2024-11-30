import React, { useState } from 'react';
import { auth } from '@/firebase/config';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import { Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { WelcomeSection } from '@/components/welcome-section';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  // Handle login with email and password
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error during login:', error);
      setErrorMessage('Invalid email or password.');
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      setErrorMessage('Google sign-in failed.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Log in to your account
        </h1>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}

      <div className="space-y-4">
        {/* Google Login Button */}
        <Button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
        >
          <Icons.google className="mr-2 h-4 w-4" />
          Log in with Google
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">OR</span>
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email" className="block text-left text-gray-700">
            Email
          </Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="h-5 w-5 text-gray-400" />
            </span>
            <Input
              id="email"
              type="email"
              placeholder="your-email@example.com"
              className="pl-10 bg-white border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <Label htmlFor="password" className="block text-left text-gray-700">
            Password
          </Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock className="h-5 w-5 text-gray-400" />
            </span>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              className="pl-10 bg-white border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
          Log In
        </Button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </form>
  );
}


export default function LoginPage() {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-2 shadow-lg rounded-lg bg-white">
            {/* Sign Up Form Section */}
            <div className="bg-white rounded-lg p-6">
              <LoginForm />
            </div>
  
            {/* Welcome Section */}
            <WelcomeSection />
          </div>
        </div>
      </main>
    );
  }
  
      
    