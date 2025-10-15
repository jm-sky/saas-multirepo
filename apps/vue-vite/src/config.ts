export const config = {
  app: {
    id: 'vue-core',
    name: 'Vue Core',
  },
  auth: {
    defaults: {
      userEmail: import.meta.env.VITE_DEFAULT_USER_EMAIL,
      userPassword: import.meta.env.VITE_DEFAULT_USER_PASSWORD,
    }
  }
}

export const TOKEN_STORAGE_KEY = `${config.app.id}-token`
