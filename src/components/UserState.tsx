import { useState, useEffect } from 'react'
import ApiConnection, { TUser } from '../helpers/ApiConnection'
import UpdateModal from './UpdateModal'
import DeleteModal from './DeleteModal'

const UserState = () => {
  const [rows, setRows] = useState<TUser[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [openId, setOpenId] = useState<number>(0)

  const [updateOpen, setUpdateOpen] = useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)

    getUsers()
  }, [])

  const getUsers = async (): Promise<void> => {
    ApiConnection.get().then(users => {
      setIsLoading(false)

      if(users instanceof Error) alert(users.message)
      setRows(users)
    })
  }

  return (
    <>
      <table>
        <th>
          <td>Id</td>
          <td>name</td>
          <td>email</td>
          <td>phone</td>
          <td>created at</td>
          <td></td>
          <td></td>
        </th>
        <tbody>
          {isLoading ? <tr><td>Loading...</td></tr> : rows.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.phone}</td>
              <td>{row.createdAt}</td>
              <td><button onClick={() => { setUpdateOpen(!updateOpen), setOpenId(row.id) }}>Update</button></td>
              <td><button onClick={() => { setDeleteOpen(!deleteOpen), setOpenId(row.id) }}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateModal isOpen={updateOpen} setOpen={setUpdateOpen} id={openId}/>
      <DeleteModal isOpen={deleteOpen} setOpen={setDeleteOpen} id={openId}/>
    </>
  )
}

export default UserState