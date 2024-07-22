import Login from "./Page_Object/Login";
import Logout from "./Page_Object/Logout";
import Navigation from "./Page_Object/Navigation_page";

describe('Verify logout button', () => {
    const login = new Login();
    const logout = new Logout();
    const navigate=new Navigation();

    it('Click logout button', () => {
        cy.fixture('User_data').then((data) => {
            login.Log_In(data.email, data.password);
            logout.logout();
            navigate.navigateToAboutUs();
        });
    });
    
    it('Verify that the logout button is not on the page when not logged in', () => {
        navigate.navigateToAboutUs();
        cy.get('.auth-user>svg').should('not.exist');
    });


});
