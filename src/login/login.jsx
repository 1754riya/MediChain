import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaXTwitter } from 'react-icons/fa6';
import { SocialButton } from '../signup/SocialButton';
import { InputField } from '../signup/InputField';
import { auth, googleProvider, db } from '../firebase/config'; // Import 'db'
import { signInWithEmailAndPassword, signInWithPopup } from '@firebase/auth';
import { doc, getDoc } from '@firebase/firestore'; // Import Firestore functions

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Helper function to determine user role and redirect
  const redirectUser = async (user) => {
    try {
      // Check if user exists in 'patients' collection
      const patientDocRef = doc(db, 'patients', user.uid);
      const patientDoc = await getDoc(patientDocRef);
      if (patientDoc.exists()) {
        navigate('/'); // Redirect to home page for patients
        return;
      }

      // Check if user exists in 'doctors' collection
      const doctorDocRef = doc(db, 'doctors', user.uid);
      const doctorDoc = await getDoc(doctorDocRef);
      if (doctorDoc.exists()) {
        navigate('/dashboard'); // Redirect to dashboard for doctors
        return;
      }

      // If user is not found in either collection
      setError('User role not recognized. Please contact support.');
    } catch (err) {
      console.error('Error determining user role:', err);
      setError('An error occurred while logging in. Please try again.');
    }
  };

  // Handle form submission for email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Reset error state
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      await redirectUser(userCredential.user); // Determine role and redirect
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google sign-in success:', result.user);
      await redirectUser(result.user); // Determine role and redirect
    } catch (err) {
      console.error('Google sign-in error:', err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex text-left">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold mb-8">Log in to your account</h1>
          
          <SocialButton
            icon={FcGoogle}
            provider="Google"
            className="bg-blue-600 mb-3"
            onClick={handleGoogleSignIn}
          />
          
          <SocialButton
            icon={FaXTwitter}
            provider="X"
            className="bg-black"
            onClick={() => console.log('X login')}
          />

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <InputField
              label="Email Address"
              type="email"
              placeholder="abc@google.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <InputField
              label="Password"
              type="password"
              placeholder="********"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors mb-4"
            >
              Log In
            </button>

            {/* <button
              type="button"
              className="w-full border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors mb-4"
              onClick={() => console.log('Log in as Doctor')}
            >
              Log in as Doctor
            </button> */}
          </form>

          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Welcome Message */}
      <div className="hidden lg:flex w-1/2 bg-gray-100 p-8 flex-col items-center justify-center">
        <div className="w-32 h-32 bg-gray-300 rounded-full mb-8"></div>
        <h2 className="text-3xl font-bold mb-4">Welcome to Medi-Chain</h2>
        <p className="text-gray-600 text-center max-w-md">
          "Your health, your control – MediChain simplifies care, secures your records, and connects you to better healthcare anytime, anywhere."
        </p>
      </div>
    </div>
  );
}