import React, { useState } from 'react';
import { useDeleteOrderMutation, useGetAllOrdersQuery } from '../../../../redux/features/orders/orderApi';
import { useLanguage } from '../../../../LanguageContext';
import UpdateOrderModal from './UpdateOrderModal';
import OrderDetailsModal from './OrderDetailsModal';
import { Link } from "react-router-dom";

const ManageOrders = () => {
  const { data: orders, error, isLoading, refetch } = useGetAllOrdersQuery();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [deleteOrder] = useDeleteOrderMutation();
  const { language } = useLanguage('');

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      alert("Order Deleted Successfully!");
      refetch();
    } catch (error) {
      console.error("Failed To Delete Order:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  };

  if (error) {
    return <div>Something Went Wrong!</div>;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Sort orders by updatedAt in descending order (latest first)
  const sortedOrders = [...orders]?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <div className="section__container__two p-6">
      <div className="overflow-x-auto">
        <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='py-3 px-4 border-b'>
                { language == "ua" ? 'ID ЗАМОВЛЕННЯ' : 'ID ЗАКАЗА' }
              </th>
              <th className='py-3 px-4 border-b'>
                { language == "ua" ? 'КЛІЄНТ' : 'КЛИЕНТ' }
              </th>
              <th className='py-3 px-4 border-b'>
                { language == "ua" ? 'СТАТУС' : 'СТАТУС' }
              </th>
              <th className='py-3 px-4 border-b'>
                { language == "ua" ? 'ДАТА' : 'ДАТА' }
              </th>
              <th className='py-3 px-4 border-b'>
                { language == "ua" ? 'ДІЇ' : 'ДЕЙСТВИЯ' }
              </th>
            </tr>
          </thead>
          <tbody>
            {
              sortedOrders && sortedOrders.map((order, index) => {
                return (
                  <tr key={index}>
                    <td className='py-3 px-4 border-b'>
                      {order?.orderId}
                    </td>
                    <td className='py-3 px-4 border-b'>
                      {order?.email}
                    </td>
                    <td className='py-3 px-4 border-b'>
                      <span className={`inline-block px-3 py-1 text-xs text-white rounded-full ${getStatusColor(order?.status_ua)}`}>{order?.status_ua}</span>
                    </td>
                    <td className='py-3 px-4 border-b'>
                      {formatDate(order?.updatedAt)}
                    </td>
                    <td className='py-6 px-4 border-b flex flex-col items-start'>
                      <button 
                        className='text-blue-500 hover:underline mb-2' 
                        onClick={() => handleViewDetails(order)}
                      >
                        {language === 'ua' ? 'Деталі' : 'Детали'}
                      </button>
                      <button 
                        className='text-green-500 hover:underline mb-2' 
                        onClick={() => handleEditOrder(order)}
                      >
                        {language === 'ua' ? 'Редагувати' : 'Редактировать'}
                      </button>
                      <button 
                        className='text-red-500 hover:underline' 
                        onClick={() => handleDeleteOrder(order?._id)}
                      >
                        {language === 'ua' ? 'Видалити' : 'Удалить'}
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

      {
        selectedOrder && (
          <>
            <UpdateOrderModal 
              order={selectedOrder}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
            <OrderDetailsModal
              order={selectedOrder}
              isOpen={isDetailsModalOpen}
              onClose={handleCloseDetailsModal}
            />
          </>
        )
      }
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'ОЧІКУВАННЯ':
      return 'bg-yellow-500';
    case 'ОБРОБКА':
      return 'bg-blue-500';
    case 'ВІДПРАВЛЕНО':
      return 'bg-green-500';
    case 'ЗАВЕРШЕНО':
      return 'bg-gray-500';
    default:
      return 'bg-gray-300';
  }
};

export default ManageOrders;
