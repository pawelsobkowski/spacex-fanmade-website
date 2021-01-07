context("test", () => {
  it("visit page", () => {
    cy.visit("https://pawelsobkowski.github.io/spacex-fanmade-website/");
  });

  it("header", () => {
    cy.get(".header").get(".header__logo");
    cy.get(".header > .header__nav > .nav__list").children();
  });

  it("main", () => {
    cy.get(".hero__title").contains("find your future");
    cy.get(".hero__description").contains(
      `Building on the achievements of Falcon 9 and Falcon Heavy, SpaceX is working on a next generation of fully reusable launch vehicles that will be the most powerful ever built, capable of carrying humans to Mars and other destinations in the solar system`
    );
  });

  it("click falcon 1 btn", () => {
    cy.contains("Falcon 1").click();
  });

  it("check subpage title", () => {
    cy.get(".section__title").contains("Falcon 1");
  });

  it("scroll to bottom", () => {
    cy.wait(1000);
    cy.scrollTo("bottom", { ensureScrollable: false });
  });

  it("click falcon 9 btn", () => {
    cy.contains("Falcon 9").click();
  });

  it("check subpage title", () => {
    cy.get(".section__title").contains("Falcon 9");
  });

  it("scroll to bottom", () => {
    cy.wait(1000);
    cy.scrollTo("bottom", { ensureScrollable: false });
  });

  it("click falcon heavy btn", () => {
    cy.contains("Falcon Heavy").click();
  });

  it("check subpage title", () => {
    cy.get(".section__title").contains("Falcon Heavy");
  });

  it("scroll to bottom", () => {
    cy.wait(1000);
    cy.scrollTo("bottom", { ensureScrollable: false });
  });

  it("click startship btn", () => {
    cy.contains("Starship").click();
  });

  it("check subpage title", () => {
    cy.get(".section__title").contains("Starship");
  });

  it("scroll to bottom", () => {
    cy.wait(1000);
    cy.scrollTo("bottom", { ensureScrollable: false });
  });
});
