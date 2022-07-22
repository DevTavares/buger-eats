import signup from '../pages/SignupPage'

describe('Cadastro', ()=>{

  beforeEach(function (){
    cy.fixture('deliveryman').then((d) => {
      this.deliveryman = d
    })
  })

  it('User should be deliver', function() {
    signup.go()
    signup.fillForm(this.deliveryman.signup)
    signup.submit()

    const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
    signup.modalContentShouldBe(expectedMessage)

    cy.get('button.swal2-confirm').click()
  })

  it('Incorrect document', function () {
    signup.go()
    signup.fillForm(this.deliveryman.cpf_inv)
    signup.submit()
    signup.alerMessageShouldBe('Oops! CPF inválido')
  })
})