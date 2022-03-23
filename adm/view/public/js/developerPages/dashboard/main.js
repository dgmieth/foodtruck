const appCtrl = new AppCtrl()
const dataCtrl = new DataCtrl()
const uiCtrl = new UICtrl()

appCtrl.loadAppStateEventListeners(dataCtrl,uiCtrl)