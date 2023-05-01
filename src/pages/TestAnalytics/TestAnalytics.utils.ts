import { type AnswersType } from 'types/answers.types';

export const calculateTotalTestValues = (answers: AnswersType[]) => {
    let averageAge = 0;
    let averageTime = 0;
    let averagePoints = 0;
    const averageQuizAnswers: number[] = [0, 0, 0, 0, 0];

    answers.forEach((answer) => {
        averageAge = averageAge + +answer.age;
        averageTime = averageTime + +answer.time;
        averageQuizAnswers[0] =
            averageQuizAnswers[0] + +answer.quizAnswers.hard;
        averageQuizAnswers[1] =
            averageQuizAnswers[1] + +answer.quizAnswers.quality;
        averageQuizAnswers[2] =
            averageQuizAnswers[2] + +answer.quizAnswers.underStand;
        averageQuizAnswers[3] =
            averageQuizAnswers[3] + +answer.quizAnswers.possibilities;
        averageQuizAnswers[4] =
            averageQuizAnswers[4] + +answer.quizAnswers.result;
        averagePoints = averagePoints + +answer.points;
    });

    averageQuizAnswers[0] = averageQuizAnswers[0] / answers.length;
    averageQuizAnswers[1] = averageQuizAnswers[1] / answers.length;
    averageQuizAnswers[2] = averageQuizAnswers[2] / answers.length;
    averageQuizAnswers[3] = averageQuizAnswers[3] / answers.length;
    averageQuizAnswers[4] = averageQuizAnswers[4] / answers.length;

    return {
        averageTime: averageTime / answers.length,
        averageAge: averageAge / answers.length,
        averageQuizAnswers,
        averagePoints: averagePoints / answers.length,
    };
};
