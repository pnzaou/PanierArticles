const articles = document.getElementsByClassName('article')
let panier = document.querySelector('.panier')
let totalPanier = 0

for(let i = 0 ; i < articles.length; i++){
    const pu = parseInt(articles[i].children[2].childNodes[0].textContent)
    const plus = articles[i].children[3].children[0]
    const moins = articles[i].children[3].children[2]
    const coeur = articles[i].children[0].children[0].children[0].children[0]
    const btnC = articles[i].children[0].children[0].children[0]
    let qte = articles[i].children[3].children[1]
    let div_tot_qte = articles[i].children[4]
    let tot_qte = parseInt(qte.innerHTML)

    btnC.addEventListener('click', () => {
        coeur.classList.toggle('text-red-400')
    })

    if (tot_qte === 0) {
        moins.setAttribute('disabled', '')
        moins.classList.toggle('bg-gray-200')
    }

    plus.addEventListener('click', () => {
        tot_qte++
        qte.innerHTML = tot_qte
        div_tot_qte.innerText = `Total : ${tot_qte * pu} XOF`
        totalPanier += pu
        panier.children[1].innerHTML += `<div class="border-gray-400 border-b">${articles[i].children[1].innerHTML} | ${articles[i].children[2].innerText} |  <button class="text-red-700">&#x1F5D1;</button></div>`
        total_panier()
        if(tot_qte === 1){
            moins.removeAttribute('disabled')
            moins.classList.toggle('bg-red-400')
        }

    })

    moins.addEventListener('click', () => {
        let liste = panier.children[1].children
        for (let j = liste.length-1; j >= 0; j--) {
            let p = liste[j].innerText
            if(p.includes(articles[i].children[1].innerText)){
                let ps = liste[j]
                let pps = panier.children[1]
                pps.removeChild(ps)
                break
            }
        }
        tot_qte--
        qte.innerHTML = tot_qte
        div_tot_qte.innerText = `Total : ${tot_qte * pu} XOF`
        totalPanier -= pu
        total_panier()
        if (tot_qte === 0) {
            moins.setAttribute('disabled', '')
            moins.classList.toggle('bg-red-400')
        }
    })  
}

function total_panier(){
    panier.children[2].innerHTML = `${totalPanier}.00 XOF`
}

