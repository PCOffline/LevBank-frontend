import { useContext, useEffect, useState } from 'react';
import { Typography, Card, Box } from '@mui/material';
import styled from '@emotion/styled';
import Table from '../../common/Table';
import DateRange from '../../common/DateRange';
import InfoCard from '../../common/InfoCard';
import Transfer from '../../common/Transfer';
import { ratesContext, userContext } from '../../../ContextWrapper';
import config from '../../../config';
import axios from 'axios';

const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: '2rem',
  gap: '1rem 3rem',
  flexWrap: 'wrap',
  width: '80%',
  paddingRight: '3rem',
  [theme.breakpoints.down('xl')]: {
    gap: '1rem 3rem',
    alignItems: 'start',
    flexDirection: 'row',
  },
}));

const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  gap: '0 3rem',
  // justifyContent: 'space-between',
  [theme.breakpoints.down('lg')]: {
    gap: '0 3rem',
  },
}));

const TableContainer = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '24px 30px 10px 30px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  height: 'fit-content',
  width: '100%',
  maxHeight: '31%',
}));

const StyledInfoCard = styled(InfoCard)(({ theme }) => ({
  maxHeight: '70%',
  [theme.breakpoints.down('xl')]: {
    width: '-webkit-fill-available',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontWeight: 'bold',
  fontSize: '1rem',
}));

const lendsAndLoansFields = [
  { key: 'amount', name: 'Amount' },
  { key: 'description', name: 'Description' },
  { key: 'date', name: 'Date' },
  { key: 'expiryDate', name: 'Expiry Date' },
  { key: 'to', secondaryKey: 'from', name: 'To/From' },
];

const withdrawRepayStatuses = ['approved', 'invalid'];

export default function LendsAndLoans(props) {
  const { currency } = props;
  const [filteredLendsOrLoans, setFilteredLendsOrLoans] = useState([]);
  const [requests, setRequests] = useState([]);
  const { user, setUser } = useContext(userContext);
  const { exchangeRates } = useContext(ratesContext);


  const isLoan = (object) => object.to === user.username;

  const lendButtons = [
    {
      text: (row) => (isLoan(row) ?  'Repay' : 'Withdraw'),
      onClick: (row) =>
        axios.post(
          `${config.apiUri}/finance/${isLoan(row) ? 'repay' : 'withdraw'}`,
          { transactionId: row.id },
        ).then((response) => {
          setRequests(prevRequests => {
            const newRequests = [...prevRequests];
            const index = newRequests.findIndex(request => request.id === row.id);
            newRequests[index] = toTableObject(response.data);
            return newRequests;
          });
          setUser((prevUser) => ({
            ...prevUser,
            balance:
              translateRates(prevUser.balance) -
              (isLoan(row) ? 1 : -1) * translateRates(response.amount),
          }));
        }
        ),
      isVisible: (row) =>
        withdrawRepayStatuses.includes(row.status) &&
        (isLoan(row) || row.status === 'invalid'),
      negative: (row) => isLoan(row),
    },
    {
      text: 'Approve',
      isVisible: (row) => !isLoan(row) && row.status === 'pending' && row.expiryTimestamp > new Date(),
      onClick: (row) => {
        axios
          .post(`${config.apiUri}/finance/approve`, {
            transactionId: row.id,
          })
          .then((response) => {
              setRequests((prevRequests) => {
                const newRequests = [...prevRequests];
                const index = requests.findIndex(
                  (request) => request.id === response.id
                );
                newRequests[index] = toTableObject(response.data);
                return newRequests;
              });
              setUser((prevUser) => ({
                ...prevUser,
                balance:
                  translateRates(prevUser.balance) -
                  translateRates(response.amount),
              }));
            },
          );
      },
    },
    {
      text: 'Reject',
      isVisible: (row) => !isLoan(row) && row.status === 'pending' && row.expiryTimestamp > new Date(),
      onClick: (row) => {
        axios
          .post(`${config.apiUri}/finance/reject`, {
            transactionId: row.id,
          })
          .then((response) =>
            setRequests((prevRequests) =>
              prevRequests.filter((request) => request.id === response._id),
            ),
          );
      },
      negative: true,
    },
  ];

  const translateRates = (lcValue) => {
    if (currency === 'LC') return lcValue;
    return (lcValue * exchangeRates.ils * exchangeRates.lc).toFixed(2);
  };

  useEffect(() => {
    axios
      .get(`${config.apiUri}/finance/me/requests`)
      .then((res) => setRequests(res.data.map(toTableObject)));
  }, [user, currency, exchangeRates]);

  const toTableObject = (lendOrLoan) => ({
    id: lendOrLoan._id,
    negative: lendOrLoan.sender === user.username,
    grey: lendOrLoan.status === 'pending',
    strikethrough:
      lendOrLoan.status === 'repaid' ||
      (lendOrLoan.status === 'pending' &&
        new Date(lendOrLoan.expiryDate) < new Date()),
    amount: `${lendOrLoan.sender === user.username ? '-' : '+'}${translateRates(
      lendOrLoan.amount,
    )} ${currency}`,
    timestamp: lendOrLoan.timestamp,
    date: new Date(lendOrLoan.timestamp).toLocaleDateString('en-GB'),
    expiryDate: new Date(lendOrLoan.expiryDate).toLocaleDateString('en-GB'),
    expiryTimestamp: new Date(lendOrLoan.expiryDate),
    description: lendOrLoan.description,
    to: lendOrLoan.recipient,
    from: lendOrLoan.sender,
    status: lendOrLoan.status,
  });

  return (
    <PageContainer>
      {/* <MainContainer> */}
      <TableContainer>
        <Title>Lends &amp; Loans</Title>
        <DateRange data={requests} setData={setFilteredLendsOrLoans} />
        <Table
          fields={lendsAndLoansFields}
          data={filteredLendsOrLoans}
          buttons={lendButtons}
        />
      </TableContainer>
      <MainContainer>
        <Transfer
          title={`New Lend`}
          recipientText='Username'
          exchangeRates={exchangeRates}
          currency={currency}
          buttonText='Lend'
          user={user}
          onClick={(recipient, expiryDate, amount, description) =>
            axios
              .post(`${config.apiUri}/finance/lend`, {
                amount,
                recipient,
                expiryDate,
                description,
              })
              .then((res) =>
                setUser(prevUser => ({
                  ...prevUser,
                  balance:
                    translateRates(prevUser.balance) -
                    translateRates(res.data.amount),
                })),
              )
          }
          withExpiryDate
        />
        <Transfer
          title={`New Loan`}
          recipientText='Username'
          buttonText='Request'
          user={user}
          exchangeRates={exchangeRates}
          currency={currency}
          onClick={(recipient, expiryDate, amount, description) =>
            axios
              .post(`${config.apiUri}/finance/loan`, {
                amount,
                recipient,
                expiryDate,
                description,
              })
              .then((res) => {
                setRequests((prevData) => [
                  ...prevData,
                  toTableObject(res.data),
                ]);
              })
          }
          withExpiryDate
        />
        {/* </MainContainer> */}
        <StyledInfoCard
          title='Lends &amp; Loans Page'
          details={[
            `You can ask for a loan or lend money to other users by typing in their username
           and the amount you are wishing to receive or give.`,
            `Lends are marked in red and loans in green. Pending requests are marked in grey.
            Repaid & withdrawn transactions are marked with a strikethrough.`,
           `Lends that can be withdrawn have a green 'Withdraw' button next to them 
           and loans that can be repaid have a red 'Repay' button next to them.`,
            `You can contact an admin for more information.`,
          ]}
        />
      </MainContainer>
    </PageContainer>
  );
}
