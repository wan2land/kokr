module.exports = {
  env: {
    jest: true,
  },
  extends: [
    'graphity',
    'graphity/typescript',
  ],
  ignorePatterns: [
    'node_modules/',
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
}
