import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaXTwitter } from 'react-icons/fa6';
import { SocialButton } from './SocialButton';
import { InputField } from './InputField';
import { auth, googleProvider, db } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithPopup } from '@firebase/auth';
import { doc, setDoc } from '@firebase/firestore';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Track the type of user being registered
    const [userType, setUserType] = useState('patient');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e, type) => {
        e.preventDefault();
        const { email, password, firstName, lastName } = formData;
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Prepare user data
            const userData = {
                uid: user.uid,
                firstName,
                lastName,
                email,
                role: type, // 'patient' or 'doctor'
                createdAt: new Date(),
            };

            // Determine the collection based on user type
            const collectionName = type === 'doctor' ? 'doctors' : 'patients';

            // Store user data in Firestore
            await setDoc(doc(db, collectionName, user.uid), userData);

            console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} signed up:`, user);

            // Redirect to dashboard or desired page
            if (type === 'doctor') {
                navigate('/dashboard');
            } else {
                navigate('/');
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    const handleGoogleSignIn = async (type) => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Check if user data already exists in Firestore
            const userDoc = doc(db, type === 'doctor' ? 'doctors' : 'patients', user.uid);
            // You might want to fetch the document to check existence or handle differently

            // Prepare user data
            const userData = {
                uid: user.uid,
                firstName: user.displayName?.split(' ')[0] || '',
                lastName: user.displayName?.split(' ')[1] || '',
                email: user.email,
                role: type, // 'patient' or 'doctor'
                photoURL: user.photoURL || '',
                createdAt: new Date(),
            };

            // Store user data in Firestore
            await setDoc(userDoc, userData, { merge: true });

            console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} signed in with Google:`, user);

            // Redirect to dashboard or desired page
            if (type === 'doctor') {
                navigate('/dashboard');
            } else {
                navigate('/');
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex text-left">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
                <div className="max-w-md mx-auto w-full">
                    <h1 className="text-3xl font-bold mb-8">Create a free account</h1>

                    {/* Google Sign-Up */}
                    <SocialButton
                        icon={FcGoogle}
                        provider="Google"
                        className="bg-blue-600 mb-3"
                        onClick={() => handleGoogleSignIn('patient')}
                    />

                    {/* Twitter/X Sign-Up */}
                    <SocialButton
                        icon={FaXTwitter}
                        provider="X"
                        className="bg-black mb-3"
                        onClick={() => console.log('X login')}
                    />

                    {/* Separator */}
                    <div className="my-6 flex items-center">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-4 text-gray-500 text-sm">OR</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    {/* Sign-Up Form */}
                    <form onSubmit={(e) => handleSubmit(e, 'patient')}>
                        <InputField
                            label="First Name"
                            placeholder="Alexa"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />

                        <InputField
                            label="Last Name"
                            placeholder="Mathew"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />

                        <InputField
                            label="Email Address"
                            type="email"
                            placeholder="abc@google.com"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <InputField
                            label="Password"
                            type="password"
                            placeholder="********"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                        />

                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors mb-4"
                        >
                            Sign up as Patient
                        </button>
                    </form>

                    {/* Sign-Up as Doctor Button */}
                    <button
                        type="button"
                        className="w-full border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors mb-4"
                        onClick={(e) => handleSubmit(e, 'doctor')}
                    >
                        Sign up as Doctor
                    </button>

                    {/* Footer Link */}
                    <p className="text-center text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Log in
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