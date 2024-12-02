

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, query as firestoreQuery, where, getDocs } from '@firebase/firestore';
import { db } from '../firebase/config';
import { SearchBar } from '../components/SearchBar';

const SearchPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const queryParam = params.get('query') || '';
  const locationParam = params.get('location') || '';

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const doctorsRef = collection(db, 'doctors');
        let q = firestoreQuery(doctorsRef);

        if (queryParam) {
          q = firestoreQuery(
            doctorsRef,
            where('searchKeywords', 'array-contains', queryParam.toLowerCase())
          );
        }

        if (locationParam) {
          q = firestoreQuery(q, where('location', '==', locationParam.toLowerCase()));
        }

        const querySnapshot = await getDocs(q);
        const doctorsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDoctors(doctorsList);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [queryParam, locationParam]);

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-16 max-w-7xl mx-auto px-4">
        <SearchBar initialQuery={queryParam} initialLocation={locationParam} />

        <h2 className="text-2xl font-bold mt-8">
          Search Results for "{queryParam}" {locationParam && `in ${locationParam}`}
        </h2>

        {loading ? (
          <p className="mt-6 text-gray-600">Loading...</p>
        ) : doctors.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-gray-50 p-6 rounded-lg shadow-md">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-64 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-2xl font-semibold text-gray-700">{doctor.name}</h3>
                <p className="text-lg text-gray-600 mb-2">{doctor.specialty}</p>
                <p className="text-gray-500 capitalize">{doctor.location}</p>
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-gray-600">No results found. Please try a different search.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;