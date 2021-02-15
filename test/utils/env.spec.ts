import { baseDevURL } from '../../src/utils';

test('baseDevURL', () => {
  expect(baseDevURL).toEqual('http://127.0.0.1:8000');
});
