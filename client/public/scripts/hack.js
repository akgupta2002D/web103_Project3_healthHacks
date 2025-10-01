const API = '/api/health-hacks'

async function renderHack(){
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')
  const container = document.getElementById('hack-content')

  if(!id){
    container.innerHTML = '<h2>Missing hack id</h2>'
    return
  }
  const res = await fetch(`${API}/${encodeURIComponent(id)}`)
  if(!res.ok){
    container.innerHTML = '<h2>Hack not found</h2>'
    return
  }
  const h = await res.json()

  const imgEl = document.getElementById('image')
  if(h.image){ imgEl.src = h.image } else { imgEl.parentElement.style.display='none' }

  document.getElementById('name').textContent = h.name
  document.getElementById('submittedBy').textContent = `Submitted By: ${h.submittedby || h.submittedBy}`
  document.getElementById('submittedOn').textContent = `Submitted On: ${new Date(h.submittedon || h.submittedOn).toLocaleDateString()}`
  document.getElementById('category').textContent = `Category: ${h.category}`
  document.getElementById('difficulty').textContent = `Difficulty: ${h.difficulty}`
  document.getElementById('description').textContent = h.description

  document.title = h.name
}

renderHack().catch(err => {
  console.error(err)
  document.getElementById('hack-content').innerHTML = '<h2>Error loading hack</h2>'
})
