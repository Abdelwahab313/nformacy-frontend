import React from 'react';
import useForm from 'react-hook-form';
import '../../assets/addFormStyle.css';
const AddUserForm = ({ props }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={'addUserForm'}>
      <input
        type='text'
        placeholder='First name'
        name='First name'
        ref={register({ required: true, maxLength: 80 })}
        className='field'
      />
      <input
        type='text'
        placeholder='Last name'
        name='Last name'
        ref={register({ required: true, maxLength: 100 })}
        className='field'
      />
      <input
        type='tel'
        placeholder='Mobile number'
        name='Mobile number'
        ref={register({
          required: true,
          max: 11,
          min: 11,
          maxLength: 11,
          pattern: /'^(01)(?=\d{9}$)\d+$'/i,
        })}
        className='field'
      />
      <input
        type='text'
        placeholder='National ID'
        name='National ID'
        ref={register({
          required: true,
          max: 14,
          min: 14,
          maxLength: 14,
          pattern: /'(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d'/i,
        })}
        className='field'
      />
      <input
        type='password'
        placeholder='Password'
        name='Password'
        ref={register({ required: true, max: 15, min: 8, maxLength: 15 })}
        className='field'
      />

      <input type='submit' />
    </form>
  );
};
export default AddUserForm;
