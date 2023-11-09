import React from 'react';

function CompletedList({ completedList }) {
  const newCompletedList = completedList
    ? Object.values(completedList).reduce((accumulator, data) => {
      if (accumulator[data.created_at]) {
        // If the id already exists in the accumulator, merge the data
        accumulator[data.created_at] = {
          ...accumulator[data.created_at],
          pickuprequestitem__item_id__item_name: [...accumulator[data.created_at].pickuprequestitem__item_id__item_name, data.pickuprequestitem__item_id__item_name],
          pickuprequestitem__weight: [...accumulator[data.created_at].pickuprequestitem__weight, data.pickuprequestitem__weight],
        };
      } else {
        // If the id doesn't exist in the accumulator, add a new entry
        accumulator[data.created_at] = { ...data };
        accumulator[data.created_at].pickuprequestitem__item_id__item_name = [data.pickuprequestitem__item_id__item_name];
        accumulator[data.created_at].pickuprequestitem__weight = [data.pickuprequestitem__weight];
      }
      return accumulator;
    }, [])
    : [];
  return (
    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
      <thead className='text-xs text-gray-700 uppercase bg-gray-50 gray:bg-gray-700 dark:text-gray-400'>
        <tr>
          <th scope='col' className='px-6 py-3 text-black'>
            Order Id
          </th>
          <th scope='col' className='px-6 py-3 text-black'>
            Pickup Date
          </th>
          <th scope='col' className='px-6 py-3 text-black'>
            Time
          </th>
          <th scope='col' className='px-6 py-3 text-black'>
            Pickup Category
          </th>
          <th scope='col' className='px-6 py-3 text-black'>
            Pickup Quantity
          </th>
          <th scope='col' className='px-6 py-3 text-black'>
            Paid Amount
          </th>
          <th scope='col' className='px-6 py-3 text-black'>
            Payment Method
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(newCompletedList)
          .reverse()
          .map(([index, data], idx) => (
            <tr key={index} className={`${idx % 2 === 0 ? 'bg-white-100' : 'bg-green-50'} border-b`}>
              <td className='px-6 py-4 text-[#000000a6] font-medium'>{data.id}</td>
              <td className='px-6 py-4 text-[#000000a6] font-medium'>{data.pickup_date}</td>
              <td className='px-6 py-4 text-[#000000a6] font-medium'>{data.pickup_time}</td>
              <td className='px-6 py-4 text-[#000000a6] font-medium'>
                <ul>
                  {data.pickuprequestitem__item_id__item_name.map((itemName, idx) => (
                    <li key={idx}>{itemName}</li>
                  ))}
                </ul>
              </td>
              <td className='px-6 py-4 text-[#000000a6] font-medium'>
                <ul>
                  {data.pickuprequestitem__weight.map((itemWeight, idx) => (
                    <li key={idx}>{itemWeight}</li>
                  ))}
                </ul>
              </td>
              <td className='px-6 py-4 text-[#000000a6] font-medium'>{data.total_amount}</td>
              <td className='px-6 py-4 text-[#000000a6] font-medium'>UPI</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default CompletedList;
