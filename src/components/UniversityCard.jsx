import React, { memo } from 'react';

const UniversityCard = memo(function UniversityCard({ university }) {
  return (
    <div className="university-card">
      <h3>{university.название || "Название отсутствует"}</h3>
      <p>Направление: {university.названиенаправления || "Направление не указано"}</p>
      <p>Регион: {university.регион || "Регион не указан"}</p>
      <p>Проходной балл: {university.проходныеБаллы || "Баллы не указаны"}</p>
      <p>Дополнительное вступительное испытание (ДВИ): {university.ДВИ || "ДВИ не указано"}</p>
      <p>Сайт: {university.ссылка ? (<a href= {university.ссылка} target="_blank"  >Перейти на сайт</a>) : "Ссылка не указана"}</p>
      <p>Форма обучения: {university.формаОбучения || "форма Обучения не указана"}</p>
    </div>
  );
});

export default UniversityCard;