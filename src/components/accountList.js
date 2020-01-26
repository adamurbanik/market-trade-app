import { default as React, forwardRef } from 'react';
import MaterialTable from 'material-table';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Clear from '@material-ui/icons/Clear';
import Search from '@material-ui/icons/Search';
import { spacing, typography } from './variables';

const tableIcons = {
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />)
};

const AccountList = ({ data }) => (
  <>
    <div className="table-header">
      Sorted by Name (asc), Profit & Loss (asc)
    </div>
    <MaterialTable
      icons={tableIcons}
      columns={[
        {
          title: 'Name',
          field: 'name',
          cellStyle: {
            width: 220,
            maxWidth: 220
          },
          headerStyle: {
            width: 220,
            maxWidth: 220
          }
        },
        {
          title: 'Profit & Loss',
          field: 'currencyProfitLoss',
          cellStyle: {
            width: 220,
            maxWidth: 220
          },
          headerStyle: {
            width: 220,
            maxWidth: 220
          }
        },
        {
          title: 'Account Type',
          field: 'title',
          cellStyle: {
            width: 320,
            maxWidth: 320
          },
          headerStyle: {
            width: 320,
            maxWidth: 320
          }
        }
      ]}
      data={data}
      title="Accounts"
      options={{
        headerStyle: {
          backgroundColor: '#c9d1d6',
          color: '#FFF'
        },
        rowStyle: {
          backgroundColor: '#EEE'
        },
        paging: false
      }}
    />
    <style jsx>{`
      .table-header {
        margin-bottom: ${spacing.md};
        font-size: ${typography.sm};
      }
    `}</style>
  </>
);

export default AccountList;
