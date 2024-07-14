import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDateRange, fetchReposStart, setCustomDate } from '../Redux/repoSlice';
import { Select,DatePicker } from 'antd';
import moment from 'moment';

const DateSelect = () => {
  const dispatch = useDispatch();
  const dateRange = useSelector(state => state.reposdata.dateRange);
  const customDate = useSelector(state => state.reposdata.customDate);
  const [range,setRange] = useState();

  const handleChange = (value) => {
   setRange(value);
   dispatch(setDateRange(value));
    if (value !== 'custom') {
     
      dispatch(fetchReposStart());
    }
  };
  const handleCustomDateChange = (date, dateString) => {
    
    dispatch(setCustomDate(dateString));
    dispatch(fetchReposStart());
  };
  return (
    <div>
      <label htmlFor="dateRange">Sort </label>
      <Select id="dateRange" value={dateRange} defaultValue="1 Month" onChange={handleChange} style={{width:120}}
      
      options={[
        {
          value: '1 week',
          label: 'Last 1 Week',
        },
        {
          value: '2 weeks',
          label: 'Last 2 weeks',
        },
        {
          value: '1 Month',
          label: 'Last 1 Month',
        },
        {
          value:'custom',
          lable:'custom date'
        }
       
      ]} />
        {dateRange === 'custom' && (
        <DatePicker 
        value={customDate ? moment(customDate, 'YYYY-MM-DD') : null}
          onChange={handleCustomDateChange} 
          style={{ marginLeft: 10 }} 
        />
      )}
       
    </div>
  );
};

export default DateSelect;
