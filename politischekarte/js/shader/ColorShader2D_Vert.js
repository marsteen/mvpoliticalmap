
var  ColorShader2D_Vert = `
    //
    // Vertex-Shader Shader 2D
    //

    attribute vec3 aVertexPosition;
    uniform   vec4 uVertexColor;

    void main(void)
    {
        gl_Position = vec4(aVertexPosition, 1.0);
    }
`;
