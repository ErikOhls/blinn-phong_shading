// Fragment shader
#version 150

in vec3 v_normal;
in vec3 L;
in vec3 N;
in vec3 V;
/*
uniform vec3 u_diffuse_color;
uniform vec3 u_specular_color;
uniform vec3 u_ambient_color;
uniform float u_specular_power;
*/
out vec4 frag_color;

float diffuse(vec3 L, vec3 N)
{
    return max(0.0, dot(L, N));
}

float specular_normalized(vec3 N, vec3 H, float specular_power)
{ 
    float normalized = (8.0 + specular_power) / 8.0;
    return normalized * pow(max(0.0, dot(N, H)), specular_power);
}

void main()
{
    vec3 u_diffuse_color  = vec3(1.0, 0.0, 0.0);
    vec3 u_specular_color = vec3(0.0, 0.0, 1.0);
    vec3 u_ambient_color  = vec3(0.0, 1.0, 0.0);

    vec3 H = normalize(L + V);
    vec3 blinn = u_ambient_color + u_diffuse_color * L * diffuse(L, N)
        + u_specular_color * L * specular_normalized(N, H, 40.0);
    vec3 N = normalize(v_normal);
    //frag_color = vec4(0.5 * N + 0.5, 1.0);
    frag_color = vec4(blinn, 1.0);

}


