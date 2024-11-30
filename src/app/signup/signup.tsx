// signup.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { Lock, Mail, Phone, User } from "lucide-react";
import { WelcomeSection } from "@/components/welcome-section";
import React, { useState } from "react";
import { auth, db } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function SignUpForm() {
  // State variables for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"patient" | "doctor">("patient");

  const navigate = useNavigate();

  // Handle sign-up with email and password
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update user profile
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });

      // Prepare user data
      const userData = {
        uid: userCredential.user.uid,
        firstName,
        lastName,
        phone,
        email,
        userType,
      };

      // Determine the collection based on userType
      const collectionName = userType === "doctor" ? "doctors" : "patients";

      // Save user data to Firestore
      await setDoc(doc(db, collectionName, userCredential.user.uid), userData);

      // Redirect based on userType
      if (userType === "doctor") {
        navigate("/dashboard2");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      // Handle errors (e.g., display error message)
    }
  };

  // Handle sign-in with Google
  const handleGoogleSignIn = async (selectedUserType: "patient" | "doctor") => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);

      // Prepare user data
      const user = userCredential.user;
      const userData = {
        uid: user.uid,
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ")[1] || "",
        email: user.email,
        phone: user.phoneNumber || "",
        userType: selectedUserType,
      };

      // Set the userType
      setUserType(selectedUserType);

      // Determine the collection based on userType
      const collectionName =
        selectedUserType === "doctor" ? "doctors" : "patients";

      // Save user data to Firestore
      await setDoc(doc(db, collectionName, user.uid), userData);

      // Redirect based on userType
      if (selectedUserType === "doctor") {
        navigate("/dashboard2");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      // Handle errors
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-6">
      {/* Form fields */}
      <div className="space-y-4">
        {/* Sign up with Google as Patient */}
        <Button
          type="button"
          onClick={() => handleGoogleSignIn("patient")}
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
        >
          <Icons.google className="mr-2 h-4 w-4" />
          Sign up with Google
        </Button>

        {/* Sign up with Google as Doctor */}
        <Button
          type="button"
          onClick={() => handleGoogleSignIn("doctor")}
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
        >
          <Icons.google className="mr-2 h-4 w-4" />
          Sign up as Doctor with Google
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
      </div>

      <div className="space-y-4">
        {/* First Name and Last Name */}
        <div className="flex space-x-4">
          <div className="w-1/2 space-y-2">
            <Label htmlFor="firstName" className="block text-left text-gray-700">
              First Name
            </Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-gray-400" />
              </span>
              <Input
                id="firstName"
                placeholder="First Name"
                className="pl-10 bg-white border-gray-300"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="w-1/2 space-y-2">
            <Label htmlFor="lastName" className="block text-left text-gray-700">
              Last Name
            </Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-gray-400" />
              </span>
              <Input
                id="lastName"
                placeholder="Last Name"
                className="pl-10 bg-white border-gray-300"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="block text-left text-gray-700">
            Phone Number
          </Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Phone className="h-5 w-5 text-gray-400" />
            </span>
            <Input
              id="phone"
              type="tel"
              className="pl-10 bg-white border-gray-300"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
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
              className="pl-10 bg-white border-gray-300"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password */}
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
              placeholder="Password"
              className="pl-10 bg-white border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Sign up as Patient */}
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          type="submit"
          onClick={() => setUserType("patient")}
        >
          Sign up
        </Button>

        {/* Sign up as Doctor */}
        <Button
          variant="outline"
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
          type="submit"
          onClick={() => setUserType("doctor")}
        >
          Sign up as Doctor
        </Button>
      </div>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:text-blue-500">
          Log in
        </a>
      </p>
    </form>
  );
}

export default function SignUpPage() {
  return (
    <main className="bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2 shadow-lg rounded-lg bg-white">
          {/* Sign Up Form Section */}
          <div className="bg-white rounded-lg p-6">
            <SignUpForm />
          </div>

          {/* Welcome Section */}
          <WelcomeSection />
        </div>
      </div>
    </main>
  );
}