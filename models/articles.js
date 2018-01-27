var mongoose = require('mongoose');
var articleSchema= new mongoose.Schema({
userName: String,
title: String,
text: String,
timestamp: {type: Date, default: Date.now()}

});
mongoose.model('Article', articleSchema);
