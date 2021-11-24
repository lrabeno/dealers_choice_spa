import axios from 'axios';

const avengerList = document.querySelector('#avenger-list');
const xmenList = document.querySelector('#xmen-list');
const justiceList = document.querySelector('#justice-list')
const teamList = document.querySelector('#team-list')

 const renderAvenger = (avengers) => {
   const html = avengers.map(avenger => `
     <li>
       <a href='#${avenger.id}'>
         ${avenger.name}
       </a>
     </li>
   `).join('')  
   avengerList.innerHTML = html
 }

 const renderXmen = (xMen) => {
    const html = xMen.map(xMan => `
      <li>
        <a href='#${xMan.id}'>
          ${xMan.name}
        </a>
      </li>
    `).join('')  
    xmenList.innerHTML = html
  }

  const renderJustice = (justiceLeague) => {
    const html = justiceLeague.map(justice => `
      <li>
        <a href='#${justice.id}'>
          ${justice.name}
        </a>
      </li>
    `).join('')  
    justiceList.innerHTML = html
  }

  const renderTeam = (teamMates) => {
    const html = teamMates.map(teamMate => `
      ${teamMate.ledby.map(ledby => `<li>${ledby.name}</li>`).join('')}
      `).join('')  
       teamList.innerHTML = html
  }


const init = async() => {
  try {
    const avengers = (await axios.get('/api/avengers')).data;
    const xMen = (await axios.get('api/xmen')).data;
    const justiceLeague = (await axios.get('api/justiceLeague')).data;
    renderAvenger(avengers)
    renderXmen(xMen)
    renderJustice(justiceLeague)
    const id = window.location.hash.slice(1)
    const url = `api/leader/${id}/ledby`
    const teamMates = (await axios(url)).data
    renderTeam(teamMates)
  } catch (error) {
      console.log(error)
  }
}

window.addEventListener('hashchange', async() => {
    const id = window.location.hash.slice(1)
    const url = `api/leader/${id}/ledby`
    try {
        const teamMates = (await axios(url)).data
        renderTeam(teamMates)
    }
    catch(error) {
        console.log(error)
    }
})

init()