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
    ]);
  });
  it('should fetch questions successfully', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher());

    expect(result.current.questions).toEqual(undefined);

    await waitForNextUpdate();

    expect(result.current.questions.length).toEqual(3);
  });

  it('should filter questions based on given key', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher());

    await act(async () => {
      await waitForNextUpdate();

      result.current.filterQuestions(['finance']);

      expect(result.current.questions.length).toEqual(1);
    });
  });

  it('should filter questions based on multiple keys', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher());

    await act(async () => {
      await waitForNextUpdate();

      result.current.filterQuestions(['finance', 'formalEducation']);

      expect(result.current.questions.length).toEqual(2);
    });
  });

  it('should not duplicate question if has multiple filter keys', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher());

    await act(async () => {
      await waitForNextUpdate();

      result.current.filterQuestions(['finance', 'formalEducation']);

      expect(result.current.questions.length).toEqual(2);
    });
  });

  it('should reset questions if key is All', async () => {
    const { result, waitForNextUpdate } = renderHook(() => QuestionsFetcher());

    await act(async () => {
      await waitForNextUpdate();

      result.current.filterQuestions(['all']);

      expect(result.current.questions.length).toEqual(3);
    });
  });
});
