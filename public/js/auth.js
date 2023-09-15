let auth = {
    
    baseurl: window.location.href,

    init() {

        this.singIn()

        if (document.addEventListener) {
            document.addEventListener("contextmenu", function(e) {
                e.preventDefault();
                return false;
            });
        } else { //Versões antigas do IE
            document.attachEvent("oncontextmenu", function(e) {
                e = e || window.event;
                e.returnValue = false;
                return false;
            });
        }

    },
    singIn() {

        let formulario = document.querySelector(".formulario")

        formulario.addEventListener("submit", (event) => {

            event.preventDefault()

            let modal = document.querySelector("body")

            let acesso = document.getElementById("_acesso")
            let senha = document.getElementById("_senha")

            if (acesso.value == "" && senha.value == "") {
                Swal.fire({
                    title: 'Ops!!',
                    text: "Acesso e a senha são obrigatorios",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Sim!',
                    allowOutsideClick: false
                })
            }
            else if (acesso.value == "") {
                Swal.fire({
                    title: 'Ops!!',
                    text: "Acesso é obrigatorios",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Sim!',
                    allowOutsideClick: false
                })
            }
            else if (senha.value == "") {
                Swal.fire({
                    title: 'Ops!!',
                    text: "Senha obrigatorios",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Sim!',
                    allowOutsideClick: false
                })
            }
            else {
                modal.append(this.loading())

                const url = `${this.baseurl}toEnter`
                fetch(url, {
                    method: "POST",
                    headers: {
                        'X-CSRF-Token': $('meta[name="csrf-token"]').attr("content"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        acesso: acesso.value,
                        senha: senha.value
                    })
                })
                .then(response => response.json())
                .then(result => {

                    switch (result.status) {
                        case 200:
                            document.cookie = `token=${result.token}`
                            document.location.href = result.url
                            break;
                    
                        default:
                            this.visoLogin()
                            break;
                    }
                    
                    
                    
                })
                .catch(error => console.log('error', error));
            }

        })


    },

    visoLogin(){
        alert('Usuario ou senha incorreto')
    },

    loading() {

        let container, card, span, info, titulo, descricao, modal

        modal = document.createElement('div')
        titulo = document.createElement('div')
        descricao = document.createElement('div')
        info = document.createElement('info')
        span = document.createElement('span')
        card = document.createElement('div')
        container = document.createElement('container')

        card.classList.add('card', 'animate__animated', 'animate__bounceIn')
        card.id = "card-loadin"
        span.classList.add('loader')
        card.append(span)
        titulo.innerHTML = "Carregando..."
        titulo.classList.add('titulo')
        info.append(titulo)
        descricao.innerHTML = "Aguarde enquanto você está sendo autenticado"
        descricao.classList.add('descricao')
        info.append(descricao)
        info.classList.add('container-infor')
        card.append(info)
        container.classList.add('container-loading')
        container.append(card)

        modal.classList.add('container-modal')
        modal.append(container)

        return modal

    },


}

auth.init()