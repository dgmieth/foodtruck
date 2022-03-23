const appCtrl = new AppCtrl()
const dataCtrl = new DataCtrl()
const uiCtrl = new UICtrl()

//appCtrl.fetchOrdersForActiveFinishedCookingDates(dataCtrl,uiCtrl)
appCtrl.fetchJWToken(dataCtrl,uiCtrl)
appCtrl.loadAppStateEventListeners(dataCtrl,uiCtrl)
appCtrl.toggleSidebar(null,uiCtrl)