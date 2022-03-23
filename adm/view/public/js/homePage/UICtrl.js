class UICtrl {
    constructor() {
        this.alert = {
            alert: 'alertBox',
            text: 'alertText'
        }
        this.spinner = {
            spinner: 'main-content-spinner'
        }
        this.modals = {
            firstLevelModal: 'firstLevelModal',
            firstLevelModalContent: 'firstLevelModalContent',
            secondLevelModal: 'secondLevelModal',
            secondLevelModalContent: 'secondLevelModalContent',
            
        }
        this.forms = {
            login: 'formLogin',
            catering: 'formCatering',
            personalData:'personalData',
            pedidos:'formPedidos',
            registrar: 'formRegistrar',
            senha:'formSenha',
            pagar: 'formPagar',
            recuperarSenha:'recuperarSenha'
        }
        this.elementIds = {
            calendar: 'calendarId',
            calendarViewInformation:'calendarViewInformation',
            precoUnitario: 'precoUnitario',
            precoTotal: 'precoTotal',
            qtdeDePedidos: 'qtdeDePedidos',
            personaData1: {
                name: 'name',
                email: 'email',
                celular: 'celular',

            }
        }
        this.buttons = {
            classes: {
                personaData: 'btnPersonalData'
            }
        }
    }

    showHideFirstLevelModals(appCtrl,dataCtrl){
        if(appCtrl.getFirstLevelType === appCtrl.getFirstLevelModalTypes.login){
            document.getElementById(this.modals.firstLevelModalContent).innerHTML = `
            <div class="modal-header">
                <h5 class="modal-title" id="TituloModalCentralizado">Logar na minha conta</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form">
                    <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                    <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                    <div class=".container-fluid mx-auto my-auto w-75">
                        <label class="w-100">
                            E-mail:
                            <input id="email" name="${this.forms.login}" placeholder="E-mail" type="email" class="w-75" autocomplete="off" required>
                        </label>
                    </div>
                    <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                    <div class=".container-fluid mx-auto my-auto w-75">
                        <label class="w-100">
                            Senha:
                            <input id="password" n placeholder="Sua senha de 3-20 digitos" name="${this.forms.login}" class="w-75" type="password" autocomplete="off" maxlength="20" required>
                        </label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" onclick="appCtrl.loginUser('${this.forms.login}',dataCtrl,uiCtrl)" class="btn btn-primary">Log in</button>
            </div>
            <div class="modal-footer">
                <div class="w-100 text-right">
                    <h6 class="modal-title" style="text-align:right!important" id="TituloModalCentralizadoRecuperaSenha">Esqueceu sua senha?</h6>
                </div>
                <button id="editSenha" type="button" class="btn btn-warning" onclick="appCtrl.setSecondLevelModalType=appCtrl.getSecondLevelModalTypes.recuperar;uiCtrl.showHideSecondLevelModals(appCtrl,dataCtrl)">Recuperar senha</button>
            </div>
            <div class="modal-footer">
                <h6 class="modal-title" id="TituloModalCentralizado">Não tem uma conta conosco ainda?</h6>
                    <div class=".container-fluid text-right">
                        <div style="text-align:right">
                            <button id="googleRegister" type="button" onclick="appCtrl.setSecondLevelModalType=appCtrl.getSecondLevelModalTypes.registration;uiCtrl.showHideSecondLevelModals(appCtrl,dataCtrl)" class="btn btn-primary">Registrar</button>
                        </div>
                        <div style="text-align:right">
                            <p> - ou - </p>
                        </div>
                        <div style="text-align:right">
                            <div id="my-signin2"></div>
                        </div>
                    </div>
                
            </div>
            `
        }
        if(appCtrl.getFirstLevelType === appCtrl.getFirstLevelModalTypes.catering){
            document.getElementById(this.modals.firstLevelModalContent).innerHTML = `
            <div class="modal-header">
                <h5 class="modal-title" id="TituloModalCentralizado">Catering para eventos</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form">
                    <div class=".container-fluid mx-auto my-auto w-75">
                        <label class="w-100">
                            E-mail:
                            <input id="email" name="${this.forms.catering}" placeholder="fulano@mail.com" type="email" class="w-75" autocomplete="off" required>
                        </label>
                    </div>
                    <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                    <div class=".container-fluid mx-auto my-auto w-75">
                        <label class="w-100">
                            Nome:
                            <input id="name" name="${this.forms.catering}" placeholder="Fulado de tal" type="text" class="w-75" autocomplete="off" required>
                        </label>
                    </div>
                    <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                    <div class=".container-fluid mx-auto my-auto w-75">
                        <label class="w-100">
                            Celuar:
                            <input id="celular" name="${this.forms.catering}" placeholder="(00) 00000-0000" oninput="this.value = phoneNumberMask(this.value)" type="text" class="w-75" autocomplete="off" maxlength="11" required>
                        </label>
                    </div>
                    <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                    <div class=".container-fluid mx-auto my-auto w-75">
                        <textarea id="email" name="${this.forms.catering}" placeholder="Descreva o evento" class="w-100" autocomplete="off" required></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary">Enviar mensagem</button>
            </div>
            `
        }
        if(appCtrl.getFirstLevelType === appCtrl.getFirstLevelModalTypes.calendar){
            document.getElementById(this.modals.firstLevelModalContent).innerHTML = `
            <div class="modal-header">
                <h5 class="modal-title" id="TituloModalCentralizado">Calendario de eventos</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class=".container-fuild mx-auto my-auto text-center" style="width:15%!important"></div>
                <div class=".container-fuild mx-auto my-auto text-center row" style="width:70%!important">
                    Clique no botao abaixo. Eventos ocorrerao nas data que tenham um ponto sob o numero do dia. Se voce esta acessando desde um celular ou tablet, voce nao vera os pontos. Devera clicar nas datas para ver quando havera algum evento.
                    <div class="col-12">
                        <input id="${this.elementIds.calendar}" type="text" placeholder="Clique aqui para selecionar uma data..." data-id="datetime" readonly="readonly">
                    </div>
                    <div id="${this.elementIds.calendarViewInformation}" class="col-12 w-100">

                    </div>
                </div>
                <div class=".container-fuild mx-auto my-auto text-center" style="width:15%!important"></div>
            </div>
            `
        }
        if(appCtrl.getFirstLevelType === appCtrl.getFirstLevelModalTypes.personalData){
            document.getElementById(this.modals.firstLevelModalContent).innerHTML = `
            <div class="modal-header">
                <h5 class="modal-title" id="TituloModalCentralizado">Minhas informacoes</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form">
                    <div class=".container-fluid mx-auto my-auto w-75">
                        <label class="w-100">
                            E-mail:
                            <div id="email" name="${this.forms.personalData}" class="w-75">fulano@mail.com</div>
                        </label>
                    </div>
                    <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                    <div class=".container-fluid mx-auto my-auto w-75">
                        <label class="w-100">
                            Nome:
                            <input id="name" name="${this.forms.personalData}" placeholder="Fulado de Tal" value="Fulado de Tal" type="text" class="w-75" autocomplete="off" required disabled>
                        </label>
                    </div>
                    <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                    <div class=".container-fluid mx-auto my-auto w-75">
                        <label class="w-100">
                            Celular:
                            <input id="celular" name="${this.forms.personalData}" placeholder="(00) 00000-0000" value="${phoneNumberMask('00000000000')}" oninput="this.value = phoneNumberMask(this.value)" type="text" class="w-75" autocomplete="off" maxlength="11" required disabled>
                        </label>
                    </div>
                    <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                    <div class=".container-fluid mx-auto my-auto w-75">
                        <label class="w-100">
                            Usuario facebook:
                            <input id="facebookUser" name="${this.forms.personalData}" placeholder="Nome usuario facebook" value="Fulado de Tal" type="text" class="w-75" autocomplete="off" disabled>
                        </label>
                    </div>
                    <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                    <div class=".container-fluid mx-auto my-auto w-75">
                        <label class="w-100">
                            Usuario instagram:
                            <input id="name" name="${this.forms.personalData}" placeholder="Nome usuario instagram" value="Fulado de Tal" type="text" class="w-75" autocomplete="off" disabled>
                        </label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="editSenha" type="button" class="btn btn-danger ${this.buttons.classes.personaData}" onclick="appCtrl.setSecondLevelModalType=appCtrl.getSecondLevelModalTypes.senha;uiCtrl.showHideSecondLevelModals(appCtrl,dataCtrl)" >Alterar senha</button>
                <button id="editInfo" type="button" class="btn btn-warning ${this.buttons.classes.personaData}" onclick="appCtrl.enableDisableInputs('${this.forms.personalData}',false);appCtrl.showHideButtons('${this.buttons.classes.personaData}')">Editar</button>
                <button type="button" class="btn btn-secondary ${this.buttons.classes.personaData}" data-dismiss="modal" hidden>Fechar</button>
                <button type="button" class="btn btn-primary ${this.buttons.classes.personaData}" hidden>Salvar</button>
            </div>
            `
        }
        if(appCtrl.getFirstLevelType === appCtrl.getFirstLevelModalTypes.none){return  this.showModal('hide')}
        this.showModal('show')
    }
    showHideSecondLevelModals(appCtrl,dataCtrl){
        if(appCtrl.getSecondLevelType===appCtrl.getSecondLevelModalTypes.pagar){
            var yearOptions = ''
            for(let i = 0; i<=19;i++){
                yearOptions = `${yearOptions}
                <option value="${(new Date).getFullYear()+i}">${(new Date).getFullYear()+i}</option>
                `
            }
            document.getElementById(this.modals.secondLevelModalContent).innerHTML = `
            <style>
                .textAlign{ 
                    text-align: left;
                }
                .infoBoxes {
                    margin:0!important;
                    padding:0!important;
                    margin: 15px!important;
                }
                .textArea {
                    min-height: 150px;
                    padding: 2px 3px;
                    margin: 15px 0;
                    width: 100%;
                    border: solid black .3px;
                    text-align:left;
                }
                .textArea>p {
                    margin:0
                }
            </style>
            <div class="modal-header">
                <h5 class="modal-title textAlign" id="TituloModalCentralizado">Pagar pedido</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <br>
            <div class=".container-fluid mx-auto my-auto w-75 infoBoxes">
                <label class="w-100  textAlign">
                    <strong>Numero cartao:</strong>
                    <input id="pay01" name="${this.forms.pagar}" placeholder="0000 0000 0000 0000" oninput="this.value = creditCardMask(this.value)" type="text" class="w-75" autocomplete="off" maxlength="19" required>
                </label>
            </div>
            <div class=".container-fluid mx-auto my-auto w-75 infoBoxes">
                <label class="w-100  textAlign">
                    <strong>Codigo cartao:</strong>
                    <input id="pay02" name="${this.forms.pagar}" placeholder="123" oninput="this.value = this.value.replace(/\D/ig,'')" type="text" class="w-75" autocomplete="off" maxlength="4" required>
                </label>
            </div>
            <div class=".container-fluid mx-auto my-auto w-75 infoBoxes">
                <label class="w-100  textAlign">
                    <strong>Validade cartao:</strong>
                    <div class="container w-100 mx-auto my-auto row infoBoxes">
                        <div class="col-12 col-md-2"><strong>Mes:</strong></div>
                        <div class="col-12 col-md-2">
                            <select id="pay03" name="${this.forms.pagar}">
                                <option value="01">Jan</option>
                                <option value="02">Fev</option>
                                <option value="03">Mar</option>
                                <option value="04">Abr</option>
                                <option value="05">Mai</option>
                                <option value="06">Jun</option>
                                <option value="07">Jul</option>
                                <option value="08">Ago</option>
                                <option value="09">Set</option>
                                <option value="10">Out</option>
                                <option value="11">Nov</option>
                                <option value="12">Dez</option>
                            </select>
                            <!-- <input id="mesCartao2" name="${this.forms.pagar}" min="1" max="12" placeholder="${(new Date).getMonth()+1}" oninput="this.value = this.value.replace(/\D/ig,'')" type="text" class="w-50" autocomplete="off" maxlength="2" required> -->
                        </div>
                        <div class="col-12 col-md-2"><strong>Ano:</strong></div>
                        <div class="col-12 col-md-4">
                            <select id="pay04" name="${this.forms.pagar}">
                                ${yearOptions}
                            </select>
                            <!-- <input id="anoCartao2" name="${this.forms.pagar}" min="${(new Date).getFullYear()}" placeholder="${(new Date).getFullYear()}" max="${(new Date).getFullYear()+20}" oninput="this.value = this.value.replace(/\D/ig,'')" type="text" class="w-50" autocomplete="off" maxlength="4" required>-->
                        </div>
                    </div>
                </label>
            </div>
            <div class=".container-fluid mx-auto my-auto w-75">
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary"
                onclick="appCtrl.payOrder('${this.forms.pagar}',dataCtrl,uiCtrl)"
                >Pagar</button>
            </div>
            `
        }
        if(appCtrl.getSecondLevelType===appCtrl.getSecondLevelModalTypes.senha){
            document.getElementById(this.modals.secondLevelModalContent).innerHTML = `
            <div class="modal-header">
                <h5 class="modal-title" id="TituloModalCentralizado">Alteracao de senha</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class=".container-fluid w-100" style="height: 15px!important;"></div>
            <div class=".container-fluid mx-auto my-auto w-75">
                <label class="w-100">
                    Senha atual:
                    <input id="passwordAtual2" n placeholder="Sua senha de 8 digitos" name=""${this.forms.senha}" style="height:65%!important" type="password" autocomplete="off" maxlength="8" required>
                </label>
            </div>
            <div class=".container-fluid w-100" style="height: 15px!important;"></div>
            <br>
            <div class=".container-fluid mx-auto my-auto w-75">
                <label class="w-100">
                    Senha:
                    <input id="passwordNew2" n placeholder="Sua senha de 8 digitos" name=""${this.forms.senha}" style="height:65%!important" type="password" autocomplete="off" maxlength="8" required>
                </label>
            </div>
            <div class=".container-fluid mx-auto my-auto w-75">
                <label class="w-100">
                    Confirmacao da senha:
                    <input id="passwordNewConfirmatioin2" n placeholder="Sua senha de 8 digitos" name=""${this.forms.senha}" style="height:65%!important" type="password" autocomplete="off" maxlength="8" required>
                </label>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary">Alterar senha</button>
            </div>
            `
        }
        if(appCtrl.getSecondLevelType===appCtrl.getSecondLevelModalTypes.registration){
            document.getElementById(this.modals.secondLevelModalContent).innerHTML = `
            <style>
                .inputGroups{
                    margin: 5px auto!important;
                }
                .inputs{
                    height: 65%!important;
                    width: 50%;
                }
            </style>
            <div class="modal-header">
                <h5 class="modal-title" id="TituloModalCentralizado">Criacao de conta</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="form">
                <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                    <div class=".container-fluid mx-auto my-auto w-75 inputGroups">
                        <label class="w-100">
                            E-mail:
                            <input id="email2" class="inputs" name="${this.forms.registrar}" placeholder="fulano@mail.com" type="email" style="height:65%!important" autocomplete="off">
                        </label>
                    </div>
                    <div class=".container-fluid mx-auto my-auto w-75 inputGroups">
                        <label class="w-100">
                            Nome:
                            <input id="nome2" class="inputs" name="${this.forms.registrar}" placeholder="Fulano de tal" type="text" style="height:65%!important" autocomplete="off">
                        </label>
                    </div>
                    <div class=".container-fluid mx-auto my-auto w-75 inputGroups">
                        <label class="w-100">
                            Celular:
                            <input id="celular2" class="inputs" name="${this.forms.registrar}" oninput="this.value = phoneNumberMask(this.value)" placeholder="(00) 00000-0000" maxlength="15" type="text" style="height:65%!important" autocomplete="off">
                        </label>
                    </div>
                    <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                    <br>
                    <div class=".container-fluid mx-auto my-auto w-75">
                        <label class="w-100">
                        Usuario facebook:
                            <input id="facebookUser2" class="inputs" name="${this.forms.registrar}" placeholder="Nome usuario facebook" type="text" autocomplete="off">
                        </label>
                    </div>
                    <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                    <div class=".container-fluid mx-auto my-auto w-75">
                        <label class="w-100">
                            Usuario instagram:
                            <input id="instagramUser2" class="inputs" name="${this.forms.registrar}" placeholder="Nome usuario instagram"  type="text" autocomplete="off">
                        </label>
                    </div>
                    <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                    <br>
                    <div class=".container-fluid mx-auto my-auto w-75 inputGroups">
                        <label class="w-100">
                            Senha:
                            <input id="password2" class="inputs" placeholder="Sua senha de 3-20 digitos" name="${this.forms.registrar}" style="height:65%!important" type="password" autocomplete="off" maxlength="8">
                        </label>
                    </div>
                    <div class=".container-fluid mx-auto my-auto w-75 inputGroups">
                        <label class="w-100">
                            Confirmacao da senha:
                            <input id="passwordConfirmatioin2" class="inputs" placeholder="Sua senha de 3-20 digitos" name="${this.forms.registrar}" style="height:65%!important" type="password" autocomplete="off" maxlength="8">
                        </label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" onclick="
                    appCtrl.registerUser('${this.forms.registrar}',dataCtrl,uiCtrl)
                " class="btn btn-primary">Criar conta</button>
            </div>
            `
        }
        if(appCtrl.getSecondLevelType===appCtrl.getSecondLevelModalTypes.recuperar){
            document.getElementById(this.modals.secondLevelModalContent).innerHTML = `
                <div class="modal-header">
                    <h5 class="modal-title" id="TituloModalCentralizado">Recuperação de senha</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class=".container-fluid mx-auto my-auto w-75">
                    <p>Informe o e-mail que voce usou para se registrar no nosso sistema para rececer um e-mail com um link para recuperar a sua senha.</p>
                    <label class="w-100">
                        E-mail:
                        <input id="email2" name="${this.forms.recuperarSenha}" placeholder="fulano@mail.com" type="email" style="height:65%!important" autocomplete="off" required>
                    </label>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    <button type="button" onclick="
                        appCtrl.requestRecoverPasswordEmail('${this.forms.recuperarSenha}',dataCtrl,uiCtrl)
                    " 
                    class="btn btn-primary">Enviar</button>
                </div>
              `
        }
        if(appCtrl.getSecondLevelType===appCtrl.getSecondLevelModalTypes.pedidos){
            console.log('secondLevelCalled')
            var btn = ''
            if(dataCtrl.fetchData('hasOrderInEvent')){
                if(dataCtrl.fetchData('updatableStatusId').includes(dataCtrl.fetchData('eventStatus').id)){
                    btn = `
                    <button type="button" class="btn btn-warning"
                    onclick="appCtrl.updateOrder('${this.forms.pedidos}',dataCtrl,uiCtrl)"
                    >Atualizar pedido</button>
                    <button type="button" 
                    onclick="appCtrl.deleteOrder(dataCtrl,uiCtrl)"
                    class="btn btn-danger">Deletar pedido</button>
                    `
                }else{
                    if(dataCtrl.fetchData('payableStatusId').includes(dataCtrl.fetchData('eventStatus').id) && dataCtrl.fetchData('orderStatus')===3){
                        console.log('payableStatus')
                        btn = `
                            <button type="button" class="btn btn-success" 
                            onclick="
                            appCtrl.setSecondLevelModalType=appCtrl.getSecondLevelModalTypes.pagar;
                            uiCtrl.showHideSecondLevelModals(appCtrl,dataCtrl)" 
                            >Pagar pedido</button>
                            <button type="button" class="btn btn-danger"
                            onclick="appCtrl.deleteSelectedOrder(dataCtrl,uiCtrl)"
                            >Deletar pedido</button>
                        `
                    }else{
                        this.showHideAlert(`alert-info`, `O status de seu pedido e: ${dataCtrl.fetchData('orderStatusName')}`,'show')
                    }
                }
            }else{
                if(dataCtrl.fetchData('orderableStatusId').includes(dataCtrl.fetchData('eventStatus').id)){
                    btn = `
                        <button type="button" class="btn btn-primary" 
                            onclick="appCtrl.placeOrder('${this.forms.pedidos}',dataCtrl,uiCtrl)"
                        >Fazer pedido</button>
                    `
                }
            }
            document.getElementById(this.modals.secondLevelModalContent).innerHTML = `
            <style>
                .textAlign{ 
                    text-align: left;
                }
                .infoBoxes {
                    margin:0!important;
                    padding:0!important;
                    margin: 15px!important;
                }
                .textArea {
                    min-height: 150px;
                    padding: 2px 3px;
                    margin: 15px 0;
                    width: 100%;
                    border: solid black .3px;
                    text-align:left;
                }
                .textArea>p {
                    margin:0
                }
            </style>
            <div class="modal-header">
                  <h5 class="modal-title" id="TituloModalCentralizado">Meu pedido</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                  <div class="form">
                      <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                      <div class=".container-fluid row w-100 mx-auto my-auto text-center row">
                        <div class="col-12 col-md-4 textAlign"><strong>Status do evento:</strong></div>
                        <div class="col-12 col-md-8 textAlign">${dataCtrl.fetchData('eventStatus').text}</div>
                        <div class="col-12 col-md-4 textAlign"><strong>Status do pedido:</strong></div>
                        <div class="col-12 col-md-8 textAlign">${dataCtrl.fetchData('orderStatusName')}</div>
                        <div class="col-12 col-md-4 textAlign"><strong>Menu:</strong></div>
                        <div class="col-12 col-md-8" style="overflow-y:auto">
                            <div class="textArea">${dataCtrl.fetchData('menuText')}</div>
                        </div>
                        <div class="col-12 col-md-4 textAlign "><strong>Localizacao:</strong></div>
                        <div class="col-12 col-md-8 textAlign ">${dataCtrl.fetchData('eventAdress')}</div>
                        <div class="col-12 col-md-4 textAlign "></div>
                        <div class="col-12 col-md-8">
                            <iframe style="width:100%" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDXS08538xW3GV_HH7TFnDP58RxvuE015U&q=${dataCtrl.fetchData('mapAddress')}&center=${dataCtrl.fetchData('coordinates').lat},${dataCtrl.fetchData('coordinates').lng}"></iframe>
                        </div>
                        <div class="col-12 col-md-4   textAlign"><strong>Quantidade de refeicoes:</strong></div>
                        <input id="${this.elementIds.qtdeDePedidos}" name="${this.forms.pedidos}" type="number" class="col-12 col-md-8" min="1" 
                            value="${dataCtrl.fetchData('hasOrderInEvent') ? dataCtrl.fetchData('orderMealsQtty') : '1'}" 
                            oninput="
                            if(document.getElementById('${this.elementIds.qtdeDePedidos}').value===''){
                                document.getElementById('${this.elementIds.precoTotal}').innerText = 'R$ 0.00'    
                            }else{
                                document.getElementById('${this.elementIds.precoTotal}').innerText = 'R$ ' + parseFloat(dataCtrl.fetchData('totalAmount')*parseFloat(document.getElementById('${this.elementIds.qtdeDePedidos}').value)).toFixed(2)
                            }">
                        <div class="col-12 col-md-4  textAlign"><strong>Preco da refeicao:</strong></div>
                        <div id="${this.elementIds.precoUnitario}" class="col-12 col-md-8  textAlign">R$${parseFloat(dataCtrl.fetchData('totalAmount')).toFixed(2)}</div>
                        <div class="col-12 col-md-4  textAlign"><strong>Valor total:</strong></div>
                        <div id="${this.elementIds.precoTotal}" class="col-12 col-md-8  textAlign">R$${
                            dataCtrl.fetchData('hasOrderInEvent') ? 
                                parseFloat(dataCtrl.fetchData('totalAmount')*dataCtrl.fetchData('orderMealsQtty')).toFixed(2)
                            :
                                parseFloat(dataCtrl.fetchData('totalAmount')).toFixed(2)}
                            </div>
                  </div>
              </div>
              <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
              ${btn}    
              </div>
            `
        }
        
        this.showSecondLevelModal('show')
    }
    /*========================================================================================
    ========================================================================================
    ========================================================================================
                            SHOW CALENDAR INFO
    ========================================================================================
    ========================================================================================
    ========================================================================================*/
    updateCalendarViewInformation(dtString = '',appCtrl,dataCtrl){
        console.log('updateCalendarViewInformation')
        var eHoje = dataCtrl.fetchData('today')
        var hasEvent = false
        dataCtrl.fetchData('events').forEach(el=>{
            if(el.cookingDate.split(' ')[0]===dtString){
                return hasEvent = true
                 
            }
        })

        if(!hasEvent){
            document.getElementById(this.elementIds.calendarViewInformation).innerHTML = `
            <div class=".container-fluid row w-100 mx-auto my-auto text-center" style="height:250px!important">
                <div class="col-12 h-50 my-auto"></div>
                <div class="col-4 h-50 my-auto">
                    <img src="/img/sadFace.png" width="80" height="80" alt="">
                </div>
                <div class="col-8 h-50 my-auto">
                    ${eHoje ? 'Nao estamos cozinhando hoje' : 'Nao estamos cozinhando nesta data' }
                </div>
            </div>
            `
            return
        }else{
            var btn = ''
            if(dataCtrl.fetchData('hasOrderInEvent')){
                btn = '<button type="button" class="btn btn-primary" onclick="appCtrl.setSecondLevelModalType = appCtrl.getSecondLevelModalTypes.pedidos;uiCtrl.showHideSecondLevelModals(appCtrl,dataCtrl)">Ver pedido</button>'
            }else{
                if(dataCtrl.fetchData('orderableStatusId').includes(dataCtrl.fetchData('eventStatus').id)){
                    btn = '<button type="button" class="btn btn-primary" onclick="appCtrl.setSecondLevelModalType = appCtrl.getSecondLevelModalTypes.pedidos;uiCtrl.showHideSecondLevelModals(appCtrl,dataCtrl)">Fazer pedido</button>'
                }
            }
            document.getElementById(this.elementIds.calendarViewInformation).innerHTML = `
            <style>
                .textAlign{ 
                    text-align: left;
                }
                .infoBoxes {
                    margin:0!important;
                    padding:0!important;
                    margin: 15px!important;
                }
                .textArea {
                    min-height: 150px;
                    padding: 2px 3px;
                    margin: 15px 0;
                    width: 100%;
                    border: solid black .3px;
                    text-align:left;
                }
                .textArea>p {
                    margin:0
                }
            </style>
            <div class=".container-fluid row w-100 mx-auto my-auto text-center row infoBoxes">
                <div class="col-12 col-md-4 textAlign"><strong>Status do evento:</strong></div>
                <div class="col-12 col-md-8 textAlign">${dataCtrl.fetchData('eventStatus').text}</div>
                <div class="col-12 col-md-4 textAlign"><strong>Menu:</strong></div>
                <div class="col-12 col-md-8" style="overflow-y:auto">
                    <div class="textArea">${dataCtrl.fetchData('menuText')}</div>
                </div>
                <div class="col-12 col-md-4 textAlign "><strong>Localizacao:</strong></div>
                <div class="col-12 col-md-8 textAlign ">${dataCtrl.fetchData('eventAdress')}</div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                ${btn}
            </div>
            `
        }
    }
    /*========================================================================================
    ========================================================================================
    ========================================================================================
                            UPDATE HOME PAGE BUTTONS USER LOGGED OR NOT
    ========================================================================================
    ========================================================================================
    ========================================================================================*/
    updateHomePageButtons(userLogged){
        document.getElementById('clientArea').hidden = userLogged
        // document.getElementById('userInfo').hidden = !userLogged
        document.getElementById('events').hidden = !userLogged
        
    }
    /*========================================================================================
    ========================================================================================
    ========================================================================================
                            GET IDS
    ========================================================================================
    ========================================================================================
    ========================================================================================*/
    get getIds() {
        return this
    }
    /*========================================================================================
    ========================================================================================
    ========================================================================================
                            SHOW HIDE MODAL
    ========================================================================================
    ========================================================================================
    ========================================================================================*/
    showModal(show_hide){
        $(`#${this.modals.secondLevelModal}`).modal('hide')
        $(`#${this.modals.firstLevelModal}`).modal(show_hide)
    }
    showSecondLevelModal(show_hide){
        $(`#${this.modals.firstLevelModal}`).modal('hide')
        $(`#${this.modals.secondLevelModal}`).modal(show_hide)
    }
    /*========================================================================================
    ========================================================================================
    ========================================================================================
                            SHOW HIDE ALERT
    ========================================================================================
    ========================================================================================
    ========================================================================================*/
    showHideAlert(alertClass,text,show_hide){
        const alertsIds = this.alert
        this.showHideSpinner('hide')
        function clearAlert(){
            document.getElementById(alertsIds.alert).style.zIndex = -9999
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
            // const alertsIds = this.getIDs().alert
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
}
function phoneNumberMask(phoneNumber){
    if(phoneNumber===null||phoneNumber===''){
        //console.log('phoneNumbne -> ',phoneNumber)
        return phoneNumber
    }
    var numbers = phoneNumber.replace(/\D/ig,'')
    //console.log('numbers->',numbers)
    if(numbers.length===11){
        return `(${numbers.substr(0,2)}) ${numbers.substr(2,5)}-${numbers.substr(7,4)}`
    }
    return numbers
}
function creditCardMask(ccard){
    if(ccard===null||ccard===''||ccard.length===19){
        //console.log('phoneNumbne -> ',phoneNumber)
        return ccard
    }
    var numbers = ccard.replace(/\D/ig,'')
    //console.log('numbers->',numbers)
    if(ccard.length===16){
        return `${numbers.substr(0,4)} ${numbers.substr(4,4)} ${numbers.substr(8,4)} ${numbers.substr(12,4)}`
    }
    return numbers
}