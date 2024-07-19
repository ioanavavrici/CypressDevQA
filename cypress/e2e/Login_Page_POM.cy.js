import Login from "./Page_Object/Login";
describe('Check the Login Functionality', () => {
    let userData;
    beforeEach(() => {
       
        cy.fixture('User_data').then((data) => {
            userData = data;
          });
    })

    it('Login with Valid Information', () => {

        const login_page = new Login();
        login_page.Log_In(userData.email, userData.password)
    });
    it('Login with Invalid Credentials', () => {
        const login_page = new Login();
        login_page.Log_In(userData.invalid_email, userData.invalid_password)
        login_page.url();
        login_page.error(); 
    });
    it('Login with Empty Fields', () => {
        const login_page = new Login();
        login_page.Log_In()
        login_page.url();
        login_page.error(); 
      });
    
      it('Login with Empty Password', () => {
        const login_page = new Login();
        login_page.Log_In(userData.email)
        login_page.url();
        login_page.error(); 
      });
});