import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react"
import { QuizProvider } from "./context/QuizProvider"
import { AuthProvider } from "./context/AuthProvider"

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <QuizProvider>
          <Router>
            <App />
          </Router>
        </QuizProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
