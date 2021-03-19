

var ColorShader2D_Frag = `
  //
  // Fragment-Shader Shader 2D
  //

  #ifdef GL_ES
  precision highp float;
  #endif

  uniform vec4 uVertexColor;

	void main(void)
	{
    gl_FragColor = uVertexColor;
	}
`;	
