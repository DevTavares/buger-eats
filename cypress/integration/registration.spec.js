beforeEach(() => {
  cy.viewport(1440, 900)
})

describe('Cadastro', ()=>{
  it('Cadastro de um entregador', ()=> {
    cy.visit('https://buger-eats.vercel.app')
    //Localizador CSS para encontrar o botão para clicar 
    cy.get('a[href="/deliver"]').click()
    // Checando se realmente está na página de cadastro com um Texto existente na mesma
    cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    // Criando uma massa de dados para o cenário feliz de preenchimento dos campos
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
    cy.get('input[name="name"]').type(deliveryman.name)
    cy.get('input[name="cpf"]').type(deliveryman.cpf)
    cy.get('input[name="email"]').type(deliveryman.email)
    cy.get('input[name="whatsapp"]').type(deliveryman.whatsapp)

    cy.get('input[name="postalcode"]').type(deliveryman.address.postalcode)
    cy.get('input[type=button][value="Buscar CEP"]').click()

    cy.get('input[name="address-number"]').type(deliveryman.address.number)
    cy.get('input[name="address-details"]').type(deliveryman.address.details)
    //Confirmando os dados preenchidos com a massa de teste
    cy.get('input[name="address"]').should('have.value', deliveryman.address.street)
    cy.get('input[name="district"]').should('have.value', deliveryman.address.district)
    cy.get('input[name="city-uf"]').should('have.value', deliveryman.address.city_uf)
    //Buscando um elemento pelo texto através da 'CONTAINS'
    //CONSTAINS recebe o localizador (Juntar um localizador CSS com um texto que existe na página)
    cy.contains('.delivery-method li', deliveryman.delivery_method.third_method).click()

    //Inserindo a imagem da CNH no campo com drag-drop
    cy.get('div[class="dropzone"]').selectFile('cypress/fixtures/images/cnh-digital.jpg', {action: 'drag-drop',})

    cy.get('form button[type="submit"]').click()

    const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
    cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage)

    cy.get('button.swal2-confirm').click()
  })

  it('Cadastro de um entregador com CPF errado', ()=> {
    cy.visit('https://buger-eats.vercel.app')
    //Localizador CSS para encontrar o botão para clicar 
    cy.get('a[href="/deliver"]').click()
    // Checando se realmente está na página de cadastro com um Texto existente na mesma
    cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    // Criando uma massa de dados para o cenário feliz de preenchimento dos campos
    var deliveryman = {
      name: 'Rodrigo Tavares',
      cpf: '000111222AS',
      email: 'email@hotmail.com',
      whatsapp: '11999999999',
      address: {
        cep: '05894370',
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
    cy.get('input[name="name"]').type(deliveryman.name)
    cy.get('input[name="cpf"]').type(deliveryman.cpf)
    cy.get('input[name="email"]').type(deliveryman.email)
    cy.get('input[name="whatsapp"]').type(deliveryman.whatsapp)

    cy.get('input[name="postalcode"]').type(deliveryman.address.cep)
    cy.get('input[type=button][value="Buscar CEP"]').click()

    cy.get('input[name="address-number"]').type(deliveryman.address.number)
    cy.get('input[name="address-details"]').type(deliveryman.address.details)
    //Confirmando os dados preenchidos com a massa de teste
    cy.get('input[name="address"]').should('have.value', deliveryman.address.street)
    cy.get('input[name="district"]').should('have.value', deliveryman.address.district)
    cy.get('input[name="city-uf"]').should('have.value', deliveryman.address.city_uf)
    //Buscando um elemento pelo texto através da 'CONTAINS'
    //CONSTAINS recebe o localizador (Juntar um localizador CSS com um texto que existe na página)
    cy.contains('.delivery-method li', deliveryman.delivery_method.third_method).click()

    //Inserindo a imagem da CNH no campo com drag-drop
    cy.get('div[class="dropzone"]').selectFile('cypress/fixtures/images/cnh-digital.jpg', {action: 'drag-drop',})

    cy.get('form button[type="submit"]').click()

    //Buscando a informação de errro do CPF inválido
    cy.get('.alert-error').should('have.text', 'Oops! CPF inválido')
  })
})