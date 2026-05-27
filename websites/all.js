const sidebar = document.getElementById("sidebar")
const side = document.getElementById("side")
side.addEventListener("mouseenter", () => {
    sidebar.className = "shown"
})

sidebar.addEventListener("mouseleave", () => {
    sidebar.className = "hidden"
})

const trigger = document.getElementById("sidebarTriggerPhone")
trigger.addEventListener("click", () => {
    sidebar.className = "shown"
})

document.addEventListener('click', (event) => {
    const clickInside = sidebar.contains(event.target)
    const clickInTrigger = trigger.contains(event.target)

    if (!clickInside && !clickInTrigger) {
        sidebar.className = "hidden"
    }
})

function RgbtoRgba(rgb) {
    return rgb.substring(0, rgb.length - 1) + ", 0.7)";
}

const volumeButton = document.createElement("button")
volumeButton.className = "volume"
const small = document.createElement("div")
small.id = "small"
const big = document.createElement("div")
big.id = "big"
volumeButton.appendChild(small)
volumeButton.appendChild(big)
sidebar.appendChild(volumeButton)

const volumeRange = document.createElement("input")
volumeRange.type = "range"
sidebar.appendChild(volumeRange)
const volumeText = document.createElement("p")
volumeText.id = "volumeRange"
volumeText.textContent = "volume"
sidebar.appendChild(volumeText)

volumeRange.value = 100

let complementaryColor = sessionStorage.getItem("color")
let primaryColor = sessionStorage.getItem("primary")
let GivenTitle = sessionStorage.getItem("title")
sidebarColor = RgbtoRgba(complementaryColor)
document.title = GivenTitle

document.documentElement.style.setProperty('--primary-color', primaryColor)
document.documentElement.style.setProperty('--sidebar-color', sidebarColor)
document.documentElement.style.setProperty('--secondary-color', complementaryColor)

const body = document.querySelector(".others")

const newDiv = document.createElement('div')
newDiv.className = "container-back-button"

const triangle = document.createElement('div')
triangle.className = 'back-triangle'
const line = document.createElement('div')
line.className = 'back-line'

newDiv.appendChild(triangle)
newDiv.appendChild(line)

body.appendChild(newDiv)

newDiv.addEventListener('click', () => {
    window.location.href = "../index.html"
})


currentTitle = GivenTitle.toUpperCase()
const h1 = document.createElement("h1")
h1.textContent = currentTitle
document.body.appendChild(h1)

const element = document.querySelector('.others')
const folder = currentTitle.toLowerCase()

var repoPath = window.location.pathname.substring(0, window.location.pathname.indexOf('/websites'))
element.style.setProperty('--bg-current', "url(" + repoPath + "/innerImages/" + folder + "/" + "1.jpg)")

var currentImage = 1
var maxImages = 15

function startSlideshow() {
    var nextImage = "url(" + repoPath + "/innerImages/" + folder + "/" + currentImage + ".jpg)"
    element.style.setProperty('--bg-next', nextImage)
    element.classList.add('fade-in')
    setTimeout(function () {
        element.style.setProperty('--bg-current', nextImage)
        element.classList.remove('fade-in')
    }, 800)
    currentImage++
    if (currentImage > maxImages) {
        currentImage = 1
    }
    setTimeout(startSlideshow, 5000)
}

startSlideshow()


const playlistsMap = {
    "ballet": "PLAjno9mqkmKhFAvcw3aheIpkIVWPz7IGE",
    "blush": "PLAjno9mqkmKhbsClIN6e9RpLDYKd9tTEI",
    "chill": "PLAjno9mqkmKiGF4P9RIQtZ-38ZXCKt9sS",
    "cozy": "PLAjno9mqkmKho_2A2hqwiH60gY9X-0FRT",
    "daydream": "PLAjno9mqkmKhUgDaJdBwJV5CrguHUwO_p",
    "dream": "PLAjno9mqkmKg4K9wT0Gv-Mn1xGE1_JJG9",
    "innocence": "PLAjno9mqkmKiohWhUaOCKbUw0-MK4s-J9",
    "mist": "PLAjno9mqkmKh3RE-AlVr-Zz2alAOuRh56",
    "ocean": "PLAjno9mqkmKjPN-9R_WQcXI-8PnlbBI6K",
    "romance": "PLAjno9mqkmKjwXGe9NKgjEkan5pEEuTHX",
    "spring": "PLAjno9mqkmKiz_TN9izyLrkdvhrdYoyp4",
    "vintage": "PLAjno9mqkmKhypquzZzXBDrgM9CULhmf6"
}

var tag = document.createElement('script')
tag.src = "https://www.youtube.com/iframe_api"
var firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

let player
let isPlayerReady = false

function onYouTubeIframeAPIReady() {
    player = new YT.Player('hidden-player', {
        height: '500',
        width: '500',
        playerVars: {
            listType: 'playlist',
            list: playlistsMap[folder],
            controls: 0,
            autoplay: 0,
            origin: window.location.origin
        },
        events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError
        }
    })
}

function onPlayerError(event) {
    console.warn(`⚠️ Track error encountered (Code: ${event.data}). Attempting to auto-skip...`)

    if (player && typeof player.nextVideo === 'function') {
        setTimeout(() => {
            player.nextVideo()
        }, 300)
    } else {
        console.error("❌ Player could not auto-skip. Please remove the first song manually.")
    }
}

function onPlayerReady(event) {
    isPlayerReady = true
    console.log("ready")
}


const playbar = document.getElementById("playbar")
const leftLine = document.createElement("div")
const leftTriangle = document.createElement("div")
const rightLine = document.createElement("div")
const rightTriangle = document.createElement("div")
const midTriangle = document.createElement("div")

leftLine.className = "card-left-line"
leftTriangle.className = "card-left-triangle"
rightLine.className = "card-right-line"
rightTriangle.className = "card-right-triangle"
midTriangle.className = "card-mid-triangle"

playbar.appendChild(leftLine)
playbar.appendChild(leftTriangle)
playbar.appendChild(midTriangle)
playbar.appendChild(rightTriangle)
playbar.appendChild(rightLine)

isPaused = false

midTriangle.addEventListener("click", () => {
    if (isPlayerReady && player) {
        if (midTriangle.className === "card-mid-triangle") {
            player.playVideo()
            midTriangle.className = "card-mid-triangle-clicked"
            setInterval(() => {
                if (isPaused) return
                if (small.id === "small") {
                    small.id = "smallup"
                    big.id = "big"
                } else {
                    small.id = "small"
                    big.id = "bigup"
                }
            }, 500)
        } else {
            player.pauseVideo()
            isPaused = true
            small.id = "small"
            big.id = "big"
            midTriangle.className = "card-mid-triangle"
        }
    }
})

rightLine.addEventListener("click", () => {
    if (isPlayerReady && player) {
        player.nextVideo()
    }
})

rightTriangle.addEventListener("click", () => {
    if (isPlayerReady && player) {
        player.nextVideo()
    }
})

leftLine.addEventListener("click", () => {
    if (isPlayerReady && player) {
        player.previousVideo()
    }
})

leftTriangle.addEventListener("click", () => {
    if (isPlayerReady && player) {
        player.previousVideo()
    }
})

volumeRange.addEventListener("input", () => {
    volume = volumeRange.value
    player.setVolume(volume)
})
