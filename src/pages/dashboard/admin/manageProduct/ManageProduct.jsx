import React, { useState } from 'react';
import { useFetchAllProductsQuery } from '../../../../redux/features/products/productsApi';
import { useLanguage } from '../../../../LanguageContext';
import { Link } from 'react-router';

const ManageProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(12);
  const { data: { products = [], totalPages, totalProducts } = {}, isLoading, error, refetch } = useFetchAllProductsQuery({
    category: '',
    color: '',
    minPrice: '',
    maxPrice: '',
    page: currentPage,
    limit: ProductsPerPage
  });
  const { language } = useLanguage();
  
  const startProduct = (currentPage - 1) * ProductsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    };
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };  

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return; 
  
    try {
      const response = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        alert("Product Deleted Successfully");
        await refetch();  
      } else {
        alert("Error Deleting Product. Please try again.");
      }
    } catch (error) {
      alert("Error Deleting Product. Please try again.");
      console.error("Error Deleting Product", error);
    }
  };  

  return (
    <div>
      {
        isLoading && <div>Loading...</div>
      }
      {
        error && <div>Error Loading Products!</div>
      }
      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">{ language == "ua" ? 'УСІ ПРОДУКТИ' : 'ВСЕ ПРОДУКТЫ' }</h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
                </div>
              </div>
              <h3 className='my-4 text-sm'>
                {language === "ua" 
                  ? `Показано з ${startProduct} по ${endProduct} із ${totalProducts} продуктів` 
                  : language === "ru" 
                  ? `Показано с ${startProduct} по ${endProduct} из ${totalProducts} продуктов` 
                  : ``
                }
              </h3>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      No.
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      { language == "ua" ? 'НАЗВА ПРОДУКТУ' : 'НАЗВАНИЕ ПРОДУКТА' }
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      { language == "ua" ? 'ДАТА ПУБЛІКАЦІЇ' : 'ДАТА ПУБЛИКАЦИИ' }
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      { language == "ua" ? 'РЕДАГУВАТИ АБО КЕРУВАТИ' : 'РЕДАКТИРОВАТЬ ИЛИ УПРАВЛЯТЬ' }
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      { language == "ua" ? 'ДІЇ' : 'ДЕЙСТВИЯ' }
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {
                    products && products.map((product, index) => (
                      <tr>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          {index + 1}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {product?.name}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {formatDate(product?.createdAt)}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 cursor-pointer hover:text-primary">
                          <Link to={`/ua/dashboard/update-product/${product._id}`}>
                            { language == "ua" ? 'РЕДАГУВАТИ' : 'РЕДАКТИРОВАТЬ' }
                          </Link>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button 
                            onClick={() => handleDeleteProduct(product._id)}
                            className='bg-red-600 text-white px-2 py-1'
                          >
                            { language == "ua" ? 'ВИДАЛИТИ' : 'УДАЛИТЬ' }
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>

              </table>
            </div>
          </div>
        </div>
        <div className='mt-6 flex items-center justify-center'>
          <button 
            disabled={currentPage === 1} 
            onClick={() => handlePageChange(currentPage - 1)} 
            className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'
          >
            { language === "ua" ? 'ПОПЕРЕДНІЙ' : 'ПРЕДЫДУЩИЙ' }
          </button>
          {
            [...Array(totalPages)].map((_, index) => (
              <button 
                onClick={() => handlePageChange(index + 1)} 
                className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700' } rounded-md mx-1`}
              >
                {index + 1}
              </button>
            ))
          }
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => handlePageChange(currentPage + 1)} // fixed here
            className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'
          >
            { language === "ua" ? 'НАСТУПНИЙ' : 'СЛЕДУЮЩИЙ' }
          </button>
        </div>
      </section>
    </div>
  )
}

export default ManageProduct
