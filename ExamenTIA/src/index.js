const express = require('express');
const app = express();

app.set('port',process.env.PORT || 4000);

app.use(express.json());

app.use(require('./routes/token'));

app.listen(app.get('port'), () => {
    console.log('Listening Port 3000');
});