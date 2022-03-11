var net = require('net');
var moment =  require('moment');


const PORT = 90;
const HOST = '127.0.0.1';


var clientHandler = function(socket){

  socket.on('data', function dataHandler(data) {//data是客户端发送给服务器的数据
    //console.log(socket.remoteAddress, socket.remotePort, 'send', data.toString());
    var obj = data.toString().split(',');
    var ddata = obj.toString().split(/\n/);
    var line = '';
    for(var i = 0; i < ddata.length-1; i++){
        line = ddata[i].replace(/\r/g,'');
    }
    console.log(moment().format('YYYY-MM-DD HH:mm:ss'),'\t',line)
    socket.write('server received\n');
  });

  socket.on('close', function(){
    console.log(socket.remoteAddress, socket.remotePort, 'disconnected');
  })
};

var app = net.createServer(clientHandler);

app.listen(PORT);
console.log('tcp server running on tcp://', HOST, ':', PORT);