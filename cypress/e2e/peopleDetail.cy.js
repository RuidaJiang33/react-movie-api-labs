let people;
let person;
let movies;
let personId;
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
        person = people[0];
        personId = people[0].id;
        console.log(person)
      });
  });
  beforeEach(() => {
    cy.visit("/people/page/1");
    cy.get('.MuiPaper-root.MuiCard-root').eq(0).find('img.MuiCardMedia-img').should('be.visible').click();
  });

  describe("Basic information", () => {
    it("displays a person's information", () => {
      cy.get('span.MuiTypography-p').contains(person.gender);
      cy.get('h4.MuiTypography-h4').contains(person.name);
    })
  })

  describe("From the people page to a person's details", () => {
    it("navigates to the people details page and change browser URL", () => {
      cy.url().should("include", `/people/${personId}`);
    });
  });

  describe("From a person's details to a movie's details", () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${Cypress.env(
          "TMDB_KEY"
        )}&language=en-US`
      )
        .its("body")
        .then((response) => {
          movies = response.cast;
        });
    });
    it("should go to a movie detail page", () => {
      cy.get('.MuiImageList-root a').first().click();
      cy.url().should("include", `/movies/${movies[0].id}`);
    });
  });

  describe("Click PeopleDetailHeader to get relative content", () => {
    it("should get people images and then back to detail page", () => {
      cy.get('button.MuiButton-text').contains("Media").click();
      cy.url().should("include", `/people/${personId}/images`);
      cy.get('button.MuiButton-text').contains("Outline").click();
      cy.url().should("include", `/people/${personId}`);
    });
  });
});