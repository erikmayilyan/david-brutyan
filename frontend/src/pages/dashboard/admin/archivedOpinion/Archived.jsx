import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../../../LanguageContext';
import "./Archived.css";

const Archived = () => {
  const { language } = useLanguage('');
  const [archivedOpinions, setArchivedOpinions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArchivedOpinions = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/archived/archived-opinions');
        if (!response.ok) {
          throw new Error('Failed To Fetch Archived Opinions');
        }
        const data = await response.json();
        setArchivedOpinions(data.archived);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArchivedOpinions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(language === "ua" ? "Ви впевнені, що хочете видалити?" : "Вы уверены, что хотите удалить?")) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:4000/api/archived/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed To Delete Opinion');
      }
      setArchivedOpinions(archivedOpinions.filter(opinion => opinion._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p>{ language === "ua" ? 'ЗАВАНТАЖЕННЯ АРХІВНИХ ДУМОК...' : 'ЗАГРУЗКА АРХИВНЫХ МНЕНИЙ...' }</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <div className="archived-container">
      <h2>{ language === "ua" ? 'АРХІВНІ ДУМКИ' : 'АРХИВНЫЕ МНЕНИЯ' }</h2>
      {archivedOpinions.length === 0 ? (
        <p>{ language === "ua" ? 'АРХІВНИХ ДУМОК НЕ ЗНАЙДЕНО' : 'АРХИВНЫЕ МНЕНИЯ НЕ НАЙДЕНЫ' }</p>
      ) : (
        <table className="archived-table">
          <thead>
            <tr>
              <th>{ language === "ua" ? 'Ім\'я' : 'Имя' }</th>
              <th>{ language === "ua" ? 'Коментар' : 'Комментарий' }</th>
              <th>{ language === "ua" ? 'Дія' : 'Действие' }</th>
            </tr>
          </thead>
          <tbody>
            {archivedOpinions.map((opinion) => (
              <tr key={opinion._id} className="archived-item">
                <td>{opinion.name}</td>
                <td>{opinion.comment}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(opinion._id)}>
                    { language === "ua" ? 'Видалити' : 'Удалить' }
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Archived;