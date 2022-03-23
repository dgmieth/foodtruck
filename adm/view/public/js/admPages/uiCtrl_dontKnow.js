class UICtrl {
    constructor() {
        this.addNewCookingCalendarDate = 'addNewCookingCalendarDate'
        //=====================================
        //ALERT================================
        this.alert = {
            alert: 'alert',
            text: 'text'
        }
        this.spinner = {
            spinner: 'main-content-spinner'
        }
        this.classes = {
            subState: 'subState'
        }
        this.checkboxes = {
            dishes: {
                className: 'dishesSelectionCheckBoxes',
            }
        }
        this.commonPropertiesNames = {
            modalActions: {
                cookingCalendarAndDish: {
                    newDish: 'newDish'
                }
            }
        }
        //=====================================
        //INFO CONTAINER ======================
        this.infoContainer = {
            totalAmount : "uiCtrlInfoContainerTotalAmount"
        }
        //=====================================
        //FORMS================================
        this.form = 'postInfoForm'
        this.formsNames = {
            newDishInfo: 'newDishInfo',
            cookingCalendarInfo: 'cookingCalendarInfo',
            firstAlertInfo: 'firstAlertInfo',
            editDishInfo: 'editDishInfo'
        }
        this.notification = 'messageToUser'
        //=====================================
        //INPUTS===============================
        this.inputs = {
            cookingCalendarDate: {
                street: 'ccdStreet',
                complement: 'ccdComplement',
                city: 'cctCity',
                state: 'ccdState',
                country: 'ccdCountry',
                zipcode: 'ccdZipcode'
            },
            dishes: {
                ids: {
                    name: 'dishName',
                    description: 'dishDescription',
                    ingredients: 'dishIngredients',
                    price: 'dishPrice',
                    id: 'dishId'
                }
            },
            order: {
                orderId: 'orderId',
                oderMealsQtty: 'oderMealsQtty',
                orderStatusText: 'orderStatusText',
                orderAmountDue: 'orderAmountDue',
                orderDishesName: 'orderDishesName',
                orderDishesPrice: 'orderDishesPrice',
                orderDishesQtty: 'orderDishesQtty',
                orderExtrasName: 'orderExtrasName',
                orderExtrasPrice: 'orderExtrasPrice',
                orderExtrasQtty: 'orderExtrasQtty',
                orderUserEmail: 'orderUserEmail',
                orderUserName: 'orderUserName',
                orderUserPhoneNumber: 'orderUserPhoneNumber',
                orderCDDate: 'orderCDDate',
                orderCDAddress: 'orderCDAddress',
                orderCDDishName: 'orderCDDishName',
                orderCDDishPrice: 'orderCDDishPrice',

            }
        }
        //=====================================
        //DIV MAIN CONTENT=====================
        this.mainContent = {
            div: 'main-content-wrapper',
            divBreadcumber: 'main-content-breadCumber',
            mainContenctWithOptions: 'main-content-withOptions-wrapper'
        }
        //=====================================
        //MODAL================================
        this.modal = {
            div: 'modalDiv',
            title: 'modalDivTitle',
            body: 'modalBody',
            textArea: 'modalTextArea',
            btnAction: 'btnModalExecuteAction',
            btnAction2: 'btnModalExecuteAction2'
        }
        this.modalActions = {
            user: {
                viewDetails: 'viewDetails',
                edit: 'edit',
                delete: 'delete',
                notify: 'notifiy'
            },
            cookingDate: {
                newCookingCalendar: 'newCookingCalendar',
                listOrders:'listOrders',
                edit:'edit',
                viewDetails: 'viewDetails',
                openToOrders:'openToOrders',
                closeToOrders:'closeToOrders',
                setCookingCapacity: 'setCookingCapacity',
                initiateDelivery: 'initiateDelivery',
                gameOver: 'gameOver',
                delete:'delete',
                hide:'hide',
                mealsQtty: 'mealsQtty',
                mealsForThis: 'mealsForThis',
                mealsConfirmed: 'mealsConfirmed',
                mealsOnList: 'mealsOnList',
                newDish: this.commonPropertiesNames.modalActions.cookingCalendarAndDish.newDish
            },
            dish: {
                newDish: this.commonPropertiesNames.modalActions.cookingCalendarAndDish.newDish,
                viewDetails: 'viewDetails',
                edit: 'edit',
                delete: 'delete'
            },
            order: {
                viewDetails: 'viewDetails',
                delete: 'delete',
                deliver: 'deliver',
                reimburse: 'reimburse',
                notify:'notify'
            },
            manageAccess: {
                manageAccess: 'manageAccess'
            },
            catoring: {
                read: 'readMessage',
                archive: 'archiveMessage',
                delete: 'deleteMessage'
            }
        }
        this.modalTypes = this.modalActions
        //=====================================
        //SUB STATES SIDEBAR===================
        this.optionbar = {
            div: 'sidebar-wrapper-options',
            btns: {
                btnOne: 'btnOne',
                btnTwo : 'btnTwo',
                btnThree: 'btnThree',
                btnFour: 'btnFour',
                btnFive: 'btnFive'
            }
        }
        this.searchInput = {
            input: 'searchInputField'
        }
        this.selectableClasses = {
            activeUsersRow: `activeUsersRow`,
            appStateBtns : 'appStateBtns '
        }
        //=====================================
        //STATE SIDEBAR========================
        this.sidebar = {
            div: 'sidebar-wrapper',
            toggle: 'toggleBtn',
            btns: {
                //states with no options
                invitationCode: 'genInvitationCodeStateBtn',
                orderDelivery: 'orderDeliveryStateBtn',
                logout: 'logoutStateBtn',
                //states with options
                users: 'usersStateBtn',
                //menu: 'menuStateBtn',
                dish: 'dishStateBtn',
                cookingCalendar: 'cookingCalendarStateBtn',
                orders: 'ordersStateBtn',
                manageAccess: 'manageAccessStateBtn',
                catorStateBtn: 'catorStateBtn',
                reports: 'reportsStateBtn'
            }
        }
        this.subStateOptionsWrapper = 'sub-state-options-wrapper'
        //=====================================
        //TABLE================================
        this.table = {
            rowHeight: 25,
            tbody: 'tableResultsTableBody'
        }
        this.timeOutVar = null
        this.uiSwitcher = {
            state: 'state',
            subState: 'subState'
        }
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                                     APP STATE UI
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    changeUIInterfaceAccordingToAppState(dataCtrl,appCtrl){
        console.log('changeUIInterfaceAccordingToAppState')
        for(let btn of document.getElementsByClassName(this.selectableClasses.appStateBtns)){
            if(btn.classList.contains(`active`)){
                btn.classList.remove(`active`)
            }
        }
        function appStateBtnAndBreadcrum(btnId,breadCumberId, breadCumberAppStateText,breadCumberAppSubstateText){
            if(btnId!==null){
                document.getElementById(btnId).classList.add('active')
            }
            if(breadCumberAppSubstateText!==null){
                document.getElementById(breadCumberId).innerHTML= `<p style="text-align:right;margin-right:15px"><strong>${breadCumberAppStateText}</strong> >> <strong>${breadCumberAppSubstateText}</strong></p>`
            }else{
                document.getElementById(breadCumberId).innerHTML= `<p style="text-align:right;margin-right:15px"><strong>${breadCumberAppStateText}</strong>`
            }

        }
        //QUICK ACTIONS APP STATES  => NO APP SUB STATES
        //invitationCode
        if(appCtrl.getAppState===appCtrl.getAppStatesList._INVITATIONCODE){
            this.getInivitationCodeUIElements(this.uiSwitcher.state)
            appStateBtnAndBreadcrum(this.sidebar.btns.invitationCode,this.mainContent.divBreadcumber,'Quick actions','Invitation code')

        }
        //orderDelivery
        if(appCtrl.getAppState===appCtrl.getAppStatesList._ORDERDELIVERY){
            
            var tempData = dataCtrl.returnData('orderDelivery')
            if(tempData.length===0){
                appCtrl.setAppState = appCtrl.getPreviousState
                return this.showHideAlert('alert-primary','There are no orders to deliver','show')
            }
            var innerData = ''
            innerData = returnInnerDataForOrderSubStatesAndSearchMode(dataCtrl,this,tempData,false,false,false,true,false) 
            this.gettingOrderDeliveryStateOrSubstate(this.uiSwitcher.state,innerData)
            appStateBtnAndBreadcrum(this.sidebar.btns.orderDelivery,this.mainContent.divBreadcumber,'Quick actions','Order Delivery')
            appCtrl.loadSearchEventListeners(dataCtrl,this)
        }
        //manage access
        if(appCtrl.getAppState===appCtrl.getAppStatesList._MANAGEACCESS){
            var innerData = ''
            dataCtrl.returnData('users').data.forEach(user=>{
                if(user.excluded===0){
                    innerData = `${innerData}
                    <tr>
                        <td>${user.email}</td>
                        <td>${user.name}</td>
                        <td><button id="userId-${user.id}" type="button" class="btn btn-danger" onclick="appCtrl.manageAccessActions(dataCtrl,uiCtrl,uiCtrl.getIDs().modalActions.manageAccess.manageAccess,this)"><strong>Accesses</strong></button></td>
                    </tr>
                    `
                }
            })
            this.gettingOrderDeliveryStateOrSubstate(this.uiSwitcher.state,innerData)
            appStateBtnAndBreadcrum(this.sidebar.btns.manageAccess,this.mainContent.divBreadcumber,'System management',null)
            document.getElementById(this.mainContent.div).innerHTML = `
                <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 15%!important;padding-left:100px!important">
                    <div class="row w-100 mx-auto my-auto">
                        <div class="col-2"><strong>Search:</strong></div>
                        <div class="col-10"><input name="${this.searchInput.input}" id="${this.searchInput.input}" class="w-100" type="text" placeHolder="User name, email, phone number, social media user names..."></div>
                    </div>
                    </div>
                    <div class=".container-fluid mx-auto my-auto text-center w-75" style="height: 80%!important;overflow-y:auto">
                        <table class="table table-striped table-sm table-hover">
                            <thead>
                                <tr>
                                    <th><strong>E-mail</strong></th>
                                    <th><strong>Name</strong></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="${this.table.tbody}">
                               ${innerData}
                            </tbody>
                        </table>
                    </div>
                </div>
                `
                appCtrl.loadSearchEventListeners(dataCtrl,this)
        }

        //dataCtrl.returnData('orderDelivery')
        //USERS APP STATE => THERE ARE APP SUB STATES
        if(appCtrl.getAppState===appCtrl.getAppStatesList._USERS){
            appStateBtnAndBreadcrum(this.sidebar.btns.users,this.mainContent.divBreadcumber,'Users',null)
            document.getElementById(this.mainContent.div).innerHTML = `
            <div id="${this.optionbar.div}" class="my-auto mx-auto text-center" style="height: 90%!important;z-index: 9">
                <div class="toggle-btn text-center" onclick="appCtrl.toggleOptionsbar(this,uiCtrl)">
                    <span style="margin-bottom:0!important;"></span>
                    <p>Options</p>
                    <span style="margin-top:0!important;"></span>
                </div>  
                <div class="list h-100" style="overflow-y: auto;">
                    <button id="${this.optionbar.btns.btnOne}" class="item">Active users</button>
                    <button id="${this.optionbar.btns.btnTwo}" class="item">Excluded users</button>
                    <button id="${this.optionbar.btns.btnThree}" class="item">Generate Invitation Code</button>
                </div>
            </div>
            <div id="${this.mainContent.mainContenctWithOptions}" class=".container-fluid w-100 h-100 mx-auto my-auto text-center" style="padding:0">

            </div>
            `
            appCtrl.loadAppSubStateListeners(dataCtrl,uiCtrl)
        }
        //dataCtrl.returnData('orderDelivery')
        //REPORTS APP STATE => THERE ARE APP SUB STATES
        if(appCtrl.getAppState===appCtrl.getAppStatesList._REPORTS){
            appStateBtnAndBreadcrum(this.sidebar.btns.reports,this.mainContent.divBreadcumber,'Reports',null)
            document.getElementById(this.mainContent.div).innerHTML = `
            <div id="${this.mainContent.mainContenctWithOptions}" class=".container-fluid w-100 h-100 mx-auto my-auto text-center">
                <div class="row h-100 w-100">
                    <div class="col-12 h-100 w-100 text-center">
                        <p class="h1">To be created</p>
                    </div>
                </div>
            </div>
            `
        }
        //COOKING CALENDAR APP STATE => THERE ARE APP SUB STATES
        if(appCtrl.getAppState===appCtrl.getAppStatesList._COOKINGCALENDAR){
            appStateBtnAndBreadcrum(this.sidebar.btns.cookingCalendar,this.mainContent.divBreadcumber,'Cooking calendar','Active dates')
            document.getElementById(this.mainContent.div).innerHTML = `
            <div id="${this.optionbar.div}" class="my-auto mx-auto text-center" style="height: 90%!important;z-index: 9">
                <div class="toggle-btn text-center" onclick="appCtrl.toggleOptionsbar(this,uiCtrl)">
                    <span style="margin-bottom:0!important;"></span>
                    <p>Options</p>
                    <span style="margin-top:0!important;"></span>
                </div>  
                <div class="list h-100" style="overflow-y: auto;">
                    <button id="${this.optionbar.btns.btnOne}" class="item">Active dates</button>
                    <button id="${this.optionbar.btns.btnTwo}" class="item">Finished dates</button>
                    <button id="${this.optionbar.btns.btnThree}" class="item">Excluded dates</button>
                </div>
            </div>
            <div id="${this.mainContent.mainContenctWithOptions}" class=".container-fluid w-100 h-100 mx-auto my-auto text-center">
                
            </div>
            `
            appCtrl.loadAppSubStateListeners(dataCtrl,uiCtrl)
        }
        //DISH APP STATE => THERE ARE APP SUB STATES
        if(appCtrl.getAppState===appCtrl.getAppStatesList._DISH){
            appStateBtnAndBreadcrum(this.sidebar.btns.dish,this.mainContent.divBreadcumber,'Cooking calendar',null)
            document.getElementById(this.mainContent.div).innerHTML = `
            <div id="${this.optionbar.div}" class="my-auto mx-auto text-center" style="height: 90%!important;z-index: 9">
                <div class="toggle-btn text-center" onclick="appCtrl.toggleOptionsbar(this,uiCtrl)">
                    <span style="margin-bottom:0!important;"></span>
                    <p>Options</p>
                    <span style="margin-top:0!important;"></span>
                </div>  
                <div class="list h-100" style="overflow-y: auto;">
                    <button id="${this.optionbar.btns.btnOne}" class="item">Active dishes</button>
                    <button id="${this.optionbar.btns.btnTwo}" class="item">Excluded dishes</button>
                </div>
            </div>
            <div id="${this.mainContent.mainContenctWithOptions}" class=".container-fluid w-100 h-100 mx-auto my-auto text-center">
                
            </div>
            `
            appCtrl.loadAppSubStateListeners(dataCtrl,uiCtrl)
        }
        //DISH APP STATE => THERE ARE APP SUB STATES
        if(appCtrl.getAppState===appCtrl.getAppStatesList._ORDERS){
            appStateBtnAndBreadcrum(this.sidebar.btns.orders,this.mainContent.divBreadcumber,'Orders',null)
            document.getElementById(this.mainContent.div).innerHTML = `
            <div id="${this.optionbar.div}" class="my-auto mx-auto text-center" style="height: 90%!important;z-index: 9">
                <div class="toggle-btn text-center" onclick="appCtrl.toggleOptionsbar(this,uiCtrl)">
                    <span style="margin-bottom:0!important;"></span>
                    <p>Options</p>
                    <span style="margin-top:0!important;"></span>
                </div>  
                <div class="list h-100" style="overflow-y: auto;">
                    <button id="${this.optionbar.btns.btnOne}" class="item">Active orders</button>
                    <button id="${this.optionbar.btns.btnFive}" class="item">Inactive orders</button>
                    <button id="${this.optionbar.btns.btnTwo}" class="item">Delivered orders</button>
                    <button id="${this.optionbar.btns.btnThree}" class="item">Excluded orders</button>
                    <button id="${this.optionbar.btns.btnFour}" class="item">Order delivery</button>
                </div>
            </div>
            <div id="${this.mainContent.mainContenctWithOptions}" class=".container-fluid w-100 h-100 mx-auto my-auto text-center">
                
            </div>
            `
            appCtrl.loadAppSubStateListeners(dataCtrl,uiCtrl)
        }
        //CATORING APP STATE => THERE ARE APP SUB STATES
        if(appCtrl.getAppState===appCtrl.getAppStatesList._CATORING){
            appStateBtnAndBreadcrum(this.sidebar.btns.catorStateBtn,this.mainContent.divBreadcumber,'Catering',null)
            document.getElementById(this.mainContent.div).innerHTML = `
            <div id="${this.optionbar.div}" class="my-auto mx-auto text-center" style="height: 90%!important;z-index: 9">
                <div class="toggle-btn text-center" onclick="appCtrl.toggleOptionsbar(this,uiCtrl)">
                    <span style="margin-bottom:0!important;"></span>
                    <p>Options</p>
                    <span style="margin-top:0!important;"></span>
                </div>  
                <div class="list h-100" style="overflow-y: auto;">
                    <button id="${this.optionbar.btns.btnOne}" class="item">In-mail</button>
                    <button id="${this.optionbar.btns.btnTwo}" class="item">Archived</button>
                    <button id="${this.optionbar.btns.btnThree}" class="item">Excluded</button>
                </div>
            </div>
            <div id="${this.mainContent.mainContenctWithOptions}" class=".container-fluid w-100 h-100 mx-auto my-auto text-center">
                
            </div>
            `
            appCtrl.loadAppSubStateListeners(dataCtrl,uiCtrl)
        }
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                                  APP SUB STATE UI
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    changeUIInterfaceAccordingToAppSubState(dataCtrl,appCtrl){
        console.log('changeUIInterfaceAccordingToAppSubState')
        function updateBreadCumber(elementId,appState,appSubState){
            document.getElementById(elementId).innerHTML= `<p style="text-align:right;margin-right:15px"><strong>${appState}</strong> >> <strong>${appSubState}</strong></p>`
        }
        var innerData = ''
        var tempData = []
        var editBtn = ''
        var sendNotifToUser = ''
        var deleteBtn = ''
        var excludedInField = ''
        var subStateOne = false
        var subStateTwo = false
        var subStateThree = false
        var subStateFour = false
        var subStateFive = false
        //*****************************************************************************************
        //-----------------------------------------------------------------------------------------
        //APP STATE IS USER
        //*****************************************************************************************
        //-----------------------------------------------------------------------------------------
        if(appCtrl.getAppState===appCtrl.getAppStatesList._USERS){
            const users = 'Users'
            subStateOne = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._ACTIVEUSERS
            subStateTwo = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._EXCLUDEDUSERS
            subStateThree = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._INVITATIONCODE

            var viewDetails = '<th></th>'

            function removeActiveClassesFromUserSubStates(uiCtrl){
                    document.getElementById(uiCtrl.optionbar.btns.btnOne).classList.remove('active')
                    document.getElementById(uiCtrl.optionbar.btns.btnTwo).classList.remove('active')
                    document.getElementById(uiCtrl.optionbar.btns.btnThree).classList.remove('active')
            }
            if(subStateOne||subStateTwo){
                if(subStateOne){
                    console.log(`ACTIVE_USERS`)
                    removeActiveClassesFromUserSubStates(this)
                    document.getElementById(this.optionbar.btns.btnOne).classList.add('active')
                    tempData = dataCtrl.returnData('activeUsers')
                    // editBtn = `<th></th>`
                    // sendNotifToUser = '<th></th>'
                    // deleteBtn = `<th></th>`
                    updateBreadCumber(this.mainContent.divBreadcumber,users,'Active users')
                }
                if(subStateTwo){
                    console.log(`EXCLUDED_USERS`)
                    removeActiveClassesFromUserSubStates(this)
                    document.getElementById(this.optionbar.btns.btnTwo).classList.add('active')
                    tempData = dataCtrl.returnData('excludedUsers')
                    updateBreadCumber(this.mainContent.divBreadcumber,users,'Excluded users')
                }
                innerData = returnInnerDataForCUserSubStateAndSearchMode(dataCtrl,this,tempData,subStateOne,subStateTwo)
                document.getElementById(this.mainContent.mainContenctWithOptions).innerHTML = `
                <div class=".container-fluid my-auto text-right w-100" style="height: 7%!important;padding-left:100px!important;padding-right:15px!important">
                    <div class=".container-fluid text-right w-50" style="float:right">
                        <div class="text-right">
                            <input name="${this.searchInput.input}" id="${this.searchInput.input}" class=".container-fluid w-100 text-right" type="text" placeHolder="Search user name, email, phone number, social media user names...">
                        </div>
                    </div>
                </div>
                    <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 88%!important;overflow-y:auto;padding:5px 5px">
                        <div id="${this.table.tbody}" class="row w-100 my-auto mx-auto">
                            ${innerData}
                        </div>
                    </div>
                </div>
                `
                appCtrl.loadSearchEventListeners(dataCtrl,this)
            }
            if(subStateThree){
                removeActiveClassesFromUserSubStates(this)
                document.getElementById(this.optionbar.btns.btnThree).classList.add('active')
                this.getInivitationCodeUIElements(this.uiSwitcher.subState)
                updateBreadCumber(this.mainContent.divBreadcumber,users,'Invitation code')
            }
        }
        //*****************************************************************************************
        //-----------------------------------------------------------------------------------------
        //APP STATE IS COOKING CALENDAR
        //*****************************************************************************************
        //-----------------------------------------------------------------------------------------
        if(appCtrl.getAppState===appCtrl.getAppStatesList._COOKINGCALENDAR){
            console.log('subState _-> Cooking calendar')
            const cookingCalendar = 'Cooking calendar'
            subStateOne = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._ACTIVEDATES
            subStateTwo = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._FINISHEDDATES
            subStateThree = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._EXCLUDEDDATES
            
            editBtn = `<th></th>`
            deleteBtn = `<th></th>`
            var viewCounterBtn = `<th><strong>Orders</strong></th>`
            var mealsQtty = `<th colspan="4"><strong>Meals</strong></th>`
            var openCloseToOrdersBtn = `<th></th>`

            function removeAddActiveClassesFromCookingCalendarSubStates(btnId,uiCtrl){
                document.getElementById(uiCtrl.optionbar.btns.btnOne).classList.remove('active')
                document.getElementById(uiCtrl.optionbar.btns.btnTwo).classList.remove('active')
                document.getElementById(uiCtrl.optionbar.btns.btnThree).classList.remove('active')
                document.getElementById(btnId).classList.add('active')
            }
            if(subStateOne){
                console.log('subState _-> Active')
                removeAddActiveClassesFromCookingCalendarSubStates(this.optionbar.btns.btnOne,this)
                updateBreadCumber(this.mainContent.divBreadcumber,cookingCalendar,'Active dates')
                tempData = dataCtrl.returnData('cookingCalendarActive')
            }
            if(subStateTwo){
                console.log('subState _-> Finished')
                removeAddActiveClassesFromCookingCalendarSubStates(this.optionbar.btns.btnTwo,this)
                updateBreadCumber(this.mainContent.divBreadcumber,cookingCalendar,'Finished dates')
                tempData = dataCtrl.returnData('cookingCalendarFinished')
            }
            if(subStateThree){
                console.log('subState _-> Excluded')
                removeAddActiveClassesFromCookingCalendarSubStates(this.optionbar.btns.btnThree,this)
                updateBreadCumber(this.mainContent.divBreadcumber,cookingCalendar,'Excluded dates')
                tempData = dataCtrl.returnData('cookingCalendarExcluded')
                excludedInField = `<th><strong>Excluded in</strong></th>`
            }
            innerData = returnInnerDataForCookingDateSubStatesAndSearchMode(dataCtrl,this,tempData,subStateOne,subStateTwo,subStateThree)
            document.getElementById(this.mainContent.mainContenctWithOptions).innerHTML = `
                <style>
                    .btnActionsSearch {
                        background-size: 25px;
                        background-repeat: no-repeat;
                        background-position-y: center;
                        padding-left: 30px;
                        width: 65%!important;
                        text-align: start;
                    }
                </style>
                <div class=".container-fluid my-auto text-right w-100" style="height: 15%!important;padding-left:100px!important;padding-right:15px!important">
                    <div class=".container-fluid text-right w-50" style="float:right">
                        <div class="text-right">
                            <input 
                                name="${this.searchInput.input}" 
                                id="${this.searchInput.input}" 
                                class=".container-fluid text-right" 
                                type="text" 
                                style="width:100%!important;padding-bottom:2px"
                                placeHolder="Search dates, locations...">
                            ${subStateOne ? 
                                `<button 
                                    id="${this.addNewCookingCalendarDate}" 
                                    class="btn btn-outline-success btnActionsSearch" 
                                    style="border:none;background-image:url(/img/addDate.png);float:right;width: 120px!important;">
                                    New date
                                </button>`
                                : ''}
                        </div>
                    </div>
                </div>
                    <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 80%!important;overflow-y:auto;padding:5px 5px">
                        <div id="${this.table.tbody}" class="row w-100 my-auto mx-auto">
                            ${innerData}
                        </div>
                    </div>
                </div>
                `
                subStateOne ? appCtrl.showDatePicker(dataCtrl,uiCtrl) : null
                appCtrl.loadSearchEventListeners(dataCtrl,this)
        }
        //*****************************************************************************************
        //-----------------------------------------------------------------------------------------
        //APP STATE IS DISH
        //*****************************************************************************************
        //-----------------------------------------------------------------------------------------
        if(appCtrl.getAppState===appCtrl.getAppStatesList._DISH){
            console.log('subState _-> Dish')
            const dish = 'Dish'
            var viewDetails = '<th></th>'
            subStateOne = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._ACTIVEDISHES
            subStateTwo = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._EXCLUDEDDISHES
            function removeAddActiveClassesFromCookingCalendarSubStates(btnId,uiCtrl){
                document.getElementById(uiCtrl.optionbar.btns.btnOne).classList.remove('active')
                document.getElementById(uiCtrl.optionbar.btns.btnTwo).classList.remove('active')
                document.getElementById(btnId).classList.add('active')
                editBtn = '<th></th>'
                deleteBtn = '<th></th>'
            }
            if(subStateOne){
                console.log('subState _-> _ACTIVEDISHES')
                tempData = dataCtrl.returnData('activeDishes')
                removeAddActiveClassesFromCookingCalendarSubStates(this.optionbar.btns.btnOne,this)
                updateBreadCumber(this.mainContent.divBreadcumber,dish,'Active dishes')
            }
            if(subStateTwo){
                console.log('subState _-> _EXCLUDEDDISHES')
                tempData = dataCtrl.returnData('excludedDishes')
                removeAddActiveClassesFromCookingCalendarSubStates(this.optionbar.btns.btnTwo,this)
                updateBreadCumber(this.mainContent.divBreadcumber,dish,'Excluded dishes')
            }
            innerData = returnInnerDataForDishSubStatesAndSearchMode(dataCtrl,this,tempData,subStateOne,subStateTwo,null)
            document.getElementById(this.mainContent.mainContenctWithOptions).innerHTML = `
            <style>
                .btnActionsSearch {
                    background-size: 25px;
                    background-repeat: no-repeat;
                    background-position-y: center;
                    padding-left: 30px;
                    width: 65%!important;
                    text-align: start;
                }
            </style>
            <div class=".container-fluid my-auto text-right w-100" style="height: 15%!important;padding-left:100px!important;padding-right:15px!important">
                <div class=".container-fluid text-right w-50" style="float:right">
                    <div class="text-right">
                        <input 
                            name="${this.searchInput.input}" 
                            id="${this.searchInput.input}" 
                            class=".container-fluid text-right" 
                            type="text" 
                            style="width:100%!important;padding-bottom:2px"
                            placeHolder="Search dishes, prices, ingredients, descriptions...">
                        ${subStateOne ? 
                            `<button 
                                id="${this.addNewCookingCalendarDate}"
                                class="btn btn-outline-success btnActionsSearch" 
                                onclick="uiCtrl.showHideDishModal(dataCtrl,appCtrl,'show',null,uiCtrl.getIDs().modalActions.dish.newDish)"
                                style="border:none;z-index:20;background-image:url(/img/addIcon.png);float:right;width: 120px!important;">
                                New dish
                            </button>`
                            : ''}
                    </div>
                </div>
            </div>
            <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 80%!important;overflow-y:auto;padding:5px 5px">
                <div id="${this.table.tbody}" class="row w-100 my-auto mx-auto">
                    ${innerData}
                </div>
            </div>  
            `
        appCtrl.loadSearchEventListeners(dataCtrl,this)
        }
        //*****************************************************************************************
        //-----------------------------------------------------------------------------------------
        //APP STATE IS ORDERS
        //*****************************************************************************************
        //-----------------------------------------------------------------------------------------
        if(appCtrl.getAppState===appCtrl.getAppStatesList._ORDERS){
            console.log('subState _-> Orders')
            const orders = 'Orders'
            subStateOne = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._ACTIVEORDERS
            subStateTwo = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._FINISHEDORDERS
            subStateThree = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._EXCLUDEDORDERS
            subStateFour = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._ORDERDELIVERY 
            subStateFive = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._INACTIVEORDERS 
            function removeAddActiveClassesFromCookingCalendarSubStates(btnId,uiCtrl){
                document.getElementById(uiCtrl.optionbar.btns.btnOne).classList.remove('active')
                document.getElementById(uiCtrl.optionbar.btns.btnTwo).classList.remove('active')
                document.getElementById(uiCtrl.optionbar.btns.btnThree).classList.remove('active')
                document.getElementById(uiCtrl.optionbar.btns.btnFour).classList.remove('active')
                document.getElementById(btnId).classList.add('active')
            }
            if(subStateOne){
                console.log('subState _-> ActiverOrders')
                tempData = dataCtrl.returnData('activerOrders')
                removeAddActiveClassesFromCookingCalendarSubStates(this.optionbar.btns.btnOne,this)
                updateBreadCumber(this.mainContent.divBreadcumber,orders,'Active orders')
            }
            if(subStateTwo){
                console.log('subState _-> DeliveredOrders')
                tempData = dataCtrl.returnData('deliveredOrders')
                removeAddActiveClassesFromCookingCalendarSubStates(this.optionbar.btns.btnTwo,this)
                updateBreadCumber(this.mainContent.divBreadcumber,orders,'Delivered orders')
            }
            if(subStateThree){
                console.log('subState _-> ExcludedOrders')
                tempData = dataCtrl.returnData('excludedOrders')
                removeAddActiveClassesFromCookingCalendarSubStates(this.optionbar.btns.btnThree,this)
                updateBreadCumber(this.mainContent.divBreadcumber,orders,'Excluded orders')
            }
            if(subStateFour){
                console.log('subState _-> OrderDelivery')
                tempData = dataCtrl.returnData('orderDelivery')
                removeAddActiveClassesFromCookingCalendarSubStates(this.optionbar.btns.btnFour,this)
                updateBreadCumber(this.mainContent.divBreadcumber,orders,'Order delivery')
                if(tempData.length===0){
                    appCtrl.setAppSubState = appCtrl.getPreviousSubState
                    return this.showHideAlert('alert-primary','There are no orders to deliver','show')
                }
            }
            if(subStateFive){
                console.log('subState _-> InactiveOrders')
                tempData = dataCtrl.returnData('inactiveOrders')
                removeAddActiveClassesFromCookingCalendarSubStates(this.optionbar.btns.btnFive,this)
                updateBreadCumber(this.mainContent.divBreadcumber,orders,'Inactive orders')
            }
            innerData = returnInnerDataForOrderSubStatesAndSearchMode(dataCtrl,this,tempData,subStateOne,subStateTwo,subStateThree,subStateFour,subStateFive) 
            this.gettingOrderDeliveryStateOrSubstate(this.uiSwitcher.subState,innerData)
            appCtrl.loadSearchEventListeners(dataCtrl,this)
        }
        //*****************************************************************************************
        //-----------------------------------------------------------------------------------------
        //APP STATE IS CATORING
        //*****************************************************************************************
        //-----------------------------------------------------------------------------------------
        if(appCtrl.getAppState===appCtrl.getAppStatesList._CATORING){
            console.log('subState _-> Catoring')
            const dish = 'Catering'
            var viewDetails = '<th></th>'
            subStateOne = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._UNREADMESSAGES
            subStateTwo = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._ARCHIVEDMESSAGES
            subStateThree = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._EXCLUDEDMESSAGES
            function removeAddActiveClassesFromCookingCalendarSubStates(btnId,uiCtrl){
                document.getElementById(uiCtrl.optionbar.btns.btnOne).classList.remove('active')
                document.getElementById(uiCtrl.optionbar.btns.btnTwo).classList.remove('active')
                document.getElementById(btnId).classList.add('active')
                editBtn = '<th></th>'
                deleteBtn = '<th></th>'
            }
            if(subStateOne){
                console.log('subState _-> _UNREDMESSAGES')
                tempData = dataCtrl.returnData('activeMsgs')
                removeAddActiveClassesFromCookingCalendarSubStates(this.optionbar.btns.btnOne,this)
                updateBreadCumber(this.mainContent.divBreadcumber,dish,'In-mail')
            }
            if(subStateTwo){
                console.log('subState _-> _ARCHIVEDMESSAGES')
                tempData = dataCtrl.returnData('archivedMsgs')
                removeAddActiveClassesFromCookingCalendarSubStates(this.optionbar.btns.btnTwo,this)
                updateBreadCumber(this.mainContent.divBreadcumber,dish,'Archived')
            }
            if(subStateThree){
                console.log('subState _-> _EXCLUDEDMESSAGES')
                tempData = dataCtrl.returnData('excludedMsgs')
                removeAddActiveClassesFromCookingCalendarSubStates(this.optionbar.btns.btnThree,this)
                updateBreadCumber(this.mainContent.divBreadcumber,dish,'Excluded')
            }
            innerData = returnInnerDataForCatoringSubStatesAndSearchMode(dataCtrl,this,tempData,subStateOne,subStateTwo,subStateThree)
            document.getElementById(this.mainContent.mainContenctWithOptions).innerHTML = `
            <div class=".container-fluid my-auto text-right w-100" style="height: 7%!important;padding-left:100px!important;padding-right:15px!important">
                <div class=".container-fluid text-right w-50" style="float:right">
                    <div class="text-right">
                        <input 
                            name="${this.searchInput.input}" 
                            id="${this.searchInput.input}" 
                            class=".container-fluid text-right" 
                            type="text" 
                            style="width:100%!important;padding-bottom:2px"
                            placeHolder="Search dishes, prices, ingredients, descriptions...">
                    </div>
                </div>
            </div>
            <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 88%!important;overflow-y:auto;padding:5px 5px">
                <div id="${this.table.tbody}" class="row w-100 my-auto mx-auto">
                    ${innerData}
                </div>
            </div>  
            `
            // <div class=".container-fluid mx-auto my-auto text-center w-100" style="height:10%!important;padding-left:100px!important">
            //     <div class="row w-100 mx-auto my-auto" style="">
            //         <div class="col-2"><strong>Search:</strong></div>
            //         <div class="col-10"><input name="${this.searchInput.input}" id="${this.searchInput.input}" class="w-100" type="text" placeHolder="Dishes, prices, ingredients, descriptions..."></div>
            //         </div>
            //         <hr>
            //         <hr>
            //     </div>
            
            //     <div class=".container-fluid mx-auto my-auto text-center w-75" style="height: 85%!important;overflow-y:auto">
            //         <table class="table table-striped table-sm table-hover">
            //             <thead>
            //                 <tr>
            //                     <th><strong>Name</strong></th>
            //                     <th><strong>E-mail</strong></th>
            //                     <th><strong>Phone Number</strong></th>
            //                     <th><strong>Received in</strong></th>
            //                     ${subStateOne ? `<th>Read in</th>` : ''}
            //                     ${subStateTwo ? `<th>Archived in</th>` : ''}
            //                     ${subStateThree ? `<th>Deleted in</th>` : ''}
            //                     <th></th>
            //                     ${subStateOne ? `<th></th>` : ''}
            //                     ${subStateOne ? `<th></th>` : ''}
            //                 </tr>
            //             </thead>
            //             <tbody id="${this.table.tbody}">
            //                 ${innerData}
            //             </tbody>
            //         </table>
            //     </div>
            // </div>
        appCtrl.loadSearchEventListeners(dataCtrl,this)
        }
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                                  SEARCH MODE UI
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    changeUISearchModeOn(dataCtrl,appCtrl,regExpression){
        var subStateOne = false
        var subStateTwo = false
        var subStateThree = false
        var subStateFour = false
        var subStateFive = false
        var innerData = ''
        var filteredArray = []
        //USERS
        if(appCtrl.getAppState===appCtrl.getAppStatesList._USERS){
            console.log('searchMode -> usersSubState')
            subStateOne = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._ACTIVEUSERS
            subStateTwo = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._EXCLUDEDUSERS
            if(subStateOne){
                filteredArray = dataCtrl.returnData('activeUsers').filter(reg => {if(reg.searchString.match(regExpression)){return true}})}
            if(subStateTwo){
                filteredArray = dataCtrl.returnData('excludedUsers').filter(reg => {if(reg.searchString.match(regExpression)){return true}})}
            innerData = returnInnerDataForCUserSubStateAndSearchMode(dataCtrl,this,filteredArray,subStateOne,subStateTwo)
        }

        //COOKING CALENDAR
        if(appCtrl.getAppState===appCtrl.getAppStatesList._COOKINGCALENDAR){
            console.log('searchMode -> cookingCalendar')
            subStateOne = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._ACTIVEDATES
            subStateTwo = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._FINISHEDDATES
            subStateThree = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._EXCLUDEDDATES
            if(subStateOne){
                filteredArray = dataCtrl.returnData('cookingCalendarActive').filter(reg => {if(reg.searchString.match(regExpression)){return true}})}
            if(subStateTwo){
                filteredArray = dataCtrl.returnData('cookingCalendarFinished').filter(reg => {if(reg.searchString.match(regExpression)){return true}})}
            if(subStateThree){
                filteredArray = dataCtrl.returnData('cookingCalendarExcluded').filter(reg => {if(reg.searchString.match(regExpression)){return true}})}
            innerData = returnInnerDataForCookingDateSubStatesAndSearchMode(dataCtrl,uiCtrl,filteredArray,subStateOne,subStateTwo,subStateThree)
        }

        //DISH
        if(appCtrl.getAppState===appCtrl.getAppStatesList._DISH){
            console.log('searchMode -> dish')
            subStateOne = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._ACTIVEDISHES
            subStateTwo = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._EXCLUDEDDISHES
            if(subStateOne){
                filteredArray = dataCtrl.returnData('activeDishes').filter(reg => {if(reg.searchString.match(regExpression)){return true}})}
            if(subStateTwo){
                console.log('subState _-> _EXCLUDEDDISHES')
                filteredArray = dataCtrl.returnData('excludedDishes').filter(reg => {if(reg.searchString.match(regExpression)){return true}})}
            innerData = returnInnerDataForDishSubStatesAndSearchMode(dataCtrl,this,filteredArray,subStateOne,subStateTwo,null)
        }
        if(appCtrl.getAppState===appCtrl.getAppStatesList._ORDERS || appCtrl.getAppState===appCtrl.getAppStatesList._ORDERDELIVERY){
            subStateOne = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._ACTIVEORDERS
            subStateTwo = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._FINISHEDORDERS
            subStateThree = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._EXCLUDEDORDERS
            subStateFour = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._ORDERDELIVERY || appCtrl.getAppState===appCtrl.getAppStatesList._ORDERDELIVERY
            subStateFive = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._INACTIVEORDERS
            if(subStateOne){
                filteredArray = dataCtrl.returnData('activerOrders').filter(reg => {if(reg.searchString.match(regExpression)){return true}})}
            if(subStateTwo){
                filteredArray = dataCtrl.returnData('deliveredOrders').filter(reg => {if(reg.searchString.match(regExpression)){return true}})}
            if(subStateThree){
                filteredArray = dataCtrl.returnData('excludedOrders').filter(reg => {if(reg.searchString.match(regExpression)){return true}})}
            if(subStateFour){
                filteredArray = dataCtrl.returnData('orderDelivery').filter(reg => {if(reg.searchString.match(regExpression)){return true}})}
            if(subStateFive){
                filteredArray = dataCtrl.returnData('inactiveOrders').filter(reg => {if(reg.searchString.match(regExpression)){return true}})}
            innerData = returnInnerDataForOrderSubStatesAndSearchMode(dataCtrl,this,filteredArray,subStateOne,subStateTwo,subStateThree, subStateFour,subStateFive)
        }
        if(appCtrl.getAppState===appCtrl.getAppStatesList._MANAGEACCESS){
            filteredArray = dataCtrl.returnData('users').data.filter(reg => {
                if(reg.searchString.match(regExpression)){
                    return true
                }
                return false
            })
            filteredArray.forEach(user=>{
                if(user.excluded===0){
                    innerData = `${innerData}
                    <tr>
                        <td>${user.email}</td>
                        <td>${user.name}</td>
                        <td><button type="button" class="btn btn-danger" onclick="console.log('buttonclick')"><strong>Accesses</strong></button></td>
                    </tr>
                    `
                }
            })
        }
        if(appCtrl.getAppState===appCtrl.getAppStatesList._CATORING){
            subStateOne = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._UNREADMESSAGES
            subStateTwo = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._ARCHIVEDMESSAGES
            subStateThree = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._EXCLUDEDMESSAGES
            if(subStateOne){
                filteredArray = dataCtrl.returnData('activeMsgs').filter(reg => {
                    if(reg.searchString.match(regExpression)){
                        return true
                    }
                    return false
                })
            }
            if(subStateTwo){
                filteredArray = dataCtrl.returnData('archivedMsgs').filter(reg => {
                    if(reg.searchString.match(regExpression)){
                        return true
                    }
                    return false
                })
            }
            if(subStateThree){
                filteredArray = dataCtrl.returnData('excludedMsgs').filter(reg => {
                    if(reg.searchString.match(regExpression)){
                        return true
                    }
                    return false
                })
            }
            innerData = returnInnerDataForCatoringSubStatesAndSearchMode(dataCtrl,this,filteredArray,subStateOne,subStateTwo,subStateThree)
        }
        document.getElementById(this.table.tbody).innerHTML = `${innerData}` 
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                                      BTNS UI
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    changeActiveAppStateButton(btn,){
        for (let btn of document.getElementsByClassName('item active')){
            btn.classList.remove('active')
        }
        btn.classList.add('active')
    }
    changeActiveAppSubStateButton(btn){
        for (let btn of document.getElementsByClassName(`${this.classes.subState} active`)){
            btn.classList.remove('active')
        }
        btn.classList.add('active')
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                                         USER MODALS
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    showHideUserModal(dataCtrl,appCtrl,show_hide,userID,modalType){
        if(show_hide==='hide'){
            return this.showModal(show_hide)
        }
        var style = `
            <style>
                .breakWordUserModalTypeEdit {
                    overflow-wrap: break-word;
                    padding-bottom: 2px
                }
                .breakWordUserModalType {
                    overflow-wrap: break-word;
                    line-height: 20px;
                }
                .inputFloatRight{
                    float:right;
                    width:90%!important
                }
                .hrMargin{
                    margin: 10px;
                }
                
            </style>
        `
        var userInfo = null
        function commonFunctions(dataCtrl,activeUserTrue){
            const userSelected = dataCtrl.returnData(activeUserTrue ? 'activeUsers' : 'excludedUsers').filter(user => {
                if(user.id===userID){
                    return true
                }
                return false
            })
            if(userSelected.length > 0){
                userInfo = userSelected[0]
            }else {
                return 
                // CREATE erro message
                
            }
        }
        if(show_hide===`show`&&modalType===this.modalTypes.user.edit){
            commonFunctions(dataCtrl,true)
            var userSocialMediaInfo = ''
            userInfo.socialMedia.forEach(media => {
                userSocialMediaInfo= `${userSocialMediaInfo}
                <div class="col-3 breakWordUserModalTypeEdit"><strong>
                    <label for="socialMediaId-${media.socialMedia_id}">${media.socialMedia}:</label>
                </strong></div>
                <div class="col-9 breakWordUserModalTypeEdit">
                    <input type="text" class="form-control inputFloatRight" id="socialMediaId-${media.socialMedia_id}" aria-describedby="user social media" placeholder="Inform ${media.socialMedia} user name" value="${media.socialMediaName}" name="socialMedia_${media.socialMedia}">
                </div>
                `
            })
            document.getElementById(this.modal.title).innerHTML = `<p class="h3">${userInfo.email}</p>`
            document.getElementById(this.modal.body).innerHTML = `${style}
            <div class=".container-fluid h-100 w-100 mx-auto my-auto">
                <form id="${this.form}">
                    <input id="userId" name="userId" style="display:none" value="${userInfo.id}">
                    <div class="form-group">
                        <div class=".container-fluix w-100 mx-auto my-auto text-center">
                            <p class="h4"><strong>User personal info</strong></p>
                        </div>
                        <div class="row w-100">
                            <div class="col-3 breakWordUserModalTypeEdit"><strong>
                                <label for="name">Name:</label>
                            </strong></div>
                            <div class="col-9 breakWordUserModalTypeEdit">
                                <input type="text" class="form-control inputFloatRight" id="name" aria-describedby="user name" placeholder="Inform user name" value="${userInfo.name}" name="name">
                            </div>
                            <div class="col-3 breakWordUserModalTypeEdit"><strong>
                                <label for="phoneNumber">Phone number:</label>
                            </strong></div>
                            <div class="col-9 breakWordUserModalTypeEdit">
                                <input type="text" maxlength="14" class="form-control inputFloatRight" id="phoneNumber" aria-describedby="user phone number" placeholder="Inform user phone number" value="${phoneNumberMask(userInfo.phoneNumber)}" oninput="this.value = phoneNumberMask(this.value)" name="phoneNumber">
                            </div>
                        </div>
                        <hr class="hrMargin">
                        <div class=".container-fluix w-100 mx-auto my-auto text-center">
                            <p class="h4"><strong>User social media info</strong></p>
                        </div>
                        <div class="row w-100 text-right">
                            ${userSocialMediaInfo}
                        </div>
                        <hr class="hrMargin">
                    </div>
                </form>
            </div>
            `
            udateActionButtonLayout(this,`btn-primary`,`Save changes`,false)
        }
        if(show_hide==='show'&&modalType===this.modalTypes.user.delete){
            commonFunctions(dataCtrl,true)
            document.getElementById(this.modal.title).innerHTML = `<p class="h3 alert-danger">Confirm user deletion</p>`
            document.getElementById(this.modal.body).innerHTML = `
            <form id="${this.form}">
                <input name="userId" id="userIde" value="${userInfo.id}" style="display:none">
                <p class="h4">Do you really want to delete user <strong>${userInfo.email}</strong>?</p>
            </form>
            ` 
            udateActionButtonLayout(this,`btn-danger`,`Delete`,false)
        }
        if(show_hide==='show'&&modalType===this.modalTypes.user.notify){
            commonFunctions(dataCtrl,true)
            document.getElementById(this.modal.title).innerHTML = `<p class="h3">Send notification to ${userInfo.email}</p>`
            document.getElementById(this.modal.body).innerHTML = `
            <form id="${this.form}">
                <input name="userId" id="userId" value="${userInfo.id}" style="display:none">
                <p class="h4"><strong>What message do you want to send to user?</strong></p>
                <textarea class="w-100" name="${this.notification}" id="messageToUser" value=""></textarea>
            </form>
            ` 
            udateActionButtonLayout(this,`btn-primary`,`Send`,false)
        }
        if(show_hide===`show`&&modalType===this.modalTypes.user.viewDetails){
            const activeUser = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._ACTIVEUSERS ? true : false
            commonFunctions(dataCtrl,activeUser)
            var userSocialMediaInfo = ''
            userInfo.socialMedia.forEach(media => {
                userSocialMediaInfo= `${userSocialMediaInfo}
                <div class="col-3 breakWordUserModalType"><strong>
                    <label for="socialMediaId-${media.socialMedia_id}">${media.socialMedia}:</label>
                </strong></div>
                <div class="col-9 breakWordUserModalType">
                    <p>${media.socialMediaName===null||media.socialMediaName===''?'<i>no ' + media.socialMedia + ' name informed</i>':media.socialMediaName}</p>
                </div>
                `
            })
            document.getElementById(this.modal.title).innerHTML = `<p class="h3"> Viewing user ${userInfo.email}</p>`
            document.getElementById(this.modal.body).innerHTML = `${style}
            <div class=".container-fluid h-100 w-100 mx-auto my-auto">
                <form id="${this.form}">
                    <div class="form-group">
                        <div class=".container-fluid w-100 mx-auto my-auto text-center">
                            <p class="h4"><strong>User personal info</strong></p>
                        </div>
                        <div class="row w-100">
                            <div class="col-3 breakWordUserModalType"><strong>
                                <label for="name">Name:</label>
                            </strong></div>
                            <div class="col-9 breakWordUserModalType">
                                <p>${userInfo.name===null||userInfo.name===''?'<i>no name informed</i>':userInfo.name}</p>
                            </div>
                            <div class="col-3 breakWordUserModalType"><strong>
                                <label for="phoneNumber">Phone number:</label>
                            </strong></div>
                            <div class="col-9 breakWordUserModalType">
                                <p>${userInfo.phoneNumber===null||userInfo.phoneNumber===''?'<i>no phone number informed</i>':phoneNumberMask(userInfo.phoneNumber)}</p>
                            </div>
                        </div>
                        <hr class="hrMargin">
                        <div class=".container-fluid w-100 mx-auto my-auto text-center">
                            <p class="h4"><strong>User social media info</strong></p>
                        </div>
                        <div class="row w-100">
                            ${userSocialMediaInfo}
                        </div>
                        <hr class="hrMargin">
                        <div class=".container-fluid w-100 mx-auto my-auto text-center">
                            <p class="h4"><strong>User database info</strong></p>
                        </div>
                        <div class="row w-100">
                            <div class="col-6 breakWordUserModalType"><strong>Created on:</strong></div>
                            <div class="col-6 breakWordUserModalType" style="text-align:left">${userInfo.createdIn.split(' ')[0]}</div>
                            <div class="col-6 breakWordUserModalType"><strong>Created by:</strong></div>
                            <div class="col-6 breakWordUserModalType" style="text-align:left">${userInfo.createdByName}</div>
                            ${ !activeUser ? 
                                `
                                    <div class="col-6 breakWordUserModalType"><strong>Excluded on:</strong></div>
                                    <div class="col-6 breakWordUserModalType" style="text-align:left">${userInfo.excludedIn.split(' ')[0]}</div>
                                    <div class="col-6 breakWordUserModalType"><strong>Excluded by:</strong></div>
                                    <div class="col-6 breakWordUserModalType" style="text-align:left">${userInfo.excludedByName}</div>
                                `
                                : 
                                ``}
                        </div>
                    </div>
                    </div>
                </form>
            </div>
            `
            udateActionButtonLayout(this,null,null,true)
        }
        this.showModal(show_hide)
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                               COOKING CALENDAR MODALS
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    showHideCookingCalendarModal(dataCtrl,appCtrl,show_hide,coookingCalendarId,modalType){
        //check if it should hide modal
        if(show_hide===`hide`){
            return this.showModal(show_hide)
        }
        //common variables
        var tempData = []
        var innerData = ''
        var cookingCalendarObj = ''
        if(modalType!==this.modalTypes.cookingDate.newDish){
        }
        cookingCalendarObj = dataCtrl.returnData('cookingCalendar').filter(reg => { if(reg.id === coookingCalendarId){return true}})
        if(show_hide===`show`&&modalType===this.modalTypes.cookingDate.listOrders){
            console.log('listOrders called')
            dataCtrl.clearSelectedDishes()
            var dishesHeader = ''
            tempData = dataCtrl.returnData('order').filter(order => {
                if(order.cookingDates_id===coookingCalendarId && order.order_status_id!==999) { return true }
            })
            cookingCalendarObj[0].dishes.forEach(dish => {
                dishesHeader = `${dishesHeader}
                    <th><strong>${dish.name}</strong></th>
                `
            })
            innerData = returnDynamicElementsForCookingDateListOrdersModal(this,tempData)
            document.getElementById(this.modal.title).innerHTML = `<p class="h3">Listing orders for cooking calendar ${cookingCalendarObj[0].cookingDate} at ${cookingCalendarObj[0].street} </p>`
            document.getElementById(this.modal.body).innerHTML = `
            <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 100%!important;">
                <div class=".container-fluid row w-100 mx-auto my-auto"> 
                    ${innerData}
                </div>
            </div>
            `
            udateActionButtonLayout(this,null,null,true)
        }
        if(show_hide===`show`&&modalType===this.modalTypes.cookingDate.edit){
            if((dataCtrl.returnData(`selectedDishes`)).length===0){
                cookingCalendarObj[0].dishes.forEach(dish => {
                    dataCtrl.setSelectedDishes = dish.dish_id
                })
            }
            this.getEditCookingDateModalOrNewDishModal(dataCtrl,appCtrl,modalType,cookingCalendarObj)
            udateActionButtonLayout(this,'btn-primary','Save changes',false)
        }
        if(show_hide===`show`&&modalType===this.modalTypes.cookingDate.setCookingCapacity){
            document.getElementById(this.modal.title).innerHTML = `<p class="h3">Send acknowledgement alert to orders in ${cookingCalendarObj[0].cookingDate} at ${cookingCalendarObj[0].street}?</p>`
            document.getElementById(this.modal.body).innerHTML = `
            <div id="${this.modalTypes.cookingDate.setCookingCapacity}"class=".container-fluid mx-auto my-auto w-100 text-center" hidden>${coookingCalendarId}</div>
            <div class=".container-fluid mx-auto my-auto w-100 text-center">
                <div class="h4"><strong>How many meals</strong> will you cook on this cooking calendar date?</div>
                <div class=".container-fluid mx-auto my-auto w-100 text-center">
                    <input type="number" name="${this.formsNames.firstAlertInfo}" placeholder="Number required..">
                </div>
            </div>
            `
            udateActionButtonLayout(this,'btn-primary','Send',false)
        }
        if(show_hide===`show`&&modalType===this.modalTypes.cookingDate.initiateDelivery){
            document.getElementById(this.modal.title).innerHTML = `<p class="h3">Send alert operning cooking date ${cookingCalendarObj[0].cookingDate.split(' ')[0]} to delivery?</p>`
            document.getElementById(this.modal.body).innerHTML = `
            <div id="${this.modalTypes.cookingDate.initiateDelivery}"class=".container-fluid mx-auto my-auto w-100 text-center" hidden>${coookingCalendarId}</div>
            <div class=".container-fluid mx-auto my-auto w-100 text-center">
                <div class="h4">This action will open this cooking date to delivery and all users that paid their respective orders will be notified to start coming to the address to pick up their orders.</div>
            </div>
            `
            udateActionButtonLayout(this,'btn-primary','Send alert',false)
        }
        if(show_hide===`show`&&modalType===this.modalTypes.cookingDate.viewDetails){
            var finalAmount = 0
            innerData = `${innerData} <style>.pNoMargin{margin:0;padding:0}</style>`
            cookingCalendarObj[0].dishes.forEach(dish => {
                finalAmount += dish.price === null || dish.price=== '' ? 0.0 : parseFloat(dish.price)
                innerData = `${innerData}
                <div id="DishID-${dish.dish_id}" class=".container-fluid mx-auto my-auto w-100 text-center" style="border-bottom: gray 1px solid;align-items: center;padding: 0;height: auto;">
                    <div class="row h-100 my-auto text-center">
                        <div class="col-6 my-auto" style="text-align: left;">
                            <div><strong>${dish.name}</strong></div>
                        </div>
                        <div class="col-6 my-auto" style="text-align: left;">
                            <div><i>U$ ${(dish.price === null || dish.price=== '' ? '0.00' : dish.price)}</i></div>
                        </div>
                    </div>
                </div>
                `
            })
            document.getElementById(this.modal.title).innerHTML = `<p class="h3">Viewing ${cookingCalendarObj[0].cookingDate} at ${cookingCalendarObj[0].street}</p>`
            document.getElementById(this.modal.body).innerHTML = `
            <style>
                .textLeft{text-align:left;margin:0;padding:0;}
            </style>
            <div class=".container-fluid mx-auto my-auto w-100 text-center">
                <div class="h4">Address information</div>
                <div class=".container-fluid mx-auto my-auto row">
                    <!--STREET and COMPLEMENT-->
                    <div class="col-12 col-lg-2 text-left">
                        <p class="textLeft"><strong>Sreet:</strong></p>
                    </div>
                    <div class="col-12 col-lg-5" style="text-align:left;">
                        <p class="pNoMargin" id="${this.inputs.cookingCalendarDate.street}">${cookingCalendarObj[0].street === null || cookingCalendarObj[0].street=== '' ? '' : cookingCalendarObj[0].street }</p>
                    </div>
                    <div class="col-12 col-lg-2 text-left">
                        <p class="textLeft"><strong>Complement:</strong></p>
                    </div>
                    <div class="col-12 col-lg-3 text-left"  style="text-align:left;">
                        <p class="pNoMargin" id="${this.inputs.cookingCalendarDate.complement}">${cookingCalendarObj[0].complement === null || cookingCalendarObj[0].complement=== '' ? '' : cookingCalendarObj[0].complement }</p>
                    </div>
                    <!--CITY and STATE-->
                    <div class="col-12 col-lg-2 text-left">
                        <p class="textLeft"><strong>City:</strong></p>
                    </div>
                    <div class="col-12 col-lg-5" style="text-align:left;">
                        <p class="pNoMargin" id="${this.inputs.cookingCalendarDate.city}">${cookingCalendarObj[0].city === null || cookingCalendarObj[0].city=== '' ? '' : cookingCalendarObj[0].city }</p>
                    </div>
                    <div class="col-12 col-lg-2 text-left">
                        <p class="textLeft"><strong>State:</strong></p>
                    </div>
                    <div class="col-12 col-lg-3"  style="text-align:left;">
                        <p class="pNoMargin" id="${this.inputs.cookingCalendarDate.state}">${cookingCalendarObj[0].state === null || cookingCalendarObj[0].state=== '' ? '' : cookingCalendarObj[0].state }</p>
                    </div>
                    <!--COUNTRY and ZIPCODE-->
                    <div class="col-12 col-lg-2 text-left">
                        <p class="textLeft"><strong>Country:</strong></p>
                    </div>
                    <div class="col-12 col-lg-5" style="text-align:left;">
                        <p class="pNoMargin" id="${this.inputs.cookingCalendarDate.country}">${cookingCalendarObj[0].country === null || cookingCalendarObj[0].country=== '' ? '' : cookingCalendarObj[0].country }</p>
                    </div>
                    <div class="col-12 col-lg-2 text-left">
                        <p class="textLeft"><strong>ZipCode:</strong></p>
                    </div>
                    <div class="col-12 col-lg-3"  style="text-align:left;">
                        <p class="pNoMargin" id="${this.inputs.cookingCalendarDate.zipcode}">${cookingCalendarObj[0].zipcode === null || cookingCalendarObj[0].zipcode=== '' ? '' : cookingCalendarObj[0].zipcode }</p>
                    </div>
                </div>
            </div>
            <hr>
            <hr>
            <div class=".container-fluid mx-auto my-auto w-100 text-center">
                <div class="h4">Menu information</div>
                <p>The dishes selected for this cooking calendar date are listed below:</p>
                <div class="container mx-auto my-auto w-75 text-center" style="overflow-y: auto;height: 200px!Important;border: gray .5px solid;">
                    ${innerData}
                </div>
            </div>  
            <hr>
            <hr>
            <div class=".container-fluid mx-auto my-auto w-100 text-center">
                <div class="h4">Final cost per meal</div>
                <div class="h5">U$ ${finalAmount.toFixed(2).toString()}</div>
            </div>
            `
            udateActionButtonLayout(uiCtrl,null,null,true)
        }
        if(show_hide===`show`&&modalType===this.modalTypes.cookingDate.newDish){
            if((dataCtrl.returnData(`selectedDishes`)).length===0){
                cookingCalendarObj[0].dishes.forEach(dish => {
                    dataCtrl.setSelectedDishes = dish.dish_id
                })
            }
            this.getEditCookingDateModalOrNewDishModal(dataCtrl,appCtrl,this.modalTypes.cookingDate.newDish,cookingCalendarObj)
        }
        if(show_hide===`show`&&modalType===this.modalTypes.cookingDate.openToOrders){
            console.log('modal -> openToOrders')
            dataCtrl.clearSelectedDishes()
            if(cookingCalendarObj[0].cookingDate_status_id<3){
                document.getElementById(this.modal.title).innerHTML = `<p class="h3 bg-warning">Incomplete information for ${cookingCalendarObj[0].cookingDate} at ${cookingCalendarObj[0].street}?</p>`
                document.getElementById(this.modal.body).innerHTML = `
                <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 100%!important;">
                <p>You must fill in the required information in the cooking calendar date to open it to orders. Please edit this cooking calendar date: dimiss this window and click on the pencil for this cooking calendar date and fill out all blanks on the form.</p>
                </div>
                `
                udateActionButtonLayout(this,null,null,true)
            }else if(cookingCalendarObj[0].cookingDate_status_id===3){
                document.getElementById(this.modal.title).innerHTML = `<p class="h3"><strong>Open to orders</strong> cooking calendar date ${cookingCalendarObj[0].cookingDate} at ${cookingCalendarObj[0].street}?</p>`
                document.getElementById(this.modal.body).innerHTML = `
                <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 100%!important;">
                <p>Once this actions is performed you <strong>won't be able to EDIT</strong> this cooking calendar date anylonger. You <u>will still be able to <i>delete</i></u> this cooking calendar date, but that means you will <u>delete <i>all orders</i> already made to this cooking calendar date</u>.</p>
                </div>
                `
                udateActionButtonLayout(this,'btn-primary','Open to orders',false)
            }
            
        }
        if(show_hide===`show`&&modalType===this.modalTypes.cookingDate.closeToOrders){
            console.log('modal -> closeToOrders')
            dataCtrl.clearSelectedDishes()
            document.getElementById(this.modal.title).innerHTML = `<p class="h3 bg-warning"><strong>Close to orders</strong> cooking calendar date ${cookingCalendarObj[0].cookingDate} at ${cookingCalendarObj[0].street}?</p>`
            document.getElementById(this.modal.body).innerHTML = `
            <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 100%!important;">
            <p>Once this actions is performed you <strong>won't be able to ACCEPT new orders</strong> for this cooking calendar date information anylonger. You <u>will still be able to <i>delete</i></u> this cooking calendar date, but that means you will <u>delete <i>all orders</i> already made to this cooking calendar date</u>.</p>
            </div>
            `
            udateActionButtonLayout(this,'btn-danger','Close to orders',false)
        }
        if(show_hide===`show`&&modalType===this.modalTypes.cookingDate.delete){
            dataCtrl.clearSelectedDishes()
            document.getElementById(this.modal.title).innerHTML = `<p class="h3 bg-danger">Delete cooking calendar ${cookingCalendarObj[0].cookingDate} at ${cookingCalendarObj[0].street}?</p>`
            document.getElementById(this.modal.body).innerHTML = `
            <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 100%!important;">
            <p>This action will delete all orders subscribed to this cooking calendar</p>
            </div>
            `
            udateActionButtonLayout(this,'btn-danger','Delete',false)
        }
        this.showModal(show_hide)
        $(`#${this.modal.div}`).on('hidden.bs.modal', function (e) {
            dataCtrl.clearSelectedDishes()
            dataCtrl.clearTempObject()
            dataCtrl.clearTempSelectedData()
        })
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                               DISH MODALS
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    showHideDishModal(dataCtrl,appCtrl,show_hide,dishId,modalType){
         //check if it should hide modal
         if(show_hide===`hide`){
            return this.showModal(show_hide)
        }
        //common variables
        var tempData = []
        var innerData = ''
        var cookingCalendarObj = ''
        if(modalType!==this.modalTypes.dish.newDish){
            tempData = dataCtrl.returnData('dishes').filter(dish => {
                if(dish.id === parseInt(dishId)){
                    return true
                }
            })
        }
        //new dish
        if(show_hide===`show`&&modalType===this.modalTypes.dish.newDish){
            document.getElementById(this.modal.title).innerHTML = `<p class="h3">Create new dish</p>`
            var formElements = returnFormElementsForNewDishForm(this)
            document.getElementById(this.modal.body).innerHTML = `
            ${formElements}
            `
            udateActionButtonLayout(this,'btn-primary','Save new dish',false)
            appCtrl.dishActions(dataCtrl,this,this.modalTypes.dish.newDish,this.modal.btnAction)
        }
        //view details
        if(show_hide===`show`&&modalType===this.modalTypes.dish.viewDetails){
            document.getElementById(this.modal.title).innerHTML = `<p class="h3">Dish details</p>`
            var formElements = returnFormElementsForNewDishForm(this)
            document.getElementById(this.modal.body).innerHTML = `
            <div class=".container-fluid mx-auto my-auto text-center w-100">
                <div class=".container fluix mx-auto-my-auto w-100 text-center">
                    <div class="row">
                        <div class="col-12 col-md-2" style="text-align: left;">
                            <p class="h5">Name:</p>
                        </div>
                        <div class="col-12 col-md-10" style="text-align: left;">
                            <p id="dishName">${tempData[0].name}</p>
                        </div>
                        <div class="col-12 col-md-2" style="text-align: left;">
                            <p class="h5">Price:</p>
                        </div>
                        <div class="col-12 col-md-10" style="text-align: left;">
                            <p id="dishPrice">U$ ${tempData[0].price === null || tempData[0].price === '' ? '0.00' : tempData[0].price}</p>
                        </div>
                        <div class="col-12" style="height:8px!important"></div>
                        <div class="col-12 row">
                            <div class="col-12 col-lg-2">
                                <p class="h5">Ingredients:</p>
                            </div>
                            <div class="col-12 col-lg-10">
                                <div class="container mx-auto my-auto w-100" style="border: gray .5px solid;height: 150px!important;overflow-y: auto;text-align: justify">
                                    <p id="dishIngredients">
                                        ${tempData[0].ingredients === null || tempData[0].ingredients === '' ? '<i>no ingredients</i>' : tempData[0].ingredients}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-12" style="height:8px!important"></div>
                        <div class="col-12 row">
                            <div class="col-12 col-lg-2">
                                <p class="h5">Description:</p>
                            </div>
                            <div class="col-12 col-lg-10">
                                <div class="container mx-auto my-auto w-100" style="border: gray .5px solid;height: 150px!important;overflow-y: auto;text-align: justify">
                                    <p id="dishDescription">
                                        ${tempData[0].description === null || tempData[0].description === '' ? '<i>no description</i>' : tempData[0].description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
            udateActionButtonLayout(this,null,null,true)
        }
        //edit
        if(show_hide===`show`&&modalType===this.modalTypes.dish.edit){
            udateActionButtonLayout(this,'btn-primary','Save changes',false)
            document.getElementById(this.modal.title).innerHTML = `<p class="h3">Edit ${tempData[0].name} details</p>`
            var formElements = returnFormElementsForNewDishForm(this)
            document.getElementById(this.modal.body).innerHTML = 
            `<div class=".container-fluid mx-auto my-auto text-center w-100">
                <div class=".container fluix mx-auto-my-auto w-100 text-center">
                    <div class="row">
                        <div class="col-12 col-lg-2">
                            <p class="h5">Price:</p>
                        </div>
                        <div class="col-12 col-lg-10" style="text-align: left;">
                            <input type="text" name="${this.formsNames.editDishInfo}" id="${this.inputs.dishes.ids.id}" value="${tempData[0].id}" hidden>
                            <input class="form-group w-100" type="text" name="${this.formsNames.editDishInfo}" id="${this.inputs.dishes.ids.price}" placeholder="Inform a price" oninput="
                            if(!this.value.match(/^[0-9]{0,}\\.{0,1}[0-9]{0,2}$/)){
                                this.value = ''
                                uiCtrl.showHideAlert('alert-danger','Invalid price!','show')    
                            }" value="${tempData[0].price === null || tempData[0].price === '' ? '' : tempData[0].price}">
                        </div>
                        <div class="col-12" style="height:8px!important"></div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-12 col-lg-2">
                                    <p class="h5">Ingredients:</p>
                                </div>
                                <div class="col-12 col-lg-10">
                                    <div class="container mx-auto my-auto w-100" style="border: gray .5px solid;height: 150px!important;text-align: justify;padding: 0!important;">
                                        <textarea class=".container-fluid h-100 w-100" name="${this.formsNames.editDishInfo}" id="${this.inputs.dishes.ids.ingredients}" placeholder="Inform the ingredients of this dish..." style="border: none;margin: 0;resize: none;">${tempData[0].ingredients === null || tempData[0].ingredients === '' ? '' : tempData[0].ingredients}</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12" style="height:8px!important"></div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-12 col-lg-2">
                                    <p class="h5">Description:</p>
                                </div>
                                <div class="col-12 col-lg-10">
                                    <div class="container mx-auto my-auto w-100" style="border: gray .5px solid;height: 150px!important;text-align: justify;padding: 0!important;">
                                        <textarea class=".container-fluid h-100 w-100" name="${this.formsNames.editDishInfo}" id="${this.inputs.dishes.ids.description}" placeholder="Inform the ingredients of this dish..." style="border: none;margin: 0;resize: none;">${tempData[0].description === null || tempData[0].description === '' ? '' : tempData[0].description}</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        }
        //delete
        if(show_hide===`show`&&modalType===this.modalTypes.dish.delete){
            document.getElementById(this.modal.title).innerHTML = `<p class="h3 bg-danger">Delete dish ${tempData[0].name}?</p>`
            document.getElementById(this.modal.body).innerHTML = `
            <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 100%!important;">
            <p>This action cannot be undone</p>
            </div>
            `
            udateActionButtonLayout(this,'btn-danger','Delete',false)
        }
        this.showModal(show_hide)
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                               ORDER MODALS
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    showHideOrderModal(dataCtrl,appCtrl,show_hide,orderId,modalType){
        //check if it should hide modal
        if(show_hide===`hide`){
        return this.showModal(show_hide)
    }
    //common variables
    var tempData = []
    var innerData = ''
    var cookingCalendarObj = ''
    //view details
    if(show_hide===`show`&&modalType===this.modalTypes.order.viewDetails){
        var orderDishes = ''
        var orderExtras = ''
        var cdDishes = ''
        var dataCtrlIdentifier = appCtrl.getAppSubState===appCtrl.getAppSubStatesList._ACTIVEORDERS ? 'activerOrders' : appCtrl.getAppSubState===appCtrl.getAppSubStatesList._FINISHEDORDERS ? 'deliveredOrders' : appCtrl.getAppSubState===appCtrl.getAppSubStatesList._EXCLUDEDORDERS ? 'excludedOrders' : appCtrl.getAppSubState===appCtrl.getAppSubStatesList._INACTIVEORDERS ? 'inactiveOrders' : 'orderDelivery' 
        tempData = dataCtrl.returnData(dataCtrlIdentifier).filter(reg => {if(reg.orderId===orderId){ return true }})
            orderDishes = `${orderDishes}
            <div class="row my-auto colNoMarging">
                    <div class="col-12 my-auto colNoMarging">
                        <div class="row my-auto colNoMarging" style="padding: 0 5px;">`
            tempData[0].dishes.forEach(reg => {
                orderDishes = `${orderDishes}
                <div 
                    class="col-12 colNoMarging" 
                    id="${this.inputs.order.orderDishesName}" 
                    style="text-align: left;">
                    ${reg.dish_name} - U$ ${parseFloat(reg.dish_price).toFixed(2)}
                </div>
                <div class="col-12 colNoMarging" style="text-align: left;border-bottom: gray .5px solid;">Quantity ===> ${reg.dishQtty}</div>
                `})
            orderDishes= `${orderDishes}</div></div></div>`
            orderExtras = `${orderExtras}
            <div class="row my-auto colNoMarging">
                    <div class="col-12 my-auto colNoMarging">
                        <div class="row my-auto colNoMarging" style="padding: 0 5px;">`
            tempData[0].extras.forEach(reg => {
                orderExtras = `${orderExtras}
                    <div 
                        class="col-12 colNoMarging" 
                        id="${this.inputs.order.orderExtrasName}" 
                        style="text-align: left;border-bottom: gray .5px solid;">
                        ${reg.extras_name} - U$ ${parseFloat(reg.extras_price).toFixed(2)}
                    </div>
                    <div class="col-12 colNoMarging" style="text-align: left;"><strong>Quantity:</strong> ${reg.extrasQtty}</div>`})
            orderExtras = `${orderExtras}</div></div></div>`
            cdDishes = `${cdDishes}
            <div class="row my-auto colNoMarging">
                    <div class="col-12 my-auto colNoMarging">
                        <div class="row my-auto colNoMarging" style="padding: 0 5px;">
            `
            tempData[0].cookingCalendarDishes.forEach(reg => {
                cdDishes = `${cdDishes}
                <div class="col-12 colNoMarging" 
                    id="${this.inputs.order.orderCDDishName}" 
                    style="text-align: left;border-bottom: gray .5px solid;">
                    ${reg.name} - U$ ${parseFloat(reg.price).toFixed(2)}
                </div>`})
            cdDishes = `${cdDishes}</div></div></div>`
        document.getElementById(this.modal.title).innerHTML = `<p class="h3">Order details</p>`
        document.getElementById(this.modal.body).innerHTML = `
        <style>
            .stateStyle{min-height: 35px;font-size: 1.4rem;}
            .cdStyle{min-height: 45px;font-size: 1.58rem;}
            .blackBG{background:rgba(0,0,0,1);color:white;}
            .darkGraykBG{background:rgba(108,108,108,1);color:white;}
            .darkBG{background:rgba(241,241,241,1);}
            .wrapWord{overflow-wrap: break-word;}
            .bottomLine{border-bottom: darkgray .5px solid;}
            .leftLine{border-left: darkgray .5px solid;}
            .colNoMarging{margin:0;padding:0 1px;}
            .innerTextMargin{padding-left:5px;}
            .hrNoMargin{margin:0;padding:0;}
            .alignLeft{text-align:left;}
            .btnActions {background-size: 25px;background-repeat: no-repeat;background-position-y: center;padding-left: 30px;text-align: start;width: -webkit-fill-available;;}
            .btnPadding{padding-bottom:2px;}
            .paddingLeftRight{padding-left: 2px;padding-right: 2px;}
            .stats{border-left: black 0.5px solid;border-right: black 0.5px solid;}
            .biggerFont{font-size:1.8rem;}
            .textCenter{text-aligh:center}
        </style>
        <div class=".container-fluid mx-auto my-auto text-center w-100colNoMarging">
            <p class="h5">Order</p>
            <div class=".container-fluid mx-auto my-auto text-center w-100 colNoMarging">
            <div class="row">
                <div class="col-12 col-lg-2 colNoMarging" style="text-align:left"><strong>Order id:</strong></div>
                <div class="col-12 col-lg-2 colNoMarging" id="${this.inputs.order.orderId}" style="text-align: left;">${tempData[0].orderId}</div>
                <div class="col-12 col-lg-2 colNoMarging" style="text-align:left"><strong>Meals quantity:</strong></div>
                <div class="col-12 col-lg-2 colNoMarging" id="${this.inputs.order.oderMealsQtty}" style="text-align: left;">${tempData[0].totalMeals}</div>
                <div class="col-12 col-lg-2  colNoMarging" style="text-align:left"><strong>Amount due:</strong></div>
                <div class="col-12 col-lg-2 colNoMarging" id="${this.inputs.order.orderAmountDue}" style="text-align: left;">U$ ${parseFloat(tempData[0].orderTotal).toFixed(2)*parseInt(tempData[0].totalMeals)}</div>
                <div class="col-12" style="height: 5px!important;"></div>
                <div class="col-12 col-lg-2 colNoMarging"  style="text-align:left"><strong>Order status:</strong></div>
                <div class="col-12 col-lg-10 colNoMarging" id="${this.inputs.order.orderStatusText}" style="text-align: left;">${tempData[0].orderStatus}</div>
                <div class="col-12" style="height: 5px!important;"></div>
                <div class="col-12 colNoMarging"  style="text-align:left"><strong>Order Details</strong></div>
                <div class="col-12">
                <!--BEGINNING OF DISHES LISTING -->
                <div class=".container-fluid mx-auto my-auto text-center w-100" style="border: gray 0.5px solid;height: 150px!important;overflow-y: auto;">
                    <!--BEGINNING OF DISHES -->
                    ${orderDishes}
                </div>
                <div class=".container-fluid mx-auto my-auto text-center w-100 colNoMarging" style="height: 5px!important"></div>
                <!--BEGINNING OF EXTRAS LISTING -->
                <div class=".container-fluid mx-auto my-auto text-center w-100 colNoMarging" style="border: gray 0.5px solid;height: 150px!important;overflow-y: auto;display: none;">
                    <!--BEGINNING OF EXTRAS -->
                    ${orderExtras}
                </div>
                </div>  
            </div>
            </div>
            <hr>
            <p class="h5">User</p>
            <div class=".container-fluid mx-auto my-auto text-center w-100">
                <div class="row colNoMarging">
                    <div class="col-12 col-lg-2 colNoMarging" style="text-align:left"><strong>Email:</strong></div>
                    <div class="col-12 col-lg-10 colNoMarging" id="${this.inputs.order.orderUserEmail}" style="text-align: left;">${tempData[0].email}</div>
                    <div class="col-12" style="height: 5px!important;"></div>
                    <div class="col-12 col-lg-2 colNoMarging" style="text-align:left"><strong>Name:</strong></div>
                    <div class="col-12 col-lg-10 colNoMarging" id="${this.inputs.order.orderUserName}" style="text-align: left;">${tempData[0].name}</div>
                    <div class="col-12" style="height: 5px!important;"></div>
                    <div class="col-12 col-lg-2 colNoMarging" style="text-align:left"><strong>Phone number:</strong></div>
                    <div class="col-12 col-lg-10 colNoMarging" id="${this.inputs.order.orderUserPhoneNumber}" style="text-align: left;">${phoneNumberMask(tempData[0].phoneNumber)}</div>
                </div>
            </div>
            <hr>
            <p class="h5">Cooking Calendar Date</p>
            <div class=".container-fluid mx-auto my-auto text-center w-100 colNoMarging">
            <div class="row colNoMarging">
                <div class="col-12 col-lg-2 colNoMarging" style="text-align:left"><strong>Date:</strong></div>
                <div class="col-12 col-lg-4 colNoMarging" id="${this.inputs.order.orderCDDate}" style="text-align: left;">${tempData[0].cookingDate.split(' ')[0]}</div>
                <div class="col-12 col-lg-2 colNoMarging" style="text-align:left"><strong>Address:</strong></div>
                <div class="col-12 col-lg-4 colNoMarging" id="${this.inputs.order.orderCDAddress}" style="text-align: left;">${tempData[0].street}${tempData[0].complement===null||tempData[0].complement===''?'': ', ' + tempData[0].complement}, ${tempData[0].city} - ${tempData[0].state}</div>
                <div class="col-12" style="height: 5px!important;"></div>
                <div class="col-12 my-auto colNoMarging" style="text-align: left;"><strong>Cooking calendar date menu</strong></div>
                <div class=".container-fluid mx-auto my-auto text-center w-100 colNoMarging" style="border: gray 0.5px solid;height: 150px!important;overflow-y: auto;">
                    <!--BEGINNING OF DISHES -->
                    ${cdDishes}
                </div>
            </div>
            </div>
        </div>
        `
        udateActionButtonLayout(this,null,null,true)
        appCtrl.dishActions(dataCtrl,this,this.modalTypes.dish.newDish,this.modal.btnAction)
    }
    //delete
    if(show_hide===`show`&&modalType===this.modalTypes.order.delete){
            tempData = dataCtrl.returnData('activerOrders').filter(reg => {
                if(reg.orderId===orderId){
                    return true
                }
                return false
            })
            document.getElementById(this.modal.title).innerHTML = `<p class="h3 bg-danger">Delete order ${tempData[0].orderId}?</p>`
            document.getElementById(this.modal.body).innerHTML = `
            <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 100%!important;">
            <p>This action cannot be undone</p>
            </div>
            `
            udateActionButtonLayout(this,'btn-danger','Delete',false)
    }
    if(show_hide===`show`&&modalType===this.modalTypes.order.deliver){
        tempData = dataCtrl.returnData('activerOrders').filter(reg => {
            if(reg.orderId===orderId){
                return true
            }
            return false
        })
        document.getElementById(this.modal.title).innerHTML = `<p class="h3 bg-info">Deliver order ${tempData[0].orderId}?</p>`
        document.getElementById(this.modal.body).innerHTML = `
        <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 100%!important;">
        <p>This action cannot be undone</p>
        </div>
        `
        udateActionButtonLayout(this,'btn-primary','Deliver',false)
    }
    if(show_hide==='show'&&modalType===this.modalTypes.order.notify){
        tempData = dataCtrl.returnData('activerOrders').filter(reg => {if(reg.orderId===orderId){return true}})
        if(tempData.length>0){
            tempData=tempData[0]
        }else{return}
        document.getElementById(this.modal.title).innerHTML = `<p class="h3">Send notification to ${tempData.userEmail}</p>`
        document.getElementById(this.modal.body).innerHTML = `
        <form id="${this.form}">
            <input name="userId" id="userId" value="${tempData.user_id}" style="display:none">
            <p class="h4"><strong>What message do you want to send to user?</strong></p>
            <textarea class="w-100" name="${this.notification}" id="messageToUser" value=""></textarea>
        </form>
        ` 
        udateActionButtonLayout(this,`btn-primary`,`Send`,false)
    }
    if(show_hide==='show'&&modalType===this.modalTypes.order.reimburse){
        //commonFunctions(dataCtrl,true)
        console.log(tempData.user_id)
        tempData = dataCtrl.returnData('activerOrders').filter(reg => {if(reg.orderId===orderId){return true}})
        if(tempData.length>0){
            tempData=tempData[0]
        }else{return}
        document.getElementById(this.modal.title).innerHTML = `<p class="h3">Mark this order ${tempData.orderId} as reimbursed?</p>`
        document.getElementById(this.modal.body).innerHTML = `
        <form id="${this.form}">
            <input name="userId" id="userId" value="${tempData.orderId}" style="display:none">
            <p class="h4">Rembember that you <strong>must</strong> have reimbursed the user before marking this order as reimbursed!</p>
        </form>
        ` 
        udateActionButtonLayout(this,`btn-primary`,`Reimburse`,false)
    }
    this.showModal(show_hide)
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                               CATORING MODALS
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    showHideCatoringModal(dataCtrl,appCtrl,show_hide,messageId,modalType){
        //check if it should hide modal
        console.log('CATORING-MODAL - show')
        if(show_hide===`hide`){
            return this.showModal(show_hide)
        }
        //common variables
        var tempData = []
        var innerData = ''
        var cookingCalendarObj = ''
        var dataCtrlReturnDataDescription = appCtrl.getAppSubState === appCtrl.getAppSubStatesList._UNREADMESSAGES ? 'activeMsgs' : appCtrl.getAppSubState === appCtrl.getAppSubStatesList._ARCHIVEDMESSAGES ? 'archivedMsgs' : 'excludedMsgs'
        //view details
        if(show_hide===`show`&&modalType===this.modalTypes.catoring.read){
            tempData = dataCtrl.returnData(dataCtrlReturnDataDescription).filter(reg => {
                if(reg.id===messageId){
                    return true
                }
                return false
            })
            document.getElementById(this.modal.title).innerHTML = `<p class="h3 bg">Reading catering message ${tempData[0].id}?</p>`
            document.getElementById(this.modal.body).innerHTML = `
            <div class=".container-fluid mx-auto my-auto text-center w-100">
                <hr>
                <div class="container mx-auto my-auto text-center w-100">
                    <p class="h5">Personal information</p>
                    <div class="row mx-auto w-100">
                        <div class="col-3" style="text-align: left;"><strong>Name:</strong></div>
                        <div class="col-9" style="text-align: left;">${tempData[0].name}</div>
                        <div class="col-3" style="text-align: left;"><strong>Phone number:</strong></div>
                        <div class="col-9" style="text-align: left;">${tempData[0].phoneNumber}</div>
                        <div class="col-3" style="text-align: left;"><strong>E-mail:</strong></div>
                        <div class="col-9" style="text-align: left;"><a href = "mailto: ${tempData[0].email}">${tempData[0].email}</a></div>
                    </div>
                </div>
                <hr>
                <div class="container mx-auto my-auto text-center w-100">
                    <p class="h5">Message information</p>
                    <div class="row mx-auto w-100">
                        <div class="col-3" style="text-align: left;"><strong>Received in:</strong></div>
                        <div class="col-9" style="text-align: left;">${tempData[0].createdIn}</div>
                        <div class="col-3" style="text-align: left;"><strong>Read by:</strong></div>
                        <div class="col-9" style="text-align: left;">${tempData[0].readBy}</div>
                        <div class="col-3" style="text-align: left;"><strong>Read in:</strong></div>
                        <div class="col-9" style="text-align: left;">${tempData[0].readIn}</div>
                        ${ appCtrl.getAppSubState === appCtrl.getAppSubStatesList._ARCHIVEDMESSAGES ? `<div class="col-3" style="text-align: left;"><strong>Archived by:</strong></div>
                        <div class="col-9" style="text-align: left;">${tempData[0].archivedBy}</div>
                        <div class="col-3" style="text-align: left;"><strong>Archived in:</strong></div>
                        <div class="col-9" style="text-align: left;">${tempData[0].archivedIn}</div>` : ''}
                        ${ appCtrl.getAppSubState === appCtrl.getAppSubStatesList._EXCLUDEDMESSAGES ? `<div class="col-3" style="text-align: left;"><strong>Excluded by:</strong></div>
                        <div class="col-9" style="text-align: left;">${tempData[0].excludedBy}</div>
                        <div class="col-3" style="text-align: left;"><strong>Excluded in:</strong></div>
                        <div class="col-9" style="text-align: left;">${tempData[0].excludedIn}</div>` : ''}

                    </div>
                </div>
                <hr>
                <div class="container-fluid mx-auto my-auto text-center w-100">
                    <p class="h5">Message</p>
                    <div class="container mx-auto my-auto text-center w-100" style="border: black .5px solid;height: 275px!important;overflow-y: auto;text-align: left;">
                    <p style="text-align: left;">
                    ${tempData[0].orderDescription}
                    </p>
                    </div>
                </div>
                <hr>
                </div>
            `
            udateActionButtonLayout(this,null,null,true)
        }
        if(show_hide===`show`&&modalType===this.modalTypes.catoring.archive){
            tempData = dataCtrl.returnData('activeMsgs').filter(reg => {
                if(reg.id===messageId){
                    return true
                }
                return false
            })
            document.getElementById(this.modal.title).innerHTML = `<p class="h3 bg-info">Archive catering message ${tempData[0].id}?</p>`
            document.getElementById(this.modal.body).innerHTML = `
            <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 100%!important;">
            <p>This action cannot be undone</p>
            </div>
            `
            udateActionButtonLayout(this,'btn-primary','Archive',false)
        }
        if(show_hide===`show`&&modalType===this.modalTypes.catoring.delete){
            tempData = dataCtrl.returnData('activeMsgs').filter(reg => {
                if(reg.id===messageId){
                    return true
                }
                return false
            })
            document.getElementById(this.modal.title).innerHTML = `<p class="h3 bg-danger">Delete catering message ${tempData[0].id}?</p>`
            document.getElementById(this.modal.body).innerHTML = `
            <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 100%!important;">
            <p>This action cannot be undone</p>
            </div>
            `
            udateActionButtonLayout(this,'btn-danger','Delete',false)
        }
        this.showModal(show_hide)
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                               MANAGE ACCESS MODALS
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    showHideManageAccessModal(dataCtrl,appCtrl,show_hide,userId,modalType){
        //check if it should hide modal
        if(show_hide===`hide`){
        return this.showModal(show_hide)
    }
    //common variables
    var tempData = []
    var innerData = ''
    var cookingCalendarObj = ''
    //view details
    if(show_hide===`show`&&modalType===this.modalTypes.manageAccess.manageAccess){
        dataCtrl.clearOriginalAccesses()
        dataCtrl.clearModificiedAccesses()
        dataCtrl.clearTempSelectedData()
        dataCtrl.setTempSelectedData = userId
        var innerData = ''
        const fullAccessesList = dataCtrl.returnData('accessesArray')
        const userAccess = dataCtrl.returnData('userAccesses').filter(user => {
            if(user.id===userId){
                return true
            }
            return false
        })
        fullAccessesList.forEach(reg => {
            var hasAccess = false
            userAccess.forEach(access => { 
                if(access.user_type_id===reg.id){
                    hasAccess = true
                    dataCtrl.setOriginalAccesses = access.user_type_id
                    dataCtrl.setModifiedAccesses = access.user_type_id
                }
            })
            innerData = `${innerData}
            <div class="col-12 my-auto text-center" style="height: 35px!important;border-bottom: gray .5px solid;align-items: center;">
            <div class="row  w-75 mx-auto  my-auto text-center h-100" style="align-items: center;"">
              <div class="col-1  my-auto text-center">
                <div class="input-group  my-auto text-center">
                  <div class="input-group-prepend  my-auto text-center">
                    <div class="input-group-text my-auto text-center" >
                      <input type="checkbox" id="checkBoxId-${reg.id}" onclick="if(this.checked){
                        dataCtrl.setModifiedAccesses = parseInt(this.id.split('-')[1])
                    }else{
                      dataCtrl.removeAccess(parseInt(this.id.split('-')[1]))
                    }" ${hasAccess ? 'checked' : ''}></div>
                    </div>
                  </div>
                </div>
              <div class="col-11" style="text-align: left;">${reg.name}</div>
            </div>
           </div>
            `
        })
        document.getElementById(this.modal.title).innerHTML = `<p class="h3">Manage access for user ${userAccess[0].email}</p>`
        document.getElementById(this.modal.body).innerHTML = `
        <div class=".container-fluid mx-auto my-auto text-center w-100">
            <p class="h5">User Accesses List</p>
            <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 350px!important;border:gray .5px solid;overflow-y:auto">
                <div class="row mx-auto my-auto text-center">
                    ${innerData}
                </div>
            </div>
        </div>
        `
        udateActionButtonLayout(this,'btn-primary','Update accesses',false)
    }

    this.showModal(show_hide)
    }

    showModal(show_hide){
        $(`#${this.modal.div}`).modal(show_hide)
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                                      ALERT UI
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    showHideAlert(alertClass,text,show_hide){
        const alertsIds = this.getIDs().alert
        this.showHideSpinner('hide')
        function clearAlert(){
            document.getElementById(alertsIds.alert).style.zIndex = 0
            document.getElementById(alertsIds.text).innerHTML = ``
            document.getElementById(alertsIds.alert).classList.remove('alert-success','alert-danger','alert-warning','alert-primary', 'alert-secondary', 'alert-info', 'alert-light','alert-dark','show')
        }
        if(clearTimeout(this.timeOutVar)){
            clearAlert()
        }
        if(show_hide===`hide`){
            return clearAlert()  
        }
        if(show_hide==='show'){
            const alertsIds = this.getIDs().alert
            clearAlert()
            document.getElementById(alertsIds.alert).style.zIndex = 99999
            document.getElementById(alertsIds.text).innerHTML = `${text}`
            document.getElementById(alertsIds.alert).classList.add(alertClass, 'show')
        }
        this.timeOutVar = setTimeout(() => {
             clearAlert()
        }, 3000);
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                                      SPINNER UI
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    showHideSpinner(show_hide){
        if(show_hide===`show`){
            document.getElementById(this.spinner.spinner).style.zIndex = 99998
            document.getElementById(this.spinner.spinner).style.display = 'block'
        }else{
            document.getElementById(this.spinner.spinner).style.zIndex = 0
            document.getElementById(this.spinner.spinner).style.display = 'none'
        }
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                               GENERAL RETURN UICTRL DATA
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    getIDs(){
        return this
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                                  DUPLICATED UI ELEMENTS
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    getInivitationCodeUIElements(appStateOrSubState){
        var mainDivForContent = null
        if(appStateOrSubState===this.uiSwitcher.state){
            mainDivForContent = document.getElementById(this.mainContent.div)
        }
        if(appStateOrSubState===this.uiSwitcher.subState){
            mainDivForContent = document.getElementById(this.mainContent.mainContenctWithOptions)
        }
            mainDivForContent.innerHTML = `
            <div class=".container-fluid h-100 w-100 mx-auto my-auto text-center">
                    <div class=".container-fluid w-75 mx-auto my-auto text-center">
                        <div class="row">
                            <div class="col-12 col-md-4"><strong>Inform the email:</strong></div>
                            <div class="col-12 col-md-8"><input type="email" name="email" id="email" class="w-100 form-control" placeholder="Type in the email..." required></div>
                        </div>
                        <div style="height:15px!important"></div>
                        <div class=".container-fluid mx-auto my-auto w-100 text-center">
                            <button id="generateCodeBtn" class="btn btn-primary" onClick="appCtrl.generateInvitationCode(uiCtrl,document.getElementById('email').value,'resultsWrapper','returnMsgWithCode','code')">Generate code</button>
                        </div>
                    </div>
                    <div id="resultsWrapper" class=".container-fluid w-75 mx-auto my-auto text-center" style="display:none">
                        <hr>
                        <div class="row mx-auto my-auto text-center w-100">
                            <div class="col-12 col-md-4"><strong>Code is:</strong></div>
                            <div class="col-12 col-md-8"><input type="email" name="text" id="code" class="w-100 form-control" value="teste" disabled></div>
                            <div class="col-12" style="height: 15px!important;"></div>
                            <div class="col-12">
                                <div id="returnMsgWithCode" class=".container-fluid text-justify">
                                    
                                </div>
                            </div>
                        </div>
                        <div style="height:15px!important"></div>
                        <div class=".container-fluid mx-auto my-auto w-100 text-center">
                            <button id="copySelectedText" class="btn btn-secondary" onclick="appCtrl.copy()">Copy reply text with code</button>
                        </div>
                    </div>
            </div>
            `
    }
    getEditCookingDateModalOrNewDishModal(dataCtrl,appCtrl,edit_newDish_string,cookingCalendarObj){
        if(edit_newDish_string===this.modalTypes.cookingDate.edit){
            const dishArray = dataCtrl.returnData('dishes')
            const selectedDishes = dataCtrl.returnData(`selectedDishes`)
            const tempObj = dataCtrl.returnData('tempObject')
            var innerDishes = `
            <style>
                .selectedBG{background:rgba(74,134,255,.3)}
                .pNoMargin{margin:0;padding:0}
                .hrNoMargin{margin:0;padding:2px;}
                .colNoMargin{margin:0;padding:2px 0;}}
            </style>
            `
            var street = null
            var complement = null
            var city = null
            var state = null
            var country = null
            var zipcode = null
            var finalAmount = 0
            for(let key in tempObj){
                if(key==='street'){
                    street = tempObj[key]
                }
                if(key==='complement'){
                    complement = tempObj[key]
                }
                if(key==='city'){
                    city = tempObj[key]
                }
                if(key==='state'){
                    state = tempObj[key]
                }
                if(key==='country'){
                    country = tempObj[key]
                }
                if(key==='zipcode'){
                    zipcode = tempObj[key]
                }
            }
            dishArray.forEach(dish => {
                if(selectedDishes.includes(dish.id)){
                    finalAmount += parseFloat(dish.price)
                }
                if(dish.excluded===0){
                    innerDishes = `${innerDishes}
                    <button 
                        id="checkboxDish-${dish.id}" 
                        class="btn .container-fluid mx-auto my-auto w-100 ${this.checkboxes.dishes.className} ${selectedDishes.includes(dish.id) ? 'selectedBG' : ''}" 
                        onclick="const id = parseInt(this.id.split('-')[1])
                                var addSubtract = 0
                                if(this.classList.contains('selectedBG')){
                                    this.classList.remove('selectedBG')
                                    dataCtrl.removeSelectedDish(id)
                                    addSubtract = -parseFloat(this.children[0].innerText.split(' ')[1])
                                }else{
                                    this.classList.add('selectedBG')
                                    dataCtrl.setSelectedDishes = id
                                    addSubtract = parseFloat(this.children[0].innerText.split(' ')[1])
                                }
                                var amount = parseFloat(document.getElementById('${this.infoContainer.totalAmount}').innerText.split(' ')[1])
                                amount += addSubtract
                                document.getElementById('${this.infoContainer.totalAmount}').innerText = 'U$ ' + amount.toFixed(2)
                                " 
                        style="border-bottom: gray 1px solid;padding: 0;">
                        ${dish.name} <i>${dish.price === null | dish.price=== '' ? 'U$ 0.00' : 'U$ ' + dish.price}</i>
                    </button>
                    `
                }
            })
            document.getElementById(this.modal.title).innerHTML = `<p class="h3">Edit information for ${cookingCalendarObj[0].cookingDate} at ${cookingCalendarObj[0].street}?</p>`
            document.getElementById(this.modal.body).innerHTML = `
            <div class=".container-fluid mx-auto my-auto w-100 text-center colNoMargin">
                <div class="h6 w-50 mx-auto"><strong>To open to orders</strong> this <u>cooking calendar date</u>, it is necessary to inform <strong>street</strong>, <strong>city</strong>, <strong>state</strong> and the <strong>dishes</strong></div>
                <hr class="hrNoMargin">
                <div class="h4">Address information</div>
                <div class="container mx-auto my-auto w-100 text-center colNoMargin">
                    <div class="row w-100 my-auto mx-auto colNoMargin">
                        <div class="col-12 col-md-2 colNoMargin">
                            <p class="pNoMargin"><strong>Street:</strong></p>
                        </div>
                        <div class="col-12 col-md-5 colNoMargin">
                            <input type="text" name="${this.formsNames.cookingCalendarInfo}" id="${this.inputs.cookingCalendarDate.street}" class="w-100" placeholder="Information required" value="${street !==null ? street : cookingCalendarObj[0].street===null ? '' : cookingCalendarObj[0].street}" oninput="dataCtrl.setTempObject = {street: this.value}">
                        </div>
                        <div class="col-12 col-md-2 text-left colNoMargin">
                            <p  class="pNoMargin"><strong>Complement:</strong></p>
                        </div>
                        <div class="col-12 col-md-3 colNoMargin">
                            <input type="text" name="${this.formsNames.cookingCalendarInfo}" id="${this.inputs.cookingCalendarDate.complement}" class="w-100" value="${complement !==null ? complement : cookingCalendarObj[0].complement===null ? '' : cookingCalendarObj[0].complement}" oninput="dataCtrl.setTempObject = {complement: this.value}">
                        </div>
                        <div class="col-12 col-md-2 text-left colNoMargin">
                            <p  class="pNoMargin"><strong>City:</strong></p>
                        </div>
                        <div class="col-12 col-md-5 colNoMargin">
                            <input type="text" name="${this.formsNames.cookingCalendarInfo}" id="${this.inputs.cookingCalendarDate.city}" class="w-100" value="${city !==null ? city : cookingCalendarObj[0].city===null ? '' : cookingCalendarObj[0].city}" oninput="dataCtrl.setTempObject = {city: this.value}" 
                            placeholder="Information required">
                        </div>
                        <div class="col-12 col-md-2 text-left colNoMargin">
                            <p  class="pNoMargin"><strong>State:</strong></p>
                        </div>
                        <div class="col-12 col-md-3 colNoMargin">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend"></div>
                                <select name="${this.formsNames.cookingCalendarInfo}" class="custom-select w-100" id="${this.inputs.cookingCalendarDate.state}"
                                onchange="dataCtrl.setTempObject = {state: this.value}" >
                                    <option value="">Select a state...</option>
                                    <option value="AL">AL</option>
                                    <option value="AK">AK</option>
                                    <option value="AZ">AZ</option>
                                    <option value="AR">AR</option>
                                    <option value="CA">CA</option>
                                    <option value="CO">CO</option>
                                    <option value="CT">CT</option>
                                    <option value="DE">DE</option>
                                    <option value="DC">DC</option>
                                    <option value="FL">FL</option>
                                    <option value="GA">GA</option>
                                    <option value="HI">HI</option>
                                    <option value="ID">ID</option>
                                    <option value="IL">IL</option>
                                    <option value="IN">IN</option>
                                    <option value="IA">IA</option>
                                    <option value="KS">KS</option>
                                    <option value="KY">KY</option>
                                    <option value="LA">LA</option>
                                    <option value="ME">ME</option>
                                    <option value="MD">MD</option>
                                    <option value="MA">MA</option>
                                    <option value="MI">MI</option>
                                    <option value="MN">MN</option>
                                    <option value="MS">MS</option>
                                    <option value="MO">MO</option>
                                    <option value="MT">MT</option>
                                    <option value="NE">NE</option>
                                    <option value="NV">NV</option>
                                    <option value="NH">NH</option>
                                    <option value="NJ">NJ</option>
                                    <option value="NM">NM</option>
                                    <option value="NY">NY</option>
                                    <option value="NC">NC</option>
                                    <option value="ND">ND</option>
                                    <option value="OH" selected="selected">OH</option>
                                    <option value="OK">OK</option>
                                    <option value="OR">OR</option>
                                    <option value="PA">PA</option>
                                    <option value="RI">RI</option>
                                    <option value="SC">SC</option>
                                    <option value="SD">SD</option>
                                    <option value="TN">TN</option>
                                    <option value="TX">TX</option>
                                    <option value="UT">UT</option>
                                    <option value="VT">VT</option>
                                    <option value="VA">VA</option>
                                    <option value="WA">WA</option>
                                    <option value="WV">WV</option>
                                    <option value="WI">WI</option>
                                    <option value="WY">WY</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-12 col-md-2 text-left colNoMargin">
                            <p  class="pNoMargin"><strong>Country:</strong></p>
                        </div>
                        <div class="col-12 col-md-5 colNoMargin">
                            <input type="text" name="${this.formsNames.cookingCalendarInfo}" id="${this.inputs.cookingCalendarDate.country}" value="${country !==null ? country : cookingCalendarObj[0].country===null ? '' : cookingCalendarObj[0].country}" oninput="dataCtrl.setTempObject = {country: this.value}" class="w-100">
                        </div>
                        <div class="col-12 col-md-2 text-left colNoMargin">
                            <p class="pNoMargin"><strong>Zipcode:</strong></p>
                        </div>
                        <div class="col-12 col-md-3 colNoMargin">
                            <input type="text" name="${this.formsNames.cookingCalendarInfo}" id="${this.inputs.cookingCalendarDate.zipcode}" value="${zipcode !==null ? zipcode : cookingCalendarObj[0].zipcode===null ? '' : cookingCalendarObj[0].zipcode}" oninput="dataCtrl.setTempObject = {zipcode: this.value}"  class="w-100">
                        </div>
                    </div>
                    
                </div>
            <hr class="hrNoMargin">
            </div>
            <div class=".container-fluid mx-auto my-auto w-100 text-center">
                    <div class="h4">Menu information</div>
                    <div class=".container-fluid mx-auto my-auto w-100 text-center">
                        <p class="pNoMargin">Select the dish(es) from the list below to add to the menu of this cooking calendar date:</p>
                        <div class="container mx-auto my-auto w-75  colNoMargin" style="height: 200px!important;overflow-y:auto;border: gray .5px solid;">
                            ${innerDishes}                            
                        </div>
                        <hr >
                        <div class=".container-fluid mx-auto my-auto w-100 text-center">
                            <div class="h4">Final cost per meal</div>
                            <div id="${this.infoContainer.totalAmount}" class="h5">U$ ${finalAmount.toFixed(2).toString()}</div>
                        </div>
                        <div class="container mx-auto my-auto w-100">
                            <div class="d-flex flex-row-reverse">
                                <div class="p-2">
                                    <button id="newDish-${cookingCalendarObj[0].id}" class="btn btn-secondary" onclick="appCtrl.cookingCalendarDateActions(dataCtrl,uiCtrl,uiCtrl.getIDs().modalActions.cookingDate.newDish,this)">Create new dish</button>
                                </div>
                            <div>
                        </div>
                    </div>
            </div>
                   
            `
            document.getElementById(this.inputs.cookingCalendarDate.state).value = state !==null ? state : cookingCalendarObj[0].state===null ? '' : cookingCalendarObj[0].state
            udateActionButtonLayout(this,'btn-primary','Save changes',false)
            appCtrl.loadDishesSelectionCheckBoxes(dataCtrl,this,this.checkboxes.dishes.className)
        }else if(edit_newDish_string===this.modalTypes.cookingDate.newDish){
            var formElements = returnFormElementsForNewDishForm(this)
            document.getElementById(this.modal.title).innerHTML = `<p class="h3">Create new dish</p>`
            document.getElementById(this.modal.body).innerHTML = `
            ${formElements}
            <div class=".container-fluid mx-auto my-auto w-100 text-center">
                <div class="my-auto row">
                    <div class="col-6">
                        <div class="d-flex flex-row">
                            <div class="p-2">
                                <button  id="back-${cookingCalendarObj[0].id}"  class="btn btn-secondary" onclick="appCtrl.cookingCalendarDateActions(dataCtrl,uiCtrl,uiCtrl.getIDs().modalActions.cookingDate.edit,this)">&#60; Back</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex flex-row-reverse">
                            <div class="p-2">
                                <button id="saveNewDish-${cookingCalendarObj[0].id}" onclick="appCtrl.dishActions(dataCtrl,uiCtrl,uiCtrl.getIDs().modalActions.dish.newDish,this)"class="btn btn-primary">Save new dish</button>
                            </div>
                        </div>
                    </div>
        
                </div>
            </div>`
            udateActionButtonLayout(this,null,null,true)
        }
    }
    gettingOrderDeliveryStateOrSubstate(appStateOrSubState,innerData){
        console.log('chamou')
        var mainDivForContent = ''
        if(appStateOrSubState===this.uiSwitcher.state){
            mainDivForContent = document.getElementById(this.mainContent.div)
        }
        if(appStateOrSubState===this.uiSwitcher.subState){
            mainDivForContent = document.getElementById(this.mainContent.mainContenctWithOptions)
        }
            mainDivForContent.innerHTML = `
            <div class=".container-fluid my-auto text-right w-100" style="height: 7%!important;padding-left:100px!important;padding-right:15px!important">
                <div class=".container-fluid text-right w-50" style="float:right">
                    <div class="text-right">
                        <input 
                            name="${this.searchInput.input}" 
                            id="${this.searchInput.input}" 
                            class=".container-fluid text-right" 
                            type="text" 
                            style="width:100%!important;padding-bottom:2px"
                            placeHolder="Search dishes, prices, ingredients, descriptions...">
                    </div>
                </div>
            </div>
            <div class=".container-fluid mx-auto my-auto text-center w-100" style="height: 88%!important;overflow-y:auto;padding:5px 5px">
                <div id="${this.table.tbody}" class="row w-100 my-auto mx-auto">
                    ${innerData}
                </div>
            </div>  `
            // <div class=".container-fluid mx-auto my-auto text-center w-100" style="height:10%!important;padding-left:100px!important">
            //     <div class="row w-100 mx-auto my-auto" style="">
            //         <div class="col-2"><strong>Search:</strong></div>
            //         <div class="col-10"><input name="${this.searchInput.input}" id="${this.searchInput.input}" class="w-100" type="text" placeHolder="Name, email, social media names, cooking calendar date, street, ..."></div>
            //         </div>
            //         <hr>
            //         <hr>
            //     </div>
            // </div>
            // <div class=".container-fluid mx-auto my-auto text-center w-100" style="height:5%!important;"></div>
            // <div class=".container-fluid mx-auto my-auto text-center w-75" style="height:85%!important;overflow-y:auto">
            //     <table class="table table-striped table-sm table-hover">
            //         <tbody id="${this.table.tbody}">
            //             ${innerData}
            //         </tbody>
            //     </table>
            // </div>
    }
}
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                                  SUPPORT FUNCTIONS
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
function udateActionButtonLayout(uiCtrl,cssClassAdd,title,hidden){
    if(hidden){
        document.getElementById(uiCtrl.getIDs().modal.btnAction).style.display = 'none'
        return
    }
    document.getElementById(uiCtrl.getIDs().modal.btnAction).style.display = 'block'
    var btn = document.getElementById(uiCtrl.getIDs().modal.btnAction)
    var el = btn,
        elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);
    btn = elClone
    if(btn.classList.contains('btn-primary')){
        btn.classList.remove('btn-primary')
    }
    if(btn.classList.contains('btn-danger')){
        btn.classList.remove('btn-danger')
    }
    btn.classList.add(cssClassAdd)
    btn.innerText = title
}
//inner data to populate table in user substates
function returnInnerDataForCUserSubStateAndSearchMode(dataCtrl,uiCtrl,tempData,subStateOne,subStateTwo){
    var counter = 0
    var innerData= `
            <style>
                .borderBottom{
                    border-bottom: lightgray 0.3px solid;
                }
                .darkBG{
                    background:rgba(241,241,241,1)
                }
                .btnPadding {
                    padding:2px 0px!important;
                }
                .colNoMarging{
                    margin:0;
                    padding:0;
                }
                .btnActions {
                    background-size: 25px;
                    background-repeat: no-repeat;
                    background-position-y: center;
                    padding-left: 30px;
                    width: inherit;
                    text-align: start;
                }
                .breakWord {
                    overflow-wrap: break-word;
                }
            </style>
            `
    tempData.forEach(reg => {
        innerData = `${innerData}
            <div class="col-12 row borderBottom ${counter%2===0 ? '' : 'darkBG'} colNoMarging">
                <div class="col-8 row colNoMarging" style="text-align:left">
                    <div class="col-12 col-md-6 row colNoMarging">
                        <div class="col-12 breakWord colNoMarging"><strong>E-mail:</strong> ${reg.email}</div>
                        <div class="col-12 breakWord colNoMarging"><strong>Nome:</strong> ${reg.name}</div>
                    </div>
                    <div class="col-12 col-md-6 breakWord colNoMarging"><strong>Last log-in:</strong> ${reg.lastLogIn.split(' ')[0]}</div>
                </div>
                <div class="col-4 row colNoMarging">
                    <!-- VIEW BUTTON -->
                    <div class="col-12 col-md-6 colNoMarging btnPadding">
                        <button 
                            id="${uiCtrl.modalTypes.user.viewDetails}-${reg.id}"
                            class="btn btn-outline-secondary btnActions editMode" 
                            style="background-image: url(/img/viewIcon.png)" 
                            onclick="appCtrl.userActions(dataCtrl,uiCtrl,'${uiCtrl.modalTypes.user.viewDetails}',this)">
                            View
                        </button>
                    </div>
                    <!-- EDIT BUTTON -->
                    ${subStateOne ? 
                        `<div class="col-12 col-md-6 colNoMarging btnPadding">
                            <button 
                                id="${uiCtrl.modalTypes.user.edit}-${reg.id}"
                                class="btn btn-outline-primary btnActions editMode" 
                                style="background-image: url(/img/editIcon.png)" 
                                onclick="appCtrl.userActions(dataCtrl,uiCtrl,'${uiCtrl.modalTypes.user.edit}',this)">
                                Edit
                            </button>
                        </div>`
                    : ''}
                    <!-- NOTIFY BUTTON -->
                    ${subStateOne ? 
                        `<div class="col-12 col-md-6 colNoMarging btnPadding">
                            <button 
                                id="${uiCtrl.modalTypes.user.notify}-${reg.id}"
                                class="btn btn-outline-warning btnActions editMode" 
                                style="background-image: url(/img/sendNotification.png)" 
                                onclick="appCtrl.userActions(dataCtrl,uiCtrl,'${uiCtrl.modalTypes.user.notify}',this)">
                                Notify
                            </button>
                        </div>` 
                    : '' }
                    <!-- DELETE BUTTON -->
                    ${subStateOne ? 
                        `<div class="col-12 col-md-6 colNoMarging btnPadding">
                            <button 
                                id="${uiCtrl.modalTypes.user.delete}-${reg.id}"
                                class="btn btn-outline-danger btnActions" 
                                style="background-image: url(/img/delete48.png)" 
                                onclick="appCtrl.userActions(dataCtrl,uiCtrl,'${uiCtrl.modalTypes.user.delete}',this)" >
                                Delete
                            </button>
                        </div>` 
                    : '' }
                </div>
            </div>
        `
        counter += 1
        //<div class="col-12 col-md-6"><strong></strong></div>
    })
    return innerData
}
//inner data to populate table in cooking calendar substates
function returnInnerDataForCookingDateSubStatesAndSearchMode(dataCtrl,uiCtrl,tempData,subStateOne,subStateTwo,subStateThree){
    var counter = 0
    var innerData = `
        <style>
            .blackBG{
                background:rgba(0,0,0,1);
                color:white;
            }
            .darkGraykBG{
                background:rgba(108,108,108,1);
                color:white;
            }
            .borderBottom{
                border-bottom: black 1.5px solid;
            }
            .darkBG{
                background:rgba(241,241,241,1)
            }
            .btnPadding {
                padding:2px 0px!important;
            }
            .colNoMarging{
                margin:0;
                padding:0;
            }
            .innerTextMargin{
                padding-left:5px
            }
            .hrNoMargin{
                margin:0;
                padding:0;
            }
            .btnActions {
                background-size: 25px;
                background-repeat: no-repeat;
                background-position-y: center;
                padding-left: 30px;
                text-align: start;
                width: -webkit-fill-available;;
            }
            .breakWord {
                overflow-wrap: break-word;
            }
            .paddingLeftRight{
                padding-left: 2px;
                padding-right: 2px;
            }
            .stats{
                border-left: black 0.5px solid;
                border-right: black 0.5px solid;
            }
        </style>`
    //==================================================
    // SUPPORT FUNCTIONS ===============================
    //select right status icon for cooking calendar date
    function cookingCalendarDateStatusIcon(status){
        if(status<=2){
            return 'missing'
        }
        if(status===3){
            return 'openToOrders'
        }
        if(status===4){
            return 'closeToOrders'
        }
        if(status===5){
            return 'alertIcon'
        }
        if(status===7){
            return 'alarmIcon'
        }
        return 'over'
    }
    //select right status function for cooking calendar date
    function cookingCalendarStatusFunction(uiCtrl,status){
        if(status<=3){
            return `appCtrl.cookingCalendarDateActions(dataCtrl,uiCtrl,'${uiCtrl.modalActions.cookingDate.openToOrders}',this)`
        }
        if(status===4){
            return `appCtrl.cookingCalendarDateActions(dataCtrl,uiCtrl,'${uiCtrl.modalActions.cookingDate.closeToOrders}',this)`
        }
        if(status===5){
            return `appCtrl.cookingCalendarDateActions(dataCtrl,uiCtrl,'${uiCtrl.modalActions.cookingDate.setCookingCapacity}',this)`
        }
        if(status===7){
            return `appCtrl.cookingCalendarDateActions(dataCtrl,uiCtrl,'${uiCtrl.modalActions.cookingDate.initiateDelivery}',this)`
        }
        return `appCtrl.cookingCalendarDateActions(dataCtrl,uiCtrl,'${uiCtrl.modalActions.cookingDate.gameOver}',this)`
    }
    //select right edit icon for cooking calendar date
    function cookingCalendarEditIcon(uiCtrl,status){
        if(status<=3){
            return `editIcon`
        }
        return `viewIcon`
    }
    //return button ids
    function returnBtnIdsuiCtrl(uiCtrl,status){
        if(status<=3){
            return uiCtrl.modalTypes.cookingDate.openToOrders
        }
        if(status===4){
            return uiCtrl.modalTypes.cookingDate.closeToOrders
        }
        if(status===5){
            return uiCtrl.modalTypes.cookingDate.setCookingCapacity
        }
        if(status===7){
            return uiCtrl.modalTypes.cookingDate.initiateDelivery
        }
        return uiCtrl.modalTypes.cookingDate.gameOver
    }
    //select right edit function for cooking calendar date
    function cookingCalendarEditFunction(uiCtrl,status){
        if(status<=5){
            return `appCtrl.cookingCalendarDateActions(dataCtrl,uiCtrl,'${uiCtrl.modalActions.cookingDate.edit}',this)`
        }
        return `appCtrl.cookingCalendarDateActions(dataCtrl,uiCtrl,'${uiCtrl.modalActions.cookingDate.viewDetails}',this)`
    }
    function returnRepetitivePart(uictrl,appCtrl,reg,subStateOne,subStateTwo,subStateThree){
        return `
        <div class="col-12 row borderBottom ${counter%2===0 ? '' : 'darkBG'} colNoMarging">
            <!-- COOKING DATE INFO -->
            <div class="col-5 row colNoMarging paddingLeftRight" style="text-align:left;padding: 2px">
                <div class="col-12 colNoMarging innerTextMargin"><strong>${reg.nmMonth.substr(0,3)} ${reg.cookingDate.split(' ')[0].split('-')[2]} ${reg.cookingDate.split(' ')[0].split('-')[0]}</strong> at ${reg.cookingDate.split(' ')[1].substr(0,5)}</div>
                <div class="col-12 colNoMarging innerTextMargin breakWord"><strong>${reg.street === null ? 'Address missing' : `At ${reg.street}`}${reg.complement !== null ? `, ${reg.complement}` : ''}, ${reg.city === null ? '' : reg.city}</strong></div>
                <div class="col-12 colNoMarging innerTextMargin breakWord" style="text-align:right;>
                    <p style="margin:0;">${reg.cookingDate_status}</p>
                </div>
                <div class="col-12 colNoMarging innerTextMargin text-center" style="background:greenyellow">
                    <p style="margin:0;"><strong>Cooking capacity: ${reg.mealsForThis}</strong></p>
                </div>
            </div>
            <!-- COOKING DATE STATISTICS -->
            <div class="col-4 row colNoMarging my-auto mx-auto stats paddingLeftRight" style="text-align:left">
                <div class="col-6 colNoMarging breakWord my-auto mx-auto"><strong>- Pre-orders: </strong></div>
                <div class="col-6 colNoMarging text-center my-auto mx-auto">
                    <button 
                        id="${uiCtrl.modalTypes.cookingDate.listOrders}-${reg.id}" 
                        class="btn btnActions editMode" 
                        style="border: black 0.5px solid;padding-left: 15px;padding-right: 25px;text-align: center;"
                        onclick="appCtrl.cookingCalendarDateActions(dataCtrl,uiCtrl,'${uiCtrl.modalActions.cookingDate.listOrders}',this)">
                        <p style="margin:0;">${reg.ordersTotal}</p>
                    </button>
                </div>
                <hr class="hrNoMargin">
                <div class="col-12 colNoMarging breakWord my-auto mx-auto"><strong>- Number of meals </strong></div>
                <div class="col-6 colNoMarging my-auto mx-auto" style="text-align:right"><strong>.ordered: </strong></div>
                <div class="col-6 colNoMarging text-center my-auto mx-auto">
                    <p style="margin:0;">${reg.meals_quantity}</p></div>
                <div class="col-6 colNoMarging my-auto mx-auto" style="text-align:right"><strong>.sorted: </strong></div>
                <div class="col-6 colNoMarging text-center my-auto mx-auto">
                    <p style="margin:0;">${reg.mealsOnList}</p></div>
                <div class="col-6 colNoMarging my-auto mx-auto" style="text-align:right"><strong>.paid: </strong></div>
                <div class="col-6 colNoMarging text-center my-auto mx-auto">
                    <p style="margin:0;">${reg.mealsConfirmed}</p></div>
                <hr class="hrNoMargin">
                <div class="col-6 colNoMarging breakWord my-auto mx-auto"><strong>- First come first served</strong></div>
                <div class="col-6 colNoMarging text-center my-auto mx-auto">
                    <p style="margin:0;">${reg.mealsForThis-(reg.mealsConfirmed)}</p>
                </div>
            </div>
            <!-- COOKING DATE BTNS -->
            <div class="col-3 row colNoMarging paddingLeftRight" style="text-align:left">
                ${subStateOne || subStateTwo ? `
                    <div class="col-12 colNoMarging btnPadding">
                        <button 
                            id="${uiCtrl.modalTypes.cookingDate.edit}-${reg.id}" 
                            class="btn btn-outline-secondary btnActions editMode" 
                            style="background-image: url(/img/${cookingCalendarEditIcon(uiCtrl,reg.cookingDate_status_id)}.png)" 
                            onclick="${cookingCalendarEditFunction(uiCtrl,reg.cookingDate_status_id)}" >
                            ${reg.cookingDate_status_id <= 5 ? 'Edit' : 'View' }
                        </button>
                    </div>
                ` : '' } 
                ${subStateOne ? `
                    ${reg.cookingDate_status_id === 6 ? '' :
                    `<div class="col-12 colNoMarging btnPadding">
                        <button 
                            id="${reg.cookingDate_status_id <= 3 ? uiCtrl.modalTypes.cookingDate.openToOrders : uiCtrl.modalTypes.cookingDate.closeToOrders}-${reg.id}" 
                            class="btn btn-outline-primary btnActions editMode" 
                            style="background-image: url(/img/${cookingCalendarDateStatusIcon(reg.cookingDate_status_id)}.png)" 
                            onclick="${cookingCalendarStatusFunction(uiCtrl,reg.cookingDate_status_id)}">
                            ${reg.cookingDate_status_id <= 3 ? 'Open to orders' : 
                            reg.cookingDate_status_id === 4 ? 'Close to orders' :
                            reg.cookingDate_status_id === 5 ? 'Set cooking capacity' :
                            reg.cookingDate_status_id === 7 ? 'Send pick-up alert' : 'Finished' }
                        </button>
                    </div>`
                    }
                ` : ''}
                ${subStateOne ? `
                    <div class="col-12 colNoMarging btnPadding">
                        <button 
                            id="${uiCtrl.modalTypes.cookingDate.delete}-${reg.id}"
                            class="btn btn-outline-warning btnActions editMode" 
                            style="background-image: url(/img/delete48.png)" 
                            onclick="appCtrl.cookingCalendarDateActions(dataCtrl,uiCtrl,'${uiCtrl.modalActions.cookingDate.delete}',this)"
                            ${reg.cookingDate_status_id >= 6 ? 'disabled hidden' : ''}>
                            Delete
                        </button>
                    </div>
                ` : '' }
            </div>
        </div>
        `
    }
    var statusId = 0
    var monthCd = 0
    innerData = `${innerData}
    <style>
        .stateStyle{
            min-height: 45px;
            font-size: 1.58rem;
            overflow-wrap: break-word;
        }
        .monthStyle{
            min-height: 35px;
            font-size: 1.4rem;
            overflow-wrap: break-word;
        }

    </style>
    `
    tempData.forEach(reg => {
        if(subStateOne){
            if(statusId!==reg.cookingDate_status_id){
                statusId = reg.cookingDate_status_id
                monthCd = 0
                innerData = `${innerData}
                <div class="col-12 row borderBottom blackBG colNoMarging stateStyle"><strong>${reg.cookingDate_status}</strong></div>
                `
            }
        }
        if(monthCd!==reg.cdMonth){
            monthCd = reg.cdMonth
            innerData = `${innerData}
            <div class="col-12 row borderBottom darkGraykBG colNoMarging monthStyle"><strong>${reg.nmMonth}</strong></div>
            `
        }
        innerData= `${innerData} ${returnRepetitivePart(uiCtrl,appCtrl,reg,subStateOne,subStateTwo,subStateThree)}`
        counter += 1
    })
    return innerData
}
//inner data to populate table in dish substates
function returnInnerDataForDishSubStatesAndSearchMode(dataCtrl,uiCtrl,tempData,subStateOne,subStateTwo,subStateThree){
    var innerData = `
    <style>
        .darkBG{
            background:rgba(241,241,241,1)
        }
        .biggerFont{
            font-size: 1.5rem;
        }
        .wrapWord{
            overflow-wrap: break-word;
        }
        .bottomLine{
            border-bottom: darkgray .5px solid;
        }
        .leftLine{
            border-left: darkgray .5px solid;
        }
        .colNoMarging{
            margin:0;
            padding:0;
        }
        .innerTextMargin{
            padding-left:5px
        }
        .hrNoMargin{
            margin:0;
            padding:0;
        }
        .alignLeft{
            text-align:left;
        }
        .btnActions {
            background-size: 25px;
            background-repeat: no-repeat;
            background-position-y: center;
            padding-left: 30px;
            text-align: start;
            width: -webkit-fill-available;;
        }
        .btnPadding{
            padding-bottom:2px;
        }
        .breakWord {
            overflow-wrap: break-word;
        }
        .paddingLeftRight{
            padding-left: 2px;
            padding-right: 2px;
        }
        .stats{
            border-left: black 0.5px solid;
            border-right: black 0.5px solid;
        }
    </style>
    `
    var counter = 0 
    tempData.forEach(reg => {
        innerData = `${innerData}
        <div class=".container-fluid row w-100 mx-auto my-auto ${counter%2===0?'darkBG':''} bottomLine colNoMarging">
            <div class=".container-fluid col-8 row colNoMarging">
                <div class="col-12 col-md-6 alignLeft colNoMarging"><strong>Name: </strong></div>
                <div class="col-12 col-md-6 alignLeft colNoMarging">${reg.name}</div>
                <div class="col-12 col-md-6 alignLeft colNoMarging"><strong>Price: </strong></div>
                <div class="col-12 col-md-6 alignLeft colNoMarging">${reg.price === null || reg.price === '' ? '0.00' : parseFloat(reg.price).toFixed(2)}</div>
            </div>
            <div class=".container-fluid col-4 row colNoMarging">
                ${subStateOne || subStateTwo ?  `
                    <div class="col-12 col-md-6 colNoMarging btnPadding">
                        <button 
                            id="${uiCtrl.modalTypes.dish.viewDetails}-${reg.id}"
                            class="btn btn-outline-secondary btnActions" 
                            style="background-image: url(/img/viewIcon.png)" 
                            onclick="appCtrl.dishActions(dataCtrl,uiCtrl,uiCtrl.getIDs().modalActions.dish.viewDetails,this)" >
                            View
                        </button>
                    </div>
                ` : ''}
                ${subStateOne ? `
                    <div class="col-12 col-md-6 colNoMarging btnPadding">
                        <button 
                            id="${uiCtrl.modalTypes.dish.edit}-${reg.id}"
                            class="btn btn-outline-primary btnActions" 
                            style="background-image: url(/img/editIcon.png)" 
                            onclick="appCtrl.dishActions(dataCtrl,uiCtrl,uiCtrl.getIDs().modalActions.dish.edit,this)" >
                            Edit
                        </button>
                    </div>
                `: ``}
                ${subStateOne ? `
                    <div class="col-12 col-md-6 colNoMarging btnPadding">
                        <button 
                            id="${uiCtrl.modalTypes.dish.delete}-${reg.id}"
                            class="btn btn-outline-danger btnActions" 
                            style="background-image: url(/img/delete48.png)" 
                            onclick="appCtrl.dishActions(dataCtrl,uiCtrl,uiCtrl.getIDs().modalActions.dish.delete,this)" >
                            Delete
                        </button>
                    </div>
                `: ``}
            </div>
        </div>
            `
        counter += 1
    })
    return innerData
}
//inner data to populate table in dish substates
function returnInnerDataForCatoringSubStatesAndSearchMode(dataCtrl,uiCtrl,tempData,subStateOne,subStateTwo,subStateThree){
    var innerData = `
        <style>
            .blackBG{background:rgba(0,0,0,1);color:white;}
            .darkBG{background:rgba(241,241,241,1)}
            .biggerFont{font-size: 1.5rem;}
            .wrapWord{overflow-wrap: break-word;}
            .bottomLine{border-bottom: darkgray .5px solid;}
            .leftLine{border-left: darkgray .5px solid;}
            .colNoMarging{margin:0;padding:0;}
            .innerTextMargin{padding-left:5px}
            .hrNoMargin{margin:0;padding:0;}
            .alignLeft{text-align:left;}
            .btnActions {background-size: 25px;background-repeat: no-repeat;background-position-y: center;padding-left: 30px;text-align: start;width: -webkit-fill-available;}
            .btnPadding{padding-bottom:2px;}
            .breakWord {overflow-wrap: break-word;}
            .paddingLeftRight{padding-left: 2px;padding-right: 2px;}
            .stats{border-left: black 0.5px solid;border-right: black 0.5px solid;}
            .biggerFont{font-size:1.8rem;}
        </style>
        `
    var counter = 0 

    function returnStrongText(text){
        return `<strong>${text}</strong>`
    }
    tempData.forEach(reg => {
        innerData = `${innerData}
        <tr>
            <td>${reg.read === 0 ? returnStrongText(reg.name) : reg.name}</td>
            <td>${reg.read === 0 ? returnStrongText(reg.email) : reg.email}</td>
            <td>${reg.read === 0 ? returnStrongText(reg.phoneNumber) : reg.phoneNumber}</td>
            <td>${reg.read === 0 ? returnStrongText(reg.createdIn) : reg.createdIn}</td>
            ${subStateOne ? `<td>${reg.read === 0 ? returnStrongText(reg.readIn) : reg.readIn}</td>` : ''}
            ${subStateTwo ? `<td>${reg.read === 0 ? returnStrongText(reg.archivedIn) : reg.archivedIn}</td>` : ''}
            ${subStateThree ? `<td>${reg.read === 0 ? returnStrongText(reg.excludedIn) : reg.excludedIn}</td>` : ''}
            <td class="editMode"> <button id="${uiCtrl.modalTypes.catoring.read}-${reg.id}"  onclick="appCtrl.catoringActions(dataCtrl,uiCtrl,uiCtrl.getIDs().modalActions.catoring.read,this)" style="border:none"><img src="/img/viewIcon.png" alt="Edit" height="25px"></button></td>
            ${subStateOne ? `<td class="editMode"> <button id="${uiCtrl.modalTypes.catoring.archive}-${reg.id}"  onclick="appCtrl.catoringActions(dataCtrl,uiCtrl,uiCtrl.getIDs().modalActions.catoring.archive,this)" style="border:none"><img src="/img/archived.png" alt="Edit" height="25px"></button></td>` : ''}
            ${subStateOne ? `<td class="editMode"> <button id="${uiCtrl.modalTypes.catoring.delete}-${reg.id}"  onclick="appCtrl.catoringActions(dataCtrl,uiCtrl,uiCtrl.getIDs().modalActions.catoring.delete,this)" style="border:none"><img src="/img/delete48.png" alt="Edit" height="25px"></button></td>` : ''}
        </tr>
        `
    })
    return innerData
}
//inner data to populate table in dish substates
function returnInnerDataForOrderSubStatesAndSearchMode(dataCtrl,uiCtrl,tempData,subStateOne,subStateTwo,subStateThree = false,subStateFour = false,subStateFive=false){
    var innerData = `
    <style>
        .stateStyle{min-height: 35px;font-size: 1.4rem;}
        .cdStyle{min-height: 45px;font-size: 1.58rem;}
        .blackBG{background:rgba(0,0,0,1);color:white;}
        .darkGraykBG{background:rgba(108,108,108,1);color:white;}
        .darkBG{background:rgba(241,241,241,1);}
        .wrapWord{overflow-wrap: break-word;}
        .bottomLine{border-bottom: darkgray .5px solid;}
        .leftLine{border-left: darkgray .5px solid;}
        .colNoMarging{margin:0;padding:0 1px;}
        .btnMarginTopBottom:{padding-top:1px;padding-bottom:1px}
        .innerTextMargin{padding-left:5px;}
        .hrNoMargin{margin:0;padding:0;}
        .alignLeft{text-align:left;}
        .btnActions {background-size: 25px;background-repeat: no-repeat;background-position-y: center;padding-left: 30px;text-align: start;width: -webkit-fill-available;}
        .btnPadding{padding-bottom:2px;}
        .paddingLeftRight{padding-left: 2px;padding-right: 2px;}
        .stats{border-left: black 0.5px solid;border-right: black 0.5px solid;}
        .biggerFont{font-size:1.8rem;}
        .textCenter{text-aligh:center}
    </style>
    `
    
    function returnRepetitivePart(reg){
        var iconImage = returnOrderStatusIcon(reg)
        //CODE TO VIEW DETAILS OF ORDERS
        //     <td> <button id="${uiCtrl.modalTypes.order.viewDetails}-${reg.orderId}" onclick="uiCtrl.showHideAlert('alert-info','${reg.orderStatus}','show')" style="border:none"><img src="/img/${iconImage}.png" alt="Edit" height="25px"></button></td>
        return `
        <div class=".container-fluid row w-100 mx-auto my-auto ${counter%2===0?'darkBG':''} bottomLine colNoMarging">
            <div class=".container-fluid col-4 row colNoMarging">
                <div class="col-12 col-md-4 alignLeft colNoMarging"><strong>Order: </strong></div>
                <div class="col-12 col-md-8 textCenter biggerFont colNoMarging">${reg.orderId}${reg.order_status_id===5||reg.order_status_id===8||reg.order_status_id===9||reg.order_status_id===10?'<i style="font-size:0.8rem">paid</i>':reg.order_status_id===13? '<i style="font-size:0.8rem">reimbursed</i>' :''}</div>
                <div class="col-12 col-md-4 alignLeft colNoMarging"><strong>Amount due: </strong></div>
                <div class="col-12 col-md-8 textCenter colNoMarging">${reg.orderTotal === null || reg.orderTotal === '' ? 'U$ 0.00' : `U$ `+ parseFloat(parseFloat(reg.orderTotal)*reg.dishes[0].dishQtty).toFixed(2)}</div>
                <div class="col-12 wrapWord colNoMarging text-right"><i>${reg.orderStatus}</i></div>
                <div class="col-12 col-md-4 alignLeft colNoMarging"><strong>Meals: </strong></div>
                <div class="col-12 col-md-8 textCenter biggerFont colNoMarging">${reg.totalMeals}</div>
            </div>
            <div class=".container-fluid col-4 row leftLine colNoMarging">
                <div class="col-12 col-md-4 alignLeft colNoMarging"><strong>Email: </strong></div>
                <div class="col-12 col-md-8 alignLeft colNoMarging wrapWord">${reg.email}</div>
                <div class="col-12 col-md-4 alignLeft colNoMarging wrapWord"><strong>Name: </strong></div>
                <div class="col-12 col-md-8 alignLeft colNoMarging">${reg.name}</div>
            </div>
            <div class=".container-fluid col-4 row leftLine colNoMarging btnMarginTopBottom">
                <div class="col-12 col-md-6 colNoMarging btnPadding">
                    <button 
                        id="${uiCtrl.modalTypes.order.viewDetails}-${reg.orderId}"
                        class="btn btn-outline-secondary btnActions" 
                        style="background-image: url(/img/viewIcon.png)" 
                        onclick="appCtrl.orderActions(dataCtrl,uiCtrl,uiCtrl.getIDs().modalActions.order.viewDetails,this)"  >
                        View
                    </button>
                </div>
                ${subStateOne || subStateFive ?  `
                    <div class="col-12 col-md-6 colNoMarging btnPadding">
                        <button 
                            id="${uiCtrl.modalTypes.order.notify}-${reg.orderId}"
                            class="btn btn-outline-warning btnActions" 
                            style="background-image: url(/img/sendNotification.png)" 
                            onclick="appCtrl.orderActions(dataCtrl,uiCtrl,uiCtrl.getIDs().modalActions.order.notify,this)"  >
                            Notify
                        </button>
                    </div>
                ` : ''}
                ${subStateOne && (reg.order_status_id === 5 ||reg.order_status_id === 8||reg.order_status_id === 9) ?  `
                    <div class="col-12 col-md-6 colNoMarging btnPadding">
                        <button 
                            id="${uiCtrl.modalTypes.order.reimburse}-${reg.orderId}"
                            class="btn btn-outline-dark btnActions" 
                            style="background-image: url(/img/sendNotification.png)" 
                            onclick="appCtrl.orderActions(dataCtrl,uiCtrl,uiCtrl.getIDs().modalActions.order.reimburse,this)"  >
                            Reimburse
                        </button>
                    </div>
                ` : ''}
                ${subStateOne && reg.order_status_id < 5 ?  `
                    <div class="col-12 col-md-6 colNoMarging btnPadding">
                        <button 
                            id="${uiCtrl.modalTypes.order.delete}-${reg.orderId}"
                            class="btn btn-outline-danger btnActions" 
                            style="background-image: url(/img/delete48.png)" 
                            onclick="appCtrl.orderActions(dataCtrl,uiCtrl,uiCtrl.getIDs().modalActions.order.delete,this)"   >
                            Delete
                        </button>
                    </div>
                ` : ''}
                ${subStateFour && reg.order_status_id < 10 ?  `
                    <div class="col-12 col-md-6 colNoMarging btnPadding">
                        <button 
                            id="${uiCtrl.modalTypes.order.deliver}-${reg.orderId}"
                            class="btn btn-outline-info btnActions" 
                            style="background-image: url(/img/delivered.png)" 
                            onclick="appCtrl.orderActions(dataCtrl,uiCtrl,uiCtrl.getIDs().modalActions.order.deliver,this)"   >
                            Deliver
                        </button>
                    </div>
                ` : ''}
            </div>
        </div>
            `
        // <tr>
        //     <td><strong>${reg.orderId}</strong></td>
        //     <td>${reg.email}</td>
        //     ${subStateThree ? '<td>'+ reg.excludedIn + '</td>' : ''}
        //     <td>${reg.totalMeals}</td>
        //     <td>${reg.orderTotal.toFixed(2)*reg.dishes[0].dishQtty}</td>
        //     <td class="editMode"> <button id="${uiCtrl.modalTypes.order.viewDetails}-${reg.orderId}" onclick="appCtrl.orderActions(dataCtrl,uiCtrl,uiCtrl.getIDs().modalActions.order.viewDetails,this)" style="border:none"><img src="/img/viewIcon.png" alt="Edit" height="25px"></button></td>
        //     ${subStateOne ? `<td class="editMode"> ${reg.order_status_id <5 ? `<button id="${uiCtrl.modalTypes.order.delete}-${reg.orderId}" onclick="appCtrl.orderActions(dataCtrl,uiCtrl,uiCtrl.getIDs().modalActions.order.delete,this)" style="border:none"><img src="/img/delete48.png" alt="Edit" height="25px"></button>`: ''}</td>` : ''}
        //     ${subStateFour ? `<td class="editMode"> ${reg.order_status_id < 10 ? `<button id="${uiCtrl.modalTypes.order.deliver}-${reg.orderId}" onclick="appCtrl.orderActions(dataCtrl,uiCtrl,uiCtrl.getIDs().modalActions.order.deliver,this)" class="btn btn-info" style="border:none">Deliver</button>`: '<strong><i>Delivered</i></strong>'}</td>` : ''}
        // </tr>
    }
    var cdId = 0
    var status = 0
    var counter = 0
    tempData.forEach(reg => {
        if(cdId!==reg.cookingDates_id){
            cdId = reg.cookingDates_id
            status = 0
            innerData = `${innerData} 
            <div class="col-12 row borderBottom blackBG colNoMarging cdStyle wrapWord"><strong>${reg.cookingDate.split(' ')[0]} at ${reg.street}, ${reg.city} - ${reg.state}</strong></div>
            `}
        if(status!==reg.order_status_id){
            status=reg.order_status_id
            innerData = `${innerData}
            <div class="col-12 row borderBottom darkGraykBG colNoMarging stateStyle wrapWord"><strong>${reg.orderStatus}</strong></div>
            `}
        innerData = `${innerData} ${returnRepetitivePart(reg)}`
        counter += 1
    })
    return innerData
}
//return dynamic element part for listing orders
function returnDynamicElementsForCookingDateListOrdersModal(uiCtrl,tempData){
    console.log('dynamicElemenstsListingOrders->',tempData)
    tempData.sort((a,b)=> {
        if(a.order_status_id>b.order_status_id){return -1 }
        if(a.order_status_id<b.order_status_id){return 1 }
        if(a.orderId<b.orderId){return -1 }
        if(a.orderId>b.orderId){return 1 }
        return 0
    })
    var innerData = `
    <style>
        .blackBG{background:black;color:white;min-height:35px;}
        .darkBG{background:rgba(241,241,241,1)}
        .biggerFont{font-size: 1.5rem;}
        .wrapWord{overflow-wrap: break-word;}
        .bottomLine{border-bottom: darkgray .5px solid;}
        .leftLine{border-left: darkgray .5px solid;}
        .colNoMarging{margin:0;padding:0 2px;}
    </style>
    `
    var statusId = 0
    var counter = 0 
    tempData.forEach(order => {
        if(statusId!==order.order_status_id){
            statusId=order.order_status_id
            innerData = `${innerData}
            <div class="col-12 w-100 blackBG colNoMarging">
                ${order.orderStatus}
            </div>
            `}
        innerData = `${innerData}
        <div class=".container-fluid row w-100 mx-auto my-auto ${counter%2===0? 'darkBG' : ''} wrapWord bottomLine colNoMarging"> 
            <div class=".container-fluid col-6 row colNoMarging"> 
                <div class=".container-fluid col-12 row colNoMarging">
                    <div class=".container-fluid col-12 col-md-4 colNoMarging"><strong>Order nr.:</strong></div>
                    <div class=".container-fluid col-12 col-md-8 biggerFont colNoMarging">${order.orderId}</div>
                </div>
                <div class=".container-fluid col-12 row colNoMarging">
                    <div class=".container-fluid col-12 col-md-4 colNoMarging"><strong>Status</strong></div>
                    <div class=".container-fluid col-12 col-md-8 wrapWord colNoMarging" style="text-align: right;">${order.orderStatus}</div>
                </div>
                <div class=".container-fluid col-12 row colNoMarging">
                    <div class=".container-fluid col-12 col-md-4 colNoMarging"><strong>Meals:</strong></div>
                    <div class=".container-fluid col-12 col-md-8 biggerFont colNoMarging">${order.dishes[0].dishQtty}</div>
                </div>
            </div>
            <div class=".container-fluid col-6 row leftLine colNoMarging"> 
                <div class=".container-fluid col-12 row colNoMarging">
                    <div class=".container-fluid col-12 col-md-4 colNoMarging"><strong>Email:</strong></div>
                    <div class=".container-fluid col-12 col-md-8 wrapWord colNoMarging">${order.email}</div>
                </div>
                <div class=".container-fluid col-12 row colNoMarging">
                    <div class=".container-fluid col-12 col-md-4 colNoMarging"><strong>Name:</strong></div>
                    <div class=".container-fluid col-12 col-md-8 wrapWord colNoMarging">${order.email}</div>
                </div>
            </div>
        </div>
        `
        counter += 1
    })
    return innerData
}
//return form elements for new dish form
function returnFormElementsForNewDishForm(uiCtrl){
    return `
    <div class=".container-fluid mx-auto my-auto w-100 text-center">
    <hr>
        <div class="h4">New dish</div>
        <div class="container mx-auto my-auto w-100 text-center">
            <div class="row w-100 my-auto mx-auto">
                <div class="col-12 col-lg-2">
                    <p><strong>Name:</strong></p>
                </div>
                <div class="col-12 col-lg-10">
                    <input type="text" name="${uiCtrl.formsNames.newDishInfo}" id="${uiCtrl.inputs.dishes.ids.name}" class="w-100" placeholder="Information required">
                </div>
                <div class="col-12 col-lg-2">
                    <p><strong>Price:</strong></p>
                </div>
                <div class="col-12 col-lg-10">
                    <input type="text" name="${uiCtrl.formsNames.newDishInfo}" id="${uiCtrl.inputs.dishes.ids.price}" class="w-100" oninput="if(!this.value.match(/^[0-9]{0,}\\.{0,1}[0-9]{0,2}$/)){
                            this.value = ''
                            uiCtrl.showHideAlert('alert-danger','Invalid price!','show')    
                        }
                    " placeholder="Information required">
                </div>
                <div class="col-12 col-lg-2 text-left">
                    <p><strong>Description:</strong></p>
                </div>
                <div class="col-12 col-lg-10">
                    <input type="text" name="${uiCtrl.formsNames.newDishInfo}" id="${uiCtrl.inputs.dishes.ids.description}" class="w-100">
                </div>
                <div class="col-12 col-lg-2 text-left">
                    <p><strong>Ingredients:</strong></p>
                </div>
                <div class="col-12 col-lg-10">
                    <input type="text" name="${uiCtrl.formsNames.newDishInfo}" id="${uiCtrl.inputs.dishes.ids.ingredients}" class="w-100">
                </div>
            </div>
            
        </div>
    <hr>
    </div>
    `
}
//return order status icon
function returnOrderStatusIcon(order){
    var iconImage = ''
    if(order.order_status_id<=2){
            iconImage = 'waitingIcon'
        }
        if(order.order_status_id===3){
            iconImage = 'userConsent'
        }
        if(order.order_status_id===4){
            iconImage = 'waitingDropout'
        }
        if(order.order_status_id===5){
            iconImage = 'userConfirmed'
        }
        if(order.order_status_id===6){
            iconImage = 'userDeclined'
        }
        if(order.order_status_id===7){
            iconImage = 'notMadeToList'
        }
        if(order.order_status_id===8){
            iconImage = 'waitingPickup'
        }
        if(order.order_status_id===9){
            iconImage = 'waitingPickup'
        }
        if(order.order_status_id===10){
            iconImage = 'delivered'
        }
        if(order.order_status_id===11){
            iconImage = 'sleepingUser'
        }
        if(order.order_status_id===12){
            iconImage = 'confirmationTimeOver'
        }
        if(order.order_status_id===999){
            iconImage = 'orderCanceled'
        }
    return iconImage
}
//masks phone number
function phoneNumberMask(phoneNumber){
    if(phoneNumber===null||phoneNumber===''){
        console.log('phoneNumbne -> ',phoneNumber)
        return phoneNumber
    }
    var numbers = phoneNumber.replace(/\D/ig,'')
    console.log('numbers->',numbers)
    if(numbers.length===10){
        return `(${numbers.substr(0,3)}) ${numbers.substr(3,3)}-${numbers.substr(6,4)}`
    }
    return numbers
}