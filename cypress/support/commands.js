// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js

Cypress.Commands.add('adjustQuantity', (maxSubtotal) => {
  cy.get('.flex.text-xs.sm\\:text-sm.items-center.font-GilroyBold.text-gray-700.gap-1')
    .find('div.font-GilroyBold.text-xs.sm\\:text-sm.md\\:text-base.text-green-600')
    .invoke('text')
    .then((subtotalText) => {
      const amount = subtotalText.replace('Rs. ', '').trim();
      const subtotal = parseFloat(amount.replace(',', ''));
      cy.log('Extracted Amount:', amount);
      console.log('Extracted Amount:', amount);

      if (subtotal <= maxSubtotal) {
        // If subtotal is less than or equal to the maxSubtotal, increase quantity
        cy.get('button.rounded-r.false').click();

        // Call the function recursively to check the new subtotal
        cy.adjustQuantity(maxSubtotal);
      } else {
        cy.log('Final Subtotal:', subtotal);
        console.log('Final Subtotal:', subtotal);
   
      }
    });
});
