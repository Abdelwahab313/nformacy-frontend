import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import QuestionsFetcher from '../../hooks/QuestionsFetcher';
import { renderHook, act } from '@testing-library/react-hooks';
import { API_BASE_URL } from '../../settings';

const mock = new MockAdapter(axios);

describe('Fetch question', () => {
  beforeEach(() => {
    const today = new Date();
    const endDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 10,
    );
    mock.onGet(`${API_BASE_URL}/questions`).reply(200, [
      {
        referenceId: 2000100,
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
        referenceId: 2000101,
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
        referenceId: 2000102,
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
        referenceId: 2000103,
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
    ]);
  });

  it('should fetch questions successfully', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher());

    expect(result.current.questions).toEqual(undefined);

    await waitForNextUpdate();

    expect(result.current.questions.length).toEqual(4);
  });

  it('should filter questions based on given key', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher());

    await act(async () => {
      await waitForNextUpdate();

      result.current.filterQuestions('finance');

      expect(result.current.questions.length).toEqual(1);
    });
  });

  it('should filter questions based on multiple keys', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher());

    await act(async () => {
      await waitForNextUpdate();

      result.current.filterQuestions('humanResource');
      result.current.filterQuestions('formalEducation');

      expect(result.current.questions.length).toEqual(1);
    });
  });

  it('should reset questions if key is All', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher());

    await act(async () => {
      await waitForNextUpdate();

      result.current.filterQuestions('all');

      expect(result.current.questions.length).toEqual(4);
    });
  });

  it('should add key to filters and cause filtration to be invoked', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher());

    await act(async () => {
      await waitForNextUpdate();

      result.current.addFilter('finance');

      expect(result.current.questions.length).toEqual(1);
    });
  });

  it('should remove key from filters and cause filtration to be invoked', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher());

    await act(async () => {
      await waitForNextUpdate();

      result.current.setFilters(['humanResource', 'formalEducation']);
      result.current.filterQuestions('formalEducation');
      result.current.filterQuestions('humanResource');

      expect(result.current.questions.length).toEqual(1);

      result.current.removeFilter('humanResource');

      expect(result.current.questions.length).toEqual(0);
    });
  });

  it('should filter from previous filtered questions', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher());

    await act(async () => {
      await waitForNextUpdate();

      result.current.addFilter('formalEducation');

      expect(result.current.questions.length).toEqual(1);

      result.current.addFilter('humanResource');

      expect(result.current.questions.length).toEqual(1);
    });
  });
});
