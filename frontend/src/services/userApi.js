import {userInstance,adminInstance} from '../axios/axiosInstance';

// Registration API call
export const registerUser = async (userData) => {
  const response = await userInstance.post('/users/register', userData, {
    withCredentials: true,
  });
  return response.data;
};

// Login API
export const userLogin = (data, role) => {
  return userInstance.post(`/users/login?role=${role}`, data, {
    withCredentials: true 
  });
};


// Get Users API
export const fetchUsers = async () => {
  try {
    const response = await adminInstance.get('/users/users');  // Make the request using userInstance
    return response.data;
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);  // Handle errors
  }
};