module.exports= {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript'
  ],
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { "legacy": true }],
    ['@babel/plugin-proposal-class-properties', { "loose": true}],
    ['module-resolver', {
      alias: {
        "@notifications": "./src/modules/notifications",
        "@appointments": "./src/modules/appointments",
        "@users": "./src/modules/users",
        "@config": "./src/config",
        "@shared": "./src/shared"
      }
    }]
  ]
}
