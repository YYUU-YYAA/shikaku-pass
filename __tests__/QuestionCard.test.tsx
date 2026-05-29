import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { QuestionCard } from '../components/QuestionCard';
import { QUESTIONS } from '../data/questions';

const mockQuestion = QUESTIONS[0];

describe('QuestionCard', () => {
  it('renders question text', () => {
    const { getByText } = render(
      <QuestionCard question={mockQuestion} onAnswer={jest.fn()} />
    );
    expect(getByText(mockQuestion.content)).toBeTruthy();
  });

  it('renders all 4 answer options', () => {
    const { getByText } = render(
      <QuestionCard question={mockQuestion} onAnswer={jest.fn()} />
    );
    mockQuestion.options.forEach(opt => {
      expect(getByText(`${opt.key}. ${opt.text}`)).toBeTruthy();
    });
  });

  it('calls onAnswer with selected key', () => {
    const onAnswer = jest.fn();
    const { getByText } = render(
      <QuestionCard question={mockQuestion} onAnswer={onAnswer} />
    );
    fireEvent.press(getByText(`A. ${mockQuestion.options[0].text}`));
    expect(onAnswer).toHaveBeenCalledWith('A');
  });
});
