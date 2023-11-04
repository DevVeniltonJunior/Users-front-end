type User = {
  id: number
  name: string
  email: string
  phone: string
  createdAt: Date
  updatedAt: Date
}

type UserDTO = {
  name: string
  email: string
  phone: string
}

type Filter = {
  id?: string
  name?: string
  createdAt?: string
  gte?: string
  lte?: string
}

class ApiConnection {

  private static getUrl(options?: Filter): string {
    const apiURL = 'https://http://localhost:3000/users'

    if(options) {
      let name = ''
      let createdAt = ''
      let gte = ''
      let lte = ''

      if(options.name) name = options.name
      if(options.createdAt) createdAt = options.createdAt
      if(options.gte) gte = options.gte
      if(options.lte) lte = options.lte

      apiURL.concat(`?name=${name}&createdAt=${createdAt}&gte=${gte}&lte=${lte}`)
    }

    return apiURL
  }

  static get(filter?: Filter): Promise<User[]> {
    const url = this.getUrl(filter)

    const users = fetch(url, {
      method: 'GET',
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

    return users
  }

  static create(data: UserDTO) {
    const url = this.getUrl()

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

  static update(_id: string, data: Partial<UserDTO>) {
    const url = this.getUrl()

    const body = {
      id: parseInt(_id),
      name: data?.name,
      email: data?.email,
      phone: data?.phone
    }

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

  static delete(_id: string) {
    const url = this.getUrl({ id: _id })

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
