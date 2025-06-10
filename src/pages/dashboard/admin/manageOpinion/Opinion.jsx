import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../../../LanguageContext';
import "./Opinion.css";

const Opinion = () => {
  const { language } = useLanguage();
  const [opinions, setOpinions] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchOpinions = async () => {
      console.log("Fetching opinions from the database...");
      try {
        const response = await fetch("http://localhost:4000/api/opinion/total-opinions");
        if (!response.ok) {
          throw new Error("Failed to fetch opinions");
        }
        const data = await response.json();
        console.log("Opinions fetched successfully:", data);
  
        if (data && Array.isArray(data.opinions)) {
          setOpinions(data.opinions);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching opinions:", error);
        setError("Failed To Load Opinions");
      }
    };
  
    fetchOpinions();
  }, []);  

  const handleArchive = async (id) => {
    console.log(`Attempting to archive opinion with ID: ${id}`);
    try {
      const response = await fetch("http://localhost:4000/api/opinion/archive-opinion", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error("Failed To Archive Opinion");
      };
      console.log(`Opinion with ID: ${id} archived successfully.`);
      setOpinions((prevOpinions) => prevOpinions.filter((opinion) => opinion._id !== id));
      setSuccessMessage(language === "ua" ? "Думка успішно додана до архіву!" : "Opinion successfully archived!");
      alert("Думка успішно додана до архіву!");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error("Error archiving opinion:", error);
      setError("Error Archiving Opinion");
    }
  };

  const handleDelete = async (id) => {
    console.log(`Attempting to delete opinion with ID: ${id}`);
    try {
      const response = await fetch(`http://localhost:4000/api/opinion/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete opinion");
      }

      console.log(`Opinion with ID: ${id} deleted successfully.`);
      setOpinions((prevOpinions) => prevOpinions.filter((opinion) => opinion._id !== id));
    } catch (error) {
      console.error("Error deleting opinion:", error);
      setError("Error Deleting Opinion");
    }
  };

  return (
    <div className="opinion-container">
      <h2>{language === "ua" ? "Думки користувачів" : "Мнения пользователей"}</h2>

      {error && <p className="error-message">{error}</p>}

      {opinions.length > 0 ? (
        <div className="opinion-table-container">
          <table className="opinion-table">
            <thead>
              <tr>
                <th>{language === "ua" ? "Ім'я" : "Имя"}</th>
                <th>{language === "ua" ? "Коментар" : "Комментарий"}</th>
                <th>{language === "ua" ? "Дія" : "Действие"}</th>
              </tr>
            </thead>
            <tbody>
              {opinions.map((opinion) => (
                <tr key={opinion._id}>
                  <td>{opinion.name}</td>
                  <td>{opinion.comment}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(opinion._id)}>
                      {language === "ua" ? "Видалити" : "Удалить"}
                    </button>
                    <button className="add-btn"  onClick={() => handleArchive(opinion._id)}>
                      {language === "ua" ? "Архівувати" : "Архивировать"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>{language === "ua" ? "Немає думок" : "Нет мнений"}</p>
      )}
    </div>
  );
};

export default Opinion;
