import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function SaleTable({rows}) {
  const handleDelete = (id) => {
    axios
        .delete(
            `http://127.0.0.1:8000/api/sales/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            }
        )
        .then((res) => {
            console.log(res.data);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Goods</TableCell>
            <TableCell align="right">Quantity</TableCell>
            {
              localStorage.getItem('name') === 'admin'
              ?
              <TableCell align="right">Actions</TableCell>:''
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.goods.name}</TableCell>
              <TableCell align="right" component="th" scope="row">{row.quantity}</TableCell>
              {
                localStorage.getItem('name') === 'admin'
                ?
                <TableCell align="right">
                  <Button variant="contained" href={`/sales/${row.id}`}>Edit</Button>
                  <Button variant="contained" color='error' onClick={() => handleDelete(row.id)}>Delete</Button>
                </TableCell>:''
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}