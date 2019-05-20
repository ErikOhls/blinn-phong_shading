// Fragment shader
#version 150

in vec3 L;
in vec3 N;
in vec3 V;
in vec3 R;

uniform samplerCube u_cubemap;
uniform bool u_cube_on;
uniform bool u_gamma_on;
uniform bool u_diff_on;

uniform vec3 u_diffuse_color;
uniform vec3 u_specular_color;
uniform vec3 u_ambient_color;
uniform vec3 u_light_color;
uniform float u_specular_power;

out vec4 frag_color;

float diffuse(vec3 L, vec3 N)
{
    return max(0.0, dot(N, L));
}

float specular_normalized(vec3 N, vec3 H)
{ 
    float normalized = (8.0 + u_specular_power) / 8.0;
    return normalized * pow(max(0.0, dot(N, H)), u_specular_power);
}

void main()
{
    // Ambient
    vec3 out_color = vec3(0.0f);
    out_color += u_ambient_color;

    // Diffuse
    vec3 tmp = (u_diffuse_color * u_light_color) * diffuse(L, N);
    out_color += tmp;
    
    // Specular
    tmp = V + L;
    vec3 H = tmp / length(tmp);
    out_color += specular_normalized(N, H) * u_specular_color * u_light_color;

    if(u_gamma_on){
        out_color = pow(out_color, vec3(1 / 2.2));
    }

    frag_color = vec4(out_color, 1.0);

    // Cube
    if(u_cube_on){
        vec3 cubed_color = texture(u_cubemap, R).rgb;
        frag_color = vec4(cubed_color, 1.0);
    }

}


