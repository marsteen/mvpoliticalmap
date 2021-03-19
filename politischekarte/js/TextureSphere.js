//---------------------------------------------------------------------------
//
// class:       TextureSphere
// function:    TextureSphere (constructor)
//
//
//---------------------------------------------------------------------------

function TextureSphere(radius, textureFile)
{
	this.VertexPositionBuffer     = gl.createBuffer();
	this.VertexNormalBuffer       = gl.createBuffer();
	this.VertexTextureCoordBuffer = gl.createBuffer();
	this.VertexIndexBuffer        = gl.createBuffer();
	//this.Texture                  = gl.createTexture();

	this.initTexture = initTexture;
	this.initBuffers = initBuffers;
	this.initBuffersPoleTexture = initBuffersPoleTexture;
	this.drawTextureSphere = drawTextureSphere;
	this.textureFile = textureFile;
	this.radius = radius;
}


//---------------------------------------------------------------------------
//
// class:       TextureSphere
// function:    initTexture
//
//
//---------------------------------------------------------------------------


function initTexture()
{
	this.Texture = gl.createTexture();	
	this.Texture.image = new Image();

	var LocalTexture = this.Texture;

	LocalTexture.image.onload = function ()
	{
		handleLoadedTexture(LocalTexture);
	}

	this.Texture.image.src = this.textureFile;
}

//---------------------------------------------------------------------------
//
// Klasse:    TextureSphere
// function:  initBuffers
//
//
//---------------------------------------------------------------------------

function initBuffers(startLatDeg, endLatDeg)
{
	var deg_to_rad = Math.PI / 180.0;
	//var startLatDeg =  57.0; 90.0
	//var endLatDeg   = -57.0; -90.0
	var startLatRad =  (90.0 - startLatDeg) * deg_to_rad;
	var endLatRad   =  (90.0 - endLatDeg) * deg_to_rad;
	var latDim = (endLatRad - startLatRad) / (Math.PI);
	
	var latitudeBands  = 64;
	var longitudeBands = 64;
	var radius = this.radius;
	var nptr = 0;	

	var DataSize = (latitudeBands+1) * (longitudeBands+1);
	var vertexPositionData = [];
	var normalData = new Float32Array(DataSize*3);
	var textureCoordData = [];
	//for (var latNumber=0; latNumber <= latitudeBands; latNumber++)
    for (var latNumber=latitudeBands; latNumber >= 0; latNumber--)
	{
		var theta = startLatRad + (latNumber * Math.PI / latitudeBands) * latDim;
		var sinTheta = Math.sin(theta);
		var cosTheta = Math.cos(theta);

		for (var longNumber=0; longNumber <= longitudeBands; longNumber++)
		{
			var phi = longNumber * 2 * Math.PI / longitudeBands;
			var sinPhi = Math.sin(phi);
			var cosPhi = Math.cos(phi);

			var x = cosPhi * sinTheta;
			var y = cosTheta;
			var z = sinPhi * sinTheta;
			var u = 1 - (longNumber / longitudeBands);
			var v = 1 - (latNumber / latitudeBands);
            
			normalData[nptr + 0] = x;
			normalData[nptr + 1] = y;
			normalData[nptr + 2] = z;
			nptr += 3;

			textureCoordData.push(u);
			textureCoordData.push(v);
			vertexPositionData.push(radius * x);
			vertexPositionData.push(radius * y);
			vertexPositionData.push(radius * z);
		}
	}

	var indexData = [];
	for (var latNumber=0; latNumber < latitudeBands; latNumber++)
	{
		for (var longNumber=0; longNumber <= longitudeBands; longNumber++)
		{
			var first = (latNumber * (longitudeBands + 1)) + longNumber;
			var second = first + longitudeBands + 1;
			indexData.push(first);
			indexData.push(second);
		}
	}

	//this.VertexNormalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexNormalBuffer);
	//gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
	gl.bufferData(gl.ARRAY_BUFFER, normalData, gl.STATIC_DRAW);
	this.VertexNormalBuffer.itemSize = 3;
	this.VertexNormalBuffer.numItems = normalData.length / 3;

	//this.VertexTextureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexTextureCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordData), gl.STATIC_DRAW);
	this.VertexTextureCoordBuffer.itemSize = 2;
	this.VertexTextureCoordBuffer.numItems = textureCoordData.length / 2;

	//this.VertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
	this.VertexPositionBuffer.itemSize = 3;
	this.VertexPositionBuffer.numItems = vertexPositionData.length / 3;

	//this.VertexIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
	this.VertexIndexBuffer.itemSize = 1;
	this.VertexIndexBuffer.numItems = indexData.length;
}

//---------------------------------------------------------------------------
//
// Klasse:    TextureSphere
// function:  initBuffersPoleTexture
//
//
//---------------------------------------------------------------------------

 function initBuffersPoleTexture(startLatDeg, endLatDeg, north)
{
	var deg_to_rad = Math.PI / 180.0;
    
    /*
	var startLatDeg;
	var endLatDeg;

	if (north)
	{
		startLatDeg = 57.0;
		endLatDeg   = 90.0;
	}
	else
	{
		startLatDeg = -90.0;
		endLatDeg   = -57.0;
	}	
	*/
	
	var startLatRad =  (90.0 - startLatDeg) * deg_to_rad;
	var endLatRad   =  (90.0 - endLatDeg) * deg_to_rad;
	var latDim = (endLatRad - startLatRad) / (Math.PI);
	
	var latitudeBands  = 64;
	var longitudeBands = 64;
	var radius = this.radius;
	var nptr = 0;
	var f = 1.72;

	var DataSize = (latitudeBands+1) * (longitudeBands+1);
	var vertexPositionData = [];
	var normalData = new Float32Array(DataSize*3);
	var textureCoordData = [];
	
	
	
	for (var latNumber=0; latNumber <= latitudeBands; latNumber++)
	{
		var theta = startLatRad + (latNumber * Math.PI / latitudeBands) * latDim;
		var sinTheta = Math.sin(theta);
		var cosTheta = Math.cos(theta);

		for (var longNumber=0; longNumber <= longitudeBands; longNumber++)
		{
			var phi = longNumber * 2 * Math.PI / longitudeBands;
			var sinPhi = Math.sin(phi);
			var cosPhi = Math.cos(phi);

			var x = cosPhi * sinTheta;
			var y = cosTheta;
			var z = sinPhi * sinTheta;
			var u,v;
			if (north)
			{			
				u = z * 0.5 * f + 0.5;
				v = x * 0.5 * f + 0.5;
			}
			else
			{
				u =  z * 0.5 * f + 0.5;
				v = -x * 0.5 * f + 0.5;
			}

			normalData[nptr + 0] = x;
			normalData[nptr + 1] = y;
			normalData[nptr + 2] = z;
			nptr += 3;

			textureCoordData.push(u);
			textureCoordData.push(v);
			vertexPositionData.push(radius * x);
			vertexPositionData.push(radius * y);
			vertexPositionData.push(radius * z);
		}
	}

	var indexData = [];
	for (var latNumber=0; latNumber < latitudeBands; latNumber++)
	{
		for (var longNumber=0; longNumber <= longitudeBands; longNumber++)
		{
			var first = (latNumber * (longitudeBands + 1)) + longNumber;
			var second = first + longitudeBands + 1;
			indexData.push(first);
			indexData.push(second);
		}
	}

	//this.VertexNormalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexNormalBuffer);
	//gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
	gl.bufferData(gl.ARRAY_BUFFER, normalData, gl.STATIC_DRAW);
	this.VertexNormalBuffer.itemSize = 3;
	this.VertexNormalBuffer.numItems = normalData.length / 3;

	//this.VertexTextureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexTextureCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordData), gl.STATIC_DRAW);
	this.VertexTextureCoordBuffer.itemSize = 2;
	this.VertexTextureCoordBuffer.numItems = textureCoordData.length / 2;

	//this.VertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
	this.VertexPositionBuffer.itemSize = 3;
	this.VertexPositionBuffer.numItems = vertexPositionData.length / 3;

	//this.VertexIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
	this.VertexIndexBuffer.itemSize = 1;
	this.VertexIndexBuffer.numItems = indexData.length;
}


//---------------------------------------------------------------------------
//
// class      TextureSphere
// function:  drawTextureSphere
//
//
//---------------------------------------------------------------------------

function drawTextureSphere()
{
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, this.Texture);
	gl.uniform1i(shaderProgram3d.samplerUniform, 0);
    //gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);


	gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
	gl.vertexAttribPointer(shaderProgram3d.vertexPositionAttribute, this.VertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexTextureCoordBuffer);
	gl.vertexAttribPointer(shaderProgram3d.textureCoordAttribute, this.VertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexNormalBuffer);
	gl.vertexAttribPointer(shaderProgram3d.vertexNormalAttribute, this.VertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer);
	gl.drawElements(gl.TRIANGLE_STRIP, this.VertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}
