import React, { useState, useEffect, useCallback, useMemo } from 'react';
import SearchForm from '../components/SearchForm';
import UniversityList from '../components/UniversityList';
import { getUniversities } from '../services/data';

function HomePage() {
  const [universities, setUniversities] = useState([]);
  const [criteria, setCriteria] = useState({});
  const [showAll, setShowAll] = useState(false); 

  const universitiesToShow = 5; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUniversities();
        setUniversities(data);
      } catch (err) {
        setError(err.message || "Обнаружена ошибка");
      }
    };

    fetchData();
  }, []);

  const handleSearch = useCallback((newCriteria) => {
    setCriteria(newCriteria);
  }, []);

  const handleLoadAll = () => {  
    setShowAll(true);
  };

  const filteredUniversities = useMemo(() => {
    let filtered = universities;

    if (Object.keys(criteria).length > 0) {
      filtered = universities.filter(uni => {
        let regionMatches = true;
        if (criteria.регион) {
          regionMatches = uni.регион.toLowerCase().includes(criteria.регион.toLowerCase());
        }

        let subjectsMatch = true;
        if (criteria.предметыСБаллами && criteria.предметыСБаллами.length > 0) {
          subjectsMatch = criteria.предметыСБаллами.every(item => {
            const subject = item.subject;
            const score = item.score;

            if (!uni.предметыЕГЭ.includes(subject)) {
              return false;
            }

            if (score !== null && uni.проходныеБаллыПоПредметам && uni.проходныеБаллыПоПредметам[subject] !== undefined) {
              return score >= uni.проходныеБаллыПоПредметам[subject];
            }

            return true;
          });
        }

        let directionMatches = true;
        if (criteria.направление) {
          directionMatches = uni.направление.toLowerCase().includes(criteria.направление.toLowerCase());
        }
        let mathTypeMatches = true; // Фильтрация по типу математики
        if (criteria.типМатематики) {
            mathTypeMatches = uni.типМатематики === criteria.типМатематики;
          }

        return regionMatches && subjectsMatch && directionMatches && mathTypeMatches;
      });
    }
    return showAll ? filtered : filtered.slice(0, universitiesToShow);

  }, [universities, criteria, showAll]); 

  return (
    <div>
      <h1>Поиск ВУЗа</h1>
      <SearchForm onSearch={handleSearch} initialRegion={criteria.регион} />
      <UniversityList universities={filteredUniversities} />
      {!showAll && universities.length > universitiesToShow && (
        <button onClick={handleLoadAll}>Загрузить все</button>
      )}
      
    </div>
    
  );
}

export default HomePage;