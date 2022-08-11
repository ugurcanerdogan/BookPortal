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
        "Login": "Login",
        "Login Failed !": "Login Failed !",
        "Logout": "Logout",
        "Users": "Users",
        "Next": "next -->",
        "Previous": "<-- previous",
        "Load Failure": "Load failed!",
        "User not found!": "User not found!",
        "Edit Profile":"Edit Profile",
        "Name-Surname: ":"Name-Surname: ",
        "E-mail: ":"E-mail: ",
        "Change name and surname": "Change name and surname",
        "Save":"Save",
        "Cancel":"Cancel",
        "My Profile":"My Profile",
        "Change password":"Change password"

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
        "Login": "Giriş Yap",
        "Login Failed !": "Giriş başarısız !",
        "Logout": "Çıkış Yap",
        "Users": "Kullanıcılar",
        "Next": "sonraki -->",
        "Previous": "<-- önceki",
        "Load Failure": "Yükleme başarısız!",
        "User not found!": "Kullanıcı bulunamadı!",
        "Edit Profile":"Profili Düzenle",
        "Name-Surname: ":"İsim-Soyisim: ",
        "E-mail: ":"E-mail adresi: ",
        "Change name and surname": "İsim ve soyisminizi değiştirin",
        "Save":"Kaydet",
        "Cancel":"İptal",
        "My Profile":"Profilim",
        "Change password":"Şifrenizi değiştirin"
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