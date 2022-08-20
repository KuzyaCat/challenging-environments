import { useState } from 'react';

import { useActions } from './hooks/actions';
import { useAppSelector } from './hooks/redux';
import { useGetEnvironments } from './hooks/environment/useGetEnvironments';

import { Header } from './components/header';

import './App.css';

function App() {
  // const { name: environment } = useAppSelector((state) => state.environment);
  const { setEnvironment } = useActions();

  const environments = useGetEnvironments();
  const environmentNames = environments?.length ? environments.map((env) => env.name) : [];
  const currentEnvironment = environments?.length ? environments[0].name : '';
  setEnvironment(currentEnvironment);

  return (
    <div className="App">
      <Header currentEnvironment={currentEnvironment} environments={environmentNames} />
    </div>
  )
}

export default App
