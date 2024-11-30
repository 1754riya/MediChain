import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { Lock, Mail, Phone, User } from "lucide-react"

export function SignUpForm() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Create a free account
        </h1>
      </div>

      <div className="space-y-4">
        <Button variant="outline" className="w-full bg-blue-600 text-white hover:bg-blue-700  hover:text-white">
          <Icons.google className="mr-2 h-4 w-4" />
          Login with Google
        </Button>
        <Button variant="outline" className="w-full bg-black text-white hover:bg-gray-900 hover:text-white">
          <Icons.twitter className="mr-2 h-4 w-4" />
          Login with X
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">OR</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2 space-y-2">
              <Label htmlFor="firstName" className="block text-left text-gray-700">First Name</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </span>
                <Input
                  id="firstName"
                  placeholder="Pranav"
                  className="pl-10 bg-white border-gray-300"
                />
              </div>
            </div>
            <div className="w-1/2 space-y-2">
              <Label htmlFor="lastName" className="block text-left text-gray-700">Last Name</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </span>
                <Input
                  id="lastName"
                  placeholder="Chaturvedi"
                  className="pl-10 bg-white border-gray-300"
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="block text-left text-gray-700">Phone Number</Label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                </span>
            <Input
              id="phone"
              type="tel"
              placeholder="+91945467899"
              className="pl-10 bg-white border-gray-300"
            />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="block text-left text-gray-700">Email</Label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </span>
            <Input
              id="email"
              type="email"
              placeholder="pranav@vitbhopal.ac.in"
              className="pl-10  bg-white border-gray-300"
            />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="block text-left text-gray-700">Password</Label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400 " />
                </span>
            <Input
              id="password"
              type="password"
              placeholder="q8wHk6zK6pwM9VX"
              className="pl-10 bg-white border-gray-300"
            />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
            Sign up
          </Button>
          <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-100">
            Sign up as Doctor
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="#" className="text-blue-600 hover:text-blue-500">
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}
