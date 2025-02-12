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
    }
`

const fSource = `#version 300 es
    precision highp float;
    in vec2 p_texcoord;
    in vec3 p_color;
    out vec4 o_color;
    uniform sampler2D tex;
    uniform vec3 u_color;

    void main() {
        //o_color = texture(tex, p_texcoord);
        o_color = vec4(u_color, 1.0);
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
    gl.attachShader(program, fShdaer)
    gl.linkProgram(program)

    laPosition = gl.getAttribLocation(program, "a_position")
    laColor = gl.getAttribLocation(program, "a_color")
    laTexcoord = gl.getAttribLocation(program, "a_texcoord")
    luColor = gl.getUniformLocation(program, "u_color")

    gt = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)

    vao = gl.createVertexArray()
    vbo = gl.createBuffer(gl.ARRAY_BUFFER)
    bt = gl.createBuffer(gl.ARRAY_BUFFER)
    gl.bindVertexArray(vao)
    gl.bindBuffer(gl.ARAY_BUFFER, vbo)
    gl.vertexArrtibPointer(laPosition, 3, gl.FLOAT, false, 6 * 4, 0)
    gl.enableVertexAttribArray(laPosition)
}
