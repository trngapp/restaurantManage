const redis = require('redis');

const {promisify}=require('util');

const client= redis.createClient(
    {
        password: '3783fN0AmznxhasT551r0EqwNZ3YMsFR',
        socket: {
            host: 'redis-16711.c325.us-east-1-4.ec2.cloud.redislabs.com',
            port: 16711
        }
    }

);
const GET_SYNC=promisify(client.get).bind(client);
const SET_SYNC=promisify(client.set).bind(client);


 client.connect().catch(console.error);
  module.exports={client,GET_SYNC,SET_SYNC};

/*
{
    password: '3783fN0AmznxhasT551r0EqwNZ3YMsFR',
    socket: {
        host: 'redis-16711.c325.us-east-1-4.ec2.cloud.redislabs.com',
        port: 16711
    }
}*/


