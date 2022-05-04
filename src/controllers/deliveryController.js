const Delivery = require("../models/Delivery");
const DeliveryMan = require("../models/DeliveryMan");
const Client = require("../models/Client");


module.exports = {

    async newDelivery(req, res){
      const {description, clientId, deliveryManId} = req.body;
      const tokenId = req.entityId;
        
      const client = await Client.findOne({
        where:{id: clientId}
      }).catch((error) => {
        return res.status(404).json({
          msg:"Cliente n�o encontrado!",
          error:error,
        });
      });

      if(!client){
        return res.status(404).json({
          msg:"Cliente n�o encontrado!",
        });
      }

      if (client){
        console.log("carregou client ", client);
        const deliveryman = await DeliveryMan.findOne({
          where:{id: deliveryManId}
        }).catch((error) => {
          return res.status(404).json({
            msg:"Deliveryman n�o encontrado!",
            error:error,
          });
        });
  
        if(!deliveryman){
            return res.status(404).json({
              msg:"Entregador n�o encontrado!",
            });
        } 

        if (deliveryman){
          console.log("carregou deliveryman ", deliveryman);

          console.log("client.associateId ",client.associateId);
          console.log("deliveryman.associateId ",deliveryman.associateId);
          console.log("tokenId ",tokenId);
          
          if(client.associateId != tokenId){
            return res.status(405).json({
              msg:"N�o autorizado."
            });
          }
    
          if(deliveryman.associateId != client.associateId){
            return res.status(405).json({
              msg:"N�o autorizado."
            });
          }
    
          const delivery = await Delivery.create({
            description,
            clientId,
            deliveryManId,
            associateId: client.associateId,
            delivered: false,
            value: 0.0,
          }).catch((error) => {
            return res.status(500).json({
              msg:"Erro interno no servidor",
              error:error,
            });
          })
          
          if(delivery){
            return res.status(200).json({
              msg:"Nova entrega cadastrada com sucesso!"
            });
          }else{
            return res.status(500).json({
              msg:"Erro ao cadastrar nova entrega"
            });
          }
        }
      }
    },

    async deleteDelivery(req, res){
        const deliveryId = req.query.id;

        const delivery = await Delivery.findOne({
            where:{id: deliveryId}
        }).catch((error) => {
          return res.status(500).json({
            msg:"Erro interno no servidor.",
            error:error,
          });
        });

        if(delivery){
            if(delivery.delivered){
              return res.status(400).json({
                msg:"Entrega j� conclu�da, n�o � poss�vel excluir"
              });
            }else{
              const deletedDelivery = await Delivery.destroy({
                where:{id: deliveryId}
              }).catch((error) => {
                return res.status(500).json({
                  msg:"Erro interno no servidor ao excluir.",
                  error:error,
                });
              });

              if(deletedDelivery){
                return res.status(200).json({
                  msg:"Entrega exclu�da com sucesso!"
                });
              }else{
                return res.status(400).json({
                  msg:"Houve um erro ao tentar excluir a entrega"
                });
              }
            }
        }else{
          return res.status(404).json({
            msg:"Entrega n�o encontrada"
          })
        }
    },

    async updateDelivery(req,res){
      const deliveryId = req.body.id;
      const newData = req.body;

      const delivery = await Delivery.findOne({
        where:{id: deliveryId}
      }).catch((error) => {
        return res.status(500).json({
          msg:"Erro interno no servidor.",
          error:error,
        });
      });

      if(!delivery){
        return res.status(404).json({
          msg:"Entrega n�o encontrada!",
        });
      }

      if(req.body.deliveryManId){
        const deliveryman = await DeliveryMan.findOne({
          where:{id: req.body.deliveryManId}
        }).catch((error) => {
          return res.status(500).json({
            msg:"Erro interno do servidor.",
            error:error,
          });
        });
        
        if(!deliveryman){
          return res.status(404).json({
            msg:"Entregador n�o encontrado!",
          });
        }else{
          if(delivery.associateId != deliveryman.associateId){
            return res.status(422).json({
              msg:"Este entregador n�o pertence ao associado do pedido."
            });
          }
        }
      }

      if(req.body.clientId){
        const client = await Client.findOne({
          where:{id: req.body.clientId}
        }).catch((error) => {
          return res.status(500).json({
            msg:"Erro interno no servidor",
            error:error,
          });
        });

        if(!client){
          return res.status(404).json({
            msg:"Cliente n�o encontrado!",
          });
        }else{
          if(client.associateId != delivery.associateId){
            return res.status(422).json({
              msg:"Este cliente n�o pertence ao associado do pedido."
            });
          }
        }
      }

      if(delivery){
        if(delivery.delivered){
          return res.status(400).json({
            msg:"Entrega j� conclu�da, n�o � poss�vel alterar"
          });
        }
        const updatedDelivery = await Delivery.update(newData,{
          where:{id:deliveryId}
        }).catch((error) => {
          return res.status(500).json({
            msg:"Erro interno no servidor",
            error:error,
          });
        });
        if(updatedDelivery){
          return res.status(200).json({
            msg:"Entrega alterada com sucesso!",
          });
        }else{
          return res.status(400).json({
            msg:"Houve um erro ao tentar alterar a entrega"
          });
        }
      }else{
        return res.status(404).json({
          msg:"Entrega n�o encontrada"
        });
      }
    },

    async listAllDeliveries(req, res){
         
      const deliveries = await Delivery.findAll({
             order: [["description", "ASC"]]
         }).catch((error) => {
            return res.status(500).json({
               msg: "Erro interno no servidor", 
               error: error
              });
         });

        if (deliveries){
          return res.status(200).json({ deliveries });
        }else{
          return res.status(404).json({msg: "N�o foi poss�vel encontrar entregas."}); 
        }    
    },

    async listAllDelivered(req,res){
      const deliveries = await Delivery.findAll({
        where:{delivered: true}
      }).catch((error) => {
       return res.status(500).json({
          msg: "Erro interno no servidor", 
          error: error
         });
      });

      if (deliveries){
        return res.status(200).json({ deliveries });
      }else{
        return res.status(404).json({msg: "N�o foi poss�vel encontrar entregas."}); 
      }    
    },

    async listAllDeliveredByAssociate(req,res){
      const isAssociate = req.isAssociate;
      const associateId = req.entityId;

      if(!isAssociate){
        return res.status(404).json({
          msg:"N�o autorizado."
        });
      }

      const deliveries = await Delivery.findAll({
        where:{
          associateId: associateId, 
          delivered: true
        }
      }).catch((error) => {
       return res.status(500).json({
          msg: "Erro interno no servidor", 
          error: error
         });
      });

      if (deliveries){
        return res.status(200).json({ deliveries });
      }else{
        return res.status(404).json({msg: "N�o foi poss�vel encontrar entregas."}); 
      }    
    },

    async listAllPendingByAssociate(req,res){
      const isAssociate = req.isAssociate;
      const associateId = req.entityId;

      if(!isAssociate){
        return res.status(404).json({
          msg:"N�o autorizado."
        });
      }

      const deliveries = await Delivery.findAll({
        where:{associateId: associateId, delivered: false}
      }).catch((error) => {
       return res.status(500).json({
          msg: "Erro interno no servidor", 
          error: error
         });
      });

      if (deliveries){
        return res.status(200).json({ deliveries });
      }else{
        return res.status(404).json({msg: "N�o foi poss�vel encontrar entregas."}); 
      }    
    },


    async listAllPending(req,res){
      const deliveries = await Delivery.findAll({
        where:{delivered: false}
      }).catch((error) => {
       return res.status(500).json({
          msg: "Erro interno no servidor", 
          error: error
         });
      });

      if (deliveries){
        return res.status(200).json({ deliveries });
      }else{
        return res.status(404).json({msg: "N�o foi poss�vel encontrar entregas."}); 
      }    
    },

    async listAllByDeliveryman(req,res){
      const deliverymanId = req.query.id;

      const deliveries = await Delivery.findAll({
        where:{deliveryManId: deliverymanId}
      }).catch((error) => {
       return res.status(500).json({
          msg: "Erro interno no servidor", 
          error: error
         });
      });

      if (deliveries){
        return res.status(200).json({ deliveries });
      }else{
        return res.status(404).json({msg: "N�o foi poss�vel encontrar entregas."}); 
      }    
    },

    async listAllDeliveredByDeliveryman(req,res){
      const deliverymanId = req.entityId;

      const deliveries = await Delivery.findAll({
        where:{delivered: true, deliveryManId: deliverymanId}
      }).catch((error) => {
       return res.status(500).json({
          msg: "Erro interno no servidor", 
          error: error
         });
      });

      if (deliveries){
        return res.status(200).json({ deliveries });
      }else{
        return res.status(404).json({msg: "N�o foi poss�vel encontrar entregas."}); 
      }    
    },

    async listAllPendingByDeliveryman(req,res){
      const deliverymanId = req.entityId;

      const deliveries = await Delivery.findAll({
        where:{delivered: false, deliveryManId:deliverymanId}
      }).catch((error) => {
       return res.status(500).json({
          msg: "Erro interno no servidor", 
          error: error
         });
      });

      if (deliveries){
        return res.status(200).json({ deliveries });
      }else{
        return res.status(404).json({msg: "N�o foi poss�vel encontrar entregas."}); 
      }    
    },

    async endDelivery(req,res){
      const deliveryId = req.body.id;
      const value = req.body.value;

      const tokenId = req.entityId;

      const delivery = await Delivery.findOne({
        where:{id: deliveryId}
      }).catch((error) => {
        return res.status(500).json({
          msg: "Erro interno no servidor",
          error: error,
        });
      });

      if(delivery){
        if(delivery.deliveryManId != tokenId){
          return res.status(405).json({
            msg:"N�o autorizado"
          });
        }

        const newDelivery = {
          value:value,
          delivered: true,
          deliveredAt: Date.now()
        }
        const updated = await Delivery.update(newDelivery,{
          where:{id: deliveryId}
        }).catch((error) => {
          return res.status(500).json({
            msg:"Erro interno no servidor",
            error: error,
          });
        });

        if(updated){

          return res.status(200).json({
            msg:"Entrega conclu�da com sucesso!"
          });

        }else{
          return res.status(500).json({
            msg:"Erro desconhecido"
          });
        }
      }
    }
}