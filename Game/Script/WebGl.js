const vSource = `#version 300 es
    in vec4 a_position;
    in vec3 a_color;
    in vec2 a_texcoord;
    out vec3 p_color;
    out vec2 p_texcoord;
    uniform vec3 u_translate;
    uniform vec3 u_rotate;
    uniform vec3 u_scale;

    void main() {
        mat4 m_translate = mat4(
            1.0, 0.0, 0.0, u_translate.x,
            0.0, 1.0, 0.0, u_translate.y,
            0.0, 0.0, 1.0, u_translate.z,
            0.0, 0.0, 0.0, 1.0
        );

        mat4 m_scale = mat4(
            u_scale.x, 0.0, 0.0, 0.0,
            0.0, u_scale.y, 0.0, 0.0,
            0.0, 0.0, u_scale.z, 0.0,
            0.0, 0.0, 0.0, 1.0
        );

        gl_Position = a_position;
        p_texcoord = a_texcoord;
        p_color = a_color;
    }
`

const fSource = `#version 300 es
    precision highp float;
    in vec2 p_texcoord;
    in vec3 p_color;
    out vec4 o_color;
    uniform sampler2D tex;
    uniform vec3 u_color;
    uniform int u_mode;

    void main() {
        if (u_mode == 1) {
            o_color = texture(tex, p_texcoord);
        } else {
            o_color = vec4(u_color, 1.0);
        }
    }
`

function glInit() {
    vShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vShader, vSource)
    gl.compileShader(vShader)
    fShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fShader, fSource)
    gl.compileShader(fShader)
    program = gl.createProgram()
    gl.attachShader(program, vShader)
    gl.attachShader(program, fShader)
    gl.linkProgram(program)

    laPosition = gl.getAttribLocation(program, "a_position")
    laColor = gl.getAttribLocation(program, "a_color")
    laTexcoord = gl.getAttribLocation(program, "a_texcoord")
    luColor = gl.getUniformLocation(program, "u_color")
    luMode = gl.getUniformLocation(program, "u_mode")

    gt = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, gt)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

    vaUI = gl.createVertexArray()
    vbUI = gl.createBuffer(gl.ARRAY_BUFFER)
    gl.bindVertexArray(vaUI)
    gl.bindBuffer(gl.ARRAY_BUFFER, vbUI)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        1.0, -1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,
        1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0,
        -1.0, -1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0,
        -1.0, -1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0,
        1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0,
        -1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0
    ]), gl.STATIC_DRAW)
    gl.vertexAttribPointer(laPosition, 3, gl.FLOAT, false, 8 * 4, 0)
    gl.enableVertexAttribArray(laPosition)
    gl.vertexAttribPointer(laColor, 3, gl.FLOAT, false, 8 * 4, 3 * 4)
    gl.enableVertexAttribArray(laColor)
    gl.vertexAttribPointer(laTexcoord, 2, gl.FLOAT, false, 8 * 4, 6 * 4)
    gl.enableVertexAttribArray(laTexcoord)
}
