// Fragment shader
#version 150

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
    return max(0.0, dot(N, L));
}

float specular_normalized(vec3 N, vec3 H, float specular_power)
{ 
    float normalized = (8.0 + specular_power) / 8.0;
    return normalized * pow(max(0.0, dot(N, H)), specular_power);
}

void main()
{
    vec3 u_diffuse_color  = vec3(0.0f, 0.5f, 0.5f);
    vec3 u_specular_color = vec3(0.5f, 0.5f, 0.0f);
    vec3 u_ambient_color  = vec3(1.0f, 0.0f, 0.0f);
    vec3 u_light_color    = vec3(0.0f, 1.0f, 0.0f);
    float u_specular_power = 100.0f;
    /*
    vec3 out_color = vec3(0.0f);
    out_color += u_ambient_color;

    vec3 tmp = (u_diffuse_color * u_light_color) * diffuse(L, N);
    out_color += tmp;

    tmp = V + L;
    vec3 H = tmp / length(tmp);

    out_color += specular_normalized(N, H, 100.0f) * u_specular_color * u_light_color;
    frag_color = vec4(out_color, 1.0);
    */

    vec3 I = vec3(0.0f);

    vec3 Ia = u_ambient_color;
    I += Ia;

    vec3 Id = (u_diffuse_color * u_light_color) * max(dot(N, L), 0);
    I += Id;

    vec3 sum = L + V;
    vec3 H = sum / length(sum);

    float normalization = (8.0 + u_specular_power) / 8.0;
    vec3 Is = normalization * pow(max(0.0, dot(N, H)), u_specular_power) * u_specular_color * u_light_color;

    I += Is;

    I = pow(I, vec3(1.0/2.2));

    frag_color = vec4(I, 1.0);

}


