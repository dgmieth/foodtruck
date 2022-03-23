class DataCtrl {
    constructor() {
        this.months = ['January','February','March','April','May','June','July','August','September','October','November','December']
        this.eventsTest = [`2022-02-15`,`2022-02-18`,`2022-02-21`,`2022-02-24`,`2022-02-27`,`2022-03-02`,`2022-03-05`,`2022-03-08`,`2022-03-11`,`2022-03-14`,`2022-03-17`,`2022-03-20`,`2022-03-23`,`2022-03-26`,`2022-03-29`]
        this.today = '2022-02-12'
        this.user = null
        this.events = []
        this.orders = []
        this.orderableStatusId = [4]
        this.updatableStatusId = [4,5]
        this.payableStatusId = [6]
        /*logged user*/
        this.logged = false
        /*selections*/
        /*EVENT INFORMATION */
        this.selectedEventDate = null
        this.menuText = ''
        this.totalAmount = 0.0
        this.dishesArray = []
        this.eventStatus = {
            text:  '',
            id: 0
        }
        this.eventAdress = ''
        this.mapAddress = ''
        this.coordinates = {
            lat:0,
            lng:0
        }
        this.eventId = 0
        /*ORDER INFORMATION */
        this.hasOrderInEvent = false
        this.orderMealsQtty = 0
        this.orderId = 0
        this.orderStatus = 0
        this.orderStatusName = ''
    }
    set setUser(info){
        this.user = info
    }
    set setEvents(events){
        this.events = events
    }
    set setOrders(orders){
        this.orders = orders
    }
    set setSelectedEventDate(selectedDate){
        this.selectedEventDate = selectedDate
        this.createDishesArrayTotalPriceAndMenuText()
        this.checkIfHasOrderInEnvet()
    }
    isUserLogged(logged,uiCtrl){
        this.logged = logged
        if(!logged) {
            this.user = null
        }
        uiCtrl.updateHomePageButtons(logged)
    }
    checkIfHasOrderInEnvet(){
        var orderObj = this.orders.filter(el => {
            return el.cookingDateId === this.eventId
        })
        if(orderObj.length>0){
            // console.log('has')
            this.hasOrderInEvent = true
            orderObj[0].dishes.forEach(el => {
                if(el.dishFifo===0){
                    return this.orderMealsQtty = el.dishQtty
                }
            })
            this.orderId = orderObj[0].orderId
            this.orderStatus = orderObj[0].orderStatusId
            this.orderStatusName = orderObj[0].orderStatusName
        }else{
            this.hasOrderInEvent = false
            this.orderMealsQtty  = 0
            this.orderId = 0
            this.orderStatus = 0
            this.orderStatusName = ''
        }
    }
    createDishesArrayTotalPriceAndMenuText(){
        const dataObj = this.events.filter(el => {
            return el.cookingDate.split(' ')[0]===this.selectedEventDate
        })
        this.eventAdress = ''
        this.mapAddress = ''
        if(dataObj.length>0){
            var text1 = `<p><strong>BOX</strong></p>`
            const fifo = `<p><strong>VENDIDO SOMENTE NO LOCAL</strong></p>`
            var text2 = fifo
            var it1 = 1
            var it2 = 1
            this.eventStatus.text = dataObj[0].cookingStatus
            this.eventStatus.id = dataObj[0].cookingStatusId
            this.eventId = dataObj[0].cookingDateId
            this.eventAdress = `
            <strong>${dataObj[0].street}${dataObj[0].complement!=='Not informed'?', '+dataObj[0].complement:''}, ${dataObj[0].city} - ${dataObj[0].state}${dataObj[0].zipcode!=='Not informed'?' '+dataObj[0].zipcode:''}</strong> as <strong>${dataObj[0].cookingDate.split(' ')[1].substr(0,5)}</strong>
            `
            this.mapAddress = `${dataObj[0].street}${dataObj[0].complement!=='Not informed'?', '+dataObj[0].complement:''}, ${dataObj[0].city} - ${dataObj[0].state}${dataObj[0].zipcode!=='Not informed'?' '+dataObj[0].zipcode:''}`
            this.coordinates.lat = dataObj[0].lat
            this.coordinates.lng = dataObj[0].lng
            this.totalAmount=0
            dataObj[0].dishes.forEach(el => {
                if(el.dishFifo===0){
                    this.dishesArray.push(el.dishId)
                    this.totalAmount = this.totalAmount + parseFloat(el.dishPrice)
                    text1 = `${text1}<p>${it1}- R$${el.dishPrice} ${el.dishName}${el.dishDescription !== '' ? '('+ el.dishDescription +')':''}</p>`
                    it1 += 1
                }else{
                    text2 = `${text2}<p>${it1}- R$${el.dishPrice} ${el.dishName}${el.dishDescription !== '' ? '('+ el.dishDescription +')':''}</p>`
                    it2 +=1
                }
            })
            this.menuText = `${text1}${text2==='fifo' ? '' : text2}` 
        }else{
            this.eventStatus.text = ''
            this.eventStatus.id = 0
            this.eventId = 0
            this.eventAdress = ''
            this.mapAddress = ''
            this.coordinates.lat = 0
            this.coordinates.lng = 0
            this.menuText = ''
        }
        
    }
    /*========================================================================================
    ========================================================================================
    ========================================================================================
                            CONFIGURE CALENDAR
    ========================================================================================
    ========================================================================================
    ========================================================================================*/
    fetchData(selectData){
        switch (selectData) {
            case 'eventsTest':
                return this.eventsTest
                break;
            case 'months':
                return this.months
                break;
            case 'today':
                return this.today
                break;
            case 'logged':
                return this.logged
            case 'user':
                return this.user
            case 'events':
                return this.events
            case 'orders':
                return this.orders
            case 'selectedEventDate':
                return this.selectedEventDate
            case 'menuText':
                return this.menuText
            case 'eventStatus':
                return this.eventStatus
            case 'eventAdress':
                return this.eventAdress
            case 'orderableStatusId':
                return this.orderableStatusId
            case 'mapAddress':
                return this.mapAddress   
            case 'coordinates':
                return this.coordinates   
            case 'totalAmount':
                return this.totalAmount   
            case 'eventId':
                return this.eventId   
            case 'dishesArray':
                return this.dishesArray   
            case 'updatableStatusId':
                return this.updatableStatusId
            case 'orderId':
                return this.orderId
            case 'hasOrderInEvent':
                return this.hasOrderInEvent
            case 'orderMealsQtty':
                return this.orderMealsQtty
            case 'payableStatusId':
                return this.payableStatusId
            case 'orderStatus':
                return this.orderStatus
            case 'orderStatusName':
                return this.orderStatusName
            default:
                break;
        }
    }
}