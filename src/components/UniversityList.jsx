import React, { memo } from 'react';
import UniversityCard from './UniversityCard';

const UniversityList = memo(function UniversityList({ universities }) {
  if (universities.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '20px', color: '#fff' }}>Подходящих вузов не найдено</p>;
  }
  return (
    <ul>
      {universities.map(university => (
        <li key={university.id}>
          <UniversityCard university={university} />
        </li>
      ))}
    </ul>
  );
});
export default UniversityList;