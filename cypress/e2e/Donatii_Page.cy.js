import Donatii from "./Page_Object/Doantii_Page"
import Login from "./Page_Object/Login";
describe(('Donatii page flow'), () => {
    beforeEach(() => {
        donatii.navigate()
    })
    
    const donatii = new Donatii()
    const login=new Login()
    it(('Images text and buttons are visible'), () => {

        donatii.checkVisibility()

    })

    for (let i = 1; i <= 5; i++) {
        it(`Check functionality of button ${i}`, () => {
            donatii.functionalityButtons(i);
        });
    }
    it('The menu contein all pages',()=>{
        donatii.navbar(0)
        cy.fixture('User_data').then((data) => {
        login.Log_In(data.email,data.password)
        donatii.navbar(1)
      });
      
        
    })
   
})