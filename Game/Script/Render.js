function renderInit() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear()
}

function renderInitUI() {
    context.font = '32px neodgm'
    context.fillStyle = 'White'
    context.textAlign = 'left'
    context.textBaseline = 'top'
    context.clearRect(0, 0, 1280, 800)
    context.fillStyle = 'White'
}
