import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingTabs } from './Tabs';
import { BookingList } from './EventList';
import { filterBookings } from '../utils/booking';
import { AuthContext } from '../AuthContext';
import { signOut } from '@firebase/auth';
import { auth } from '../firebase/config';

const mockBookings = [
    {
        id: 1,
        title: '30min call meeting Peer <> Leslie',
        startTime: '2024-02-28T09:00:00',
        endTime: '2024-02-28T09:30:00',
        location: 'Online',
        status: 'confirmed',
        participants: [
            { id: 1, name: 'Peer', avatar: 'https://i.pravatar.cc/150?u=1' },
            { id: 2, name: 'Leslie', avatar: 'https://i.pravatar.cc/150?u=2' }
        ]
    },
    {
        id: 2,
        title: '1hr team meeting',
        startTime: '2024-03-01T10:00:00',
        endTime: '2024-03-01T11:00:00',
        location: 'Office',
        status: 'pending',
        participants: [
            { id: 3, name: 'Alice', avatar: 'https://i.pravatar.cc/150?u=3' },
            { id: 4, name: 'Bob', avatar: 'https://i.pravatar.cc/150?u=4' }
        ]
    },
    // Add more mock bookings as needed
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState('Past');
  const [bookings, setBookings] = useState(mockBookings);
  const [userDetails, setUserDetails] = useState(null);
  const filteredBookings = filterBookings(bookings, activeTab);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);



  const handleEdit = (booking, action) => {
    if (action === 'view') {
      navigate('/view');
    } else if (action === 'delete') {
      const updatedBookings = bookings.map((b) =>
        b.id === booking.id ? { ...b, status: 'cancelled' } : b
      );
      setBookings(updatedBookings);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Helper function to get user initials
  const getUserInitials = (email) => {
    if (!email) return 'U';
    return email.charAt(0).toUpperCase();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-left">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Bookings</h1>
        
        {currentUser ? (
          <div className="relative">
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center cursor-pointer"
            >
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white text-lg">
                  {getUserInitials(currentUser.email)}
                </div>
              )}
            </div>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-gray-600">Loading...</div>
        )}
      </div>
      
      <p className="text-gray-600 mb-6">
        See your scheduled events from your calendar events links.
      </p>
      
      <BookingTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <BookingList
        bookings={filteredBookings}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default Dashboard;