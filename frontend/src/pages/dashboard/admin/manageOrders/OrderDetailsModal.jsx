import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../../../LanguageContext';
import { useFetchProductByIdQuery } from '../../../../redux/features/products/productsApi';

const OrderDetailsModal = ({ order, isOpen, onClose }) => {
  const { language } = useLanguage();
  const [productDetails, setProductDetails] = useState({});

  const productQueries = order?.products?.reduce((acc, product) => {
    const { data, isLoading, error } = useFetchProductByIdQuery(product.productId);
    if (!isLoading && !error && data) {
      acc[product.productId] = data;
    }
    return acc;
  }, {});

  useEffect(() => {
    if (productQueries) {
      setProductDetails(productQueries);
    }
  }, [productQueries]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            {language === "ua" ? 'Деталі замовлення' : 'Детали заказа'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold mb-2">
              {language === "ua" ? 'Інформація про замовлення' : 'Информация о заказе'}
            </h3>
            <p><strong>{language === "ua" ? 'ID замовлення:' : 'ID заказа:'}</strong> {order.orderId}</p>
            <p><strong>{language === "ua" ? 'Статус:' : 'Статус:'}</strong> {order.status_ua}</p>
            <p><strong>{language === "ua" ? 'Загальна сума:' : 'Общая сумма:'}</strong> {order.amount} грн</p>
            <p><strong>{language === "ua" ? 'Дата:' : 'Дата:'}</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              {language === "ua" ? 'Інформація про клієнта' : 'Информация о клиенте'}
            </h3>
            <p><strong>{language === "ua" ? 'Ім\'я:' : 'Имя:'}</strong> {order.fullName}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>{language === "ua" ? 'Телефон:' : 'Телефон:'}</strong> {order.phone}</p>
            <p><strong>{language === "ua" ? 'Адреса:' : 'Адрес:'}</strong> {order.address}</p>
            <p><strong>{language === "ua" ? 'Провінція:' : 'Провинция:'}</strong> {order.province}</p>
            <p><strong>{language === "ua" ? 'Спосіб доставки:' : 'Способ доставки:'}</strong> {order.deliveryMethod}</p>
            <p><strong>{language === "ua" ? 'Номер складу' : 'Номер склада'}</strong> {order.warehouseNumber}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            {language === "ua" ? 'Замовлені товари' : 'Заказанные товары'}
          </h3>
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">{language === "ua" ? 'Назва товару' : 'Название товара'}</th>
                <th className="py-2 px-4 border-b">{language === "ua" ? 'Кількість' : 'Количество'}</th>
                <th className="py-2 px-4 border-b">{language === "ua" ? 'Розмір' : 'Размер'}</th>
                <th className="py-2 px-4 border-b">{language === "ua" ? 'Ціна за одиницю' : 'Цена за единицу'}</th>
                <th className="py-2 px-4 border-b">{language === "ua" ? 'Загальна ціна' : 'Общая цена'}</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product, index) => {
                const details = productDetails[product.productId];
                return (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">
                      {product.name}
                    </td>
                    <td className="py-2 px-4 border-b">{product.quantity}</td>
                    <td className="py-2 px-4 border-b">{product.size || 'N/A'}</td>
                    <td className="py-2 px-4 border-b">
                      {details ? `${product.price} грн` : 'N/A'}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {details ? `${product.price * product.quantity} грн` : 'N/A'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal; 