function renderInit() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    
    gl.bindVertexArray(vaUI)
    gl.bindBuffer(gl.ARRAY_BUFFER, vbUI)
    gl.bindTexture(gl.TEXTURE_2D, gt)
    gl.uniform1i(luMode, 1)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvasUI)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
}

function renderInitUI() {
    context.font = '32px neodgm'
    context.fillStyle = 'White'
    context.textAlign = 'left'
    context.textBaseline = 'top'
    context.clearRect(0, 0, 1280, 800)
    context.fillStyle = 'White'

    context.fillText('123', 20, 20)
}
