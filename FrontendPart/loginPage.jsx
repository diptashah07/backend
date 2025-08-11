import React, {useState} from "react";
import axios from "axios";
import '../index.css'
import LogicForm from "../Component/LogicForm";

/* const LoginPage = () =>{
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (formData) =>{
        setLoading(true);
        setError('');
    

    try {
        const response = await axios.post('https://localhost/217014/api/login', formData);
        const user = response.data;

        console.log('Login Successful', user);
    } catch (error) {
        setError(error.response?.data?.message || 'Login failed');
    } finally{
        setLoading(false);
    }
};

return(
    <div>
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <LogicForm onSubmit={handleLogin} hideSubmitButton={loading}/>
            {loading && <p>Logging</p>}
        </div>
    </div>
);
}; */

const LoginPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = (formData) => {
    const { username, password } = formData;

    // Simulated login logic
    if (username === 'admin' && password === 'password123') {
      setSuccess('Login successful!');
      setError('');
      console.log('User logged in:', username);
      // You can redirect or update UI here
    } else {
      setError('Invalid username or password');
      setSuccess('');
    }
  };

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
        <LogicForm onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;