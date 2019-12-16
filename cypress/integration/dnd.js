const DELAY_INTERVAL_MS = 100;

describe("Drag and drop functionnality", () => {
  it("Drag 'coucou' item and drop it to the slider container", () => {
    // cy.visit("http://localhost:3000/")
    //   .get(".SearchList > :nth-child(1)")
    //   .drag(".SortableCard.SortableCard-0");

    // Display element after get
    // cy.visit("http://localhost:3000/")
    //   .get(".SortableCard.SortableCard-0")
    //   .then(tragetWrapper => console.log(tragetWrapper.get(0)));

    //Trigger mouseDown event
    const dataTransfer = new DataTransfer();
    cy.visit("http://localhost:3000/")
      .get(".SearchList > :nth-child(1)")
      .trigger("mousedown", { which: 1, button: 0 })
      .wait(DELAY_INTERVAL_MS)
      .trigger("dragstart", { dataTransfer: dataTransfer })
      .wait(DELAY_INTERVAL_MS)
      .get(".SortableCard.SortableCard-0")
      // .then(dragstartResult => console.log(dragstartResult.get(0)))
      .trigger("dragover", { dataTransfer: dataTransfer, position: "top" })
      .wait(DELAY_INTERVAL_MS)
      .get(".SortableCard.SortableCard-0")
      .trigger("drop", { dataTransfer: dataTransfer, force: true })
      .wait(DELAY_INTERVAL_MS)
      .trigger("mouseup", { which: 1, button: 0 })
      .wait(DELAY_INTERVAL_MS)
      .trigger("enddrag", { dataTransfer: dataTransfer, force: true });

    cy.get(".SearchList > :nth-child(2)").trigger("mousedown", {
      which: 1,
      button: 0
    });

    // cy.get(".SearchList > :nth-child(1)");
    // cy.get(".SortableCard.SortableCard-0");
  });
});
