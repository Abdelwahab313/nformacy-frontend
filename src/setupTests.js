import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
require('jest-localstorage-mock');

jest.mock('@material-ui/core/styles', () => {
  return {
    ...require.requireActual('@material-ui/core/styles'),
    makeStyles: jest.fn().mockImplementation((styles) => {
      let tempStyle;
      if (typeof styles === 'function') {
        const theme = {
          zIndex: {},
          breakpoints: { down: () => {}, up: () => {} },
          palette: { common: {}, secondary: {}, primary: {} },
          shadows: new Array(20),
          spacing: jest.fn(),
        };
        tempStyle = {
          ...styles(theme),
        };
      } else {
        tempStyle = { ...styles };
      }
      for (const property in tempStyle) {
        tempStyle[property] = property;
      }
      return jest.fn().mockImplementation(() => tempStyle);
    }),
  };
});
