const apiGraphQL = `${Cypress.env("apiUrl")}/graphql`

describe('User sign up and Login', () => {
    beforeEach(() => {
        cy.intercept("POST", "/users").as("signup");
        cy.intercept("POST", apiGraphQL, (req) => {

            const{ body } = req;
            if (body.hasOwnProperty("operationName") && body.operationName === "CreateBankAccount" ) {
                req.alias = "gqlCreateBankAccountMutation"
            }
        });
    });

    it('should always bring user to the login page if not authenticated', () => {
        cy.visit("/personal");
        cy.location("pathname").should("equal", "/signin");
    });

    it('should redirect to home page after login', () => {
        cy.visit("/");
        cy.get('.MuiTypography-h5').contains("Sign in")
    });

    it('should display login errors', () => {
        cy.visit('/');

        // validate the error message when username was missing
        cy.getBySel('signin-username').type("username").find("input").clear().blur();
        cy.get('#username-helper-text').should('be.visible').and('contain', 'Username is required') 

        // validate the error message when password was less than four characters
        cy.getBySel('signin-password').type('pas').find('input').blur()
        cy.get('#password-helper-text').should('be.visible').and('contain', 'Password must contain at least 4 characters')

        // validate the sign-in button is disabled
        cy.getBySel('signin-submit').should('be.disabled')
    });

    it('should display signup errors', () => {
        cy.visit('/signup');
        
        cy.getBySel('signup-first-name').type('first').find('input').clear().blur()
        cy.get('#firstName-helper-text').should('be.visible').and('contain', 'First Name is required')

        cy.getBySel('signup-last-name').type('last').find('input').clear().blur()
        cy.get('#lastName-helper-text').should('be.visible').and('contain', 'Last Name is required')

        cy.getBySel('signup-username').type('last').find('input').clear().blur()
        cy.get('#username-helper-text').should('be.visible').and('contain', 'Username is required')
        
        cy.getBySel('signup-password').type('password').find('input').clear().blur()
        cy.get('#password-helper-text').should('be.visible').and('contain', 'Enter your password')

        cy.getBySel('signup-confirmPassword').type('confirm password').find('input')
        cy.get('#confirmPassword-helper-text').should('be.visible').and('contain', 'Password does not match')

        cy.getBySel('signup-confirmPassword').find('input').clear().blur()
        cy.get('#confirmPassword-helper-text').should('be.visible').and('contain', 'Confirm your password')

        cy.getBySel('signup-submit').should('be.disabled')
    });

    it.only('should allow a visitor to sign up account and login and add bank account', () => {
        const userInfo = {
            firstName: "Yue",
            lastname: "Ma",
            userName: "PainterJoy90",
            password: "s3cret",
        }

        // sign up user
        cy.visit('/');

        cy.getBySel("signup").click();
        cy.getBySel("signup-title").should("be.visible").and("contain", "Sign Up");

        cy.get('#firstName').type(userInfo.firstName);
        cy.get('#lastName').type(userInfo.lastname);
        cy.get('#username').type(userInfo.userName);
        cy.get('#password').type(userInfo.password);
        cy.get('#confirmPassword').type(userInfo.password);
        cy.get('.MuiButton-label').click();
        cy.wait("@signup")        

        //login user
        cy.login(userInfo.userName, userInfo.password);

        //on the dashboard
        cy.getBySel('user-onboarding-dialog').should('be.visible')


    });

    it('should display error for an invalid password for existing user', () => {
        cy.login('username', 'invalidpwd');

        cy.getBySel('signin-error')
          .should('be.visible')
          .and('have.text', 'Username or password is invalid');
    });

});