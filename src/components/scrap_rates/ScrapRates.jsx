import React, { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavHashLink } from 'react-router-hash-link';
import { fetchScrap } from '../../redux/features/scraprateSlice';
import Error from '../Error';
import Loader from '../Loader';

const useScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);
};
function ScrapRates() {
  const navigate = useNavigate();
  useScrollToTop();
  const authtoken = localStorage.getItem('AuthToken');
  const dispatch = useDispatch();
  const { loading, data: scrapData, error } = useSelector((state) => state.scrapDetails);
  if (loading) {
    <Loader />;
  } else if (error) {
    <Error />;
  }
  const scrapRateData = scrapData?.data;
  const handleOnClick = (item) => {
    navigate('/pickuprequest', { state: { pickupData: item } });
  };
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    dispatch(fetchScrap())?.then((response) => {});
  }, [dispatch]);

  const renderPickupButton = (item) => {
    if (authtoken === null) {
      return (
        <NavHashLink to='/#herobar'>
          <button type='submit' className='w-full border-2 py-1 font-medium border-green-500 text-green-500 hover:text-white hover:bg-green-600 bg-white focus:bg-green-600 rounded-lg'>
            Pickup Request
          </button>
        </NavHashLink>
      );
    }
    return (
      <div onClick={() => handleOnClick(item)}>
        <button type='submit' className='w-full border-2 py-1 font-medium border-green-500 text-green-500 hover:text-white hover:bg-green-600 bg-white focus:bg-green-600 rounded-lg'>
          Pickup Request
        </button>
      </div>
    );
  };
  return (
    <div className='w-full text-center'>
      <div className='w-11/12 mx-auto pt-28 px-4'>
        <h1 className='text-center text-5xl text-[#3E3E3E] '>Scrap Rates</h1>
        <div className='pt-20 mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 justify-items-center'>
          {scrapRateData?.data?.map((item, index) => (
            <div key={index} className=' w-72 sm:w-64 md:w-72 lg:w-72 justify-center p-4 my-4 bg-white rounded-md border-2 shadow-xl bg-center'>
              <div className='h-80'>
                <div className='flex justify-center align-middle'>
                  <img src={item.image_url} className='h-48 w-76' alt={item?.item_name} />
                </div>
                <div className='name text-center'>
                  <h3 className='font-bold text-xl mt-2'>{item?.item_name}</h3>
                  <p className='mt-2'>
                    Price: Rs
                    {item?.rate}
                  </p>
                </div>
              </div>
              <div className='justify-center p-2 mt-2'>{renderPickupButton(item)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScrapRates;
