import { filterPeople } from "../support/e2e";
let people;


describe("Base tests", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/person/popular?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&page=1`
    )
      .its("body")
      .then((response) => {
        people = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/people/page/1");
  });

  describe("The Popular people page", () => {
    it("displays the page header and 20 people", () => {
      cy.get('h5.MuiTypography-root').contains("Popular People");
      cy.get('div.MuiTypography-root').should("have.length", 20);
    });

    it("displays the correct people names", () => {
      cy.get('div.MuiCardContent-root').each(($card, index) => {
        cy.wrap($card).find("div.MuiTypography-root").should('have.text', people[index].name);
      });
    });
  });

  describe("Search specific people", () => {
    it("only display people with 'c' in the name", () => {
      const searchString = "c";
      const matchingPeople = filterPeople(people, searchString);
      cy.get('input[aria-label="search"]').clear().type(searchString);
      cy.get("div.MuiCardContent-root").should(
        "have.length",
        matchingPeople.length
      );
      cy.get("div.MuiCardContent-root").each(($card, index) => {
        cy.wrap($card).find("div.MuiTypography-root").contains(matchingPeople[index].name);
      });
    });
  });

  describe("Test Pagination", () => {
    it("should go to /people/page/2", () => {
      cy.get('button.MuiPaginationItem-root[aria-label="Go to page 2"]').click();
      cy.url().should("include", `/people/page/2`);
    });
    it("should go to previous page", () => {
      cy.get('button.MuiPaginationItem-previousNext[aria-label="Go to previous page"]').click({ force: true });
      cy.url().should("include", `/people/page/1`);
    });
    it("should go to next page", () => {
      cy.get('button.MuiPaginationItem-previousNext[aria-label="Go to next page"]').click({ force: true });
      cy.url().should("include", `/people/page/2`);
    });
  });

});