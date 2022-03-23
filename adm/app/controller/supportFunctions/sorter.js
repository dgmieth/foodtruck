//support funcionts
const datetimeFormatter = require('../supportFunctions/datetimeFormatter')
//sorter functionssortOrdersForActiveFinishedCookingDates
exports.sortCookingDates = (data) => {
    const dataArray = []
    var cdId = 0
    if(data.length===0){
        return null
    }
    data.forEach(cd => {
        if(cdId!==cd.id){
            var dataObj = {}
            cdId = cd.id
            const tempArray = data.filter(reg => { if(reg.id === cdId && reg.dish_id !== null){ return true }})
            var dishes = []
            if(tempArray.length>0){
                tempArray.forEach(reg => {
                    dishes.push({
                        dish_id: reg.dish_id,
                        name: reg.name,
                        ingredients: reg.ingredients,
                        description: reg.description,
                        price: reg.price,
                        dishFifo: reg.dishFifo,
                    })
                })
            }
            dataArray.push({
                id: cd.id,
                cookingDate: datetimeFormatter(cd.cookingDate),
                menu_id: cd.menu_id,
                cookingDate_status_id: cd.cookingDate_status_id,
                cdMonth: parseInt(cd.cdMonth),
                nmMonth: cd.nmMonth,
                timeFormat:cd.timeFormat,
                cookingDate_status: cd.cookingDateStatusName,
                meals_quantity: cd.meals_quantity,
                mealsForThis: cd.mealsForThis,
                mealsConfirmed: cd.mealsConfirmed,
                mealsOnList: cd.mealsOnList,
                APPLICATION_address_id: cd.APPLICATION_address_id,
                createdBy: cd.createdBy,
                createdIn : datetimeFormatter(cd.createdIn),
                excluded : cd.excluded,
                excludedBy: cd.excludedBy,
                excludedIn : datetimeFormatter(cd.excludedIn),
                addressId: cd.addressId,
                street: cd.street,
                state: cd.state,
                zipcode: cd.zipcode,
                complement: cd.complement,
                city: cd.city,
                country: cd.country,
                dishes: dishes,
                ordersTotal: cd.ordersTotal,
                cookingDateStatusText: cd.cookingDateStatusText
            })
        }
    })
    return dataArray
}
//sorter functionssortOrdersForActiveFinishedCookingDates
exports.sortOrdersForActiveFinishedCookingDates = (data) => {
    const dataArray = []
    var orderId = 0
    if(data.length===0){
        return null
    }
    data.forEach(order => {
        if(orderId!==order.id){
            var dataObj = {}
            orderId = order.id
            dataObj.orderId = orderId
            const tempArray = data.filter(reg => { if(reg.id === orderId){ return true }})
            dataObj.dishes = []
            dataObj.extras = []
            tempArray.forEach(reg => {
                if(reg.extras_id===null){
                    dataObj.dishes.push(
                        {
                            detail_id: reg.detail_id ,
                            dish_id: reg. dish_id,
                            dish_name: reg.dish_name ,
                            dish_price: reg.dishPrice,
                            dishQtty: reg.dishQtty ,
                            dishFifo: reg.dishFifo,
                            observation: reg.observation,
                            excludedDishExtra_dish:reg.excludedDishExtra 
                        }
                    )
                }
                if(reg.dish_id===null){
                    dataObj.extras.push(
                        {
                            detail_id: reg.detail_id ,
                            extras_id: reg.extras_id,
                            extras_name: reg.extras_name ,
                            extrasQtty: reg.extrasQtty ,
                            observation: reg.observation,
                            extras_price: reg.rextrasPrice,
                            excludedDishExtra_extra:reg.excludedDishExtra
                        }
                    )
                }
            })
            dataObj.user_id = order.user_id
            dataObj.order_paymentMethod_id = order.order_paymentMethod_id
            dataObj.paymentConfirmationCode = order.paymentConfirmationCode
            dataObj.createdBy = order.createdBy
            dataObj.createdIn = datetimeFormatter(order.createdIn)
            dataObj.excludedBy = order.excludedBy
            dataObj.excludedIn = datetimeFormatter(order.excludedIn)
            dataObj.email = order.email
            dataObj.name = order.name
            dataObj.phoneNumber = order.phoneNumber
            dataObj.activeOrder = order.activeOrder
            dataObj.orderList_id = order.orderList_id
            dataObj.cookingDates_id = order.cookingDates_id
            dataObj.cookingDate_status_id = order.cookingDate_status_id
            dataObj.cookingDateStatus = order.cookingDateStatus
            dataObj.order_status_id = order.order_status_id
            dataObj.orderStatus = order.orderStatus
            dataObj.tipAmount = parseFloat(order.tipAmount)
            dataObj.tipReimbursed = order.tipReimbursed
            dataArray.push(dataObj)
        }
    })
    return dataArray
}
//sorter allDishes
exports.sortAllDishes = (data) => {
    const dataArray = []
    data.forEach(reg => {
        dataArray.push({
            createdBy: reg.createdBy,
            createdIn: datetimeFormatter(reg.createdIn),
            description: reg.description,
            excluded:  reg.excluded,
            excludedBy: reg.excludedBy,
            excludedIn: datetimeFormatter(reg.excludedIn),
            id: reg.id,
            ingredients:  reg.ingredients,
            name:  reg.name,
            price:  reg.price,
            fifo: reg.fifo
        })
    })
    return dataArray
}
//sort catoring messages
exports.sortCatoringMsgs = (data) => {
    const dataArray =[]
    data.forEach(reg => {
        dataArray.push({
            archived: reg.archived,
            archivedBy: reg.archivedBy === null ? '' : reg.archivedBy,
            archivedIn: datetimeFormatter(reg.archivedIn),
            createdIn: datetimeFormatter(reg.createdIn),
            email: reg.email,
            excluded: reg.excluded,
            excludedBy: reg.excludedBy === null ? '' : reg.excludedBy,
            excludedIn: datetimeFormatter(reg.excludedIn),
            id: reg.id,
            name: reg.name,
            orderDescription: reg.orderDescription,
            phoneNumber: reg.phoneNumber,
            read: reg.read,
            readBy: reg.readBy === null ? '' : reg.readBy,
            readIn: datetimeFormatter(reg.readIn)
        })
    })
    return dataArray
}