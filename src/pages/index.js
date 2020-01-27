import { default as React, useState } from 'react';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import Layout from '../components/layout/layout';
import Main from '../components/layout/main';
import Header from '../components/header';
import { apiRoutes } from '../utils/config';
import Error from '../components/error';
import Loader from '../components/loader';
import AccountList from '../components/accountList';
import { spacing } from '../components/variables';

const Accounts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onClickHandler = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${apiRoutes.requestAccounts}`);
      const { accountsData } = await response.json();
      setAccounts(accountsData);

      setFetchSuccess(true);
    } catch (err) {
      setFetchSuccess(false);
    } finally {
      setIsLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Accounts</title>
      </Head>
      <Main>
        {isLoading && <Loader />}
        {!isLoading && <Header />}
        {!isLoading && (
          <div className="container">
            <Button variant="outlined" color="primary" onClick={onClickHandler}>
              Get Accounts
            </Button>
            {submitted && fetchSuccess && (
              <div className="accounts-wrapper">
                <AccountList data={accounts} />
              </div>
            )}
            {submitted && !fetchSuccess && <Error />}
          </div>
        )}
      </Main>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .accounts-wrapper {
          margin: ${spacing.xl3} 0;
        }
      `}</style>
    </Layout>
  );
};

export default Accounts;
