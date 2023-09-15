let home = {



    init(){

        let container = document.getElementById("container-files")
        let loading = document.getElementById("container-loading")

        const url = 'list'
        const response = Api.get(url)

        response
            .then(result => {
                
                setTimeout(() => {
                    
                    loading.remove()

                    if (!result.length){
                        container.append(this.aviso())
                    }

                    for(const row of result){
                        container.append(this.video())
                        console.log(row)
                    }

                }, 1500);
            })
            .catch(erro => console.log(erro))

    },

    aviso(){
        
        let container, img, box, titulo, descricao

        titulo = document.createElement('div')
        descricao = document.createElement('div')
        box = document.createElement('div')
        container = document.createElement('div')
        img = document.createElement('img')

        titulo.classList.add('titulo')
        titulo.innerHTML = "Vazio"
        descricao.classList.add('descricao')
        descricao.innerHTML = "No momento não existe videos do seu Bebê"

        box.classList.add('container')

        box.append(descricao)
        box.append(titulo)


        img.src = "/static/img/dormindo.png"

        container.classList.add('container-status')
        container.append(img)
        container.append(box)

        return container

    },

    video(){

        let card, infoFile, containerInco, li, a

        li = document.createElement('li')
        containerInco = document.createElement('div')
        card = document.createElement('div')
        a = document.createElement('a')
        infoFile = document.createElement('div')

        a.href = "#"

        infoFile.classList.add('info-file')
        li.classList.add('icon', 'fas', 'fa-cloud-download-alt')
        containerInco.classList.add('container-incon')
        containerInco.append(li)

        card.classList.add('card')
        card.id = "card-file"
        card.append(infoFile)
        card.append(containerInco)
        
        a.append(card)

        return a
    }

//     <div class="card" id="card-file">
//     <div class="info-file">08/09/2023</div>
//     <div class="container-incon">
//       <li class="icon fas fa-cloud-download-alt"></li>
//     </div>
//   </div>

    
}

home.init()