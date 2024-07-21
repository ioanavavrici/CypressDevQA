import Navigation from "./Page_Object/Navigation_page";
import Login from "./Page_Object/Login";

describe('Navigation between pages', () => {
    const navigation = new Navigation();
    const login = new Login();

    it('Navigation to other pages when logged in', () => {

        cy.fixture('User_data').then((data) => {

            login.Log_In(data.email, data.password);
            navigation.navbar(1);
        });

    });

    it('Navigation from "Despre noi" page to other pages when not logged in', () => {
        navigation.navigateToAboutUs();
        navigation.navbar(0);
    });

    it('Navigation from "Statistici generale" page to other pages when not logged in', () => {
        navigation.navigateToGeneralStatistics();
        navigation.navbar(0);
    });

    it('Navigation from "Amprenta mea" page to other pages when not logged in', () => {
        navigation.navigateToMyFootprint();
        navigation.navbar(0);
    });

    it('Navigation from "Donatii" page to other pages when not logged in', () => {
        navigation.navigateToDonations();
        navigation.navbar(0);
    });
});
