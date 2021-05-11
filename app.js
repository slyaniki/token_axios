
// connexion et recuperation du nouveau token

async function login() {
  var apiKey;
 const response = await axios.post('HTTPS://rlb.prod-veos.iga.fr/rs/rsExtranet2/login', {
  uid: 'WS',
  passwd: 'WS1234'
})
apiKey = await response.data.token

// verification de la connexion avec le  token generé
axios.get('HTTPS://rlb.prod-veos.iga.fr/rs/rsExtranet2/personne/', {
    headers: {
                              "Authorization": `Bearer ${apiKey}`,
                              "content-Type":"application/json"
    }
  })
  .then((res) => {
    console.log('utlisiateur connecté',  res.data)
    form.addEventListener('submit',(e)=>{
      e.preventDefault()
      const search = document.querySelector('#search').value;
      //verifions que l'utilisateur à entré des valeurs de recherche
      if (search == "") {
          alert('Veuillez entrer un id')
      } else {
        //recuperation de l'utlisateur par son Id
          if(res.data !== null) {
              axios.get(`HTTPS://rlb.prod-veos.iga.fr/rs/rsExtranet2/personne/${search}`, {
                  headers: {
                                              "Authorization": `Bearer ${apiKey}`,
                                              "content-Type":"application/json"
                    }
              })
              .then((res)=>{
                  console.log(res.data)
                  //affichage du resultat
                 const dataHTML = document.getElementById('data')
                 dataHTML.innerHTML = `
                 <div class="card-body" style="width: 18rem; border-top: 3px solid #54e69d; ">
                      <h5 class="card-title">ID Personne: ${res.data.id} </h5>
                      <h6 class="card-subtitle mb-2 text-muted">Adresse : ${res.data.adresses}</h6>
                      <p class="card-text">Nom & prénom:  ${res.data.prenom}  ${res.data.nom}</p>
                      <a href="#" class="card-link">Numéro:  ${res.data.num}</a>
                      <a href="#" class="card-link">Type:  ${res.data.type}</a>
                  </div>
                 `
              }).catch((error) => {
                  console.error(error)
                })
            }
      }
  })
  })
  .catch((error) => {
    console.error(error)
  })


}


