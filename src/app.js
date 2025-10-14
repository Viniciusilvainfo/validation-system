import express from 'express';
import Joi from 'joi';
import 'dotenv/config';

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.post('/', async (req, res) => {

    try {
        const schema = Joi.object({
            nome: Joi.string().min(3).required().messages({
                'string.min' : "O nome deve ter no mínimo 3 caracteres"
            }),
            idade: Joi.number().integer().min(0).required()
        });

        const userInput = { nome: req.body.nome, idade: req.body.idade };
        const validation = schema.validate(userInput);

        if (validation.error) {
            throw new Error(validation.error.details[0].message);
        }

        
        res.json({"message" : "Usuário Cadastrado com sucesso"});
    }catch(e) {
        res.json({"message" : e.message});
    }






});

app.use((req, res) => {
    res.status(404).send("NOT FOUND ROUTE");
})

app.listen(PORT, () => {
    console.log("ESCUTANDO NA PORTA 3000");
});