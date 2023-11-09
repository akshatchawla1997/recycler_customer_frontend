/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Backbtn from '../BackBtn';
import { bankData } from '../../redux/features/bankSlice';

function TransferToBank() {
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const [bankForm, setBankForm] = useState({
    user: localStorage.getItem('userid') || '',
    account_number: '',
    ifsc_code: '',
    branch_name: '',
    account_holder_name: '',
    bank_name: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBankForm({ ...bankForm, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(bankForm);
    if (Object.keys(errors).length === 0) {
      try {
        await dispatch(bankData(bankForm));
        resetForm();
        toast.success('Bank Details submitted successfully!');
      } catch (error) {
        toast.error('Something went wrong..');
      }
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!/^[0-9]+$/.test(data.account_number)) {
      errors.account_number = 'Account Number must contain only numbers';
    } else if (data.account_number.length < 9 || data.account_number.length > 18) {
      errors.account_number = 'Account Number must be between 9 and 18 digits';
    } else if (!/^[0-9]+$/.test(data.account_number)) {
      errors.account_number = 'Account Number must contain only numbers';
    }

    if (!data.ifsc_code) {
      errors.ifsc_code = 'IFSC Code is required';
    } else if (!/^[A-Za-z0-9]+$/.test(data.ifsc_code)) {
      errors.ifsc_code = 'IFSC Code should only contain letters and numbers';
    }

    if (!data.branch_name) {
      errors.branch_name = 'Branch Name is required';
    }

    const trimmedBranchName = data.branch_name.trim();

    if (!trimmedBranchName) {
      errors.branch_name = 'Branch Name is required';
    } else {
      const hasNumbers = /\d/.test(trimmedBranchName);
      const hasSpecialCharacters = /[^a-zA-Z\s]/.test(trimmedBranchName);

      if (hasNumbers) {
        errors.branch_name = 'Branch Name cannot contain numbers';
      } else if (hasSpecialCharacters) {
        errors.branch_name = 'Branch Name cannot contain special characters';
      }
    }

    if (!data.bank_name) {
      errors.bank_name = 'Bank Name is required';
    }

    const trimmedBankName = data.bank_name.trim();

    if (!trimmedBankName) {
      errors.bank_name = 'Bank Name is required';
    } else {
      const hasNumbers = /\d/.test(trimmedBankName);
      const hasSpecialCharacters = /[^a-zA-Z\s]/.test(trimmedBankName);

      if (hasNumbers) {
        errors.bank_name = 'Bank Name cannot contain numbers';
      } else if (hasSpecialCharacters) {
        errors.bank_name = 'Bank Name cannot contain special characters';
      }
    }

    const trimmedAccountHolderName = data.account_holder_name.trim();

    if (!trimmedAccountHolderName) {
      errors.account_holder_name = 'Account Holder Name is required';
    } else {
      const hasNumbers = /\d/.test(trimmedAccountHolderName);
      const hasSpecialCharacters = /[^a-zA-Z\s]/.test(trimmedAccountHolderName);

      if (hasNumbers) {
        errors.account_holder_name = 'Account Holder Name cannot contain numbers';
      } else if (hasSpecialCharacters) {
        errors.account_holder_name = 'Account Holder Name cannot contain special characters';
      }
    }

    return errors;
  };

  const resetForm = () => {
    setBankForm({
      user: localStorage.getItem('userid') || '',
      account_holder_name: '',
      account_number: '',
      bank_name: '',
      branch_name: '',
      ifsc_code: '',
    });
  };

  return (
    <div className='w-full text-center bg-gray-100'>
      <div className='absolute mt-20 ml-10'>
        <Backbtn />
      </div>
      <div className='lg:w-10/12 mx-auto pt-20'>
        <div className='w-full text-center'>
          <div className='w-10/12 mx-auto'>
            <form onSubmit={handleSubmit} action='' className='pt-10 text-xl'>
              <h1 className='lg:mt-10 md:mt-10 sm:mt-10 mt-20 text-start lg:text-4xl md:test-4xl sm:text-4xl text-2xl font-medium text-[#263238]'>Transfer to your bank account</h1>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10'>
                <div className='text-start'>
                  <label htmlFor='phone' className='text-[#000000bf] font-medium'>
                    Account Holder Name *
                  </label>
                  <br />
                  <input
                    type='text'
                    className={`h-16 w-full bg-gray-200 border-2 rounded-xl p-5 mt-3 ${formErrors.account_holder_name ? 'border-red-500' : ''}`}
                    name='account_holder_name'
                    value={bankForm?.account_holder_name}
                    placeholder='Enter Account Holder Name'
                    onChange={handleInputChange}
                  />
                  <br />
                  {formErrors.account_holder_name && <span className='text-red-500 text-sm font-medium'>{formErrors.account_holder_name}</span>}
                </div>
                <div className='text-start'>
                  <label htmlFor='Name' className='text-[#000000bf] font-medium'>
                    Account Number *
                  </label>
                  <br />
                  <input
                    type='number'
                    className={`h-16 w-full bg-gray-200 border-2 rounded-xl p-5 mt-3 ${formErrors.account_number ? 'border-red-500' : ''}`}
                    name='account_number'
                    value={bankForm?.account_number}
                    onChange={handleInputChange}
                    placeholder='Enter your Account Number'
                  />
                  <br />
                  {formErrors.account_number && <span className='text-red-500 text-sm font-medium'>{formErrors.account_number}</span>}
                </div>
                <div className='text-start'>
                  <label htmlFor='phone' className='text-[#000000bf] font-medium'>
                    Bank Name *
                  </label>
                  <br />
                  <input
                    type='text'
                    className={`h-16 w-full bg-gray-200 border-2 rounded-xl p-5 mt-3 ${formErrors.bank_name ? 'border-red-500' : ''}`}
                    name='bank_name'
                    placeholder='Enter Bank Name'
                    value={bankForm?.bank_name}
                    onChange={handleInputChange}
                  />
                  <br />
                  {formErrors.bank_name && <span className='text-red-500 text-sm font-medium'>{formErrors.bank_name}</span>}
                </div>
                <div className='text-start'>
                  <label htmlFor='Address' className='text-[#000000bf] font-medium'>
                    IFSC Code *
                  </label>
                  <br />
                  <input
                    type='text'
                    className={`h-16 w-full bg-gray-200 border-2 rounded-xl p-5 mt-3 ${formErrors.ifsc_code ? 'border-red-500' : ''}`}
                    name='ifsc_code'
                    value={bankForm?.ifsc_code}
                    placeholder='Enter IFSC Code'
                    onChange={handleInputChange}
                  />
                  <br />
                  {formErrors.ifsc_code && <span className='text-red-500 text-sm font-medium'>{formErrors.ifsc_code}</span>}
                </div>
                <div className='text-start'>
                  <label htmlFor='email' className='text-[#000000bf] font-medium'>
                    Branch Name *
                  </label>
                  <br />
                  <input
                    type='text'
                    className={`h-16 w-full bg-gray-200 border-2 rounded-xl p-5 mt-3 ${formErrors.branch_name ? 'border-red-500' : ''}`}
                    name='branch_name'
                    value={bankForm?.branch_name}
                    placeholder='Enter Branch Name'
                    onChange={handleInputChange}
                  />
                  <br />
                  {formErrors.branch_name && <span className='text-red-500 text-sm font-medium'>{formErrors.branch_name}</span>}
                </div>
              </div>
              <div className='flex justify-center pb-20'>
                <button type='submit' className='text-center rounded-2xl lg:text-2xl md:text-2xl text-xl p-5 text-white lg:px-20 md:px-16  bg-[#27AE76] justify-center mt-20'>
                  Redeem to your Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferToBank;
