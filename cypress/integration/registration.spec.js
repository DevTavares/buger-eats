import SignupPage from '../pages/SignupPage'

describe('Cadastro', ()=>{

  it('Cadastro de um entregador', ()=> {

    var deliveryman = {
      name: 'Rodrigo Tavares',
      cpf: '00011122233',
      email: 'email@hotmail.com',
      whatsapp: '11999999999',
      address: {
        postalcode: '05894370',
        street: 'Rua Manoel da Conceição',
        number: '14',
        details: 'Macedônia',
        district: 'Jardim Macedônia',
        city_uf: 'São Paulo/SP'
      },
      // Definindo os metodos de entrega disponíveis
      delivery_method: {
        first_method: "Moto",
        second_method: "Bicicleta",
        third_method: "Van/Carro",
        cnh: 'cnh-digital.jpg'
      }
    }

    var signup = new SignupPage()
    
    signup.go()
    signup.fillForm(deliveryman)
    signup.submit()

    const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
    signup.modalContentShouldBe(expectedMessage)

    cy.get('button.swal2-confirm').click()
  })

  it('Cadastro de um entregador com CPF errado', ()=> {

    var deliveryman = {
      name: 'Rodrigo Tavares',
      cpf: '000111222AS',
      email: 'email@hotmail.com',
      whatsapp: '11999999999',
      address: {
        postalcode: '05894370',
        street: 'Rua Manoel da Conceição',
        number: '14',
        details: 'Macedônia',
        district: 'Jardim Macedônia',
        city_uf: 'São Paulo/SP'
      },
      // Definindo os metodos de entrega disponíveis
      delivery_method: {
        first_method: "Moto",
        second_method: "Bicicleta",
        third_method: "Van/Carro",
        cnh: 'cnh-digital.jpg'
      }
    }
    var signup = new SignupPage

    signup.go()
    signup.fillForm(deliveryman)
    signup.submit()
    signup.alerMessageShouldBe('Oops! CPF inválido')
  })
})