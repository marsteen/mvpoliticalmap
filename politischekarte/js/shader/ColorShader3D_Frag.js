
var ColorShader3D_Frag = `
#version 100
  //---------------------------------------------------------------------------
  //
  // Fragment Shader
  //
  //---------------------------------------------------------------------------

  
  #extension GL_OES_standard_derivatives : enable
  

  
  precision mediump float;
  

  varying vec3 vVertexColor;
  
  void main(void)
  {
    
    float r     = 0.0;
    float delta = 0.0;
    float alpha = 1.0;
    
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    r = dot(cxy, cxy);

    
    delta = fwidth(r);
    alpha = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, r);
    

    
    gl_FragColor = vec4(vVertexColor, alpha);
    
  }
`;  

