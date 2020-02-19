if (process.env.NODE_ENV === 'production') {
  module.exports = {mongoURI: 'mlab or some other production database'}
} else {
  module.exports = {mongoURI: 'mongodb://localhost/vidjot-dev'}
}
