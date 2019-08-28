const plugins = [
  require("@babel/plugin-syntax-dynamic-import"),
  [require("@babel/plugin-proposal-decorators"), { "legacy": true }],
  [require("@babel/plugin-proposal-class-properties"), { "loose": false }],
];
const presets = [
  [
    "@babel/env",
    {
      targets: {
        "browsers": ["last 2 versions", "ie >= 7"]
      }
    },
  ],
  [
    "@babel/preset-react",
  ],
  
  // [
  //   "@babel/preset-stage-1",
  // ],
  [
    "@babel/preset-typescript",
  ]
];
module.exports = { presets, plugins };
