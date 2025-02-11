const vSource = `#version 300 es
    in vec4 a_position;
    in vec3 a_color;
    in vec2 a_texcoord;
    out vec3 p_color;
    out vec2 p_texcoord;

    void main() {
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

    void main() {
        //o_color = texture(tex, p_texcoord);
        o_color = vec4(p_color, 1.0);
    }
`

function glInit() {
}
