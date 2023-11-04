import ApiConnection from '../helpers/ApiConnection'
import style from './InsertModal.module.css'
//import { useState } from 'react'

type TModal = {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
  id: number
}

const DeleteModal = ({ isOpen, setOpen, id }: TModal) => {

  if(!isOpen) return <></>

  const submit = () => {
    ApiConnection.delete(id)
  }

  return (
    <div className={style.background}>
      <div className={style.modal}>
        <form action="#" onSubmit={() => submit()}>
          <p>Are you sure you want to delete this user?</p>
          <button type="submit">Update</button>
        </form>
        <button onClick={() => setOpen(!isOpen)}>Close</button>
      </div>
    </div>
  )
}

export default DeleteModal
