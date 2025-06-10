const express = require('express');
const User = require('./user.model');
const router = express.Router();
const jwt = require('jsonwebtoken');
const generateToken = require('../middleware/generateToken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

router.get("/", async (req, res) => {
  res.send("Registration routes");
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, address, phone, password } = req.body;
    const user = new User({ email, username, address, phone, password });
    await user.save();
    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registring user", error);
    res.status(500).send({ message: "Error registering user!", });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).send({ message: 'User Not Found!' })
    };
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Password Does Not Found!' });
    };
    const token = await generateToken(user.id);
    console.log("token: ", token);
    console.log('Setting cookie...');
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'None',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    res.status(200).send({ message: "Logged In Successfully ", token, user: {
      _id: user.id,
      email: user.email,
      username: user.username,
      address: user.address,
      phone: user.phone,
      role: user.role,
      profileImage: user.profileImage,
      bio: user.bio,
      profession: user.profession
    }});
  } catch (error) {
    console.error("Error logged in user", error);
    res.status(500).send({ message: "Error logged in user!", });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).send({ message: 'Logged Out Successfully' });
});

router.delete('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ message: "User not Found!" });
    };
    res.status(200).send({ message: 'User Deleted Successfully!' });
  } catch (error) {
    console.error("Error deleting user", error);
    res.status(500).send({ message: "Error deleting user!", });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '_id email role').sort({ createdAt: -1 });
    res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching user", error);
    res.status(500).send({ message: "Error fetching user!", });
  }
});

router.put('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      return res.status(404).send({ message: "User Not Found" });
    };
    res.status(200).send({ message: 'User Role Updated Successfully', user });

  } catch (error) {
    console.error("Error updating user", error);
    res.status(500).send({ message: "Error updating user role" });
  }
});

router.patch('/edit-profile', async (req, res) => {
  try {
    const { userId, username, email, address, phone, profileImage } = req.body;
    if (!userId) {
      return res.status(400).send({ message: 'User ID is required' });
    };
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({ message: 'User Not Found!' });
    };
    if (username !== undefined) {
      user.username = username;
    };
    if (profileImage !== undefined) {
      user.profileImage = profileImage;
    };
    if (email !== undefined) {
      user.email = email;
    };
    if (address !== undefined) {
      user.address = address;
    };
    if (phone !== undefined) {
      user.phone = phone;
    };
    await user.save();
    res.status(200).send({
      message: "Profile Updated Successfully",
      user: {
        _id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        profileImage: user.profileImage,
        address: user.address,
        phone: user.phone
      },
    });
  } catch (error) {
    console.error("Error updating user profile", error);
    res.status(500).send({ message: "Error updating user profile" });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.send({
        Status: "User Does Not Exist!"
      });
    };
    const token = await generateToken(user.id);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Reset Your Password',
      text: `Вітаємо! Щоб скинути свій пароль, перейдіть за наступним посиланням:  http://localhost:5173/ua/reset-password/${user.id}/${token}`
    };
  
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password Reset Email Sent!" });
  } catch (error) {
    console.error("Error handling forgot-password", error);
    res.status(500).send({ Status: "Error handling forgot password", message: error.message });
  };
});

router.post('/reset-password/:id/:token', async (req, res) => {
  const { id, token } = req.params;  
  const { password } = req.body;    

  try {
    console.log("JWT Secret:", process.env.JWT_SECRET_KEY);
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded || decoded.userId !== id) {
      return res.status(400).json({ Status: "Invalid Token" });
    }

    console.log("Decoded Token:", decoded);  

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ Status: "User Not Found" });
    }

    const newToken = await generateToken(id);  

    res.json({ 
      Status: "Password Reset Successful", 
      token: newToken   
    });

  } catch (error) {
    console.error("Error with token:", error);
    res.status(500).json({ Status: "Error With Token", message: error.message });
  }
});

module.exports = router;
