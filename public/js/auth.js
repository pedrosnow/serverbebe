let auth = {
    init() {
        this.singIn()
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

                fetch('/singIn', {
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
                    .then(result => console.log(result))
                    .catch(erro => console.log(erro))
            }

        })


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