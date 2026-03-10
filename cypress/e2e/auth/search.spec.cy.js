import martPage from '../pages/martPage.cy'
const martobj = new martPage;
describe('Search Products', () => {
    const query = 'Peak shoes';
    beforeEach(() => {
        martobj.pageVisit('https://mart-uat.hamrostack.com');
           })
    it('should search product and validate availability', () => {
       martobj.searchProduct(query);
       

    cy.get('body').then((body) => {
      // If the element is inside the body, assert its visibility
      if (body.find('.product-title.svelte-1yhr6gs')) {
        cy.get('.product-title.svelte-1yhr6gs').should('be.visible');
        cy.get('.product-title.svelte-1yhr6gs').first().invoke('text').then((text) => {
               cy.log("text: " + text);
          const firstTitle = text.trim();
          cy.log("Product found: " + firstTitle);
          expect(firstTitle).to.equal(query);
        });
      } else {
        // If the element is not found inside body, assert no data
        cy.log('No data');
      }
    });



       
       
    })
})