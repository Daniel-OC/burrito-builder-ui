describe('User flow upon load', () => {
  it('The user should see a list of existing orders', () => {
    cy.intercept('GET','http://localhost:3001/api/v1/orders', {
      "orders": [
      {
      "id": 1,
      "name": "Pat",
      "ingredients": [
      "beans",
      "lettuce",
      "carnitas",
      "queso fresco",
      "jalapeno"
      ]
      },
      {
      "id": 2,
      "name": "Sam",
      "ingredients": [
      "steak",
      "pico de gallo",
      "lettuce",
      "carnitas",
      "queso fresco",
      "jalapeno"
      ]}
      ]})

      .visit('http://localhost:3000')
      .get('h1').should('have.text', 'Burrito Builder')
      .get('.order').its('length').should('eq', 2)
      .get('h3').should('have.text', 'PatSam')
      .get('li').should('have.text', 'beanslettucecarnitasqueso frescojalapenosteakpico de gallolettucecarnitasqueso frescojalapeno')
      
  })

  it('The user should be able to add a new order', () => {
    cy.intercept('GET','http://localhost:3001/api/v1/orders', {
      "orders": [
      {
      "id": 1,
      "name": "Pat",
      "ingredients": [
      "beans",
      "lettuce",
      "carnitas",
      "queso fresco",
      "jalapeno"
      ]
      },
      {
      "id": 2,
      "name": "Sam",
      "ingredients": [
      "steak",
      "pico de gallo",
      "lettuce",
      "carnitas",
      "queso fresco",
      "jalapeno"
      ]}
      ]})

    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      body: {id:3, name: 'Fishy Bongo', ingredients: ['beans', 'steak']}
    })

    cy.visit('http://localhost:3000')
      .get('.order').its('length').should('eq', 2)
      .get('input').type('Fishy Bongo')
      .get('#submit-button').click()
      .get('.order').its('length').should('eq', 2)
      //^^ To ensure you can't submit an order without an ingredient

    cy.visit('http://localhost:3000')
      .get('.order').its('length').should('eq', 2)
      .get('button').first().click()
      .get('#submit-button').click()
      .get('.order').its('length').should('eq', 2)
      //^^To ensure you can't submit an order without a name
      .get('input').type('Fishy Bongo')
      .get('button').first().click()
      .get('#submit-button').click()
      .get('.order').its('length').should('eq', 3)
      .get('h3').should('have.text', 'PatSamFishy Bongo')
      .get('li').should('have.text', 'beanslettucecarnitasqueso frescojalapenosteakpico de gallolettucecarnitasqueso frescojalapenobeanssteak')


  })
})