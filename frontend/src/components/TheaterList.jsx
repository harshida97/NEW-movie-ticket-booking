import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { fetchTheaterList, approveTheater,deleteTheater } from '../services/theaterApi';

const TheaterList = () => {
  const [theaters, setTheaters] = useState([]);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Get the correct token and decode it
    const adminToken = localStorage.getItem('admin-token');
    
    const ownerToken = localStorage.getItem('owner-token');

    if (adminToken) {
      const decoded = jwt_decode(adminToken);
      console.log('Decoded admin role:', decoded.role);
      setRole(decoded.role?.toLowerCase().trim());
    } else if (ownerToken) {
      const decoded = jwt_decode(ownerToken);
      console.log('Decoded owner role:', decoded.role);
      setRole(decoded.role?.toLowerCase().trim());
    }

    // Fetch theaters
    const getTheaters = async () => {
      try {
        const data = await fetchTheaterList();
        setTheaters(data);
      } catch (err) {
        setError('Failed to fetch theaters: ' + err.message);
      }
    };

    getTheaters();
  }, []);

  const handleApprove = async (theaterId) => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      setError('No admin token found.');
      return;
    }

    try {
      await approveTheater(theaterId, token);
      setTheaters((prev) =>
        prev.map((theater) =>
          theater._id === theaterId ? { ...theater, isApproved: true } : theater
        )
      );
    } catch (err) {
      setError('Approval failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleAddShow = (theater) => {
    navigate('/owner/addshows', {
      state: {
        theaterId: theater._id,
        theaterName: theater.theaterName,
      },
    });
  };

// delete theater
  const handleDelete = async (theaterId) => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      setError('No admin token found.');
      return;
    }
  
    try {
      await deleteTheater(theaterId, token);
      setTheaters((prev) => prev.filter((theater) => theater._id !== theaterId));
      alert('Theater deleted successfully.');
    } catch (err) {
      setError('Delete failed: ' + (err.response?.data?.message || err.message));
    }
  };



  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Theater List</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {theaters.length === 0 ? (
          <p>No theaters available.</p>
        ) : (
          theaters.map((theater) => (
            <div key={theater._id} className="p-4 border rounded shadow-md bg-white">
              <h2 className="text-xl font-semibold">{theater.theaterName}</h2>
              <p className="text-gray-700">Location: {theater.location}</p>
              <p className="text-gray-700">
                Owner: {theater.owner ? theater.owner.name : 'Unknown'}
              </p>

              <div className="flex justify-between items-center space-x-4">
          {/* Status text */}
         <p
            className={`font-semibold px-4 py-2 rounded text-white ${
            theater.isApproved ? 'bg-green-600' : 'bg-orange-400'
          } ${theater.isApproved ? 'text-left' : 'text-center w-full'}`}
         >
           Status: {theater.isApproved ? 'Approved' : 'Pending Approval'}
        </p>

        {/* Admin approval button */}
        {role === 'admin' && !theater.isApproved && (
        <button
        onClick={() => handleApprove(theater._id)}
        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        >
          Approve
        </button>
        )}

        {role === 'admin' && (
         <button
         onClick={() => handleDelete(theater._id)}
         className="bg-red-500 text-white px-4 py-2 rounded mt-2"
         >
        Delete
       </button>
      )}

       {/* Owner add show button */}
       {role === 'owner' && theater.isApproved && (
        <button
        onClick={() => handleAddShow(theater)}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
       >
       Add Show
       </button>
       )}
      </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TheaterList;
