import React, { useState } from 'react';
import axios from 'axios';

// Assuming LogicForm is in the same directory or a path like '../components/LogicForm'
import LogicForm from '../Component/LogicForm'; // Adjust the import path as needed

const RegisterTenantForm = () => {
  // State for tenant-specific fields not present in LogicForm
  const [tenantSpecificData, setTenantSpecificData] = useState({
    dbUri: '',
    email: '',
  });

  // State to hold data from LogicForm after its submission
  const [logicFormData, setLogicFormData] = useState({});

  // State to manage loading and error messages
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Handler for changes in tenant-specific input fields
  const handleTenantSpecificChange = (e) => {
    const { name, value } = e.target;
    setTenantSpecificData(prev => ({ ...prev, [name]: value }));
  };

  // This function will be passed as the onSubmit prop to LogicForm.
  // It captures the data submitted by LogicForm.
  const handleLogicFormSubmit = (dataFromLogicForm) => {
    setLogicFormData(dataFromLogicForm);
    // After LogicForm submits, we can trigger the full tenant registration submission
    // Or, we can have a single submit button for the entire RegisterTenantForm
    // For simplicity, let's assume a single submit button for the whole form.
    // The actual API call will happen in the main handleSubmit of RegisterTenantForm.
  };

  // Main submission handler for the entire RegisterTenantForm
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    // Combine data from LogicForm (username as name, password) and tenant-specific fields
    const payload = {
      name: logicFormData.username, // Mapping LogicForm's username to tenant's name
      password: logicFormData.password,
      dbUri: tenantSpecificData.dbUri,
      email: tenantSpecificData.email,
    };

    // Basic validation before sending
    if (!payload.name || !payload.dbUri || !payload.password) {
      setMessage('Tenant Name, Database URI, and Password are required.');
      setIsError(true);
      setLoading(false);
      return;
    }

    try {
      // Replace 'YOUR_BACKEND_API_BASE_URL' with your actual server address
      // The endpoint path should match the route you've set up for createTenant
      const response = await axios.post('YOUR_BACKEND_API_BASE_URL/api/tenants', payload);

      setMessage('Tenant created successfully!');
      setIsError(false);
      console.log('API Response:', response.data);

      // Optionally reset all form fields after successful submission
      setLogicFormData({});
      setTenantSpecificData({ dbUri: '', email: '' });

    } catch (error) {
      console.error('Error creating tenant:', error);
      setIsError(true);
      if (error.response) {
        setMessage(`Error: ${error.response.data.message || 'Server error.'}`);
      } else if (error.request) {
        setMessage('Error: No response from server. Please check your network connection.');
      } else {
        setMessage(`Error: ${error.message || 'An unexpected error occurred.'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register New Tenant</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        {/* Render LogicForm to collect username (as tenant name) and password */}
        {/* We pass a custom onSubmit to LogicForm to capture its data */}
        {/* Pass hideSubmitButton prop to prevent LogicForm from rendering its own submit button */}
        <LogicForm onSubmit={handleLogicFormSubmit} hideSubmitButton={true} />

        {/* Tenant-specific fields */}
        <div className="mb-4">
          <label htmlFor="dbUri" className="block text-gray-700 text-sm font-bold mb-2">
            Database URI
          </label>
          <input
            type="text"
            id="dbUri"
            name="dbUri"
            value={tenantSpecificData.dbUri}
            onChange={handleTenantSpecificChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email (Optional)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={tenantSpecificData.email}
            onChange={handleTenantSpecificChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Display messages */}
        {message && (
          <div className={`mb-4 p-3 rounded ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register Tenant'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterTenantForm;
