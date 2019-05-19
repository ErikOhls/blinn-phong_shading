// Vertex shader
#version 150
#extension GL_ARB_explicit_attrib_location : require

layout(location = 0) in vec4 a_position;
layout(location = 1) in vec3 a_normal;

out vec3 v_normal;

out vec3 N;
out vec3 L;
out vec3 V;

uniform vec3 u_diffuse_color;
uniform vec3 u_specular_color;
uniform float u_specular_power;

uniform mat4 u_mvp;
uniform vec3 u_light_position;

void main()
{
    v_normal = a_normal;
    gl_Position = u_mvp * a_position;

    // Calculate the view-space normal
    vec3 N = normalize(mat3(u_mvp) * a_normal);
    // Calculate the view-space light direction
    vec3 position_eye = vec3(u_mvp * a_position);
    vec3 L = normalize(u_light_position - position_eye);
    // View normal
    vec3 V = normalize(-position_eye);
}
