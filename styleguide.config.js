module.exports = {
  components: 'src/lib/**/*.js',
  pagePerSection: true,
  sections: [
    {
      name: 'Introduction',
      content: 'README.md',
    }, 
    {
      name: 'Inputs',
      components: './src/lib/Form/Fields/*.js'
    }
  ]
}