module.exports = {
  apps: [{
    script: 'index.js',
    watch: '.',
    env_production: {
      NODE_ENV: 'production',
    },
    env: {
      JWT_KEY: 'secret',
      PORT: 8000,
    },
  }],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
