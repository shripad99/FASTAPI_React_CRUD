import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';


function App() {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:8000/')
    return setUsers(response.data)
  }
  const fetchUser = async (id) => {
    const response = await axios.get(`http://localhost:8000/${id}`)
    return setUser(response.data)
  }
  const createOrEditUser = async () => {
    if (user.id) {
      await axios.put(`http://localhost:8000/${user.id}`, user)
    } else {
      await axios.post(`http://localhost:8000`, user)
    }
    await fetchUsers()
    await setUser({ id: 0, name: '', email: '', password: '' })
  }
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8000/${id}`)
    await fetchUsers()
  }
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">Users</Button>
        </Toolbar>
      </AppBar>
      <Box m={10}>
        <TableContainer component={Paper}>
          <TextField value={user.id} type='hidden' />
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell><TextField value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} id='standard-basic-name' label="Name" type='text' /></TableCell>
                <TableCell><TextField value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} id='standard-basic-email' label="Email" type='email' /></TableCell>
                <TableCell><TextField value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} id='standard-basic-password' label="Password" type='password' /></TableCell>
                <TableCell><Button onClick={() => createOrEditUser()} variant='contained' color='primary'>Submit</Button></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              {users.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.password}</TableCell>
                  <TableCell><Button onClick={() => fetchUser(row.id)} variant="contained" color="primary">Edit</Button></TableCell>
                  <TableCell><Button onClick={() => deleteUser(row.id)} variant="contained" color="secondary">Delete</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default App;
