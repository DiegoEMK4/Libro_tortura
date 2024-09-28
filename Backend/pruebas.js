//Midd:
function authMiddleware(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); 
    }
    res.redirect('/login'); 
}
   ////REVISAR  -----------------expres validator
//helper:
function formatDate(date) {
    let d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}
     //'2024-06-17'→'17/6/2024'


//Header
{ 
    "alg":"HS256",
    "typ": "JWT",
}


//payload
  {
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const express = require('express');
  const jwt = require('jsonwebtoken');
  const bodyParser = require('body-parser');
  
  const app = express();
  const PORT = 3000;
  const SECRET_KEY = 'your_secret_key'; 
  
  app.use(bodyParser.json());

  app.post('/login', (req, res) => {
    const { username, password } = req.body;
   
    if (username === 'admin' && password === 'password') {
      // Datos para el payload
      const payload = { username };
      // Generar el token
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  
      return res.json({ token });
    } else {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    
  });
  
  const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).json({ message: 'Token no proporcionado' });
    }
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token no válido' });
      }
      req.user = decoded;
      next();
    });
  };
  
  // Ruta protegida
  app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Acceso permitido', user: req.user });
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
const jwt = require('jsonwebtoken');
//const SECRET_KEY = 'your_secret_key';

function generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        return null;
    }
}
const user = { id: 1, email: "user@example.com" };
const token = generateToken(user);
console.log(verifyToken(token)); // Decodifica y verifica el token

  
