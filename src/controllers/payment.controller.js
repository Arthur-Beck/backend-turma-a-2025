import { z } from "zod"

const paymentSchema = z.object({
    data: z.string().datetime(),
    valor: z.number().positive(),
    numero: z.number().int().positive(),
    observacao: z.string().optional()
});

const PaymentSchema = z.object({
    nome: z.string().min(3,{message: "Nome Invaldo"}),
    nome: z.string().email({message: "Email Invaldo"}),
    nome: z.string().min(6,{message: "senha Invalda"})
    
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
    },

    async updatePayment(req, res) {
        try {
            const {id} = req.params;
            const {valor, numero, data, observacao} = req.body;
            PaymentSchema.parse({valor, numero, data, observacao});
            res.status(200).json({message: 'Payment update sucessfuly', data: {id, valor, numero, data, observacao}});
        } catch (error) {
            if (error instanceof z.ZodEror) {
               return res.status(400).json({message: "Validation error",details: error, errors});
           return  res.satus(500).json({ message: error.mesage });
        }
        
            
        
    }
    }
}

export default paymentController;