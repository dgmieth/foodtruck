module.exports = {
  apps : [
    {
      name   : "rest",
      script : "./rest/app/app.js",
      env_production: {
        NODE_ENV: "prod"
      },
      env_development: {
        NODE_ENV: "dev"
      }
    },
    {
      name   : "adm",
      script : "./adm/app/app.js",
      env_production: {
        NODE_ENV: "prod"
      },
      env_development: {
        NODE_ENV: "dev"
      }
    }
  ]
}
