describe('Tech Quiz Website', () => {
  beforeEach(() => {
    cy.fixture('questions').then((fixture) => {
      cy.intercept('GET', '/api/questions/random', {
        statusCode: 201,
        body: fixture
      }).as('mockGetQuestions');
    });
    cy.visit('http://localhost:3001/');
  });

  it('should start and go throught the quiz the start and go throught it again', () => {
    
    cy.get('.btn').click();
    cy.wait('@mockGetQuestions').then((intercept) => {
        assert.isNotNull(intercept.response?.body, '1st API call has data');
        
        const fixtureQuestions = intercept.response?.body;

        function runQuestionStatus(questionIndex) {
            cy.get('h2').should("have.text", fixtureQuestions[questionIndex].question);
            cy.get(`:nth-child(${1 + ((questionIndex) % 4)}) > .btn`).click()
        }

        for(let QNum in fixtureQuestions){
            runQuestionStatus(QNum)
        }

        cy.get('h2').should("have.text", "Quiz Completed");
        cy.get('.alert').should("have.text", "Your score: 5/10");
    })
    // first pass done
    cy.get('.btn').click();
    cy.wait('@mockGetQuestions').then((intercept) => {
        assert.isNotNull(intercept.response?.body, '1st API call has data');
        
        const fixtureQuestions = intercept.response?.body;

        function runQuestionStatus(questionIndex) {
            cy.get('h2').should("have.text", fixtureQuestions[questionIndex].question);
            cy.get(`:nth-child(${1 + ((questionIndex) % 4)}) > .btn`).click()
        }

        for(let QNum in fixtureQuestions){
            runQuestionStatus(QNum)
        }

        cy.get('h2').should("have.text", "Quiz Completed");
        cy.get('.alert').should("have.text", "Your score: 5/10");
    })
    // second pass done
  })
});
