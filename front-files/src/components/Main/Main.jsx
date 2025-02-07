import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFiles } from '../../http/Files/file.http';
import { setFiles } from '../../redux/fileSlice';
import FilesTable from '../FilesTable/FilesTable';
import SearchInput from '../SearchInput/SearchInput';

function Main(){
	const dispatch = useDispatch();

	useEffect(() => {
    getFiles()
      .then((data) => dispatch(setFiles(data)))
  }, []);

  return (
		<>
			<SearchInput />
			<FilesTable />
		</>
	)

};

export default Main;
