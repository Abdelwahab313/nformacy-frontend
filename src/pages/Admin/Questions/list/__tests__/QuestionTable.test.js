import { QUESTION_STATUS } from 'constants/questionStatus';
import {
  getIndexForColumn,
  getTotalActionTime,
} from '../QuestionsTable';
jest.mock('mui-datatables', () => {});

const HOURS_FOR_ACTION = 12;

describe('Map column name to index', () => {
  it('should return the corresponding column index for a given name', () => {
    const fakeColumns = [{ name: 'col1' }, { name: 'col2' }, { name: 'col3' }];

    const column2Idx = getIndexForColumn('col2', fakeColumns);

    expect(column2Idx).toEqual(1);
  });

  it('should throw exception if column name does not exists', () => {
    const fakeColumns = [{ name: 'col1' }, { name: 'col2' }, { name: 'col3' }];

    expect(() => getIndexForColumn('col4', fakeColumns)).toThrow(
      'Column: col4 does not exist',
    );
  });
});

describe('Extract total action time based on question state from table row data', () => {
  it('should return action time for review and edit state', () => {
    const actionTime = 24;
    const fakeColumns = [{ name: 'state' }, { name: 'hoursToReviewAndEdit' }, { name: 'hoursToCloseAnswers' }];
    const fakeRow = ['review_and_edit', actionTime, 100];

    const totalActionTime = getTotalActionTime(fakeRow, fakeColumns);

    expect(totalActionTime).toEqual(actionTime);
  });

  it('should return action time for answers rating state', () => {
    const actionTime = 8;
    const fakeColumns = [{ name: 'state' }, { name: 'hoursToReviewAndEdit' }, { name: 'hoursToCloseAnswers' }];
    const fakeRow = ['answers_rating', 10, actionTime];

    const totalActionTime = getTotalActionTime(fakeRow, fakeColumns);

    expect(totalActionTime).toEqual(actionTime);
  });

  it('should return nil if  draft state', () => {
    const fakeColumns = [{ name: 'state' }, { name: 'hoursToReviewAndEdit' }, { name: 'hoursToCloseAnswers' }];
    const fakeRow = [QUESTION_STATUS.draft, 10, 100];

    const totalActionTime = getTotalActionTime(fakeRow, fakeColumns);

    expect(totalActionTime).toEqual('');
  });

  it('should return the static action time for assignment_acceptance', () => {
    const fakeColumns = [{ name: 'state' }, { name: 'hoursToReviewAndEdit' }, { name: 'hoursToCloseAnswers' }];
    const fakeRow = [QUESTION_STATUS.pendingAdviserAcceptance, 10, 199];

    const totalActionTime = getTotalActionTime(fakeRow, fakeColumns);

    expect(totalActionTime).toEqual(HOURS_FOR_ACTION);
  });
});
