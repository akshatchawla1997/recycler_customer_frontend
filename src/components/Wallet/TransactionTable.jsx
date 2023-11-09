import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWalletHistoryData } from '../../redux/features/getWalletHistorySlice';

function TransactionTable(props) {
  const {
    name, heading, walletId, transactionTypeFilter,
  } = props;
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.walletHistoryDetails.data?.data?.data || []);

  useEffect(() => {
    if (walletId !== null) {
      const response = dispatch(fetchWalletHistoryData(walletId));
    }
  }, [dispatch, walletId]);

  let data = [];

  if (transactionTypeFilter === 'dr') {
    data = tableData.filter((transaction) => transaction.transaction_type === 'dr');
  } else if (transactionTypeFilter === 'cr') {
    data = tableData.filter((transaction) => transaction.transaction_type === 'cr');
  }

  return (
    <>
      {' '}
      <div className='w-full text-center'>
        <div className='w-11/12 inline-block'>
          <h2 className='text-2xl py-5 text-start font-bold'>{name}</h2>
          <hr className='border-1 mb-5' />
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-sm text-gray-700 uppercase bg-gray-50 gray:bg-gray-700 dark:text-gray-400'>
                <tr className=''>
                  {heading?.map((head, index) => (
                    <th key={index} scope='col' className='px-6 py-3 text-black'>
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((transaction, index) => {
                  const [date, timeAndOffset] = transaction.wallet_updated.split('T');
                  const [, time] = timeAndOffset.split('+');
                  return (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-white-100' : 'bg-green-50'} border-b`}>
                      <td className='px-6 py-4 text-[#000000a6] font-medium'>{transactionTypeFilter === 'dr' ? index + 1 : transaction.order_id}</td>
                      <td className='px-6 py-4 text-[#000000a6] font-medium'>{date}</td>
                      <td className='px-6 py-4 text-[#000000a6] font-medium'>{time}</td>
                      <td className='px-6 py-4 text-[#000000a6] font-medium'>{transaction.transaction_amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionTable;
