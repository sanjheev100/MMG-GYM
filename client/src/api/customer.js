import axios from 'axios'

export const createCustomer = async (authtoken, values) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/createCustomer`,
    { values },
    {
      headers: {
        authtoken,
      },
    }
  )
}

export const getAllCustomer = async (authtoken, payload) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/getAllCustomer`,
    { payload },
    {
      headers: {
        authtoken,
      },
    }
  )
}

export const getTotalCustomerCount = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/totalCustomerCount`, {
    headers: {
      authtoken,
    },
  })
}

export const getSingleMember = async (authtoken, id) => {
  return await axios.get(`${process.env.REACT_APP_API}/getCustomer/${id}`, {
    headers: {
      authtoken,
    },
  })
}

export const paidStatusChange = async (authtoken, payload) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/paidStatusChange`,
    { payload },
    {
      headers: {
        authtoken,
      },
    }
  )
}

export const activeStatusChange = async (authtoken, payload) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/activeStatusChange`,
    { payload },
    {
      headers: {
        authtoken,
      },
    }
  )
}

export const editCustomer = async (authtoken, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/editCustomer`,
    { values },
    {
      headers: {
        authtoken,
      },
    }
  )
}

export const removeCustomer = async (authtoken, id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/removeCustomer/${id}`,

    {
      headers: {
        authtoken,
      },
    }
  )
}

export const getPaidMembers = async (authtoken, payload) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/getPaidMembers`,
    { payload },
    {
      headers: {
        authtoken,
      },
    }
  )
}

export const getPaidMembersCount = async (authtoken, id) => {
  return await axios.get(`${process.env.REACT_APP_API}/getPaidCount`, {
    headers: {
      authtoken,
    },
  })
}

export const getUnpaidMembers = async (authtoken, payload) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/getUnpaidMembers`,
    { payload },
    {
      headers: {
        authtoken,
      },
    }
  )
}

export const getUnpaidMembersCount = async (authtoken, id) => {
  return await axios.get(`${process.env.REACT_APP_API}/getUnpaidCount`, {
    headers: {
      authtoken,
    },
  })
}

export const getSearchResult = async (authtoken, payload) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/getSearchResult`,
    { payload },
    {
      headers: {
        authtoken,
      },
    }
  )
}

export const getAllUnpaidMembers = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/getAllUnpaidMembers`, {
    headers: {
      authtoken,
    },
  })
}

export const getAllPaidMembers = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/getAllPaidMembers`, {
    headers: {
      authtoken,
    },
  })
}
