const express = require("express");
const strftime = require("strftime");
let timestamp = 1500002670;
console.log(strftime("%F %T", new Date(timestamp*1000)));