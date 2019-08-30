module.exports = {
  components: 'src/lib/**/[A-Z]*.js',
  sections: [
    {
      name: 'Introduction',
      content: './src/docs/introduction.md',
      sections: [
        {
          name: 'Usage',
          content: 'src/docs/howuse.md'
        }
      ]
    }
  ]
}