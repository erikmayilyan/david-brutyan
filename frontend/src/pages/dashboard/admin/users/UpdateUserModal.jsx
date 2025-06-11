import React, { useState } from 'react'
import { useUpdateUserRoleMutation } from '../../../../redux/features/auth/authApi';
import { useLanguage } from '../../../../LanguageContext';
import "./UpdateUserModal.css";
import { getBaseUrl } from '../../../../utils/baseURL';

const UpdateUserModal = ({ user, onClose, onRoleUpdate }) => {
  const [role, setRole] = useState(user.role);
  const { language } = useLanguage('');

  const handleUpdateRole = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/auth/user/${user?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ role })
      });
      if (response.ok) {
        alert("Updated Role Successfully!");
        onRoleUpdate();
        onClose();
      } else {
        throw new Error("Failed to update role");
      };
      alert("Updated Role Successfully!");
      onRoleUpdate();
      onClose();
    } catch (error) {
      console.error("Failed To Update User Role", error);
    }
  };

  return (
    <div className='update-user-modal'>
      <div className='update-user-modal-info'>
        <h2>
          { language == "ua" ? 'РЕДАГУВАТИ РОЛЬ КОРИСТУВАЧА' : 'РЕДАКТИРОВАТЬ РОЛЬ ПОЛЬЗОВАТЕЛЯ' }
        </h2>
        <div>
          <label className='update-user-modal-label'>EMAIL</label>
          <input 
            type="email"
            value={user?.email}
            readOnly
            className='update-user-modal-input'
          />
        </div>
        <div>
          <label className='update-user-modal-label'>
            { language == "ua" ? 'РОЛЬ' : 'РОЛЬ' }
          </label>
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className='update-user-modal-input'
          >
            <option value="user">{ language == "ua" ? 'КОРИСТУВАЧ' : 'ПОЛЬЗОВАТЕЛЬ' }</option>
            <option value="admin">{ language == "ua" ? 'АДМІН' : 'АДМИН' }</option>
          </select>
        </div>
        <div>
          <button onClick={onClose} className='update-user-cancel'>{ language == "ua" ? 'СКАСУВАТИ' : 'ОТМЕНА' }</button>
          <button onClick={handleUpdateRole} className='update-user-save'>{ language == "ua" ? 'ЗБЕРЕГТИ' : 'СОХРАНИТЬ' }</button>
        </div>
      </div>
    </div>
  )
};

export default UpdateUserModal
