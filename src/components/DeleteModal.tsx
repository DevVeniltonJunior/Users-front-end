import ApiConnection from '../helpers/ApiConnection'
import style from './Modal.module.css'
//import { useState } from 'react'

type TModal = {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
  id: number[]
}

const DeleteModal = ({ isOpen, setOpen, id }: TModal) => {

  if(!isOpen) return <></>

  if(isOpen && !id || id.length === 0) {
    alert('Please select at least one user')
    return <></>
  }

  const submit = () => {
    id.map(value => ApiConnection.delete(value))
  }

  return (
    <div className={style.background}>
      <div className={style.modal}>
      <h2>Delete User</h2>

        <form onSubmit={() => submit()}>
          <p>Are you sure you want to delete this user?</p>
          <button id='submit' type="submit">Delete</button>
        </form>
        <button id='cancel' onClick={() => setOpen(!isOpen)}>Close</button>
      </div>
    </div>
  )
}

export default DeleteModal
