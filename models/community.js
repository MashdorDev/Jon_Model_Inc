var express = require("express");
var fs = require("fs");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var multer = require("multer");

const postSchema = new Schema({
  content: [],

  user: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Post", postSchema);
