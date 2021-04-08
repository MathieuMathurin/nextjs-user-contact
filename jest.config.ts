import {configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({adapter: new Adapter()});

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};

