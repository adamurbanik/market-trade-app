import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Accounts from './index';

jest.mock('material-table');

describe('Accounts', () => {
  let accountsData;
  beforeAll(() => {
    accountsData = [
      {
        accountType: 'IGSB',
        currency: '$',
        currencyProfitLoss: '$ 0.23',
        funds: 10000,
        id: 1,
        name: 'Spread bet',
        profitLoss: 0.23,
        title: 'Spread bet account'
      },
      {
        accountType: 'IGSB',
        currency: '$',
        currencyProfitLoss: '$ -679',
        funds: 1000,
        id: 2,
        name: 'New Spread bet',
        profitLoss: -679,
        title: 'Spread bet account'
      },
      {
        accountType: 'IGSB',
        currency: '$',
        currencyProfitLoss: '$ 16.211',
        funds: 20000000,
        id: 3,
        name: 'Spread bet - demo',
        profitLoss: 16.211,
        title: 'Spread bet account'
      }
    ];
  });

  test('renders correctly', () => {
    const wrapper = shallow(<Accounts />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.children.length).toBe(1);
  });

  test('renders successfully in submitted state', async () => {
    const tree = renderer.create(<Accounts />);

    await renderer.act(async () => {
      fetch.mockResponseOnce(JSON.stringify(accountsData));

      const button = tree.root.find(el => el.type === 'button');
      await button.props.onClick();

      const accountWrapper = tree.root.findAllByType('div')[2];

      expect(tree.toJSON()).toMatchSnapshot();
      expect(accountWrapper.props.children).toMatch(
        'Sorted by Name (asc), Profit & Loss (asc)'
      );
    });
  });

  test('renders in error state', async () => {
    const tree = renderer.create(<Accounts />);

    await renderer.act(async () => {
      fetch.mockRejectOnce();

      const button = tree.root.find(el => el.type === 'button');
      await button.props.onClick();

      const error = tree.root.findByType('h1');

      expect(tree.toJSON()).toMatchSnapshot();
      expect(error.props.className.includes('error-header')).toBe(true);
    });
  });
});
