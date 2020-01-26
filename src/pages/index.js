import { default as React, useState } from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import Layout from '../components/layout/layout';
import Main from '../components/layout/main';
import Header from '../components/header';
import { apiRoutes } from '../utils/config';
import Error from '../components/error';
import Loader from '../components/loader';

const Accounts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onClickHandler = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${apiRoutes.requestAccounts}`);
      const { accountsData }  = await response.json();


      setSubmitSuccess(true);
    } catch (err) {
      setSubmitSuccess(false);
    } finally {
      setSubmitted(true);
      setIsLoading(false);
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
        <div className="container">
          {!isLoading && <button onClick={onClickHandler}>click</button>}

        </div>
      </Main>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </Layout>
  );
};

export default Accounts;
