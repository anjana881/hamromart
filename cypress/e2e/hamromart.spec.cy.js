

describe('Checkout', () => {
  beforeEach(() => {
    cy.visit('https://mart-uat.hamrostack.com/-NwyUBP0kucDlS2mZShz/product/cmVhY3Rpb24vcHJvZHVjdDpCQUxzZGFxOFRnVEV5N2c1UA==_0kucDlS2');
    // 0 cy.visit('https://mart-uat.hamrostack.com/-NwyUBP0kucDlS2mZShz/product/cmVhY3Rpb24vcHJvZHVjdDptS0JQakJqYks0aG5qZGtjSA==_0kucDlS2')
  })


  it('should check product availability and proceed accordingly', () => {

    //check if out of stock is visible
    cy.get('div').contains('Out of stock').then(($btn => {
      const buttonText = $btn.text();
      console.log('Button Text:', buttonText);
      if (buttonText.includes('Out of stock')) {
        cy.get('div.font-GilroyBold').invoke('text').then((productTitle) => {

          cy.log('Out of stock product:', productTitle);
          console.log('Out of stock product:', productTitle);

          cy.get('#search-browser input.search-input').type(productTitle);
          cy.get('#search-browser button.absolute svg').click();
          cy.get('a[href="/-NwyUBP0kucDlS2mZShz/product/cmVhY3Rpb24vcHJvZHVjdDpCUk1TRGFHYVk1bUpqZ3lmUg==_0kucDlS2"] h1.product-title').first().click();
        });

        cy.get('button').contains('Add to cart').should('be.visible').click();
        cy.get('a.underline').click();
        cy.get('button.w-full').click();
        cy.get('div.guest').click();
        let maxSubtotal = 1000;

        function adjustQuantity() {
          cy.get('.flex.text-xs.sm\\:text-sm.items-center.font-GilroyBold.text-gray-700.gap-1')
            .find('div.font-GilroyBold.text-xs.sm\\:text-sm.md\\:text-base.text-green-600')
            .invoke('text')
            .then((subtotalText) => {
              const amount = subtotalText.replace('Rs. ', '').trim();
              const subtotal = parseFloat(amount.replace(',', ''));
              cy.log('Extracted Amount:', amount);
              console.log('Extracted Amount:', amount);
              // expect(subtotal).to.be.lte(1000);

              if (subtotal <= maxSubtotal) {
                // If subtotal is less than 1000, increase quantity and check again
                cy.get('button.rounded-r.false')
                  .click();

                // call the function again to check the new subtotal
                adjustQuantity();
              } else {

                cy.log('Final Subtotal:', subtotal);
                console.log('Final Subtotal:', subtotal);
                // expect(subtotal).to.be.lte(maxSubtotal); 
              }

            });
        }
        adjustQuantity();



        cy.get('div.text-sm div.font-GilroyMedium')
          .invoke('text')
          .then((deliveryFee) => {
            const delivery_amt = deliveryFee.replace('Rs. ', '').trim();
            const deliveryAmt = parseFloat(delivery_amt.replace(',', ''))
            if (deliveryAmt == 0) {
              expect(deliveryAmt).to.equal(0);
              console.log("delivery fee", deliveryAmt)
              cy.log('Delivery is free');
              console.log('Delivery is free');
            }
          })

      } else {

        // If div.stock is not visible, proceed to click the "Add to Cart" button
        // cy.get('div.stock').should('not.exist').then(()=>{
        cy.get('button').contains('Add to cart').should('be.visible').click();
        console.log('Button Text:', buttonText);
        // cy.get('div > svg > path[d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"]').click();
        // })

      }

    }))
  })
})
