import Registration from "./Page_Object/Registration_Page";

describe('Check the Registration Functionality', () => {
    it('Registration with Valid Information', () => {
        const register = new Registration();
        register.registerUser(1, 1);
        register.verifyLoginUrl();
    });

    it('Registration with an existing email', () => {
        const register = new Registration();
        register.registerUser(2, 1);
        register.checkEmailAlreadyUsedError();
        register.verifyRegistrationUrl();
    });

    it('Registration with Invalid Email', () => {
        const register = new Registration();
        register.registerUser(5, 1);
        register.checkInvalidEmailError();
        register.verifyRegistrationUrl();
    });

    it('Registration with Empty Fields', () => {
        const register = new Registration();
        register.registerUser();
        register.verifyRegistrationUrl();
    });
});
