//create map

const map = L.map('mapid').setView([-23.5213167,-46.7295751], 15);

//create and add tileLayer

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


//create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],

})


let marker;

// create and add marker 
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

// send lat and lng for the servidor
    document.querySelector('[name=lat]').value = lat; // lat latitude
    document.querySelector('[name=lng]').value = lng; // lng longitude

    // remove icon
    marker && map.removeLayer(marker)

    // add icon layer
    marker = L.marker([lat, lng], { icon })
    .addTo(map)
})



// adicionar campo de fotos
function addPhotoField() {
      
    // pegar o container de fotos #images
    const container = document.querySelector('#images')
    //  pegar o container para duplicar .new-image
    const fieldsContainer = document.querySelectorAll('.new-upload')
    //  realizar o clone da ultima imagen adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)


    // console.log(newFieldContainer.children)

    //  limpar o campo antes de adicionar ao container de imagens
    const input = newFieldContainer.children[0].value = ""
    
    //  verificar se o campo esta vazio, se sim, nao adicionar
    if(input.value == "") {
        return
    }
    
    //  adicionar o clone ao container de #images
    container.appendChild(newFieldContainer)
}



function deleteField(event) {
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if (fieldsContainer.length < 2) {
        // limpar valor do campo
        span.parentNode.children[0].value = ""
        return
    }

    //  deletar o campo
    span.parentNode.remove();
}



// select yes or no
function toggleSelect(event) {

    // retirar a class .active (dos botoes)
    document.querySelectorAll('.button-select button')
    .forEach( function(button) {
        button.classList.remove('active')
    })

    // colocar a class .active nesse botao clicado
    const button = event.currentTarget
    button.classList.add('active')

    // atualizar o meu input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends]')

    input.value = button.dataset.value
}