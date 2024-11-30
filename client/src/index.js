import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ClerkProvider } from '@clerk/clerk-react';
import { dark} from '@clerk/themes';
import { UsernameProvider } from './UsernameContextProvider';

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
// console.log("🚀 ~ PUBLISHABLE_KEY:", PUBLISHABLE_KEY)

if (!PUBLISHABLE_KEY) {
  // console.error("Environment Variables:", process.env); 
  throw new Error("Missing Publishable Key. Ensure REACT_APP_CLERK_PUBLISHABLE_KEY is set in your .env.local file.");
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClerkProvider appearance={{
      baseTheme: dark,
      variables: { colorPrimary: "#2DD4BF" },
    }} publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <UsernameProvider>
        <App />
      </UsernameProvider>
    </ClerkProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
