import React, { useState} from 'react';

const LogicForm = ({ onSubmit, initialValues = {}, hideSubmitButton = false}) => {
  const [role, setRole] = useState(initialValues || '');
  const [formData, setFormData] = useState({
    username: initialValues.username || '',
    password: initialValues.password || '',
    tenantId: initialValues.tenantId || '',
    tenantOrgId: initialValues.tenantOrgId || '',

  });

  const handleRoleChange = (e) => {
    const { name, value }= e.target;
    setFormData(prev => ({...prev, [name]: value}));
    if(name === 'role') setRole(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit({ ...formData, role});
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="info">
        <label htmlFor="username">Username</label>
        <input type="text" 
        id="username" name="username" 
        value={formData.username} 
        onChange={handleRoleChange}/>
      </div>

      <div className="info">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password"  
        value={formData.password} 
        onChange={handleRoleChange}/>
      </div>

      <div className="info">
        <label htmlFor="role">Role</label>
        <select id="role" name="role" value={role} onChange={handleRoleChange}>
          
          <option value="SuperAdmin">SuperAdmin</option>
          <option value="Admin">Admin</option>
          <option value="TenantAdmin">TenantAdmin</option>
          <option value="TenantUser">TenantUser</option>
        </select>
      </div>

      {role === 'TenantUser' && (
        <div className="info">
          <label htmlFor="tenantId">Tenant ID</label>
          <input type="text" id="tenantId" name="tenantId" 
           value={formData.tenantId} 
            onChange={handleRoleChange}/>
        </div>
      )}

      {role === 'TenantAdmin' && (
        <div className="info">
          <label htmlFor="tenantOrgId">Tenant Org ID</label>
          <input type="text" id="tenantOrgId" name="tenantOrgId" 
           value={formData.tenantOrgId} 
            onChange={handleRoleChange}/>
        </div>
      )}

      {/* Conditionally render the submit button based on hideSubmitButton prop */}
      {!hideSubmitButton && (
        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      )}
    </form>
  );
};

export default LogicForm;
