"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();

// 创建书籍信息
router.post('/api/createBooks', (req, res) => {
  let booksMessage = new models.books({
    id: req.body.id,
    title: req.body.title,
    author: req.body.author,
    imgMi: req.body.imgMi,
    publisher: req.body.publisher,
    summary: req.body.summary,
    price: req.body.price,
    user:"",
    state:false
  });
  // 保存数据booksMessage数据进mongoDB
  booksMessage.save((err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(true);
    }
  });
});

//获取书籍信息  
router.get('/api/getBooks', (req, res) => {
  // 通过模型去查找数据库
  models.books.find({}, (err, data) => {
    if (err) {
      res.json(err);
      console.log(err);
    } else {
      if (!!data) {
        res.json(data);
      } else {
        res.json('none');
      }
    }
  });
})
module.exports = router;
