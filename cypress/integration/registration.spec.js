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
      endereco: {
        cep: '05894370',
        road: 'Rua Manoel da Conceição',
        number: '14',
        complement: 'Macedônia',
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
    // Criando uma massa de dados com as informações erradas 


    cy.get('input[name="name"]').type(deliveryman.name)
    cy.get('input[name="cpf"]').type(deliveryman.cpf)
    cy.get('input[name="email"]').type(deliveryman.email)
    cy.get('input[name="whatsapp"]').type(deliveryman.whatsapp)

    cy.get('input[name="postalcode"]').type(deliveryman.endereco.cep)
    cy.get('input[type=button][value="Buscar CEP"]').click()

    cy.get('input[name="address-number"]').type(deliveryman.endereco.number)
    cy.get('input[name="address-details"]').type(deliveryman.endereco.complement)
    //Confirmando os dados preenchidos com a massa de teste
    cy.get('input[name="address"]').should('have.value', deliveryman.endereco.road)
    cy.get('input[name="district"]').should('have.value', deliveryman.endereco.district)
    cy.get('input[name="city-uf"]').should('have.value', deliveryman.endereco.city_uf)
    //Buscando um elemento pelo texto através da 'CONTAINS'
    //CONSTAINS recebe o localizador (Juntar um localizador CSS com um texto que existe na página)
    cy.contains('.delivery-method li', deliveryman.delivery_method.first_method).click()
    cy.contains('.delivery-method li', deliveryman.delivery_method.third_method).click()

    
  })
})