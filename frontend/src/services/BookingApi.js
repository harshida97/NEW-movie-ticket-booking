import { userInstance } from '../axios/axiosInstance';

export const getShowDetails = async (id) => {
  try {
    const response = await userInstance.get(`/shows/shows/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBooking = async (showId, seats) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await userInstance.post(
      `/bookings/createbooking`,
      {
        show: showId,
        seatsBooked: seats,
      },
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
