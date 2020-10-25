import {
  getIndexForColumn,
  getTotalActionTime,
  HOURS_FOR_ACTION,
} from '../QuestionsTable';
jest.mock('mui-datatables', () => {});

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
    const fakeColumns = [{ name: 'state' }, { name: 'hoursToReviewAndEdit' }];
    const fakeRow = ['review_and_edit', actionTime];

    const totalActionTime = getTotalActionTime(fakeRow, fakeColumns);

    expect(totalActionTime).toEqual(actionTime);
  });

  it('should return action time for answers rating state', () => {
    const actionTime = 8;
    const fakeColumns = [{ name: 'state' }, { name: 'hoursToCloseAnswers' }];
    const fakeRow = ['answers_rating', actionTime];

    const totalActionTime = getTotalActionTime(fakeRow, fakeColumns);

    expect(totalActionTime).toEqual(actionTime);
  });

  it('should return the static action time for assignment_acceptance', () => {
    const fakeColumns = [{ name: 'state' }];
    const fakeRow = ['assignment_acceptance'];

    const totalActionTime = getTotalActionTime(fakeRow, fakeColumns);

    expect(totalActionTime).toEqual(HOURS_FOR_ACTION);
  });
});
