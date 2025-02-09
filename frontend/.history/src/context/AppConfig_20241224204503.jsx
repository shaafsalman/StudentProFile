import { createContext, useContext } from "react";
import logo from "./../assets/logoAndName.png";
import { Facebook, Twitter, Instagram } from 'lucide-react';
import defaultUser from "./../assets/user.png";
import nameLogo from "./../assets/name.png";


const AppConfigContext = createContext();

export const AppConfigProvider = ({ children }) => {
  const appConfig = {
    appName: "Daallo Express",
    logo: logo,
    defaultUser: defaultUser,
    nameLogo:nameLogo,
    address: "123 Main Street, Springfield",
    contact: {
      email: "support@myapp.com",
      phone: "+123456789",
    },
    socialMediaLinks: [
      { href: 'https://facebook.com', icon: Facebook },
      { href: 'https://twitter.com', icon: Twitter },
      { href: 'https://instagram.com', icon: Instagram },
    ],
  };

  return (
    <AppConfigContext.Provider value={appConfig}>
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => useContext(AppConfigContext);
