let token = ''

const setToken = (givenToken) => {
  token = `bearer ${givenToken}`
}

const getToken = () => {
  return token
}

export default { setToken, getToken }
