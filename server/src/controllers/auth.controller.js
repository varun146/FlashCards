
// file imports
import User from "../models/user.model.js"


// signup controller
export const signup = async (req, res) => {
  const { email, username, password } = req.body;

  const user = await User.findOne({ username })
  if (user) {
    return res.status(400).json({ error: "Username already exists" })
  }

  // hash password here
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const boyProfilePic = `https://avatar.iran.liara.run/public/boy/username=${username}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl/username=${username}`;

  const newUser = new User({
    email,
    username,
    password: hashedPassword
  })

  const created_user = await newUser.save();

  res.status(200).json(created_user);

}
// login controller
export const login = async (req, res) => {
  res.send("login")
}
// logout controller
export const logout = async (req, res) => {
  res.send("logout")
}
