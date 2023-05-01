export const quizBarOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Статистика вопросов после теста',
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            max: 10,
        },
    },
};

export const quizBarLabels = [
    'Сложность',
    'Качество',
    'Понимание',
    'Возможности',
    'Согласие',
];
