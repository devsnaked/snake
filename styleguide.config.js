module.exports = {
  components: 'src/lib/**/[A-Z]*.js',
  pagePerSection: true,
  sections: [
    {
      name: 'Introduction',
      content: 'README.md',
    },
    {
      name: 'Form',
      components: './src/lib/Form/Form.js'
    }, 
    {
      name: 'Inputs',
      components: './src/lib/Form/Fields/**/*.js',
      ignore: './src/lib/Form/Fields/index.js'
    }
  ]
}