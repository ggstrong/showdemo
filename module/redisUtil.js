const Redis=require('ioredis');
const { REDIS_CONF } = require('../config/config')
const redisClient = new Redis(REDIS_CONF)
module.exports = redisClient


