module.exports = {
  src: './src',
  schema: './schema.graphql',
  language: 'typescript',
  artifactDirectory: './src/__generated__',
  extensions: ['ts', 'js', 'tsx', 'jsx'],
  customScalars: { Date: 'string' },
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
};
