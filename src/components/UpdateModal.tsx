import ApiConnection from '../helpers/ApiConnection'
import style from './Modal.module.css'

type TModal = {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
  id: number[]
}

const UpdateModal = ({ isOpen, setOpen, id }: TModal) => {
  console.log(id)
  if(!isOpen) return <></>

  if(isOpen && !id || id.length === 0) {
    alert('Please select at least one user')
    return <></>
  }

  const submit = () => {
    const name = document.getElementById('updateName') as HTMLInputElement
    const email = document.getElementById('updateEmail') as HTMLInputElement
    const phone = document.getElementById('updatePhone') as HTMLInputElement

    console.log('test', name.value, email.value, phone.value)
    id.map(value => {
      console.log('update'	,value)
      ApiConnection.update(value, {
        name: name.value,
        email: email.value,
        phone: phone.value
      })
    })
  }

  return (
    <div className={style.background}>
      <div className={style.modal}>
      <h2>Update User</h2>

        <form onSubmit={() => submit()}>
          <input id='updateName' type="text" placeholder="Update your Name"/>
          <input id='updateEmail' type="email" placeholder="Update your Email" pattern="^[a-zA-Z0-9._%+-]+@+[a-zA-Z]+\.[a-zA-Z]$"/>
          <input id='updatePhone' type="tel" placeholder="Update your Phone" pattern="^[0-9]{2}([0-9]{8}|[0-9]{9})"/>

          <button id='submit' type="submit">Update</button>
        </form>
        <button id='cancel' onClick={() => setOpen(!isOpen)}>Close</button>
      </div>
    </div>
  )
}

export default UpdateModal
