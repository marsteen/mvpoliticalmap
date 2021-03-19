 //---------------------------------------------------------------------------
 //
 // class:       TextureSphere
 // function:    TextureSphere (constructor)
 //
 //
 //---------------------------------------------------------------------------

 function Circle(radius, segments)
 {
	this.VertexPositionBuffer     = gl.createBuffer();
	this.VertexIndexBuffer        = gl.createBuffer();

 	this.initBuffers = Circle_initBuffers;
 	this.draw        = Circle_draw;
 	this.radius      = radius;
 	this.segments    = segments;
 }


//---------------------------------------------------------------------------
//
// Klasse:    Circles
// function:  initBuffers
//
//
//---------------------------------------------------------------------------

function Circle_initBuffers()
{
  var segs   = this.segments;
	var radius = this.radius;
	var nptr = 0;

	var DataSize = (segs+1);
	var vertexPositionData = [];
	var indexData = [];

	for (var s = 0; s <= this.segments; s++)
	{
		var theta = s * Math.PI / this.segments;

		vertexPositionData.push(this.radius * Math.sin(theta));
		vertexPositionData.push(this.radius * Math.cos(theta));
		vertexPositionData.push(0.0);

		indexData.push(s);
	}

	gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
	this.VertexPositionBuffer.itemSize = 3;
	this.VertexPositionBuffer.numItems = vertexPositionData.length / 3;

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
	this.VertexIndexBuffer.itemSize = 1;
	this.VertexIndexBuffer.numItems = indexData.length;
}

//---------------------------------------------------------------------------
//
// class      Circle
// function:  draw
//
//
//---------------------------------------------------------------------------

function Circle_draw()
{
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, this.Texture);
	gl.uniform1i(shaderProgram3d.samplerUniform, 0);


	gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
	gl.vertexAttribPointer(shaderProgram3d.vertexPositionAttribute, this.VertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer);
	gl.drawElements(gl.TRIANGLE_STRIP, this.VertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}
