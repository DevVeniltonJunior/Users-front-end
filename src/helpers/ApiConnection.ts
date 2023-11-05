export type TUser = {
  id: number
  name: string
  email: string
  phone: string
  createdAt: string
  updatedAt: string
}

export type UserDTO = {
  name: string
  email: string
  phone: string
}

export type Filter = {
  id: string
  name?: string
  gte?: string
  lte?: string
}

class ApiConnection {

  private static getUrl(options?: Filter): string {
    const apiURL = 'http://localhost:3000/users'

    if(options) {
      let name = ''
      let gte = ''
      let lte = ''

      if(options.name) name = options.name
      if(options.gte) gte = options.gte
      if(options.lte) lte = options.lte

      apiURL.concat(`?name=${name}&gte=${gte}&lte=${lte}`)
    }

    return apiURL
  }

  static get(filter?: Filter): Promise<TUser[]> {
    console.log(this.getUrl(filter))
    const url = 'http://localhost:3000/users'

    const users = fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return data
      })
      .catch(error => {
        console.error(error);
      });

    return users
  }

  static create(data: UserDTO) {
    const url = 'http://localhost:3000/users'

    const body = {
      id: 1,
      name: data.name,
      email: data.email,
      phone: data.phone
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return data
      })
      .catch(error => {
        console.error(error);
      });
  }

  static update(_id: number, data: Partial<UserDTO>) {
    const url = 'http://localhost:3000/users'

    const body = {
      id: _id,
      name: data?.name,
      email: data?.email,
      phone: data?.phone
    }

    console.log(body)

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return data
      })
      .catch(error => {
        console.error(error);
      });
  }

  static delete(_id: number) {
    const apiURL = 'http://localhost:3000/users'
    const url = `${apiURL}?id=${_id}`

    console.log(url)

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return data
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export default ApiConnection
