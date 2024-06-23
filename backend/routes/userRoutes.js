const { ObjectId } = require("mongodb");
const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const router = express.Router();
let db;
const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://admin:admin@how5.4hfmfty.mongodb.net/sistema_fichas?retryWrites=true&w=majority&appName=How5";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function isLoggedIn(req, res, done) {
  if (req.user) {
    return done();
  }
  return false;
}

passport.use(
  new LocalStrategy(
    {
      usernameField: "usuario",
      passwordField: "senha",
    },
    async function (username, password, done) {
      const user = await db.collection("usuarios").findOne({
        usuario: username,
      });

      if (user) {
        const isPasswordEqual = bcrypt.compareSync(password, user.senha);
        if (isPasswordEqual) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Senha inválida" });
        }
      } else {
        return done(null, false, { message: "Usuário não existente" });
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  const user = await db
    .collection("usuarios")
    .findOne({ _id: new ObjectId(id) });
  done(null, user);
});

// Conexão ao banco de dados
async function connectDb() {
  try {
    await client.connect();
    console.log("conexao estabelecida");
    db = client.db();
  } catch (error) {
    console.error(error);
  }
}
connectDb();

// Pegar os dados dos usuários
router.get("/", async function (req, res) {
  try {
    const users = await db.collection("usuarios").find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Cadastro dos clientes
router.post("/cadastro", async function (req, res) {
  try {
    const user = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.senha, salt);
    const dbUser = await db.collection("usuarios").findOne({
      usuario: user.usuario,
    });

    if (dbUser) {
      return res.status(400).json({ error: "Usuário já existe" });
    }
    const createdUser = {
      usuario: user.usuario,
      senha: hash,
    };
    const result = await db.collection("usuarios").insertOne(createdUser);
    return res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Login dos clientes
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    //successRedirect: "/fichas",
    //failureRedirect: "/index",
  }),
  async function (req, res) {
    try {
      res.json(req.user);
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
);

router.get("/isLoggedIn", isLoggedIn, function (req, res) {
  res.json("login");
});

// Pegar informações de um usuário em especifico
router.get("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const user = await db
      .collection("usuarios")
      .findOne({ _id: new ObjectId(id) });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "Usuario não encontrado" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

module.exports = router;
