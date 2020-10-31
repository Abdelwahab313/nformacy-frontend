import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import QuestionsFetcher, {
  filterQuestionsByFields,
} from '../useQuestionsFilter';
import { renderHook, act } from '@testing-library/react-hooks';
import { API_BASE_URL } from '../../../../settings';
import { QuestionRoasterProvider } from '../../context';
import {
  addFieldFilter,
  addLanguageFilter,
  removeFieldFilter,
  resetFieldsFilters,
} from 'pages/QuestionRoaster/context/questionsRoasterAction';

const mockApi = new MockAdapter(axios);

const today = new Date();
const endDate = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() + 10,
);
const mockQuestionsWithFields = [
  {
    referenceNumber: 2000100,
    title: 'test title',
    content: 'testContent',
    language: 'arabic',
    fields: [{
      id: 30,
      label: 'Audit',
      majorFieldId: 1,
    }],
    assignmentType: 'Question',
    endDate: endDate,
  },
  {
    referenceNumber: 2000101,
    title: 'test title 2',
    content: 'testContent 2',
    language: 'english',
    fields: [
      {
        id: 31,
        label: 'Human Resource',
        majorFieldId: 2,
      },
      {
        id: 32,
        label: 'Formal Education',
        majorFieldId: 3,
      },
    ],
    assignmentType: 'Question',
    endDate: endDate,
  },
  {
    referenceNumber: 2000102,
    title: 'test title 3',
    content: 'testContent 3',
    language: 'english',
    fields: [
      {
        id: 31,
        label: 'Human Resource',
        majorFieldId: 2,
      },
    ],
    assignmentType: 'Question',
    endDate: endDate,
  },
  {
    referenceNumber: 2000103,
    title: 'test title 4',
    content: 'testContent 4',
    language: 'english',
    fields: [
      {
        id: 32,
        label: 'Formal Education',
        majorFieldId: 3,
      },
    ],
    assignmentType: 'Question',
    endDate: endDate,
  },
];

const wrapper = ({ children }) => (
  <QuestionRoasterProvider>{children}</QuestionRoasterProvider>
);
// add mock for axios filters
describe('Fetch question', () => {
  beforeEach(() => {
    mockApi
      .onGet(`${API_BASE_URL}/questions`)
      .reply(200, mockQuestionsWithFields);
  });

  it('should fetch questions successfully', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher(), {
      wrapper,
    });

    expect(result.current.filteredQuestions).toEqual([]);

    await waitForNextUpdate();

    expect(result.current.filteredQuestions.length).toEqual(4);
  });

  it('should filter questions based on given key', async () => {
    const filteredOutput = filterQuestionsByFields(mockQuestionsWithFields, [
      1,
    ]);

    expect(filteredOutput.length).toEqual(1);
  });

  it('should filter questions based on multiple keys', async () => {
    const filteredOutput = filterQuestionsByFields(mockQuestionsWithFields, [
      2,
      3,
    ]);

    expect(filteredOutput.length).toEqual(3);
  });

  it('should reset questions if key is All', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher(), {
      wrapper,
    });
    await act(async () => {
      await waitForNextUpdate();
      resetFieldsFilters(result.current.dispatch);

      expect(result.current.filteredQuestions.length).toEqual(4);
    });
  });

  it('should add key to filters and cause filtration to be invoked', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher(), {
      wrapper,
    });
    await act(async () => {
      await waitForNextUpdate();

      addFieldFilter(result.current.dispatch, 1);

      expect(result.current.filteredQuestions.length).toEqual(1);
    });
  });

  it('should filter from previous filtered questions', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher(), {
      wrapper,
    });
    await act(async () => {
      await waitForNextUpdate();

      addFieldFilter(result.current.dispatch, 3);

      expect(result.current.filteredQuestions.length).toEqual(2);

      addFieldFilter(result.current.dispatch, 2);

      expect(result.current.filteredQuestions.length).toEqual(3);
    });
  });

  it('should return all questions on remove last filter', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher(), {
      wrapper,
    });
    await act(async () => {
      await waitForNextUpdate();

      addFieldFilter(result.current.dispatch, 3);

      expect(result.current.filteredQuestions.length).toEqual(2);

      removeFieldFilter(result.current.dispatch, 3);

      expect(result.current.filteredQuestions.length).toEqual(4);
    });
  });

  it('should filter questions based on language', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher(), {
      wrapper,
    });

    await act(async () => {
      await waitForNextUpdate();

      addLanguageFilter(result.current.dispatch, 'arabic');

      expect(result.current.filteredQuestions.length).toEqual(1);

      addLanguageFilter(result.current.dispatch, 'english');

      expect(result.current.filteredQuestions.length).toEqual(3);
    });
  });
});
