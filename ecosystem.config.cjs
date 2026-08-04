module.exports = {
  apps: [
    {
      name: "luolihong-agent",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1 -p 3001",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
