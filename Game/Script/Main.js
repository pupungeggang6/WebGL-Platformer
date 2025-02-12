window.onload = main
window.onerror = errorHandle
window.oncontextmenu = rightClick

function main() {
    canvas = document.getElementById('Screen')
    gl = canvas.getContext('webgl2')
    canvasUI = document.createElement('canvas')
    canvasUI.width = 1280
    canvasUI.height = 800
    context = canvasUI.getContext('2d')

    window.addEventListener('keydown', keyDown, false)
    canvas.addEventListener('mouseup', mouseUp, false)

    imageLoad()
    glInit()

    frameCurrent = Date.now()
    gameLoop = requestAnimationFrame(loop)
}

function loop() {
    framePrevious = frameCurrent
    frameCurrent = Date.now()
    delta = frameCurrent - framePrevious

    if (scene === 'Title') {
        loopTitle()
    }

    gameLoop = requestAnimationFrame(loop)
}

function mouseUp(event) {
    let targetRect = canvas.getBoundingClientRect()
    let pos = {x: (event.clientX - targetRect.left) / targetRect.width * canvas.width, y: (event.clientY - targetRect.top) / targetRect.height * canvas.height} 
    let button = event.button

    if (state === 'Start') {
        state = ''
    }

    if (scene === 'Title') {
        mouseUpTitle(pos, button)
    }
}

function keyDown(event) {
    let key = event.key

    if (state === 'Start') {
        state = ''
    }

    if (scene === 'Title') {
        keyDownTitle(key)
    }
}

function errorHandle(err, url, line, col, obj) {
    if (obj != null) {
        cancelAnimationFrame(gameLoop)
    }
}

function rightClick() {
    return false
}
