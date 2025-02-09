import { createContext, useContext } from "react";
import logo_black from "./../assets/logo_black.png";
import logo_white from "./../assets/logo_white.png";

import { Facebook, Twitter, Instagram ,Linkedin,Github} from 'lucide-react';
import defaultUser from "./../assets/user.png";
import nameLogo from "./../assets/logo_black.png";


const AppConfigContext = createContext();

export const AppConfigProvider = ({ children }) => {
  const appConfig = {
    appName: "Fast Resume",
    logo_black: logo_black,
    logo_white:logo_white,
    defaultUser: defaultUser,
    nameLogo:nameLogo,
    address: "123 Main Street, Springfield",
    country:"Pakistan",
    contact: {
      email: "shaafsalman@shaafsalman.com",
      phone: "+923334264382",
    },
    socialMediaLinks: [
      // { href: 'https://facebook.com', icon: Facebook },
      // { href: 'https://twitter.com', icon: Twitter },
      { href: 'https://instagram.com', icon: Instagram },
      { href: "https://linkedin.com/in/shaafsalman", icon: Linkedin },
      { href: "https://github.com/shaafsalman", icon: Github },
      
    ],
        whatsappNumber: "923334264382", // Store WhatsApp number here

  };

  return (
    <AppConfigContext.Provider value={appConfig}>
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => useContext(AppConfigContext);
