//---------------------------------------------------------------------------
//
// class:       ClassStarfield
// function:    ClassStarfield (constructor)
//
//
//---------------------------------------------------------------------------

function ClassStarfield(stars)
{
    this.VertexPositionBuffer = gl.createBuffer();
    this.VertexColorBuffer    = gl.createBuffer();
    this.PointSizeBuffer      = gl.createBuffer();

    this.initBuffers   = sf_initBuffers;
    this.drawStarfield = drawStarfield;
    this.stars = stars;
    this.init = false;
}

//---------------------------------------------------------------------------
//
// class:       TextureSphere
// function:    sf_initBuffers
//
//
//---------------------------------------------------------------------------

function sf_initBuffers()
{
    var vertexPositionData = [];
    var vertexColorData    = [];
    var pointSizeData      = [];

    for (var i = 0; i < this.stars; i++)
    {
        var x = (Math.random() * 2.0) - 1.0;
        var y = (Math.random() * 2.0) - 1.0;
        var z = (Math.random() * 2.0) - 1.0;

        var d = Math.sqrt(x*x + y*y + z*z);

        x = (x / d) * 50;
        y = (y / d) * 50;
        z = (z / d) * 50;

        vertexPositionData.push(x);
        vertexPositionData.push(y);
        vertexPositionData.push(z);

        var cr = Math.random() * 0.4 + 0.5;
        var cg = Math.random() * 0.4 + 0.5;
        var cb = Math.random() * 0.4 + 0.5;

        vertexColorData.push(cr);
        vertexColorData.push(cg);
        vertexColorData.push(cb);

        var ps = (Math.random() * 2.2) + 0.5;
        pointSizeData.push(ps);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
    this.VertexPositionBuffer.itemSize = 3;
    this.VertexPositionBuffer.numItems = vertexPositionData.length / 3;

    gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColorData), gl.STATIC_DRAW);
    this.VertexColorBuffer.itemSize = 3;
    this.VertexColorBuffer.numItems = vertexColorData.length / 3;

    gl.bindBuffer(gl.ARRAY_BUFFER, this.PointSizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointSizeData), gl.STATIC_DRAW);
    this.PointSizeBuffer.itemSize = 1;
    this.PointSizeBuffer.numItems = pointSizeData.length;

    this.init = true;
}


//---------------------------------------------------------------------------
//
// class      TextureSphere
// function:  drawStarfield
//
//---------------------------------------------------------------------------

function drawStarfield()
{
    if (this.init)
    {
        gl.enable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram3dColor.vertexPositionAttribute, this.VertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram3dColor.vertexColorAttribute, this.VertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.PointSizeBuffer);
        gl.vertexAttribPointer(shaderProgram3dColor.pointSizeAttribute, this.PointSizeBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.POINTS, 0, this.stars);
        gl.enable(gl.DEPTH_TEST);
    }
}



