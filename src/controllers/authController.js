const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

module.exports = {
  async greetings(req, res) {
    res.status(200).json({ msg: "Seja Bem vindo!!!🎱" })
  },

  async login(req, res) {
    const { email, password } = req.body

    if (!email) {
      return res.status(422).json({ msg: "O email é obrigatório!" })
    }

    if (!password) {
      return res.status(422).json({ msg: "A senha é obrigatório!" })
    }

    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" })
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      return res.status(422).json({ msg: "Senha inválida!" })
    }

    try {
      const secret = process.env.SECRET
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      )

      res.status(200).json({ msg: "Autenticação realiza com sucesso!", token })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        msg: "Erro ao processar requisição, tente novamente mais tarde!",
      })
    }
  },

  async register(req, res) {
    const { name, email, password, confirm } = req.body
    if (!name) {
      return res.status(422).json({ msg: "O Nome é obrigatório!" })
    }
    if (!email) {
      return res.status(422).json({ msg: "O Email é obrigatório!" })
    }
    if (!password) {
      return res.status(422).json({ msg: "A senha é obrigatório!" })
    }
    if (password !== confirm) {
      return res.status(422).json({ msg: "As senhas são diferentes!" })
    }
    const userExists = await User.findOne({ email: email })
    if (userExists) {
      return res.status(422).json({ msg: "Utilize outro email!" })
    }
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    const user = new User({
      name,
      email,
      password: passwordHash,
    })
    try {
      await user.save()
      res.status(201).json({ msg: "Usuário criado com sucesso!" })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        msg: "Erro ao processar requisição, tente novamente mais tarde!",
      })
    }
  },
}
