Prerender
=========

A very simple prerender docker container that utilize headless chrome in the background
Fork from interactivesolutions/prerender.

It runs a 180 min caching nginx before the prerender. Which only caches on 200 and does 404 non normal prerender things. It also has a timeout of 5 seconds and does deliver stale if timeout etc.

works with http://localhost/https://test.com but also works with http://localhost/https/test.com

# Usage

`make run`

# Links
- https://www.nginx.com/blog/compiling-dynamic-modules-nginx-plus/
- https://github.com/emcniece/nginx-with-cache-purge
- https://github.com/nginx-modules/ngx_cache_purge

# Sample Nginx configuration

Just make sure the `proxy_pass` matches the what you have in your run command

```
location / {
    try_files $uri @prerender;
}

location @prerender {

    set $prerender 0;
    if ($http_user_agent ~* "baiduspider|twitterbot|facebookexternalhit|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator") {
        set $prerender 1;
    }

    if ($args ~ "_escaped_fragment_") {
        set $prerender 1;
    }

    if ($http_user_agent ~ "Prerender") {
        set $prerender 0;
    }

    if ($uri ~ "\.(js|css|xml|less|png|jpg|jpeg|gif|pdf|doc|txt|ico|rss|zip|mp3|rar|exe|wmv|doc|avi|ppt|mpg|mpeg|tif|wav|mov|psd|ai|xls|mp4|m4a|swf|dat|dmg|iso|flv|m4v|torrent|ttf|woff)") {
        set $prerender 0;
    }

    if ($prerender = 1) {
        rewrite .* /$scheme://$host$request_uri? break;
        proxy_pass http://127.0.0.1:3000;
    }

    if ($prerender = 0) {
        rewrite .* /index.html break;
    }
}
```
