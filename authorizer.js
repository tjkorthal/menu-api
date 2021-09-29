const USERS = [
  {
    name: 'Tyler',
    username: 'tyler',
    password: 'abc123'
  },
  {
    name: 'Admin',
    username: 'admin',
    password: 'admin'
  }
]

// super duper basic authorization. Don't even think about using this in prod.
function checkAuthorization(req, res, next) {
  let auth = req.headers.authorization
  if (auth === undefined) { return res.status(401).end() }

  let credentials = decodeCredentials(auth)
  let username = parseUsername(credentials)
  let password = parsePassword(credentials)
  if (USERS.find((x) => x.username === username && x.password === password)) { next() }

  res.status(401).end()
}

function decodeCredentials(authHeader) {
  let credentials = authHeader.split('Basic ')[1]
  return Buffer.from(credentials, 'base64').toString('utf-8')
}

function parseUsername(decodedAuth) {
  return decodedAuth.split(':')[0]
}

function parsePassword(decodedAuth) {
  return decodedAuth.split(':')[1]
}

module.exports = checkAuthorization
