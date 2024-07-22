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
    login_page.validation()
  });

  it('Login with Invalid Credentials', () => {
    const login_page = new Login();
    login_page.Log_In(userData.invalid_email, userData.invalid_password)
    login_page.validate_url();
    login_page.validateError();
  });

  it('Login with Empty Fields', () => {
    const login_page = new Login();
    login_page.Log_In()
    login_page.validate_url();
    login_page.validateError();
  });

  it('Login with Empty Password', () => {
    const login_page = new Login();
    login_page.Log_In(userData.email)
    login_page.validate_url();
    login_page.validateError();
  });
});