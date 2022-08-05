import signup from '../pages/SignupPage'
import SignupFactory from '../factories/SignupFactory'
//import { it } from 'faker/lib/locales'
import SignupPage from '../pages/SignupPage'
//import { it } from 'faker/lib/locales'

describe('Cadastro', () => {
  // beforeEach(function (){
  //  cy.fixture('deliveryman').then((d) => {
  //    this.deliveryman = d
  //  })
  //})

  it('User should be deliver', function () {
    var deliveryman = SignupFactory.deliveryman()

    signup.go()
    signup.fillForm(deliveryman)
    signup.submit()

    const expectedMessage =
      'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
    signup.modalContentShouldBe(expectedMessage)

    cy.get('button.swal2-confirm').click()
  })

  it('Incorrect document', function () {
    var deliveryman = SignupFactory.deliveryman()

    deliveryman.cpf = '098765123QA'

    signup.go()
    signup.fillForm(deliveryman)
    signup.submit()
    signup.alerMessageShouldBe('Oops! CPF inválido')
  })

  it('Incorrect email', function () {
    var deliveryman = SignupFactory.deliveryman()

    deliveryman.email = 'emailqa.com'
    signup.go()
    signup.fillForm(deliveryman)
    signup.submit()
    signup.alerMessageShouldBe('Oops! Email com formato inválido.')
  })

  context('Require fields', function() {

    const messages = [
      {field: 'name', output: 'É necessário informar o nome'},
      {field: 'cpf', output: 'É necessário informar o CPF'},
      {field: 'email', output: 'É necessário informar o email'},
      {field: 'postalcode', output: 'É necessário informar o CEP'},
      {field: 'number', output: 'É necessário informar o número do endereço'},
      {field: 'delivery_method', output: 'Selecione o método de entrega'},
      {field: 'cnh', output: 'Adicione uma foto da sua CNH'}

    ]

    before(function(){
      signup.go()
      signup.submit()
    })

    messages.forEach(function(msg) {
      it(`${msg.field} is required`, function() {
        SignupPage.alerMessageShouldBe(msg.output)
      })
    })
  })


})
