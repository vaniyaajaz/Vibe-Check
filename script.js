const cards = document.querySelectorAll(".cards")
ids = 1
cards.forEach(card => {
    card.id = "card" + String(ids)
    ids++
})

const colors = [
    "#CCBC91", "#9CbFbF", "#bF9CbF", "#bF7F7F",
    "#9c9cbf", "#8Cb7aC", "#c8b592", "#c09Fb6",
    "#9Db7b6", "#a98Eb5", "#958C7F", "#cBb0a2"
]

cards.forEach((card, index) => {
    const playlist = card.querySelector(".playlist")
    if (playlist && colors[index]) {
        playlist.style.backgroundColor = colors[index]
    }
})

const playlists = document.querySelectorAll(".playlist")

playlists.forEach(playlist => {
    const leftLine = document.createElement("div")
    const leftTriangle = document.createElement("div")
    const rightLine = document.createElement("div")
    const rightTriangle = document.createElement("div")
    const midTriangle = document.createElement("div")

    leftLine.className = "left-line"
    leftTriangle.className = "left-triangle"
    rightLine.className = "right-line"
    rightTriangle.className = "right-triangle"
    midTriangle.className = "mid-triangle"

    playlist.appendChild(leftLine)
    playlist.appendChild(leftTriangle)
    playlist.appendChild(midTriangle)
    playlist.appendChild(rightTriangle)
    playlist.appendChild(rightLine)
})

let clickedCard = ""

cards.forEach((card, index) => {
    card.addEventListener("click", () => {
        clickedCard = card.id
        let clickedCardElement = document.getElementById(clickedCard)
        let cardPrimaryColor = window.getComputedStyle(clickedCardElement).backgroundColor
        let cardHeading = clickedCardElement.querySelector("h1")
        let title = cardHeading.textContent
        let cardSecondaryColor = window.getComputedStyle(cardHeading).color
        sessionStorage.setItem("color", cardSecondaryColor)
        sessionStorage.setItem("primary", cardPrimaryColor)
        sessionStorage.setItem("title", title)
        window.location.href = "websites/card.html"
    })
})