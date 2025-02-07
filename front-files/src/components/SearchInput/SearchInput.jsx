import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFiles } from '../../http/Files/file.http';
import { setFiles } from '../../redux/fileSlice';
import Form from 'react-bootstrap/Form';

function SearchInput() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    return () => clearTimeout(handler);
  }, [value]);

  useEffect(() => {
    getFiles(debouncedValue)
      .then((data) => dispatch(setFiles(data)))
  }, [debouncedValue])

  return (
    <>
    <div className='w-25 mx-auto m-5'>
      <Form.Label htmlFor="SearchInput">Search by File Name</Form.Label>
      <Form.Control
        type="text"
        id="SearchInput"
        onChange={handleChange}
      />
      <Form.Text id="SearchInput" muted></Form.Text>
      </div>
    </>
  );
}

export default SearchInput;