import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { QuestionCard } from '../components/QuestionCard';
import { QUESTIONS } from '../data/questions';

const mockQuestion = QUESTIONS[0];

describe('QuestionCard', () => {
  // shuffle()はMath.random()ベースのため、テストでは0.5固定でsortを無効化し
  // 表示順を元のA/B/C/D順に保つ（表示ラベルは位置ベースのためopt.keyと一致する）
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

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
