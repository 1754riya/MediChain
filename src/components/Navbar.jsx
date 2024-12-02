import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHelpCircle, FiUser } from 'react-icons/fi';
import { AuthContext } from '../AuthContext';
import { signOut } from '@firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from '@firebase/firestore';

export function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const [userType, setUserType] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserType = async () => {
      if (currentUser) {
        try {
          // Check in 'patients' collection
          const patientDoc = await getDoc(doc(db, 'patients', currentUser.uid));
          if (patientDoc.exists()) {
            setUserType('patient');
            return;
          }

          // Check in 'doctors' collection
          const doctorDoc = await getDoc(doc(db, 'doctors', currentUser.uid));
          if (doctorDoc.exists()) {
            setUserType('doctor');
            return;
          }

          // If user is not found in either collection
          setUserType(null);
        } catch (error) {
          console.error('Error fetching user type:', error);
          setUserType(null);
        }
      } else {
        setUserType(null);
      }
    };

    fetchUserType();
  }, [currentUser]);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.relative')) {
        setMenuOpen(false);
      }
    };
  
    if (menuOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
  
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Helper function to get the first letter of the email
  const getInitial = () => {
    if (currentUser && currentUser.email) {
      return currentUser.email.charAt(0).toUpperCase();
    }
    return 'U'; // Default initial
  };

  return (
    <nav className="bg-white border-b border-gray-200 z-50 fixed w-full top-0 left-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo and Links */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">MediChain</span>
            </Link>
            <div className="ml-10 space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Find Doctors
              </Link>
              <Link to="/help" className="text-gray-600 hover:text-gray-900">
                Connect with NGOs
              </Link>
            </div>
          </div>

          {/* Right Side - User Avatar or Auth Links */}
          <div className="flex items-center space-x-4 relative">
            {currentUser && userType === 'patient' ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-white focus:outline-none"
                >
                  {getInitial()}
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900">
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}