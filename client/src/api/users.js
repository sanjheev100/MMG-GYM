import axios from 'axios'

export const getAllDBUsers = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/getAllDBUsers`, {
    headers: {
      authtoken,
    },
  })
}

export const updateManager = async (authtoken, payload) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/updateManager`,
    { payload },
    {
      headers: {
        authtoken,
      },
    }
  )
}

export const removeManager = async (authtoken, payload) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/removeManager`,
    { payload },
    {
      headers: {
        authtoken,
      },
    }
  )
}

export const deleteUser = async (authtoken, id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/deleteUser/${id}`,

    {
      headers: {
        authtoken,
      },
    }
  )
}
