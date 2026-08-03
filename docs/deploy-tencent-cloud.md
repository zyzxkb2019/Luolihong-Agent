# 腾讯云部署提示

## 最快上线建议

8月5日首发建议优先使用 Vercel 或腾讯云 CloudBase 静态/Node 托管，先拿到可访问链接，再做 `4nianji.com` 绑定。

## 腾讯云轻量服务器部署

1. 安装 Node.js 20+ 和 Git。
2. 克隆仓库。
3. 执行：

```bash
npm install
npm run build
npm run start
```

4. 用 Nginx 反向代理到 `http://127.0.0.1:3000`。
5. 在 DNS 中把 `4nianji.com` 或子域名解析到服务器 IP。
6. 用腾讯云 SSL 证书或 Certbot 配置 HTTPS。

## 生产环境建议

- 使用 PM2 管理进程
- 配置 Supabase 环境变量
- 后续接入真实大模型 API 与向量数据库
