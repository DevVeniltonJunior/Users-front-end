import { useState, useEffect } from 'react'
import ApiConnection, { TUser } from '../helpers/ApiConnection'
import UpdateModal from './updateModal'
import DeleteModal from './DeleteModal'

const UserState = () => {
  const [rows, setRows] = useState<TUser[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [updateOpen, setUpdateOpen] = useState<boolean>(true)
  const [deleteOpen, setDeleteOpen] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)

    getUsers()
  }, [])

  const getUsers = async (): Promise<void> => {
    ApiConnection.get().then(users => {
      setIsLoading(false)

      if(users instanceof Error) alert(users.message)
      setRows(users)
      setTotalCount(users.length)
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
              <td><button>Edit</button></td>
              <td><button>delete</button></td>
              <UpdateModal isOpen={updateOpen} setOpen={setUpdateOpen} id={row.id}/>
              <DeleteModal isOpen={deleteOpen} setOpen={setDeleteOpen} id={row.id}/>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default UserState