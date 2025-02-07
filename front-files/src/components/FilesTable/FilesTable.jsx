import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';

function FilesTable() {
  const files = useSelector((state) => state.files.value);
  
  return (
    <Table className='mx-auto w-75' striped bordered hover variant="light">
      <thead>
        <tr>
          <th>File Name</th>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </tr>
      </thead>
      <tbody>
        {files?.map((fileData, index) => (
          fileData.lines?.map((line, lineIndex) => (
            <tr key={`${index}-${lineIndex}`}>
              <td>{fileData.file}</td>
              <td>{line.text}</td>
              <td>{line.number}</td>
              <td>{line.hex}</td>
            </tr>
          ))
        ))}
      </tbody>
    </Table>
  );
}

export default FilesTable;