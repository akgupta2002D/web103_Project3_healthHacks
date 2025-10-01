const API = '/api/health-hacks'

async function renderHacks(){
  const res = await fetch(API)
  if(!res.ok) throw new Error('Failed to load health hacks')
  const data = await res.json()
  const main = document.getElementById('main-content')

  if(!data || data.length === 0){
    const h2 = document.createElement('h2')
    h2.textContent = 'No Health Hacks Yet 😶'
    main.appendChild(h2)
    return
  }

  data.forEach(h => {
    const card = document.createElement('div')
    card.className = 'card'

    const top = document.createElement('div')
    top.className = 'top'
    // Always use the default image
    top.style.backgroundImage = `url('/image.png')`

    const bottom = document.createElement('div')
    bottom.className = 'bottom'

    const title = document.createElement('h3')
    title.textContent = h.name

    const desc = document.createElement('p')
    desc.textContent = h.description

    const chips = document.createElement('div')
    chips.className = 'chips'
    const c1 = document.createElement('span'); c1.className='chip'; c1.textContent = `🏷️ ${h.category}`
    const c2 = document.createElement('span'); c2.className='chip'; c2.textContent = `🎯 ${h.difficulty}`
    const c3 = document.createElement('span'); c3.className='chip'; c3.textContent = `📅 ${new Date(h.submittedon || h.submittedOn).toLocaleDateString()}`
    chips.append(c1,c2,c3)

    const link = document.createElement('a')
    link.textContent = 'Read More >'
    link.setAttribute('role','button')
    link.href = `/hack.html?id=${encodeURIComponent(h.id)}`

    bottom.append(title, desc, chips, link)
    card.append(top, bottom)
    main.appendChild(card)
  })
}

renderHacks().catch(err => {
  console.error(err)
  const main = document.getElementById('main-content')
  const p = document.createElement('p')
  p.textContent = 'Failed to load. Is the API running on /api/health-hacks?'
  main.appendChild(p)
})
