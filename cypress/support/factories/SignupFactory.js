var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {

    deliveryman: function() {

      //Gerando nome e sobrenome dinâmicos
      var firstName = faker.name.firstName()
      var lastName = faker.name.lastName()
      
      var data = {
        name: `${firstName} ${lastName}`,
        cpf: cpf.generate(), // Gerando um CPF dinâmico
        email: faker.internet.email(firstName), // Gerando email dinâmico amarrado ao nome do usuário criado dinamicamente 
        whatsapp: '11999999999',
        address: {
            postalcode: '05894370',
            street: 'Rua Manoel da Conceição',
            number: '14',
            details: 'Macedônia',
            district: 'Jardim Macedônia',
            city_uf: 'São Paulo/SP'
        },
          delivery_method: {
            first_method: 'Moto',
            second_method: 'Bike Elétrica',
            third_method: 'Van/Carro',
            cnh: 'cnh-digital.jpg'
          }
      }

      return data
    }
}