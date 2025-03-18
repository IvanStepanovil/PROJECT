import React, { useState, useCallback, useEffect } from 'react';

function SearchForm({ onSearch, initialRegion }) {
    const [direction, setDirection] = useState(''); 
    const [регион, setРегион] = useState(initialRegion || '');
    const [mathType, setMathType] = useState('');
    const [предметыЕГЭ, setПредметыЕГЭ] = useState({
        'Русский': '',
        'Математика': '',
    });

    const availableSubjects = [
        'Физика',
        'Химия',
        'История',
        'Обществознание',
        'Информатика и ИКТ',
        'Биология',
        'География',
        'Английский язык',
        'Немецкий язык',
        'Французский язык',
        'Испанский язык',
        'Китайский язык',
        'Литература'
    ];

    const availableRegions = [
        'Москва',
        'Санкт-Петербург',
        
    ];
    const availableDirections = [
        'Математическое',
        'Физика',
        'Информатика',
        'Юриспруденция',
        'Международные отношения',
        'Космическое',
        'Медицинское',
        'Социология',
        'Педагогическое',
        'Творческое',
        'Географическое',


        
    ];

    useEffect(() => {
        if (initialRegion) {
            setРегион(initialRegion);
        }
    }, [initialRegion]);

   const handleScoreChange = useCallback((subject, score) => {
        const parsedScore = Number(score);

        if (parsedScore >= 0 && parsedScore <= 100) {
            setПредметыЕГЭ(prevState => ({ ...prevState, [subject]: score }));
        } else {
            setПредметыЕГЭ(prevState => ({ ...prevState, [subject]: '' }));
        }
    }, []);

    const handleSubjectToggle = useCallback((subject) => {
        setПредметыЕГЭ(prevState => {
            const {[subject]: removed, ...rest} = prevState;
            return prevState[subject] ? rest : {...prevState, [subject]: ''};
        });
    }, []);
    const handleDirectionChange = (event) => {
        setDirection(event.target.value);
    };
    const handleMathTypeChange = (event) => { 
        setMathType(event.target.value);
      };

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        const subjectsWithScores = Object.entries(предметыЕГЭ).map(([subject, score]) => ({
            subject: subject,
            score: score ? Number(score) : null,
        }));

        onSearch({
            регион: регион,
            предметыСБаллами: subjectsWithScores,
            направление: direction,
            типМатематики: mathType, 
        });
      }, [регион, предметыЕГЭ, direction, onSearch]);

    const handleReset = useCallback(() => {
        setРегион('');
        setПредметыЕГЭ({
            'Русский': '',
            'Математика': '',
        });
        setDirection('');
        onSearch({});
        setMathType('');
    }, [onSearch]);

    const handleKeyPress = (event) => {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
        }
    };

    const handleBlur = (subject, event) => {
        const value = event.target.value;
        const parsedValue = Number(value);

        if (parsedValue < 0 || parsedValue > 100) {
            setПредметыЕГЭ(prevState => ({ ...prevState, [subject]: '' }));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
             <label>
                Предметы ЕГЭ:
                <div>
                    <label>
                        Русский
                        <input
                            type="number"
                            placeholder="Балл"
                            value={предметыЕГЭ['Русский']}
                            onChange={(e) => handleScoreChange('Русский', e.target.value)}
                            style={{ marginLeft: '10px' }}
                            onKeyDown ={handleKeyPress}
                            onBlur={(e) => handleBlur('Русский', e)}
                        />
                    </label>
                    <label>
                        Математика
                        <input
                            type="number"
                            placeholder="Балл"
                            value={предметыЕГЭ['Математика']}
                            onChange={(e) => handleScoreChange('Математика', e.target.value)}
                            style={{ marginLeft: '10px' }}
                            onKeyDown={handleKeyPress}
                            onBlur={(e) => handleBlur('Математика', e)}
                        />
                    </label>

                    <div class="additional-subjects">
                        {availableSubjects.map(subject => (
                            <label
                                key={subject}
                                className={`subject-tag ${предметыЕГЭ[subject] !== undefined ? 'selected' : ''}`}
                            >
                                <input
                                    type="checkbox"
                                    checked={предметыЕГЭ[subject] !== undefined}
                                    onChange={() => handleSubjectToggle(subject)}
                                />
                                {subject}
                                {предметыЕГЭ[subject] !== undefined && (
                                    <input
                                        type="number"
                                        placeholder="Балл"
                                        value={предметыЕГЭ[subject] || ''}
                                        onChange={(e) => handleScoreChange(subject, e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        onBlur={(e) => handleBlur(subject, e)}
                                    />
                                )}
                            </label>
                        ))}
                    </div>
                </div>
            </label>
            <label class='bl'>
                Математика:
                <select value={mathType} onChange={handleMathTypeChange}>
                <option value="">Выберите уровень</option>
                <option value="базовая">Базовая</option>
                <option value="профильная">Профильная</option>
                </select>
            </label>
            <label class='bl'>
                Регион:
                <select value={регион} onChange={(e) => setРегион(e.target.value)}>
                    <option value="">Выберите регион</option>
                    {availableRegions.map(region => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </select>
            </label>
            <label class='bl'>
                Направление:
                <select value={direction} onChange={handleDirectionChange}>
                    <option value="">Выберите направление</option>
                    {availableDirections.map(dir => (
                        <option key={dir} value={dir}>{dir}</option>
                    ))}
                </select>
            </label>

           

            <div className="form-buttons">
                <button type="submit">Подтвердить</button>
                <button type="button" onClick={handleReset}>Сбросить</button>
            </div>
        </form>
    );
}

export default SearchForm;