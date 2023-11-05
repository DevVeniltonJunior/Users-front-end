import ApiConnection from '../helpers/ApiConnection'
import style from './InsertModal.module.css'
//import { useState } from 'react'

type TModal = {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
}

const InsertModal = ({ isOpen, setOpen }: TModal) => {

  if(!isOpen) return <></>

  const submit = () => {
    const name = document.getElementById('name') as HTMLInputElement
    const email = document.getElementById('email') as HTMLInputElement
    const phone = document.getElementById('phone') as HTMLInputElement

    console.log(name.value, email.value, phone.value)

    ApiConnection.create({
      name: name.value,
      email: email.value,
      phone: phone.value
    })
  }

  return (
    <div className={style.background}>
      <div className={style.modal}>
        <form onSubmit={() => submit()}>
          <input id='name' type="text" placeholder="Insert your Name" required/>
          <input id='email' type="email" placeholder="Insert your Email" pattern="^[a-zA-Z0-9._%+-]+@+[a-zA-Z]+\.[a-zA-Z]$" required/>
          <input id='phone' type="tel" placeholder="Insert your Phone" pattern="^[0-9]{2}([0-9]{8}|[0-9]{9})" required/>

          <button type="submit">Submit</button>
        </form>
        <button onClick={() => setOpen(!isOpen)}>Close</button>
      </div>
    </div>
  )
}

export default InsertModal
