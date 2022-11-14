const express = require('express')
const { faker } = require('@faker-js/faker/locale/ru');
const bodyParser = require('body-parser')

const app = express();
const port = 5000;

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const createFakeUser = function(){
    const [name, surname] = faker.name.fullName().split(' ');

    return{
        id: faker.datatype.uuid(),
        name: name,
        surname: surname,
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number()
    }
}


const array = Array.from({ length: 10 })
let users = array.map(() => createFakeUser());

app.get('/api/users', (req, res) => {
    res.send(users)
})

app.post('/api/users', urlencodedParser, (req, res) => {
    res.statusCode = 200;

    console.log(req.body)

    const { name, surname, email, password, phone } = req.body;

    const user = {
        id: faker.datatype.uuid(),
        name: name,
        surname: surname,
        email: email,
        password: password,
        phone: phone
    }

    users.push(user);

    res.end(JSON.stringify(user, null, 2))
})



app.listen(port, () => console.log('hello'))