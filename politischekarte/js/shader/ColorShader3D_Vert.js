
//---------------------------------------------------------------------------
//
// Vertex Shader
//
//---------------------------------------------------------------------------

var ColorShader3D_Vert = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    attribute vec3  aVertexPosition;
    attribute vec3  aVertexColor;
    attribute float aPointSize;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    uniform mat3 uNMatrix;

    varying vec3 vVertexColor;

    void main(void)
    {
        vVertexColor = aVertexColor;
        gl_PointSize = aPointSize;
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    }
`;
