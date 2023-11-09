/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

function Location({ formData = {}, handleformChange, setErrorState }) {
  const [validationErrors, setValidationErrors] = useState({});
  const onhandleChange = (event) => {
    let { name, value } = event.target;
    const errors = { ...validationErrors };
    switch (name) {
      case 'city':
        value = value.trim().replace(/\s{2,}/g, ' ');
        if (!/^[A-Za-z]+(\s[A-Za-z]+)*$/.test(value)) {
          errors[name] = 'Please enter characters only!';
        } else {
          delete errors[name];
        }
        break;

      case 'pincode':
        if (!/^\d{6}$/.test(value)) {
          if (value !== '' && isNaN(value)) {
            errors[name] = 'Please enter numbers only.';
          } else {
            errors[name] = 'Pincode should be a 6-digit number.';
          }
        } else {
          delete errors[name];
        }
        break;
      case 'state':
        value = value.trim().replace(/\s{2,}/g, ' ');
        if (!/^[A-Za-z]+(\s[A-Za-z]+)*$/.test(value)) {
          errors[name] = 'Please enter characters only!';
        } else {
          delete errors[name];
        }
        break;
      default:
        break;
    }
    if (value === '') {
      delete errors[name];
    }

    setValidationErrors(errors);
    setErrorState(errors);

    handleformChange((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <>
      <h5 className='pickupformheading'>Location</h5>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 text-left'>
        <div className='py-2'>
          <label htmlFor='flat'>
            Flat/House no./Apartment
            {' '}
            <span className='text-red-600'>*</span>
          </label>
          <br />
          <input className='inputCommonCss w-full' type='text' name='flat_number' onChange={onhandleChange} value={formData.flat_number} id='flat' required />
        </div>

        <div className='py-2'>
          <label htmlFor='area'>
            Area/Street/Sector/Village
            <span className='text-red-600'>*</span>
          </label>
          <br />
          <input className='inputCommonCss w-full' type='text' name='area' onChange={onhandleChange} value={formData.area} id='area' required />
        </div>
        <div className='py-2'>
          <label htmlFor='landmark'>
            Landmark
            <span className='text-red-600'>*</span>
          </label>
          <br />
          <input className='inputCommonCss w-full' type='text' name='landmark' onChange={onhandleChange} value={formData.landmark} id='landmark' required />
        </div>
        <div className='py-2'>
          <label htmlFor='pincode'>
            Pincode
            <span className='text-red-600'>*</span>
          </label>
          <br />
          <input type='text' className='inputCommonCss w-full' name='pincode' onChange={onhandleChange} value={formData.pincode} id='pincode' required />
          {validationErrors.pincode && <p className='text-red-600'>{validationErrors.pincode}</p>}
        </div>
        <div className='py-2'>
          <label htmlFor='city'>
            Town/City
            <span className='text-red-600'>*</span>
          </label>
          <br />
          <input className='inputCommonCss w-full' type='text' name='city' onChange={onhandleChange} value={formData.city} id='city' required />
          {validationErrors.city && <p className='text-red-600'>{validationErrors.city}</p>}
        </div>
        <div className='py-2'>
          <label htmlFor='state'>
            State
            <span className='text-red-600'>*</span>
          </label>
          <br />
          <input className='inputCommonCss w-full' type='text' name='state' onChange={onhandleChange} value={formData.state} id='state' required />
          {validationErrors.state && <p className='text-red-600'>{validationErrors.state}</p>}
        </div>
      </div>
    </>
  );
}

export default Location;
