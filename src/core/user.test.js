const { parseFreeDates } = require('./user');

describe('User model', () => {
  describe('parse free dates', () => {
    it('should parse free dates as date keys', () => {
      const freeDates = [
        {
          id: 0,
          title: '08:00 - 10:30',
          startDate: '2020-12-01 08:00',
          endDate: '2020-12-03 10:00',
        },
        {
          id: 1,
          title: '08:00 - 10:00',
          startDate: '2020-12-27 08:00',
          endDate: '2020-12-29 10:00',
        },
      ];

      const output = {
        '2020-12-01': [
          {
            from: '08:00',
            to: '10:00',
          },
        ],
        '2020-12-02': [
          {
            from: '08:00',
            to: '10:00',
          },
        ],
        '2020-12-03': [
          {
            from: '08:00',
            to: '10:00',
          },
        ],
        '2020-12-27': [
          {
            from: '08:00',
            to: '10:00',
          },
        ],
        '2020-12-28': [
          {
            from: '08:00',
            to: '10:00',
          },
        ],
        '2020-12-29': [
          {
            from: '08:00',
            to: '10:00',
          },
        ],
      };

      expect(parseFreeDates(freeDates)).toEqual(output);
    });

    it('parse days from multiple slots', () => {
      const freeDates = [
        {
          id: 0,
          title: '08:00 - 10:00',
          startDate: '2020-12-27 08:00',
          endDate: '2020-12-29 10:00',
        },

        {
          id: 1,
          title: '12:00 - 17:00',
          startDate: '2020-12-26 12:00',
          endDate: '2020-12-29 17:00',
        },
      ];

      const output = {
        '2020-12-26': [
          {
            from: '12:00',
            to: '17:00',
          },
        ],
        '2020-12-27': [
          {
            from: '08:00',
            to: '10:00',
          },
          {
            from: '12:00',
            to: '17:00',
          },
        ],
        '2020-12-28': [
          {
            from: '08:00',
            to: '10:00',
          },
          {
            from: '12:00',
            to: '17:00',
          },
        ],
        '2020-12-29': [
          {
            from: '08:00',
            to: '10:00',
          },
          {
            from: '12:00',
            to: '17:00',
          },
        ],
      };
      expect(parseFreeDates(freeDates)).toEqual(output);
    });

    it('parse days from overlapped slots', () => {
      const freeDates = [
        {
          id: 0,
          title: '08:00 - 14:00',
          startDate: '2020-12-27 08:00',
          endDate: '2020-12-27 14:00',
        },

        {
          id: 1,
          title: '12:00 - 17:00',
          startDate: '2020-12-26 12:00',
          endDate: '2020-12-27 17:00',
        },
      ];

      const output = {
        '2020-12-26': [
          {
            from: '12:00',
            to: '17:00',
          },
        ],
        '2020-12-27': [
          {
            from: '08:00',
            to: '17:00',
          },
        ],
      };
      expect(parseFreeDates(freeDates)).toEqual(output);
    });

    xit('parse days from multiple slots as overlapped', () => {
      const freeDates = [
        {
          id: 0,
          title: '08:00 - 10:00',
          startDate: '2020-12-27 08:00',
          endDate: '2020-12-27 10:00',
        },
        {
          id: 1,
          title: '12:00 - 17:00',
          startDate: '2020-12-26 12:00',
          endDate: '2020-12-27 17:00',
        },
        {
          id: 2,
          title: '19:00 - 22:00',
          startDate: '2020-12-26 07:00',
          endDate: '2020-12-27 14:00',
        },
      ];

      const output = {
        '2020-12-26': [
          {
            from: '12:00',
            to: '17:00',
          },
        ],
        '2020-12-27': [
          {
            from: '08:00',
            to: '17:00',
          },
        ],
      };
      expect(parseFreeDates(freeDates)).toEqual(output);
    });
  });
});
