let movies;
let movieId; // Enola Holmes movie id

describe("Navigation", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        movies = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/home");
  });
  describe("From the home page to a movie's details", () => {
    it("navigates to the movie details page and change browser URL", () => {
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
    });
  });
  describe("Using the site header", () => {
    describe("when the viewport is desktop scale", () => {
      it("navigate via the button links", () => {
        cy.get('#movies_button').click();
        cy.get('li[tabindex="0"]').click();
        cy.url().should("include", `/home`);
        cy.get('body').click(0, 100);
        cy.get('#user_button').click();
        cy.get('li[tabindex="0"]').click();
        cy.url().should("include", `/favorites`);
      });
    });
  });
  describe("From the favourites page to a movie's details", () => {
    it("navigates to the movie details page and change browser URL", () => {
      cy.get("button[aria-label='add to favorites']").eq(1).click();
      cy.get('#user_button').click();
      cy.get('li[tabindex="0"]').click();
      cy.get('body').click(0, 100);
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/movies/${movies[1].id}`);
    });
  });
  describe("The forward/backward links", () => {
    beforeEach(() => {
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
    });
    it("navigates between the movies detail page and the Home page.", () => {
      cy.get("svg[data-testid='ArrowBackIcon'").click();
      cy.url().should("not.include", `/movies/${movies[0].id}`);
      cy.get("svg[data-testid='ArrowForwardIcon'").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
    });
  });
});