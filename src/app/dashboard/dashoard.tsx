// dashboard.tsx
import React, { useEffect, useState } from 'react';
import { auth, db } from '@/firebase/config';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [userType, setUserType] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);

                try {
                    // Attempt to fetch user data from 'patients' collection
                    const patientDocRef = doc(db, 'patients', currentUser.uid);
                    const patientDocSnap = await getDoc(patientDocRef);

                    if (patientDocSnap.exists()) {
                        setUserData(patientDocSnap.data());
                        setUserType('patient');
                    } else {
                        // Attempt to fetch user data from 'doctors' collection
                        const doctorDocRef = doc(db, 'doctors', currentUser.uid);
                        const doctorDocSnap = await getDoc(doctorDocRef);

                        if (doctorDocSnap.exists()) {
                            setUserData(doctorDocSnap.data());
                            setUserType('doctor');
                        } else {
                            // User not found in either collection
                            setUserData(null);
                            setUserType(null);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            } else {
                setUser(null);
                setUserData(null);
                setUserType(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    if (!user) {
        return <div>Please log in to see your dashboard.</div>;
    }

    if (!userData) {
        return <div>Loading user data...</div>;
    }

    return (
        <div>
            <h1>Welcome, {userData.firstName} {userData.lastName}</h1>
            <p>Email: {userData.email}</p>
            <p>Phone: {userData.phone}</p>
            <p>User Type: {userType}</p>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
};

export default Dashboard;