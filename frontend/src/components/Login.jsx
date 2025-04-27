import React, { useState } from 'react';
import { userLogin } from '../services/userApi';  // Assuming userLogin handles API calls
import { toast } from 'sonner';  // Assuming you are using a toast notification library
import { useNavigate } from 'react-router-dom';

function Login({ role = "user" }) {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {

    e.preventDefault()
    userLogin(values,role).then((res) => {

      if(role == "admin"){
        localStorage.setItem("admin-token", res?.data?.token)
        localStorage.removeItem('owner-token');
        toast.success(res?.data?.message)
        navigate("/admin/adminhome")
      }

      else if(role == "owner"){
        localStorage.setItem("owner-token", res?.data?.token)
        localStorage.removeItem('admin-token');
        toast.success(res?.data?.message)
        navigate("/owner/ownerhome")
      } 

      else{
        localStorage.setItem("token", res?.data?.token)
        toast.success(res?.data?.message)
        navigate("/userhome")
      }

    }).catch((err) => {
        toast.error(err?.response?.data?.error);

    })

}

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">
            {role === "admin" ? "Admin Login" : role === "owner" ? "Owner Login" : "Login now!"}
          </h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
                onChange={handleChange}
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a onClick={() => navigate('/register')} className="link link-primary">Click here to register</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
