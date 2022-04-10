import React, {}from 'react'
import { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, updateUser } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useNavigate} from 'react-router-dom'
import { Card } from 'react-bootstrap'

const UserListScreen = () => {
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector((state)=>state.userLogin)
    const {userInfo}=userLogin

    const userUpdate = useSelector((state) => state.userUpdate)
    const { success: successUpdate } = userUpdate

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){

            dispatch(listUsers())
        }else{
 navigate('/login')
        }
    }, [dispatch,navigate,successUpdate,userInfo])

    

    const blockHandler=(user) => {
      if (window.confirm('Do you want to block this user?')) {
          dispatch(updateUser({ ...user, isBlocked: true }))
        }
  }
  const unblockHandler=(user) => {
      if (window.confirm('Unblock this user?')) {
          dispatch(updateUser({ ...user, isBlocked: false }))
        }
  }

    return (
        <>
        <h1 className='ms-4'>Users</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
<Card className='p-5'>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    {user.isBlocked ?
                              <Button variant ='danger' className='btn-sm' onClick={()=>unblockHandler(user)}>Unblock</Button>:
                              <Button variant ='danger' className='btn-sm' onClick={()=>blockHandler(user)}>Block</Button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </Card>
        )}
      </>
    )
}

export default UserListScreen