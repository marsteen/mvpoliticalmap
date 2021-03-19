//---------------------------------------------------------------------------
//
// function:    getVertexShader
//
//---------------------------------------------------------------------------

function getVertShader(gl, str)
{
    var   shader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

//---------------------------------------------------------------------------
//
// function:    getVertexShader
//
//---------------------------------------------------------------------------

function getFragShader(gl, str)
{
    var shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}
