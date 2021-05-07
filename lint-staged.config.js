module.exports = {
  '*.{js,ts,tsx}': ['eslint', 'prettier --write'],
  '*.{ts,tsx}': [() => 'tsc --skipLibCheck'],
}
