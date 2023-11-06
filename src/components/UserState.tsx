import { useState, useEffect } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ApiConnection, { TUser } from '../helpers/ApiConnection'
import UpdateModal from './UpdateModal'
import DeleteModal from './DeleteModal'

const UserState = () => {
  const [rows, setRows] = useState<TUser[]>([])

  const [openId, setOpenId] = useState<number[]>([])

  const [updateOpen, setUpdateOpen] = useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'phone', headerName: 'Phone', width: 90 },
    { field: 'created_at', headerName: 'Created at', width: 160},
  ]

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async (): Promise<void> => {
    ApiConnection.get().then(users => {

      if(users instanceof Error) alert(users.message)
      setRows(users)
    })
  }

  return (
    <>
      <button id='action' onClick={() => { setDeleteOpen(!deleteOpen) }}>Delete</button>
      <button id='action' onClick={() => { setUpdateOpen(!updateOpen) }}>Update</button>
      
      <div style={{ height: 400, width: '60%', backgroundColor: 'gray', margin: 'auto', marginTop: '20px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onRowSelectionModelChange={(selection) => {
            if (selection && selection.length > 0) {
              console.log(selection)
              const array = selection as number[]
              setOpenId(array)
            } else {
              console.log('no selection',selection)
              setOpenId([])
            }
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
      <UpdateModal isOpen={updateOpen} setOpen={setUpdateOpen} id={openId}/>
      <DeleteModal isOpen={deleteOpen} setOpen={setDeleteOpen} id={openId}/>
    </>
  )
}

export default UserState