import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        "Not a valid email!": "Not a valid email!",
        "Username is invalid!": "Username is invalid!",
        "Name is invalid!": "Name is invalid!",
        "Password is invalid!": "Password is invalid!",
        "Email has already taken! Try another username.": "Email has already taken! Try another username.",
        "Sign Up": "Sign Up",
        "Password mismatch!": "Password mismatch!",
        "Username": "Username",
        "Name-Surname": "Name-Surname",
        "Password": "Password",
        "Password Repeat": "Password Repeat",
        "Login":"Login",
        "Login Failed !":"Login Failed !"

      }
    },
    tr: {
      translations: {
        "Not a valid email!": "Geçerli bir e-mail adresi değil!",
        "Username is invalid!": "Kullanıcı adı geçersiz!",
        "Name is invalid!": "İsim-Soyisim geçersiz!",
        "Password is invalid!": "Şifre geçersiz!",
        "Email has already taken! Try another username.": "Bu e-mail adresi zaten kullanılıyor! Farklı bir adres deneyin!",
        "Sign Up": "Kayıt Ol",
        "Password mismatch!": "Şifreler eşleşmiyor!",
        "Username": "Kullanıcı Adı",
        "Name-Surname": "İsim-Soyisim",
        "Password": "Şifre",
        "Password Repeat": "Şifreyi Tekrarla",
        "Login":"Giriş Yap",
        "Login Failed !":"Giriş başarısız !"
      }
    }
  },
  fallbackLng: "tr",
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ","
  },
  react: {
    wait: true
  }
});

export default i18n;