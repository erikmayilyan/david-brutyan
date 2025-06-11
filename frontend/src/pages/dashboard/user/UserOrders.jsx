import React from 'react';
import { useSelector } from 'react-redux';
import { useGetOrdersByEmailQuery } from '../../../redux/features/orders/orderApi';
import { useLanguage } from '../../../LanguageContext';
import { Link } from 'react-router-dom';

const UserOrders = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: orderdata, error, isLoading } = useGetOrdersByEmailQuery(user?.email);
  const { language } = useLanguage();
  const orders = orderdata?.orders;

  if (isLoading) {
    return <div>Loading...</div>
  };

  if (error) {
    return <div>No Order Found!</div>
  };

  const getLanguagePrefix = () => {
    return language === "ua" ? "/ua" : language === "en" ? "/en" : "/iv";
  };

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  { language === "ua" ? 'ВІДВІДУВАННЯ СТОРІНКИ' : language === "en" ? 'PAGE VISITS' : 'ПОСЕЩЕНИЯ СТРАНИЦЫ' }
                </h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                  { language === "ua" ? 'Переглянути все' : language === "en" ? 'See All' : 'Посмотреть все' }
                </button>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    #
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    { language === "ua" ? 'ІДЕНТИФІКАТОР ЗАМОВЛЕННЯ' : language === "en" ? 'ORDER ID' : 'ИДЕНТИФИКАТОР ЗАКАЗА' }
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    { language === "ua" ? 'ДАТА' : language === "en" ? 'DATE' : 'ДАТА' }
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    { language === "ua" ? 'СТАТУС' : language === "en" ? 'STATUS' : 'СТАТУС' }
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    { language === "ua" ? 'ЗАГАЛОМ' : language === "en" ? 'TOTAL' : 'ИТОГО' }
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    { language === "ua" ? 'ПЕРЕГЛЯНУТИ ЗАМОВЛЕННЯ' : language === "en" ? 'VIEW ORDER' : 'ПОСМОТРЕТЬ ЗАКАЗЫ' }
                  </th>
                </tr>
              </thead>

              <tbody>
                {
                  orders && orders.map((order, index) => (
                    <tr key={order.orderId}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {index + 1}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {order?.orderId}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {new Date(order?.createdAt).toLocaleDateString()}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {language === "ua" ? order?.status_ua : language === "en" ? order?.status_en : order?.status}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {order?.amount.toFixed(2)} UAH
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <Link to={`${getLanguagePrefix()}/dashboard/orders/${order?._id}`} className="bg-blue-500 text-white px-3 py-1 rounded">
                          {language === "ua" ? 'ПЕРЕГЛЯНУТИ ЗАМОВЛЕННЯ' : language === "en" ? 'VIEW ORDER' : 'ПОСМОТРЕТЬ ЗАКАЗЫ'}
                        </Link>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
};

export default UserOrders;
