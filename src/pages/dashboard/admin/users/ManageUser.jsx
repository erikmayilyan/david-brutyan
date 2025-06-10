import React, { useState } from 'react';
import { useGetUserQuery } from '../../../../redux/features/auth/authApi';
import { useLanguage } from '../../../../LanguageContext';
import UpdateUserModal from './UpdateUserModal';
import { Link } from 'react-router';

const ManageUser = () => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const {data: users = [], totalPages, error, isLoading, refetch} = useGetUserQuery();
  const { language } = useLanguage('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/auth/user/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type' : 'application/json',
        },
      });
  
      if (response.ok) {
        alert("User Deleted Successfully");
        refetch();  
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      console.error('Failed To Delete User', error);
      alert('Error deleting user');
    }
  };  

  const handleEdit = (user) => {
    setSelectedUser(user);
    setisModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(false);
    setisModalOpen(null);
  };

  console.log(users);

  return (
    <div>
      {
        isLoading && <div>Loading...</div>
      }
      {
        error && <div>Error Loading Users Data!</div>
      }
      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">{ language == "ua" ? 'УСІ КОРИСТУВАЧІ' : 'ВСЕ ПОЛЬЗОВАТЕЛИ' }</h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
                </div>
              </div>
              
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      No.
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      { language == "ua" ? 'EMAIL КОРИСТУВАЧА' : 'EMAIL ПОЛЬЗОВАТЕЛЯ' }
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      { language == "ua" ? 'РОЛЬ КОРИСТУВАЧА' : 'РОЛЬ ПОЛЬЗОВАТЕЛЯ' }
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
                    users && users.map((user, index) => (
                      <tr>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          {index + 1}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {user?.email || 'N/A'}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {user?.role}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 cursor-pointer hover:text-primary">
                          <button 
                            onClick={() => handleEdit(user)}
                            className='flex gap-1 items-center hover:text-red-500'
                          >
                            <i className='ri-edit-2-line'></i>
                            { language == "ua" ? 'РЕДАГУВАТИ' : 'РЕДАКТИРОВАТЬ' }
                          </button>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button 
                            onClick={() => handleDelete(user?._id)}
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
            onClick={() => handlePageChange(currentPage + 1)} 
            className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'
          >
            { language === "ua" ? 'НАСТУПНИЙ' : 'СЛЕДУЮЩИЙ' }
          </button>
        </div>
      </section>
      {
        isModalOpen && <UpdateUserModal user={selectedUser} onClose={handleCloseModal} onRoleUpdate={refetch} />
      }
    </div>
  )
}

export default ManageUser
