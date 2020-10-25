import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import QuestionsFetcher, {
  filterQuestionsByFields,
} from '../useQuestionsFilter';
import { renderHook, act } from '@testing-library/react-hooks';
import { API_BASE_URL } from '../../../../settings';

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
    field: [
      {
        value: 'finance',
        label: 'Finance',
      },
    ],
    assignmentType: 'Question',
    endDate: endDate,
  },
  {
    referenceNumber: 2000101,
    title: 'test title 2',
    content: 'testContent 2',
    field: [
      {
        value: 'humanResource',
        label: 'Human Resource',
      },
      {
        value: 'formalEducation',
        label: 'Formal Education',
      },
    ],
    assignmentType: 'Question',
    endDate: endDate,
  },
  {
    referenceNumber: 2000102,
    title: 'test title 3',
    content: 'testContent 3',
    field: [
      {
        value: 'humanResource',
        label: 'Human Resource',
      },
    ],
    assignmentType: 'Question',
    endDate: endDate,
  },
  {
    referenceNumber: 2000103,
    title: 'test title 4',
    content: 'testContent 4',
    field: [
      {
        value: 'formalEducation',
        label: 'Formal Education',
      },
    ],
    assignmentType: 'Question',
    endDate: endDate,
  },
];
// add mock for axios filters
describe('Fetch question', () => {
  beforeEach(() => {
    mockApi
      .onGet(`${API_BASE_URL}/questions`)
      .reply(200, mockQuestionsWithFields);
  });

  it('should fetch questions successfully', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher());

    expect(result.current.filteredQuestions).toEqual(undefined);

    await waitForNextUpdate();

    expect(result.current.filteredQuestions.length).toEqual(4);
  });

  it('should filter questions based on given key', async () => {
    const filteredOutput = filterQuestionsByFields(mockQuestionsWithFields, [
      'finance',
    ]);

    expect(filteredOutput.length).toEqual(1);
  });

  it('should filter questions based on multiple keys', async () => {
    const filteredOutput = filterQuestionsByFields(mockQuestionsWithFields, [
      'humanResource',
      'formalEducation',
    ]);

    expect(filteredOutput.length).toEqual(3);
  });

  it('should reset questions if key is All', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher());

    await act(async () => {
      await waitForNextUpdate();
      result.current.resetFieldsFilter();

      expect(result.current.filteredQuestions.length).toEqual(4);
    });
  });

  it('should add key to filters and cause filtration to be invoked', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher());

    await act(async () => {
      await waitForNextUpdate();

      result.current.addFieldFilter('finance');

      expect(result.current.filteredQuestions.length).toEqual(1);
    });
  });

  xit('should remove key from filters and cause filtration to be invoked', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher());

    await act(async () => {
      await waitForNextUpdate();

      const filters = ['humanResource', 'formalEducation'];
      result.current.setFilters(filters);
      result.current.filterQuestions('formalEducation', filters);
      result.current.filterQuestions('humanResource', filters);

      expect(result.current.filteredQuestions.length).toEqual(3);

      result.current.removeFieldFilter('humanResource');

      expect(result.current.filteredQuestions.length).toEqual(2);
    });
  });

  it('should filter from previous filtered questions', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher());

    await act(async () => {
      await waitForNextUpdate();

      result.current.addFieldFilter('formalEducation');

      expect(result.current.filteredQuestions.length).toEqual(2);

      result.current.addFieldFilter('humanResource');

      expect(result.current.filteredQuestions.length).toEqual(3);
    });
  });

  xit('should filter from all questions on remove', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher());

    await act(async () => {
      await waitForNextUpdate();
      const filters = ['humanResource', 'formalEducation'];
      result.current.setFilters(filters);
      result.current.filterQuestions('formalEducation', filters);
      result.current.filterQuestions('humanResource', filters);

      expect(result.current.filteredQuestions.length).toEqual(3);

      result.current.removeFieldFilter('formalEducation');

      expect(result.current.filteredQuestions.length).toEqual(2);
    });
  });

  it('should return all questions on remove last filter', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher());

    await act(async () => {
      await waitForNextUpdate();

      result.current.addFieldFilter('formalEducation');

      expect(result.current.filteredQuestions.length).toEqual(2);

      result.current.removeFieldFilter('formalEducation');

      expect(result.current.filteredQuestions.length).toEqual(4);
    });
  });
});
