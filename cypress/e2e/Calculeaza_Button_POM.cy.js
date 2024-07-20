
import Calculeaza from "./Page_Object/Calculeaza_button";
describe('Calculeaza button flow', () => {
   
     const calculeaza=new Calculeaza()
    it('Transport Questions Flow with All No Responses', () => {
      
        calculeaza.navigate()
        calculeaza.first_clicks_and_validation()
        calculeaza.selectLocation()
        for(let i=0;i<3;i++)
            calculeaza.checkNO()
        

    })
    it('Add a fixed number of cars and then select "No"', () => {
       
        calculeaza.navigate()
        calculeaza.first_clicks_and_validation()
        calculeaza.selectLocation()
        calculeaza.checkYES()
        calculeaza.AddCars(4)
        
            

    })

    it('Add a fixed number of flights and then select "No"', () => {
        calculeaza.navigate()
        calculeaza.first_clicks_and_validation()
        calculeaza.selectLocation()
        calculeaza.checkNO()
        calculeaza.checkYES()
        calculeaza.AddFlights(4)

    })
    it('Add a fixed number of public transport and then select "No"', () => {
        calculeaza.navigate()
        calculeaza.first_clicks_and_validation()
        calculeaza.selectLocation()
        calculeaza.checkNO()
        calculeaza.checkNO()
        calculeaza.checkYES()
        calculeaza.PublicTransport(3)

    })
    it('Household Questions Flow', () => {
        calculeaza.navigate2()
        calculeaza.clickAndValidate('.button-try')
        calculeaza.HouseQuastion()
    })
    it('Food sections Questions Flow', () => {
        calculeaza.navigate3()
        calculeaza.clickAndValidate('.button-try')
        calculeaza.FoodSection()
    })

    })