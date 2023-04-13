const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// MongoDBに接続
mongoose.connect('mongodb://db:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDBに接続されました'))
  .catch(err => console.log('MongoDBの接続中にエラーが発生しました', err));

// モデルの定義
const User = mongoose.model('User', {
  name: String,
  email: String,
  password: String
});

// ミドルウェアの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// ルーティング
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/register', async (req, res) => {
  try {
    // ユーザー情報を取得
    const { name, email, password } = req.body;

    // MongoDBに新しいユーザーを作成
    const user = new User({ name, email, password });
    await user.save();

    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.render('error');
  }
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  try {
    // ユーザー情報を取得
    const { email, password } = req.body;

    // MongoDBからユーザーを取得
    const user = await User.findOne({ email, password });

    if (user) {
      res.render('dashboard', { user });
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    console.error(err);
    res.render('error');
  }
});

app.listen(3000, () => console.log('サーバが起動しました'));
