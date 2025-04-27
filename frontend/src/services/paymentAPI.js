import { userInstance } from '../axios/axiosInstance'

export const makePayment = (data) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("User is not authenticated.");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return userInstance.post("/payment/stripe-checkout", data, config);
};

// NEW FUNCTION for clarity
export const createStripeSession = (data) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("User is not authenticated.");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return userInstance.post("/payment/stripe-checkout", data, config);
};
