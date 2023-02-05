class UICtrl {
    constructor() {
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
                            <input id="password" n placeholder="Sua senha de 8 digitos" name=""${this.forms.login}" class="w-75" type="password" autocomplete="off" maxlength="8" required>
                        </label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary">Log in</button>
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
            document.getElementById(this.modals.secondLevelModalContent).innerHTML = `
            <div class="modal-header">
                <h5 class="modal-title" id="TituloModalCentralizado">Pagar pedido</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <br>
            <div class=".container-fluid mx-auto my-auto w-75">
                <label class="w-100">
                    Numero cartao:
                    <input id="nrCartao2" name="${this.forms.pagar}" placeholder="0000 0000 0000 0000" oninput="this.value = creditCardMask(this.value)" type="text" class="w-75" autocomplete="off" maxlength="19" required>
                </label>
            </div>
            <div class=".container-fluid mx-auto my-auto w-75">
                <label class="w-100">
                    Codigo cartao:
                    <input id="codCartao2" name="${this.forms.pagar}" placeholder="123" oninput="this.value = this.value.replace(/\D/ig,'')" type="text" class="w-75" autocomplete="off" maxlength="4" required>
                </label>
            </div>
            <div class=".container-fluid mx-auto my-auto w-75">
                <label class="w-100">
                    Validade cartao:
                    <div class="container w-100 mx-auto my-auto row">
                        <div class="col-12 col-md-2">Mes:</div>
                        <div class="col-12 col-md-2">
                            <input id="mesCartao2" name="${this.forms.pagar}" min="1" max="12" placeholder="${(new Date).getMonth()+1}" oninput="this.value = this.value.replace(/\D/ig,'')" type="text" class="w-50" autocomplete="off" maxlength="2" required>
                        </div>
                        <div class="col-12 col-md-2">Ano:</div>
                        <div class="col-12 col-md-4">
                            <input id="anoCartao2" name="${this.forms.pagar}" min="${(new Date).getFullYear()}" placeholder="${(new Date).getFullYear()}" max="${(new Date).getFullYear()+20}" oninput="this.value = this.value.replace(/\D/ig,'')" type="text" class="w-50" autocomplete="off" maxlength="4" required>
                        </div>
                    </div>
                </label>
            </div>
            <div class=".container-fluid mx-auto my-auto w-75">
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary">Pagar</button>
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
            <div class="modal-header">
                <h5 class="modal-title" id="TituloModalCentralizado">Criacao de conta</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="form">
                <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                    <div class=".container-fluid mx-auto my-auto w-75">
                        <label class="w-100">
                            E-mail:
                            <input id="email2" name="${this.forms.registrar}" placeholder="fulano@mail.com" type="email" style="height:65%!important" autocomplete="off" required>
                        </label>
                    </div>
                    <div class=".container-fluid mx-auto my-auto w-75">
                        <label class="w-100">
                            Nome:
                            <input id="nome2" name="${this.forms.registrar}" placeholder="Fulano de tal" type="text" style="height:65%!important" autocomplete="off" required>
                        </label>
                    </div>
                    <div class=".container-fluid mx-auto my-auto w-75">
                        <label class="w-100">
                            Celular:
                            <input id="celular2" name="${this.forms.registrar}" oninput="this.value = phoneNumberMask(this.value)" placeholder="(00) 00000-0000" maxlength="15" type="text" style="height:65%!important" autocomplete="off" required>
                        </label>
                    </div>
                    <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                    <br>
                    <div class=".container-fluid mx-auto my-auto w-75">
                        <label class="w-100">
                        Usuario facebook:
                            <input id="facebookUser2" name="${this.forms.registrar}" placeholder="Nome usuario facebook" type="text" class="w-75" autocomplete="off">
                        </label>
                    </div>
                    <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                    <div class=".container-fluid mx-auto my-auto w-75">
                        <label class="w-100">
                            Usuario instagram:
                            <input id="instagramUser2" name="${this.forms.registrar}" placeholder="Nome usuario instagram"  type="text" class="w-75" autocomplete="off">
                        </label>
                    </div>
                    <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                    <br>
                    <div class=".container-fluid mx-auto my-auto w-75">
                        <label class="w-100">
                            Senha:
                            <input id="password2" n placeholder="Sua senha de 8 digitos" name=""${this.forms.registrar}" style="height:65%!important" type="password" autocomplete="off" maxlength="8" required>
                        </label>
                    </div>
                    <div class=".container-fluid mx-auto my-auto w-75">
                        <label class="w-100">
                            Confirmacao da senha:
                            <input id="passwordConfirmatioin2" n placeholder="Sua senha de 8 digitos" name=""${this.forms.registrar}" style="height:65%!important" type="password" autocomplete="off" maxlength="8" required>
                        </label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary">Criar conta</button>
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
                    <label class="w-100">
                        E-mail:
                        <input id="email2" name="${this.forms.recuperarSenha}" placeholder="fulano@mail.com" type="email" style="height:65%!important" autocomplete="off" required>
                    </label>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary">Enviar</button>
                </div>
              `
        }
        if(appCtrl.getSecondLevelType===appCtrl.getSecondLevelModalTypes.pedidos){
            document.getElementById(this.modals.secondLevelModalContent).innerHTML = `
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
                        <div class="col-12 col-md-4 text-right">Menu:</div>
                        <div class="col-12 col-md-8">
                            <textarea style="min-height:150px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at dolor lacinia, auctor leo in, elementum mi. Aenean eu ultricies tellus. Donec vitae lectus vitae nulla vestibulum sollicitudin. Morbi sit amet purus eget nisl volutpat sollicitudin. Ut rhoncus, sapien eget ornare porttitor, risus arcu molestie diam, in hendrerit dolor est sed mauris. Fusce placerat eros non nisi facilisis convallis. Nunc eget ultrices mi. Aliquam convallis at nibh vitae fermentum. Praesent pretium nibh eget lectus blandit, non pulvinar arcu molestie. Duis et dolor tortor. Nam tincidunt lobortis maximus.
        
                            Pellentesque ex lectus, consectetur a purus nec, accumsan consectetur lacus. Integer non venenatis turpis. Vivamus lacinia gravida orci, sit amet rhoncus diam. Ut nec tincidunt dui, et euismod augue. Maecenas sagittis interdum malesuada. Curabitur tortor elit, venenatis ut volutpat nec, tempor eget sem. Suspendisse molestie, mauris vitae elementum sollicitudin, metus tellus feugiat ante, non scelerisque elit velit at arcu. Ut nec urna interdum nunc varius accumsan a porttitor felis. Suspendisse mollis turpis eu mi imperdiet, et porta lacus elementum. Donec id lacus ut nibh pharetra lacinia. Pellentesque blandit at justo in lacinia.
                            
                            Nulla viverra neque nec metus cursus maximus. Vivamus venenatis, leo quis hendrerit posuere, ligula felis sodales erat, sit amet faucibus felis felis ut tortor. In venenatis mauris id purus malesuada malesuada. Phasellus quis mattis mauris. Fusce a pellentesque ex, sit amet pharetra mauris. Aliquam vitae nisl ex. Nam congue justo sed vehicula congue.</textarea>
                        </div>
                        <div class="col-12 col-md-4 text-right">Localizacao:</div>
                        <div class="col-12 col-md-8 text-right">Rua das alfalfas, 22, Sitio Cercado, Curitba, PR</div>
                        <div class="col-12">
                            <img src="https://maps.googleapis.com/maps/api/staticmap?center=-25.4290,-49.2715&zoom=14&size=300x300&markers=color:red%7Clabel:C%7C-25.4290,-49.2715&key=AIzaSyDXS08538xW3GV_HH7TFnDP58RxvuE015U">
                        </div>
                        <div class="col-12 col-md-4 text-right">Quantidade de refeicoes:</div>
                        <input id="${this.elementIds.qtdeDePedidos}" name="${this.forms.pedidos}" type="number" class="col-12 col-md-8" min="1" value="1" oninput="
                            document.getElementById('${this.elementIds.precoTotal}').innerText = 'R$ ' + parseFloat(parseFloat(document.getElementById('${this.elementIds.precoUnitario}').innerText.split(' ')[1])*parseFloat(document.getElementById('${this.elementIds.qtdeDePedidos}').value)).toFixed(2)
                        ">
                        <div class="col-12 col-md-4 text-right">Preco da refereicao:</div>
                        <div id="${this.elementIds.precoUnitario}" class="col-12 col-md-8 text-right">R$ 15,00</div>
                        <div class="col-12 col-md-4 text-right">Valor total:</div>
                        <div id="${this.elementIds.precoTotal}" class="col-12 col-md-8 text-right">R$ 15,00</div>
                  </div>
              </div>
              <div class="modal-footer">
                    <button type="button" class="btn btn-success" onclick="appCtrl.setSecondLevelModalType=appCtrl.getSecondLevelModalTypes.pagar;uiCtrl.showHideSecondLevelModals(appCtrl,dataCtrl)" >Pagar pedido</button>
                    <button type="button" class="btn btn-warning">Editar pedido</button>
                    <button type="button" class="btn btn-danger">Deletar pedido</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary">Fazer pedido</button>

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
        var eHoje = dataCtrl.fetchData('today')
        const hasEvent = dataCtrl.fetchData('events').includes(dtString)

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
            document.getElementById(this.elementIds.calendarViewInformation).innerHTML = `
            <div class=".container-fluid row w-100 mx-auto my-auto text-center row" style="height:250px!important">
                <div class="col-12 col-md-4 text-right">Menu:</div>
                <div class="col-12 col-md-8">
                    <textarea style="min-height:150px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at dolor lacinia, auctor leo in, elementum mi. Aenean eu ultricies tellus. Donec vitae lectus vitae nulla vestibulum sollicitudin. Morbi sit amet purus eget nisl volutpat sollicitudin. Ut rhoncus, sapien eget ornare porttitor, risus arcu molestie diam, in hendrerit dolor est sed mauris. Fusce placerat eros non nisi facilisis convallis. Nunc eget ultrices mi. Aliquam convallis at nibh vitae fermentum. Praesent pretium nibh eget lectus blandit, non pulvinar arcu molestie. Duis et dolor tortor. Nam tincidunt lobortis maximus.

                    Pellentesque ex lectus, consectetur a purus nec, accumsan consectetur lacus. Integer non venenatis turpis. Vivamus lacinia gravida orci, sit amet rhoncus diam. Ut nec tincidunt dui, et euismod augue. Maecenas sagittis interdum malesuada. Curabitur tortor elit, venenatis ut volutpat nec, tempor eget sem. Suspendisse molestie, mauris vitae elementum sollicitudin, metus tellus feugiat ante, non scelerisque elit velit at arcu. Ut nec urna interdum nunc varius accumsan a porttitor felis. Suspendisse mollis turpis eu mi imperdiet, et porta lacus elementum. Donec id lacus ut nibh pharetra lacinia. Pellentesque blandit at justo in lacinia.
                    
                    Nulla viverra neque nec metus cursus maximus. Vivamus venenatis, leo quis hendrerit posuere, ligula felis sodales erat, sit amet faucibus felis felis ut tortor. In venenatis mauris id purus malesuada malesuada. Phasellus quis mattis mauris. Fusce a pellentesque ex, sit amet pharetra mauris. Aliquam vitae nisl ex. Nam congue justo sed vehicula congue.</textarea>
                </div>
                <div class="col-12 col-md-4 text-right">Localizacao:</div>
                <div class="col-12 col-md-8 text-right">Rua das alfalfas, 22, Sitio Cercado, Curitba, PR</div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary" onclick="appCtrl.setSecondLevelModalType = appCtrl.getSecondLevelModalTypes.pedidos;uiCtrl.showHideSecondLevelModals(appCtrl,dataCtrl)">Fazer pedido</button>
            </div>
            `
        }
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
                            SHOW HIDE MODEL
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