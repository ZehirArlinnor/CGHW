#version 330
layout(location=0) out vec4 color;

uniform sampler2D text;
uniform vec3 object_color;
uniform vec3 light_pos;
uniform vec3 eye_pos;
uniform int blinn;

in vec3 g_position;
in vec2 g_uv;
in vec3 g_normal;

void main()
{
	vec3 l = normalize(light_pos - g_position);	//gp to light
	vec3 n = normalize(g_normal);	//normal at p
	float cosine = max(dot(l, n), 0);
	vec3 r = reflect(l, n);	//reflection of l
	vec3 v = normalize(-eye_pos - g_position);	//gp to viewer
	vec3 h = normalize(l - v);	//half

	float spec = cosine * pow(dot(r, v), 10);	//specular
	if (blinn != 0)
		spec = cosine * pow(dot(n, h), 40);

    color = vec4(object_color*texture(text, g_uv).rgb*cosine + spec*vec3(1.0), 1.0);
}