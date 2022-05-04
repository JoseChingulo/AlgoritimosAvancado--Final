const Associate = require("../models/Associate");
const Client = require("../models/Client");
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const Delivery = require("../models/Delivery");
const DeliveryMan = require("../models/DeliveryMan");


function generateToken(id){

    process.env.JWT_SECRET = Math.random().toString(36).slice(-20);


    const token = jwt.sign({ id, isAssociate: true }, process.env.JWT_SECRET, 
        {expiresIn : 18000} //24hrs
    );
    
    return token;
}

module.exports = {
    async listAllAssociates(req, res){
        const associates = await Associate.findAll({
            order: [["companyName", "ASC"]]
        }).catch((error) => {
            return res.status(500).json({msg: "Falha na conexão.", error: error});
        });

        if (associates){
            return res.status(200).json({ associates });
        }else{
            return res.status(404).json({msg: "N�o foi possivel encontrar clientes."});
        }
    },

    async deleteAssociate(req, res){
        const associateId = req.query.id;

        const deletedAssociate = await Associate.destroy({
            where: {id:associateId},
        });
     
        if(deletedAssociate){
          return res.status(200).json({msg:"Associado excluido com sucesso"});
        }else{
          return res.status(404).json({msg:"Associado nao encontrado"});
        } 
          
    },

    async searchAssociateByCnpj(req, res){
        const cnpj = req.query.cnpj;

        const associate = await Associate.findOne({
            where: {cnpj: cnpj },
        });
        
        if (associate) {
          if (associate){
            return res.status(200).json({associate});
          }else{
            return res.status(404).json({msg:"N�o h� associados com esse cnpj"});
          } 
        } else res.status(404).json({msg:"N�o foi poss�vel encontrar o associado"});
    },

    async searchAssociateById(req, res){
      const id = req.entityId;

      const associate = await Associate.findOne({
          where: {id: id },
      });
      
      if (associate) {
        if (associate){
          return res.status(200).json({associate});
        }else{
          return res.status(404).json({msg:"N�o h� associados com esse id"});
        } 
      } else res.status(404).json({msg:"N�o foi poss�vel encontrar o associado"});
  },

    async updateAssociate(req, res){
        const associateId = req.body.id;
        const associate = req.body;
      
        const associateExists = await Associate.findByPk(associateId);
        if(!associateExists){  
          return res.status(404).json({msg:"Associado nao encontrado"});
        }

        if(associate.password){
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(associate.password, salt);
            associate.password = hash;          
        }
        
        await Associate.update(associate,{
            where:{id:associateId},
        }).catch((error) => {
          return res.status(500).json({
            msg:"Erro interno no servidor",
            error:error,
          });
        });
        return res.status(200).json({msg:"Associado atualizado com sucesso"});
            
        
          
    },

    async newAssociate(req, res){

        const {cnpj, companyName, password, address} = req.body;
  
        const isAssociateNew = await Associate.findOne({
            where:{cnpj},
        });   
        const isClientCnpj = await Client.findOne({
          where:{cnpj}
        });    

        if (isAssociateNew || isClientCnpj)
            return res.status(403).json({msg:"Este CNPJ j� est� cadastrado!"});
        else {

            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(password, salt);

            const associate = await Associate.create({
                cnpj, 
                companyName, 
                password: hash,
                address,
            }).catch((error)=>{
                return res.status(500).json({
                  msg:"Nao foi possivel inserir os dados",
                  error:error,
                });
            });
            if(associate){
                res.status(201).json({msg:"Novo associado foi adicionado"});
            }else{    
                res.status(404).json({msg:"nao foi possivel cadastrar novo associado"});
            }
        }
    },


    async adminReport(req,res){
      const isAssociate = req.isAssociate;
      const associateId = req.entityId;

      if(!isAssociate){
        return res.status(404).json({
          msg:"N�o autorizado."
        });
      }

      const totalClients = await Client.findAll({
        where:{associateId: associateId}
      }).catch((error) => {
        return res.status(500).json({
          msg:"Erro interno no servido",
          error:error
        });
      });

      const totalDeliveryman = await DeliveryMan.findAll({
        where:{associateId: associateId}
      }).catch((error) => {
        return res.status(500).json({
          msg:"Erro interno no servido",
          error:error
        });
      });

      const totalDelivery = await Delivery.findAll({
       where:{associateId: associateId}
      }).catch((error) => {
        return res.status(500).json({
          msg:"Erro interno no servido",
          error:error
        });
      });

      const totalDelivered = await Delivery.findAll({
        where:{associateId: associateId, delivered: true}
      }).catch((error) => {
        return res.status(500).json({
          msg:"Erro interno no servido",
          error:error
        });
      });

      const totalPending = await Delivery.findAll({
        where:{associateId: associateId, delivered: false}
      }).catch((error) => {
        return res.status(500).json({
          msg:"Erro interno no servido",
          error:error
        });
      });

      

      const valueTotalDeliveries = totalDelivery.length;
      const valueTotalDeliveryman = totalDeliveryman.length;
      const valueTotalClient = totalClients.length;
      const valueTotalDelivered = totalDelivered.length;
      const valueTotalPending = totalPending.length;

      const percentDelivered = ((valueTotalDelivered/valueTotalDeliveries)*100);
      const percentPending = ((valueTotalPending/valueTotalDeliveries)*100);

      return res.status(200).json({
        qntClientes: valueTotalClient,
        qntEntregador: valueTotalDeliveryman,
        qntEntregas: valueTotalDeliveries,
        porcentagemEntregasRealizadas: percentDelivered,
        porcentagemEntregasPendentes: percentPending,

      })

    },

    async financialReport(req,res){
      const isAssociate = req.isAssociate;
      const associateId = req.entityId;

      if(!isAssociate){
        return res.status(404).json({
          msg:"N�o autorizado."
        });
      }

      const deliveries = await Delivery.findAll({
        where:{associateId: associateId, delivered: true }
      }).catch((error) => {
        return res.status(500).json({
          msg:"Erro interno no servido",
          error:error
        });
      });

      if(!deliveries){
        return res.status(404).json({
          msg:"Entregas n�o encontradas."
        });
      }

      var total = 0;

      deliveries.forEach(item => {
        total = total + item.value;
      });
      parteEntregador = total * 0.7;
      parteAssociado = total - parteEntregador;

      parteEntregador = parteEntregador.toFixed(2);
      parteAssociado = parteAssociado.toFixed(2);

      return res.status(200).json({
        valotTotal: total,
        parteEntregador:  parteEntregador,
        parteAssociado: parteAssociado
      })
    },

    async authentication(req, res){

        const cnpj = req.body.cnpj;
        const password = req.body.password;
        if (!cnpj || !password){
            res.status(400).json({ msg :  "CNPJ e Password são obrigatórios" });
        }

         try {
            const associate = await Associate.findOne({
                where: { cnpj },
            });

            if (!associate){
                return  res.status(404).json({msg:"Usuário ou Senha inválidos."})
            } else {
                if (bcrypt.compareSync(password, associate.password)){
                    const token = generateToken(associate.id);
                    if(token){
                      return res.status(200).json({msg : "Autenticado com sucesso.", access_token : token});
                    }
                } else {
                    return res.status(404).json({msg: "Usuário ou Senha inválidos A."});
                }
            }
         } catch(error){
             return res.status(500).json({ msg : "Erro interno no servidor", error: error });
         }
    }
}