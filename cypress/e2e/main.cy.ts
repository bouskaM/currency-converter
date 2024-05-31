describe('Test main functionality', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://cors-anywhere.herokuapp.com/https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt',
      { fixture: 'data.txt' }
    )
    cy.visit('http://localhost:5173/')
  })

  it('Main title has correct text', () => {
    cy.get('[data-cy="main-heading"]').should('have.text', 'Currency converter')
  })

  it('Table shows correctly fetched data', () => {
    cy.get('[data-cy="table-title"]').should('have.text', 'Rates for 29/05/2024')

    cy.get('tbody tr').should('have.length', 3)

    cy.get('tbody tr').eq(0).within(() => {
      cy.get('td').eq(0).should('contain.text', 'Australia')
      cy.get('td').eq(1).should('contain.text', 'dollar')
      cy.get('td').eq(2).should('contain.text', '1')
      cy.get('td').eq(3).should('contain.text', 'AUD')
      cy.get('td').eq(4).should('contain.text', '15.105')
    })


    cy.get('tbody tr').eq(1).within(() => {
      cy.get('td').eq(0).should('contain.text', 'Brazil')
      cy.get('td').eq(1).should('contain.text', 'real')
      cy.get('td').eq(2).should('contain.text', '1')
      cy.get('td').eq(3).should('contain.text', 'BRL')
      cy.get('td').eq(4).should('contain.text', '4.401')
    })

    cy.get('tbody tr').eq(2).within(() => {
      cy.get('td').eq(0).should('contain.text', 'Bulgaria')
      cy.get('td').eq(1).should('contain.text', 'lev')
      cy.get('td').eq(2).should('contain.text', '1')
      cy.get('td').eq(3).should('contain.text', 'BGN')
      cy.get('td').eq(4).should('contain.text', '12.641')
    })
  })

  it('table headers have correct titles', () => {
    cy.get('th').eq(0).should('have.text', 'Country')
    cy.get('th').eq(1).should('have.text', 'Currency')
    cy.get('th').eq(2).should('have.text', 'Amount')
    cy.get('th').eq(3).should('have.text', 'Code')
    cy.get('th').eq(4).should('have.text', 'Rate')
  })

  it('h2 (Convert) has correct title', () => {
    cy.get('[data-cy="convert-title"]').should('have.text', 'Convert')
  })

  it('from-to label has correct text', () => {
    cy.get('[data-cy="from-to-label"]').should('have.text', 'CZK to')
  })


  it('StyledInput has correct default value and accepts only numbers', () => {
    cy.get('[data-cy="amount-input"]').should('have.value', '100')
    cy.get('[data-cy="amount-input"]').clear().type('123').should('have.value', '123')
    cy.get('[data-cy="amount-input"]').clear().type('123.45').should('have.value', '123.45')
    cy.get('[data-cy="amount-input"]').clear().type('abc').should('have.value', '')
  })

  it('Select has correct default value, displays correct text, can be opened, and allows another value to be selected', () => {
    cy.get('[data-cy="currency-select"]').should('have.value', 'AUD')
    cy.get('[data-cy="currency-select"]').find('option:selected').should('have.text', 'Australia (AUD)')
    
    cy.get('[data-cy="currency-select"]').select('BRL')
    cy.get('[data-cy="currency-select"]').should('have.value', 'BRL')
    cy.get('[data-cy="currency-select"]').find('option:selected').should('have.text', 'Brazil (BRL)')
  })

  it('ConverterForm displays correct converted value', () => {
    cy.get('[data-cy="amount-input"]').clear().type('100')
    cy.get('[data-cy="currency-select"]').select('BRL')
    cy.get('[data-cy="result"').should('have.text', '= 22.72 BRL')

    cy.get('[data-cy="amount-input"]').clear().type('250')
    cy.get('[data-cy="result"').should('have.text', '= 56.81 BRL')
  })

  it('ConverterForm displays correct converted value after changing currency', () => {
    cy.get('[data-cy="amount-input"]').clear().type('100')
    cy.get('[data-cy="currency-select"]').select('BRL')
    cy.get('[data-cy="result"').should('have.text', '= 22.72 BRL')

    cy.get('[data-cy="currency-select"]').select('AUD')
    cy.get('[data-cy="result"').should('have.text', '= 6.62 AUD')

    cy.get('[data-cy="currency-select"]').select('BGN')
    cy.get('[data-cy="result"').should('have.text', '= 7.91 BGN')
  })

})