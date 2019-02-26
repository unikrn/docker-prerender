FROM nginx:1.14.0

ENV NGINX_VERSION=1.14.0
#ENV NGX_CACHE_PURGE_VERSION=2.4.2
ENV NGX_CACHE_PURGE_VERSION=master

# Install basic packages and build tools
RUN apt-get update && apt-get install -y \
    wget \
    build-essential \
    libssl-dev \
    libpcre3 \
    libpcre3-dev \
    zlib1g-dev \
    && apt-get clean

# Get sources

RUN cd /tmp && wget http://nginx.org/download/nginx-$NGINX_VERSION.tar.gz https://github.com/nginx-modules/ngx_cache_purge/archive/$NGX_CACHE_PURGE_VERSION.tar.gz && \
    tar -zxvf nginx-$NGINX_VERSION.tar.gz && mv nginx-$NGINX_VERSION nginx && rm nginx-$NGINX_VERSION.tar.gz && \
    tar -zxvf $NGX_CACHE_PURGE_VERSION.tar.gz && mv ngx_cache_purge-$NGX_CACHE_PURGE_VERSION ngx_cache_purge && rm $NGX_CACHE_PURGE_VERSION.tar.gz && \
    cd /tmp/nginx && ./configure --with-compat --add-dynamic-module=/tmp/ngx_cache_purge && \
    make modules && \
    cp objs/ngx_http_cache_purge_module.so /etc/nginx/modules/ && \
    rm -rf /tmp

RUN { echo -n 'load_module modules/ngx_http_cache_purge_module.so; '; cat /etc/nginx/nginx.conf; } > /etc/nginx/nginx.conf.new && mv /etc/nginx/nginx.conf.new /etc/nginx/nginx.conf

