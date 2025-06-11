import React, { useState } from 'react';
import { useUpdateOrderStatusMutation } from '../../../../redux/features/orders/orderApi';
import { getBaseUrl } from '../../../../utils/baseURL';

const UpdateOrderModal = ({ order, isOpen, onClose }) => {
  const [status, setStatus] = useState(order?.status_ua);

  const [updateOrderStatus, { isLoading, error }] = useUpdateOrderStatusMutation();

  const handleUpdateOrderStatus = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/orders/update-order-status/${order._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',  
        },
        body: JSON.stringify({
          status_ua: status,  
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
  
      const data = await response.json();
      console.log(data);
      onClose();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };  

  if (!isOpen) {
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-semibold mb-4">
          ОНОВИТИ СТАТУС ЗАМОВЛЕННЯ
        </h3>
        <div className="mb-4">
          <label className="block text-sm font-medium">
            СТАТУС
          </label>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
            className="mt-1 p-2 border rounded-lg w-full"
          >
            <option value="ОЧІКУВАННЯ">
              ОЧІКУВАННЯ
            </option>
            <option value="ОБРОБКА">
              ОБРОБКА
            </option>
            <option value="ВІДПРАВЛЕНО">
              ВІДПРАВЛЕНО
            </option>
            <option value="ЗАВЕРШЕНО">
              ЗАВЕРШЕНО
            </option>
          </select>
        </div>
        <div className="flex justify-end">
          <button 
            onClick={onClose} 
            className="text-gray-500 mr-3"
          >
            ЗАКРИТИ
          </button>
          <button 
            onClick={handleUpdateOrderStatus} 
            className={`text-white bg-blue-500 px-4 py-2 rounded-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            { isLoading ? 'ОНОВЛЮЄТЬСЯ...' : 'ОНОВИТИ' }
          </button>
        </div>
        { error && <p className="text-red-500 mt-2">{error.message}</p> }
      </div>
    </div>
  );
};

export default UpdateOrderModal;
