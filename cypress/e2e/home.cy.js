
beforeEach(() => {
  cy.viewport(1440, 900)
})

describe('home page', ()=>{
  it('app deve estar online', ()=> {
    /*Resolução à ser exibida no teste */
    
    /*Endereço para acessar o site */
    cy.visit('https://buger-eats.vercel.app')
    /*Buscar informação na tela */
    cy.get('#page-home main h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats')
    /*Clicar no campo para direcionar para página de cadastro*/
     cy.get('a').click()

  })
})
