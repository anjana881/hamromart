class martPage {
    elements = {
        searchInput: () => cy.get('#search-browser input.search-input'),
        searchButton: () => cy.get('#search-browser button.absolute svg'),
        productTitleLink: () => cy.get('a[href="/-NwyUBP0kucDlS2mZShz/product/cmVhY3Rpb24vcHJvZHVjdDpCUk1TRGFHYVk1bUpqZ3lmUg==_0kucDlS2"] h1.product-title'),
        addToCart: () => cy.get('button').contains('Add to cart'),
        viewCart: () => cy.get('a.underline'),
        login: () => cy.get('button.w-full'),
        guest: () => cy.get('div.guest')
    }

    pageVisit(url) {
        cy.visit(url);
    }

    searchProduct(prodTitle) {
        this.elements.searchInput().type(prodTitle);
        this.elements.searchButton().click();
    }
    // Method to click the first product title link
    clickProductTitle() {
        this.elements.productTitleLink().first().click();
    }
    clickAddToCart() {
        this.elements.addToCart().click()
    }
    clickviewCart() {
        this.elements.viewCart().click();
    }
    loginAsGuest() {
        this.elements.login().click();
        this.elements.guest().click();
    }
}
export default martPage;