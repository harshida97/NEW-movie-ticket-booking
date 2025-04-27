import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../services/userApi'

const UsersDetails = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const data = await fetchUsers();  // No need to pass token, it's handled by userInstance
        setUsers(data);
      } catch (error) {
        setError('Error fetching users: ' + error.message);  // Handle any errors
      }
    };

    fetchUsersData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-red-600 text-center text-2xl mt-5 mb-6">All Users </h1>

      {/* Show error message if there was an error */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              
              
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersDetails;
