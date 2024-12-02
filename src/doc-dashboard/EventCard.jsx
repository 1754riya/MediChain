import { format } from 'date-fns';
import { useState } from 'react';

export function BookingCard({ booking, onEdit }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = (action) => {
    onEdit(booking, action);
    setMenuOpen(false);
  };

  return (
    <div className="p-4 border rounded-lg mb-4 hover:shadow-md transition-shadow flex items-center">
      {/* Day and Date */}
      <div className="w-1/4 text-center">
        <div className="text-gray-600">
          {format(new Date(booking.startTime), 'EEE')}
        </div>
        <div className="text-4xl  font-bold">
          {format(new Date(booking.startTime), 'dd')}
        </div>
      </div>
      
      {/* Time and Details */}
      <div className="w-2/4 px-4">
        <div className="flex items-center gap-2 ">
        <h3 className="font-medium mb-1">{booking.title}</h3>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <span>{booking.location}</span>
          <span className="text-gray-500">
            
            {format(new Date(booking.startTime), 'HH:mm')} -{' '}
            {format(new Date(booking.endTime), 'HH:mm')}
          </span>
        </div>
      </div>
      
      {/* Edit Button */}
      <div className="w-1/4 text-right relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
        >
          Open
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
            <button
              onClick={() => handleMenuClick('view')}
              className="block px-4 py-2 text-left w-full hover:bg-blue-100"
            >
              View Patient
            </button>
            <button
              onClick={() => handleMenuClick('delete')}
              className="block px-4 py-2 text-left w-full text-red-600 hover:bg-red-100"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}