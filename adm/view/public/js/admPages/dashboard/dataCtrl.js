class DataCtrl {
    constructor() {
        this.users = {
            hasValues: false,
            data: [],
            userAccess: [],
            accessArray: []
        }
        this.dishes = []
        this.orders = []
        this.token = null
        this.cookingCalendar = []
        this.cookingCalendarStatus = []
        this.newCookingCalendarDate = []
        this.selectedDishes = []
        this.tempSelectedData = []
        this.tempObject = {}
        this.blockEditionStatusId = 4
        this.cookingAndDeliveryDateStatus= 8
        this.originalAccesses = []
        this.modifiedAccesses = []
        this.catoring = {
            active: [],
            archived: [],
            deleted: []
        }
        this.paidOrderStatusArray = [5,8,9,10,11,12]
        this.notMadeToThisListOrderStatusArray = [6,7]
        this.waitingListOrderStatusArray = [4]
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
// SET DATA
    set setToken(token){
        this.token = token
    }
    set setUsers(array){
        this.users.hasValues = true
        var tempArray = []
        //console.log(array.data)
        array.data[0].forEach(user => {
            var object = user
            object.searchString = `${user.name} ${user.email} ${user.phoneNumber} ${user.mobileOS}`
            user.socialMedia.forEach(media => {
                object.searchString = `${object.searchString} ${media.socialMediaName}`
            })
            object.searchString = object.searchString.toLowerCase()
            tempArray.push(object)
        })
        this.users.data = tempArray
        this.users.userAccess = array.data[1]
        this.users.accessArray = array.data[2]
    }
    set setCookingCalendarStatus(statusArray){
        this.cookingCalendarStatus= statusArray
    }
    set setCookingCalendar(cookingCalendarArray){
        var tempArray = []
        if(cookingCalendarArray===null){return this.cookingCalendar = []}
        cookingCalendarArray.forEach(cd => {
            var object = cd
            var tempDateArray = cd.cookingDate.split(/[- :]/)
            tempDateArray.forEach(reg => {
                reg = parseInt(reg)
            })
            cd.searchString = `${cd.cookingDate} ${cd.nmMonth} ${cd.nmMonth.substr(0,3)} ${cd.cookingDate.split(' ')[0].split('-')[2]} ${cd.cookingDate.split(' ')[0].split('-')[0]} ${cd.street === null ? '' : cd.street} ${cd.city === null ? '' : cd.city} ${cd.complement === null ? '' : cd.complement} ${cd.complement === null ? '' : cd.complement}`
            cd.searchString = cd.searchString.toLowerCase()
            cd.sortDate = new Date(tempDateArray[0],tempDateArray[1]-1,tempDateArray[2],tempDateArray[3],tempDateArray[4],tempDateArray[5])
            tempArray.push(object)
        })
        tempArray.sort((a,b)=>{
            if(a.cookingDate_status_id<b.cookingDate_status_id) { return -1 }
            if(a.cookingDate_status_id>b.cookingDate_status_id) { return 1 }
            if(a.sortDate>b.sortDate){ return 1 }
            if(a.sortDate<b.sortDate){ return -1 }
            return 0
        })
        this.cookingCalendar = tempArray
    }
    set setNewCookingCalendarDate(dateStr){
        this.newCookingCalendarDate = dateStr
    }
    set setOders(orders){
        this.orders = orders
    }
    set setDishes(dishes){
        this.dishes = []
        dishes.forEach(dish=> {
            this.dishes.push({
                createdBy: dish.createdBy,
                createdIn: dish.createdIn,
                description: dish.description,
                excluded: dish.excluded,
                excludedBy: dish.excludedBy,
                excludedIn: dish.excludedIn,
                id: dish.id,
                ingredients: dish.ingredients,
                name: dish.name,
                price: dish.price,
                fifo: dish.fifo,
                searchString: `${dish.name.toLowerCase()} ${dish.price} ${dish.description === null || dish.description === '' ? '' : dish.description} ${dish.ingredients === null || dish.ingredients === '' ? '' : dish.ingredients}`
            })
        })
    }
    set setSelectedDishes(dish){
        this.selectedDishes.push(dish)
    }
    set setTempSelectedData(tempData){
        this.tempSelectedData = tempData
    }
    set setTempObject(obj){
        for(let key in obj){
            this.tempObject[key] = obj[key]
        }
    }
    set setOriginalAccesses(access){
        this.originalAccesses.push(access)
    }
    set setModifiedAccesses(access){
        this.modifiedAccesses.push(access)
    }
    removeAccess(access){
        this.modifiedAccesses = this.modifiedAccesses.filter(a => {if(a===access){return false} return true})
    }
    clearModificiedAccesses(){
        this.modifiedAccesses = []
    }
    clearOriginalAccesses(){
        this.originalAccesses = []
    }
    clearTempObject(){
        this.tempObject = {}
    }
    clearTempSelectedData(){
        this.tempSelectedData = null
    }
    removeSelectedDish(dish){
        this.selectedDishes = this.selectedDishes.filter(d => {if(d===dish){return false} return true})
    }
    clearSelectedDishes(){
        this.selectedDishes = []
    }
    set setCatoringMsg(array){
        this.catoring.active = []
        this.catoring.archived = []
        this.catoring.excluded = []
        array.forEach(reg => {
            var tempDateArray = reg.createdIn.split(/[- :]/)
            tempDateArray.forEach(reg => {
                reg = parseInt(reg)
            })
            reg.searchString = `${reg.name.toLowerCase()} ${reg.email.toLowerCase()} ${reg.phoneNumber.toLowerCase()} ${reg.createdIn.toLowerCase()}`
            reg.sortDate = new Date(tempDateArray[0],tempDateArray[1]-1,tempDateArray[2],tempDateArray[3],tempDateArray[4],tempDateArray[5])
            if(reg.archived===1){
                return this.catoring.archived.push(reg)
            }
            if(reg.excluded===1){
                return this.catoring.excluded.push(reg)
            }
            this.catoring.active.push(reg)
        })
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//CHECK IF HAS DATA
    checkHasData(dataStorage){
        if(dataStorage===`users`){
            return this.users.hasValues
        }
    }
// RETURN DATA 
    returnData(selectionText){
       //active users
       if(selectionText==='token'){
            return this.token
        }
        //active users
       if(selectionText==='activeUsers'){
           return this.users.data.filter(user => {
               if(user.excluded===0){
                   return true
               }
               return false
           })
       }
       //deleted users
       if(selectionText==='excludedUsers'){
            return this.users.data.filter(user => {
                if(user.excluded===1){
                    return true
                }
                return false
            })
        }
        if(selectionText==='users'){
            return this.users
        }

        //cooking calendar
        if(selectionText==='cookingCalendarActive'){
            var returnArray = this.cookingCalendar.filter(reg => {
                if(reg.cookingDateStatusText===`Active`){
                    return true
                }
                return false
            })
            returnArray.sort((a,b)=>{
                if(a.cookingDate_status_id>b.cookingDate_status_id){return 1}
                if(a.cookingDate_status_id<b.cookingDate_status_id){return -1}
                if(a.cookingDate<b.cookingDate){return -1}
                if(a.cookingDate>b.cookingDate){return 1}
                return 0
            })
            return returnArray
        }
        if(selectionText==='cookingCalendarFinished'){
            const tempAry = this.cookingCalendar.sort( (a,b)=>{
                if(a.sortDate>b.sortDate) return 1
                if(a.sortDate<b.sortDate) return -1
                return 0
            }).reverse()
            
            return tempAry.filter(reg => {
                if(reg.cookingDateStatusText===`Finished`){
                    return true
                }
                return false
            })
        }
        if(selectionText==='cookingCalendarExcluded'){
            const tempAry = this.cookingCalendar.reverse()
            return tempAry.filter(reg => {
                if(reg.cookingDateStatusText===`Excluded`){
                    return true
                }
                return false
            })
        }
        //dishes
        if(selectionText==='activeDishes'){
            return this.dishes.filter(dish => {
                if(dish.excluded === 0){
                    return true
                }
                return false
            })
        }
        if(selectionText==='excludedDishes'){
            return this.dishes.filter(dish => {
                if(dish.excluded === 1){
                    return true
                }
                return false
            })
        }
        if(selectionText==='cookingCalendar'){
            return this.cookingCalendar
        }
        //orders
        if(selectionText===`order`){
            return this.orders
        }
        if(selectionText===`orderButExcluded`){
            // return this.orders
            var filter = this.orders.filter(a => {
                if( a.order_status_id!==999) { return true }
            })
            filter.forEach(order => {   
                var filterDishes = order.dishes.filter(a => {   if(a.excludedDishExtra_dish===0){ return true}      })
                order.dishes = filterDishes  })
            return filter
        }
        if(selectionText==='activerOrders'){
            var returnArray = []
            if(this.orders===null){return []}
            this.orders.forEach(order => {
                if((order.order_status_id <= 5 ||
                    order.order_status_id === 8 ||
                    order.order_status_id === 9 ||
                    order.order_status_id === 13 ||
                    order.order_status_id === 14) && 
                    order.order_status_id !== null && order.activeOrder ===`Active`){
                    returnArray.push(returnObjecForOrdersActiveDeliveredExcluded(this,order,true))
                }
            })
            return returntSortedArrayForOrdersActiveDeliveredExcluded(returnArray)
        }
        if(selectionText==='inactiveOrders'){
            if(this.orders===null){return []}
            var returnArray = []
            this.orders.forEach(order => {
                var orderObj = {}
                if((order.order_status_id <= 5 ||
                    order.order_status_id === 8 ||
                    order.order_status_id === 9 ||
                    order.order_status_id === 13 ||
                    order.order_status_id === 14) && 
                    order.order_status_id !== null && order.activeOrder ===`Inactive`){
                    returnArray.push(returnObjecForOrdersActiveDeliveredExcluded(this,order,true))
                }
            })
            return returntSortedArrayForOrdersActiveDeliveredExcluded(returnArray)
        }
        if(selectionText==='deliveredOrders'){
            if(this.orders===null){return []}
            var returnArray = []
            this.orders.forEach(order => {
                var orderObj = {}
                if(order.order_status_id===10 || 
                    order.order_status_id===11 ){
                    returnArray.push(returnObjecForOrdersActiveDeliveredExcluded(this,order,true))
                }
            })
            return returntSortedArrayForOrdersActiveDeliveredExcluded(returnArray)
        }
        if(selectionText==='excludedOrders'){
            if(this.orders===null){return []}
            var returnArray = []
            this.orders.forEach(order => {
                var orderObj = {}
                if(order.order_status_id===6 || 
                    order.order_status_id===7 || 
                    order.order_status_id===12 ||
                    order.order_status_id===999 || 
                    order.order_status_id===null){
                    returnArray.push(returnObjecForOrdersActiveDeliveredExcluded(this,order))
                }
            })
            return returntSortedArrayForOrdersActiveDeliveredExcluded(returnArray)
        }
        if(selectionText==='orderDelivery'){
            var cdId = null
            var returnArray = []
            var orders = []
            this.cookingCalendar.forEach(cd => {
                //if(cd.cookingDate_status_id===this.cookingAndDeliveryDateStatus){
                    if(cd.cookingDate_status_id>=7){
                    cdId = cd.id
                }
                if(cdId!==null){
                    this.orders.forEach(order => {
                        console.log(order.order_status_id)
                        if(order.cookingDates_id===cdId && [8,9,14].includes(order.order_status_id)){ 
                                orders.push(order)  
                            }
                    })
                    cdId=null
                }
            })
            console.log(orders)
            if(orders.length>0){
                orders.forEach(order=>{
                    returnArray.push(returnObjecForOrdersActiveDeliveredExcluded(this,order))
                })
            }else{
                return []
            }
            return returntSortedArrayForOrdersActiveDeliveredExcluded(returnArray)
        }
        //dishes
        if(selectionText===`dishes`){
            return this.dishes
        }
        if(selectionText===`selectedDishes`){
            return this.selectedDishes
        }
        //temp data
        if(selectionText===`tempSelectedData`){
            return this.tempSelectedData
        }
        //tempObject
        if(selectionText==='tempObject'){
            return this.tempObject
        }
        //status id
        if(selectionText==='blockEditionStatusId'){
            return this.blockEditionStatusId
        }
        //newCookingCalendarDate
        if(selectionText==='newCookingCalendarDate'){
            return this.newCookingCalendarDate
        }
        //accesses 
        if(selectionText==='accessesArray'){
            return this.users.accessArray
        }
        if(selectionText==='userAccesses'){
            return this.users.userAccess
        }
        if(selectionText==='originalAccesses'){
            return this.originalAccesses
        }
        if(selectionText==='modifiedAccesses'){
            return this.modifiedAccesses
        }
        //catoring
        if(selectionText==='activeMsgs'){
            var unread = []
            var readMsg = []
            this.catoring.active.forEach(reg => {
                if(reg.read===0){
                    return unread.push(reg)
                }
                readMsg.push(reg)
            })
            unread.sort((a,b)=>{
                if(a.sortDate<b.sortDate){return 1 }
                if(a.sortDate>b.sortDate){return -1 }
                return 0
            })
            readMsg.sort((a,b)=>{
                if(a.sortDate<b.sortDate){return 1 }
                if(a.sortDate>b.sortDate){return -1 }
                return 0
            })
            return unread.concat(readMsg)
        }
        if(selectionText==='archivedMsgs'){
            return this.catoring.archived
        }
        if(selectionText==='excludedMsgs'){
            return this.catoring.excluded
        }
        if(selectionText==='paidStatus'){
            return this.paidOrderStatusArray
        }
        if(selectionText==='notMadeToListStatus'){
            return this.notMadeToThisListOrderStatusArray
        }
        if(selectionText==='waitingListStatus'){
            return this.waitingListOrderStatusArray
        }
    }
}
function returnObjecForOrdersActiveDeliveredExcluded(dataCtrl,order,activeOrders = false){
    var orderObj = {}
    const users = dataCtrl.returnData('users')
    const cookingCalendar = dataCtrl.returnData('cookingCalendar')
    users.data.forEach(user => {
        if(user.id===order.user_id){
            orderObj.userName = user.name === null || user.name === '' ? '' : user.name
            orderObj.userEmail = user.email === null || user.email === '' ? '' : user.email
            orderObj.phoneNumber = user.phoneNumber === null || user.phoneNumber === '' ? '' : user.phoneNumber
            user.socialMedia.forEach(media => {
                orderObj[`${media.socialMedia}`] = media.socialMediaName === null || media.socialMediaName === '' ? '' : media.socialMediaName
            })
        }
    })
    cookingCalendar.forEach(cd => {
        //console.log(cd.dishes)
        if(cd.id===order.cookingDates_id){
            orderObj.cookingDate = cd.cookingDate
            orderObj.cdSortDate = cd.sortDate
            orderObj.street = cd.street
            orderObj.city = cd.city
            orderObj.state = cd.state
            orderObj.country = cd.country
            orderObj.complement = cd.complement
            orderObj.zipcode = cd.zipcode
            orderObj.cookingCalendarDishes = cd.dishes
        }
    })
    for (let key in order){
        orderObj[`${key}`] = order[key]
    }
    var searchString = ''
    for (let key in orderObj){
        searchString = `${searchString} ${orderObj[key]}`
    }
    order.dishes.forEach(dish => {
        searchString = `${searchString} ${dish.name} ${dish.quantity}`
    })
    var totalMeals = 0
    var totalDishes = 0
    var dishesTotal = 0.00
    order.dishes.forEach(dish => {
        //console.log(dish)
        if(activeOrders){
            // console.log('enteredActiveOrder')
            if(dish.excludedDishExtra_dish===0){
                searchString = `${searchString} ${dish.name} ${dish.quantity}`
                totalMeals += parseInt(dish.dishQtty)
                dishesTotal += parseFloat(dish.dish_price)
                totalDishes += 1
            }
        }else{
            //console.log('didntEnteredActiveOrder')
            searchString = `${searchString} ${dish.name} ${dish.quantity}`
            totalMeals += parseInt(dish.dishQtty)
            dishesTotal += parseFloat(dish.dish_price)
            totalDishes += 1
        }
    })
    var extrasTotal = 0.00
    order.extras.forEach(extra => {
        searchString = `${searchString} ${extra.name} ${extra.quantity}`
        extrasTotal += parseFloat(extra.extras_price)
    })
    totalMeals = totalMeals/totalDishes
    orderObj.totalMeals = totalMeals
    orderObj.totalMeals = totalMeals
    orderObj.searchString = searchString
    orderObj.dishesTotal = dishesTotal
    orderObj.extrasTotal = extrasTotal
    orderObj.orderTotal = extrasTotal + dishesTotal
    return orderObj
}
function returntSortedArrayForOrdersActiveDeliveredExcluded(returnArray){
    return returnArray.sort((a,b)=>{
        if(a.cdSortDate<b.cdSortDate){return -1}
        if(a.cdSortDate>b.cdSortDate){return 1}
        return 0})
}