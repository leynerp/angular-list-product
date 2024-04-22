module.exports = {
  env: {
    browser: true,
    es2021: true
  }, 
  overrides: [
    {
      env: {
        node: true
      },
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
	  extends: 'love',
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
      "@typescript-eslint/consistent-type-imports": false
     
  }
}
