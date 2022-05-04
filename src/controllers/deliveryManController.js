const DeliveryMan = require("../models/DeliveryMan");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Delivery = require("../models/Delivery");


function generateToken(id){

  process.env.JWT_SECRET = Math.random().toString(36).slice(-20);

    const token = jwt.sign({ id, isAssociate: false }, process.env.JWT_SECRET, 
        {expiresIn : 2629800} //1 mÍs
    );

  return token;
}

module.exports = {
  
    async listAllDeliveryMen(req, res){
      const deliveryMen = await DeliveryMan.findAll({
        order: [["name", "ASC"]]
      }).catch((error) => {
        return res.status(500).json({msg: "Falha na conexÔøΩo.", error: error});
      });

      if (deliveryMen) 
        return res.status(200).json({ deliveryMen });
      else 
        return res.status(404).json({msg: "NÔøΩo foi possivel encontrar clientes."});
    },

    async newDeliveryMan(req, res){
        const {associateId, name, cpf, password, phone} = req.body;
        const tokenId = req.entityId;


        const deliverymanExists = await DeliveryMan.findOne({
             where: {cpf},
        }).catch((error) => {
          return res.status(500).json({
            msg:"Erro interno no servidor",
            erro: error,
         });
        });
      
        if (deliverymanExists) {
          return res.status(403).json({msg:"Deliveryman jÔøΩ cadastrado"});
        } else {
         
          const salt = bcrypt.genSaltSync(12);
          const hash = bcrypt.hashSync(password, salt);

          const d = await DeliveryMan.create({
            associateId: tokenId,
            name,
            cpf,
            password: hash,
            phone,
          }).catch((error) => {
            return  res.status(500).json({msg:"Erro interno no servidor",
              erro: error,
          });
        });
            
        return res.status(201).json({msg:"Novo entregador adicionado com sucesso"});
            
      }
    },

    async searchDeliveryManByCpf(req, res){
        const cpf = req.query.cpf;
        const tokenId = req.entityId;  

        const deliverymen = await DeliveryMan.findAll({
            where:[
              {cpf: cpf, associateId: tokenId},
            ]
        }).catch(async (error) => {
            return res.status(500).json({msg:"Erro interno no servidor"});
        });

        if(deliverymen.length > 0) 
            return res.status(200).json({deliverymen});            
        else 
            return res.status(404).json({msg:"N„o foi possÌvel encontrar nenhum entregador com esse cpf "}); 
    },

    async searchDeliveryManById(req, res){
      const id = req.query.id;
      const tokenId = req.entityId;      

      const deliverymen = await DeliveryMan.findOne({
          where:{id: id, associateId: tokenId},
      }).catch(async (error) => {
          return res.status(500).json({msg:"Erro interno no servidor"});
      });

      if(deliverymen)
          return res.status(200).json({deliverymen});            
      else 
          return res.status(404).json({msg:"N„o foi possÌvel encontrar nenhum entregador com esse id "}); 
  },

    async searchDeliveryMenByAssociate(req, res){
         
        const id = req.query.id;

         const deliverymen = await DeliveryMan.findAll({
             where:{associateId: id},
             
         }).catch(async (error) => {
             return res.status(500).json({msg:"Erro interno no servidor"});
         });

         if(deliverymen.length > 0) 
             return res.status(200).json({deliverymen});            
         else 
             return res.status(404).json({msg:"NÔøΩo foi possÔøΩvel encontrar nenhum entregador para esse associado "});  
    },
    
  async updateDeliveryMan(req, res){
    
        const deliverymanId = req.body.id;
        const tokenId = req.entityId;

        const newData = req.body;

        if(newData.password){
          const salt = bcrypt.genSaltSync(12);
          const hash = bcrypt.hashSync(newData.password, salt);
          
          newData.password = hash;
        }

        const deliverymanExists = await DeliveryMan.findOne({
           where:{id: deliverymanId}
        });

        
        if(deliverymanExists){
          
          if(deliverymanExists.associateId != tokenId){
            return res.status(405).json({
              msg: "N„o autorizado."
            });
          }

         const updated = await DeliveryMan.update(newData,{
           where:{id:deliverymanId}
         }).catch((error) => { 
           return res.status(500).json({
             msg:"Erro interno no servidor",
             erro: error,
           });
         });
          
         if(updated){
          return res.status(200).json({msg:"Entregador alterado com sucesso."});
         }
        }else
          {
          return res.status(500).json({msg:"NÔøΩo foi possÔøΩvel encontrar o entregador."})
        }
  },    

  async deleteDeliveryman(req,res){
    const deliverymanId = req.query.id;

    
    const deletedDeliveryman = await DeliveryMan.destroy({
        where: {id : deliverymanId},
    }).catch(async (error)=>{
        return res.status(500).json({
          msg:"Erro interno ao excluir o entregador",
          error:error,
        });
    });

    if(deletedDeliveryman){
        res.status(200).json({msg:"Entregador excluÔøΩdo com sucesso!"});
    }else{
        res.status(404).json({msg:"Entregador nÔøΩo encontrado"});
    }
  },

  async financialReport(req,res){
    const tokenId = req.entityId;
    var total = 0;

    const deliveries = await Delivery.findAll({
      where:{deliveryManId: tokenId, delivered: true}
    }).catch((error) => {
      return res.status(500).json({
        msg:"Erro interno do servidor"
      });
    });

    if(deliveries){
      deliveries.forEach(item => {
        console.log(item.value);
        total = total + item.value;
      });

      areceber = (total * 0.7);

      return res.status(200).json({
        valorTotal: total,
        valorReceber: areceber
      })

    }else{
      return res.status(404).json({
        msg:"N„o foi possivel encontrar entregas."
      })
    }

  },

  async listAllDeliveryMenByAssociate(req, res){
    const isAssociate = req.isAssociate;
    const associateId = req.entityId;

    if(!isAssociate){
      return res.status(404).json({
        msg:"NÔøΩo autorizado."
      });
    }
    
    const deliveryMen = await DeliveryMan.findAll({
       where:{associateId: associateId}
    }).catch((error) => {
      return res.status(500).json({msg: "Falha na conexÔøΩo.", error: error});
    });

    if (deliveryMen) 
      return res.status(200).json({ deliveryMen });
    else 
      return res.status(404).json({msg: "NÔøΩo foi possivel encontrar clientes."});
  },


  async authentication(req, res){
    //!todo: Reescrever: somente fiz copia para nao esquecermos!!!

    const cpf = req.body.cpf;
    const password = req.body.password;
    if (!cpf || !password){
        res.status(400).json({ msg :  "CNPJ e Password s√£o obrigat√≥rios" });
    }

     try {
        const deliveryman = await DeliveryMan.findOne({
            where: { cpf },
        });

        if (!deliveryman){
            return  res.status(404).json({msg:"Usu√°rio ou Senha inv√°lidos."})
        } else {
            if (bcrypt.compareSync(password, deliveryman.password)){
                const token = generateToken(deliveryman.id);
                if(token){
                  return res.status(200).json({msg : "Autenticado com sucesso.", access_token : token});
                }
            } else {
                return res.status(405).json({msg: "Usu√°rio ou Senha inv√°lidos A."});
            }
        }
     } catch(error){
         return res.status(500).json({ msg : "Erro interno do servidor", error: error });
     }
  }
}