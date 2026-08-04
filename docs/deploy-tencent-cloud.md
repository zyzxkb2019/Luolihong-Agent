# 腾讯云部署指南

## 推荐路径

本项目是 Next.js 16 应用，推荐用“腾讯云轻量应用服务器 + Node.js + PM2 + Nginx”上线。这样最稳定，也方便后续接 AI、Supabase、日志和域名。

## 服务器准备

建议配置：

- 系统：Ubuntu 22.04 LTS
- 内存：2GB 起步，4GB 更稳
- 开放端口：80、443、22
- 域名：`career.4nianji.com` 解析到服务器公网 IP

## 安装基础环境

登录服务器后执行：

```bash
sudo apt update
sudo apt install -y git curl nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

## 拉取代码

```bash
cd /var/www
sudo git clone https://github.com/zyzxkb2019/Luolihong-Agent.git
sudo chown -R $USER:$USER /var/www/Luolihong-Agent
cd /var/www/Luolihong-Agent
```

如果仓库是私有仓库，服务器会要求 GitHub 登录或 Token。最简单做法是在服务器上配置 GitHub Personal Access Token，或者先把仓库临时设为私有可部署通道可访问。

## 配置环境变量

```bash
cp .env.example .env.local
nano .env.local
```

首发最低配置：

```bash
NEXT_PUBLIC_SITE_URL=https://career.4nianji.com
```

如果你有大模型 Key，再加：

```bash
AI_API_KEY=你的key
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini
```

如果暂时没有 Supabase，也可以上线。预约表单会生成可复制信息，不会让线索静默丢失。

## 构建并启动

```bash
npm install
npm run build
npm install -g pm2
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

执行 `pm2 startup` 后，它会输出一行 `sudo env PATH=...` 命令。复制执行一次，保证服务器重启后网站自动恢复。

## 配置 Nginx

```bash
sudo cp docs/nginx-4nianji.example.conf /etc/nginx/sites-available/career.4nianji.com
sudo ln -s /etc/nginx/sites-available/career.4nianji.com /etc/nginx/sites-enabled/career.4nianji.com
sudo nginx -t
sudo systemctl reload nginx
```

先访问：

```text
http://career.4nianji.com
```

## 配置 HTTPS

如果你用腾讯云 SSL 证书，可以在腾讯云控制台申请并下载 Nginx 证书，然后配置到 Nginx。

如果用 Certbot：

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d career.4nianji.com
```

完成后访问：

```text
https://career.4nianji.com
```

## 更新网站

以后每次我推送新代码后，服务器执行：

```bash
cd /var/www/Luolihong-Agent
git pull
npm install
npm run build
pm2 restart luolihong-agent
```

## 检查命令

```bash
pm2 status
pm2 logs luolihong-agent
curl -I http://127.0.0.1:3000
curl -I https://career.4nianji.com
```

## 渠道链接

上线后建议给不同渠道使用不同参数：

- 朋友圈：`https://career.4nianji.com?source=moments`
- 微信群：`https://career.4nianji.com?source=wechat_group`
- 公众号：`https://career.4nianji.com?source=public_account`
- 视频号：`https://career.4nianji.com?source=video_account`

## 生产环境建议

- 使用 PM2 管理进程
- 配置 Supabase 环境变量
- 后续接入真实大模型 API 与向量数据库
- 首发当天至少每2小时导出一次预约线索或截图备份
