import { type AnswerType } from 'types/answers.types';
import { type TestType } from 'types/tests.types';

export const getTestPoints = (test: TestType, answers: AnswerType[]) => {
    let totalPoints = 0;
    test.questions.forEach((question, index) => {
        question.options.forEach((option) => {
            if (typeof answers[index] === 'object') {
                // @ts-expect-error
                answers[index].forEach((ans) => {
                    if (ans === option.label) totalPoints += +option.points;
                });
            }
            if (answers[index] === option.label) totalPoints += +option.points;
        });
    });
    return totalPoints;
};
