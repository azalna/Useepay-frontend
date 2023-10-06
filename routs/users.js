var express = require("express");
var router = express.Router();
const cors = require('cors');



const User = require('../User'); // Import User model
router.use(cors({
  origin: 'http://localhost:19006', // Replace with your React Native app's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

router.post('/register', (req,res) => {
    const { name, email, password, } = req.body;
    console.log('Received registration data:', name, email, password);
    let errors = [];
  
    if (!name || !email || !password  ) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    // if (password != ) {
    //   errors.push({ msg: 'Passwords do not match' });
    // }
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
      res.render('register', {
        errors,
        name,
        email,
        password,
        
      });
    } else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
  
          
              newUser.save()
                .then(user => {
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
           
         
        }
      });
    }
  });
 


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Received  data:', email, password);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Create and send a JWT token upon successful login
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;