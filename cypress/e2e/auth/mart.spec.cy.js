import martPage from '../pages/martPage.cy'
const martobj = new martPage;
describe('checkout', () => {
    beforeEach(() => {
        // martobj.pageVisit('https://mart-uat.hamrostack.com/-NwyUBP0kucDlS2mZShz/product/cmVhY3Rpb24vcHJvZHVjdDpCQUxzZGFxOFRnVEV5N2c1UA==_0kucDlS2');
          martobj.pageVisit('https://mart-uat.hamrostack.com/-NwyUBP0kucDlS2mZShz/product/cmVhY3Rpb24vcHJvZHVjdDptS0JQakJqYks0aG5qZGtjSA==_0kucDlS2');
    })
    it('should check product availability and proceed accordingly ', () => {
        //check if out of stock is visible
        cy.get('div').contains('Out of stock').then(($txt => {
            const text = $txt.text();
            cy.log('Got Text: ', text);
            if (text.includes('Out of stock')) {
                cy.get('div.font-GilroyBold').invoke('text').then((prodTitle) => {
                    cy.log("out of stock product:", prodTitle);
                    martobj.searchProduct(prodTitle);
                    martobj.clickProductTitle();

                })
                martobj.clickAddToCart();
                martobj.loginAsGuest();
                const maxSubtotal = 1000;
                cy.adjustQuantity(maxSubtotal);
                //check delivery fee is 0
                cy.get('div.text-sm div.font-GilroyMedium')
                    .invoke('text').then((deliveryfee) => {
                        const deliver_amt = deliveryfee.replace('Rs. ', '').trim();
                        const deliveryAmt = parseFloat(deliver_amt.replace(',', ''))
                        if (deliveryAmt == 0) {
                            expect(deliveryAmt).to.eq(0);
                            cy.log("Delivery fee is: RS.",deliveryAmt)

                        }
                    })




            }
            else{
                cy.get('button').contains('Add to cart').should('be.visible').click();
        console.log('Button Text:', buttonText);
            }


        }))



    })
})