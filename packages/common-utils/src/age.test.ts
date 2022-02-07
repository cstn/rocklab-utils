import age, { Unit } from './age';

describe('utils', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it.each`
    timestamp                     | unit                 | expected
    ${'2022-01-02T00:00:00.000Z'} | ${Unit.Days}         | ${1}
    ${'2022-01-02T00:00:00.000Z'} | ${Unit.Hours}        | ${24}
    ${'2022-01-02T00:00:00.000Z'} | ${Unit.Minutes}      | ${24 * 60}
    ${'2022-01-02T00:00:00.000Z'} | ${Unit.Seconds}      | ${24 * 60 * 60}
    ${'2022-01-02T00:00:00.000Z'} | ${Unit.Milliseconds} | ${24 * 60 * 60 * 1000}
  `(
    'should calculate the absolute age of a timestamp in $unit',
    ({ timestamp, unit, expected }: { timestamp: string; unit: Unit; expected: number }) => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2022-01-03T00:00:00.000Z'));

      const result = age(new Date(timestamp), unit);

      expect(Math.floor(result)).toEqual(expected);
    }
  );

  it.each`
    timestamp                     | unit                 | expected
    ${'2022-01-02T00:00:00.000Z'} | ${Unit.Days}         | ${1}
    ${'2022-01-03T08:00:00.000Z'} | ${Unit.Hours}        | ${2}
    ${'2022-01-03T09:45:00.000Z'} | ${Unit.Minutes}      | ${15}
    ${'2022-01-03T09:59:01.000Z'} | ${Unit.Seconds}      | ${59}
    ${'2022-01-03T09:59:59.900Z'} | ${Unit.Milliseconds} | ${100}
  `(
    'should calculate the relative age of a timestamp in $unit',
    ({ timestamp, unit, expected }: { timestamp: string; unit: Unit; expected: number }) => {
      const result = age(new Date(timestamp), unit, new Date('2022-01-03T10:00:00.000Z'));

      expect(Math.floor(result)).toEqual(expected);
    }
  );
});
