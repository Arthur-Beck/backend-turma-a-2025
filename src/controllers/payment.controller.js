import { z } from "zod"

const PaymentSchema = z.object({
    nome: z.string().min(3,{message: "Nome Invaldoi"}),
    nome: z.string().email({message: "Email Invaldoi"}),
    nome: z.string().min(6,{message: "senha Invaldoi"})
    
}); 

const paymentController = {
    async createPayment(req, res) {
        try {
            const {nome, email, senha} = req.body;
            PaymentSchema.parse({nome, email, senha});
            console.log({nome, email, senha});
            res.status(201).json({message: "Payment create sucessfuly"});
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Erro de validação",
                    errors: error.errors.map(
                        err => ({
                            atributo: err.path[0],
                            message: err.message
                        })
                    )
                })
            }
           
            res.status(500).json({message: error.mesage});
            
        }
    }
}

export default paymentController;