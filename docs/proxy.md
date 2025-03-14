# 代理配置

!> 使用代理时，请启用 `SHOWTIME_TRUST_PROXY_HEADERS`。参见[配置说明](config.md)。

## nginx

### 在根路径

```nginx
upstream showtime {
  # 设置为 SHOWTIME_SERVER_ADDRESS 中配置的地址。
  # 默认为 5050
  server 127.0.0.1:5050;
}

server {
  listen 80;

  # 这里是您的域名/子域名
  server_name showtime.example.com;

  location / {
    # 代理到 showtime
    proxy_pass         http://showtime;
    proxy_http_version 1.1;

    # 设置用于代理 WebSocket 的头信息
    proxy_set_header   Upgrade $http_upgrade;
    proxy_set_header   Connection "upgrade";
    proxy_redirect     http:// $scheme://;

    # 设置代理头信息
    proxy_set_header   X-Real-IP $remote_addr;
    proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header   X-Forwarded-Proto http;

    # 代理必须保留主机，因为 showtime 会使用它与 WebSocket 连接的源进行验证
    proxy_set_header   Host $http_host;
  }
}
```

### 在子路径

```nginx
upstream showtime {
  # 设置为 SHOWTIME_SERVER_ADDRESS 中配置的地址。
  # 默认为 5050
  server 127.0.0.1:5050;
}

server {
  listen 80;

  # 这里是您的域名/子域名
  server_name showtime.example.com;

  location /showtime/ {
    rewrite ^/showtime(/.*) $1 break;
  
    # 代理到 showtime
    proxy_pass         http://showtime;
    proxy_http_version 1.1;

    # 设置用于代理 WebSocket 的头信息
    proxy_set_header   Upgrade $http_upgrade;
    proxy_set_header   Connection "upgrade";
    proxy_redirect     http:// $scheme://;

    # 设置代理头信息
    proxy_set_header   X-Real-IP $remote_addr;
    proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header   X-Forwarded-Proto http;

    # 代理必须保留主机，因为 showtime 会使用它与 WebSocket 连接的源进行验证
    proxy_set_header   Host $http_host;
  }
}
```

## Apache (httpd)

需要以下模块：

* mod_proxy
* mod_proxy_wstunnel
* mod_proxy_http

### 在根路径

```apache
<VirtualHost *:80>
    ServerName showtime.example.com
    Keepalive On

    # 代理必须保留主机，因为 showtime 会使用它与 WebSocket 连接的源进行验证
    ProxyPreserveHost On

    # 将 5050 替换为 SHOWTIME_SERVER_ADDRESS 中定义的端口。
    # 默认为 5050

    # 将 WebSocket 请求代理到 /stream
    ProxyPass "/stream" ws://127.0.0.1:5050/stream retry=0 timeout=5

    # 将所有其他请求代理到 /
    ProxyPass "/" http://127.0.0.1:5050/ retry=0 timeout=5

    ProxyPassReverse / http://127.0.0.1:5050/
</VirtualHost>
```

### 在子路径

```apache
<VirtualHost *:80>
    ServerName showtime.example.com
    Keepalive On

    Redirect 301 "/showtime" "/showtime/"

    # 代理必须保留主机，因为 showtime 会使用它与 WebSocket 连接的源进行验证
    ProxyPreserveHost On

    # 将 WebSocket 请求代理到 /stream
    ProxyPass "/showtime/stream" ws://127.0.0.1:5050/stream retry=0 timeout=5

    # 将所有其他请求代理到 /
    ProxyPass "/showtime/" http://127.0.0.1:5050/ retry=0 timeout=5
    #                 ^- !!尾部斜杠是必需的!!

    ProxyPassReverse /showtime/ http://127.0.0.1:5050/
</VirtualHost>
```
