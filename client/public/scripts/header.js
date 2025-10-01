const header = document.querySelector('header')
const headerContainer = document.createElement('div')
headerContainer.className = 'header-container'

const left = document.createElement('div')
left.className = 'header-left'

const logo = document.createElement('img')
logo.src = '/logo.png'      // <-- served at root now
logo.alt = 'Health Hacks logo'

const title = document.createElement('h1')
title.textContent = 'Health Hacks'

left.append( title)

const right = document.createElement('div')
right.className = 'header-right'
const homeBtn = document.createElement('button')
homeBtn.textContent = 'Home'
homeBtn.addEventListener('click', () => { window.location = '/' })
right.appendChild(homeBtn)

headerContainer.append(left, right)
header.appendChild(headerContainer)
