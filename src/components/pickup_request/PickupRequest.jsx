// eslint-disable jsx-a11y/label-has-associated-control
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import Location from './Location';
import QuantityTable from './QuantityTable';
import 'react-toastify/dist/ReactToastify.css';
import DateOfPickup from './DateOfPickup';
import TimeSlots from './TimeSlots';
import { fetchScrap } from '../../redux/features/scraprateSlice';
import { initialPickupState, orderPickup } from '../../redux/features/pickupSlice';
import UserInfo from './UserInfo';

function PickupRequest() {
  const [errorState, setErrorState] = useState({});
  const [formData, setFormData] = useState(initialPickupState);
  const handleformChange = (updateFormData) => {
    setFormData(updateFormData);
  };
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const receivedData = location.state;
  const { data: scrapData } = useSelector((state) => state.scrapDetails);
  const checkboxData = scrapData?.data?.data;
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    const initiallySelectedItem = checkboxData?.find((item) => item.id === receivedData?.pickupData.id);
    if (initiallySelectedItem) {
      setSelectedCheckboxes([initiallySelectedItem]);
    }
  }, [checkboxData]);

  const handleCheckClick = (event, item) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedCheckboxes([...selectedCheckboxes, item]);
    } else {
      setSelectedCheckboxes(selectedCheckboxes.filter((selectedItem) => selectedItem !== item));
    }
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    formData.pickup_date = date;
  };
  const onTimeChange = (time) => {
    formData.pickup_time = time;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    formData.user = localStorage.getItem('userid');
    if (formData.pickup_request_items.length !== 0 && Object.keys(errorState).length === 0) {
      dispatch(orderPickup(formData)).then((response) => {
        const pickupResponseData = response?.payload;
        if (pickupResponseData?.status === 201) {
          toast.success('Pickup Request Added Successfully');
          navigate('/confirmpickup', { state: { pickupData: pickupResponseData?.data } });
        } else if (formData.pickup_date === '') {
          toast.error('Please Enter a valid date');
        } else if (formData.pickup_time === '') {
          toast.error('Please Enter a valid Time');
        } else {
          toast.error('Something went wrong');
        }
      });
    }
  };
  const handleQuantityChange = (updatedItems) => {
    setFormData((prevState) => ({
      ...prevState,
      pickup_request_items: [...prevState.pickup_request_items, ...updatedItems],
    }));
  };

  useEffect(() => {
    dispatch(fetchScrap())?.then((response) => response);
  }, [dispatch]);

  return (
    <div className='py-20 scroll-smooth'>
      <div className='heading'>
        <h1 className='text-center text-3xl font-bold'>Pickup Request</h1>
      </div>
      <div className='m-auto mt-10 w-11/12 text-xl border-2 p-5 shadow-lg` '>
        <UserInfo />
        <br />
        <hr />
        <br />
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-1 2xl:grid-cols-2'>
            <div className=''>
              <DateOfPickup handleDateChange={handleDateChange} />
            </div>
            <div className=''>
              <TimeSlots onTimeChange={onTimeChange} selectedDate={selectedDate} />
            </div>
          </div>

          <br />
          <hr />
          <br />
          <Location handleformChange={handleformChange} setErrorState={setErrorState} />

          <br />
          <hr />
          <br />
          {Object.values(selectedCheckboxes).length === 0 ? <p className='text-red-600'>** Please Select Categories </p> : ''}
          <h4 className=' font-bold py-5'>Categories</h4>
          <div className='checkboxes grid grid-cols-1 md:grid-cols-2 '>
            {checkboxData?.map((item) => (
              <div className='text-start'>
                <label key={item?.id} htmlFor={item?.item_name} className='mx-5 flex gap-3 max-w-max'>
                  <input
                    className='h-6 w-6 p-5   '
                    type='checkbox'
                    name={item?.item_name}
                    id={item?.item_name}
                    checked={selectedCheckboxes.some((selectedItem) => selectedItem.id === item.id)}
                    onChange={(event) => handleCheckClick(event, item)}
                  />
                  {' '}
                  {item?.item_name}
                </label>
              </div>
            ))}
          </div>
          <br />

          <br />

          <QuantityTable selectedCheckboxes={selectedCheckboxes} onQuantityChange={handleQuantityChange} />

          <div className='pt-4 button flex justify-center items-center md:flex-none '>
            <button type='submit' className=' w-26 flex h-12 p-2 justify-center pt-3  md:flex-none  primaryButton '>
              Confirm Pickup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PickupRequest;
