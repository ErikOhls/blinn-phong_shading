// Vertex shader
#version 150
#extension GL_ARB_explicit_attrib_location : require

layout(location = 0) in vec4 a_position;
layout(location = 1) in vec3 a_normal;

out vec3 N;
out vec3 L;
out vec3 V;
out vec3 R;

uniform mat4 u_mvp;
uniform mat4 u_mv;
uniform vec3 u_light_src;

void main()
{
    vec3 position_eye = vec3(u_mvp * a_position);

    // Calculate the view-space normal
    N = normalize(mat3(u_mv) * a_normal);
    // Calculate the view-space light direction
    L = normalize(u_light_src - position_eye);
    // View normal
    V = position_eye * -1.0f;
    // Reflection vector
    R = reflect(-V, N);

    gl_Position = u_mvp * a_position;
}
