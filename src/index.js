const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const routes = require('./routes/routes.js');

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main.hbs',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./views/helpers/handlebars.hbs')
}))
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*
app.use((req, res, next) => {
    next();
});
*/


const server = app.listen(app.get('port'),()=>{
    console.log('Server on http://localhost:'+app.get('port')+'/turnos');
});

const io = socketio(server);

require('./sockets.js')(io);

app.use(routes);