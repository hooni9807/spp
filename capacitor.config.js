module.exports = {
  appId: 'com.hooni9807.spp',
  appName: 'SPP',
  webDir: 'dist',
  server: { androidScheme: 'https' },
  plugins: {
    FirebaseAuthentication: {
      providers: ['google.com'],
      // The existing Firebase JS session owns Firestore and game saves.
      skipNativeAuth: true
    }
  }
};
