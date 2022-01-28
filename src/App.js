import React from 'react';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';

import {database} from './model';
import {AddPage} from './pages/AddPage';

const App = () => {
  return (
    <DatabaseProvider database={database}>
      <AddPage />
    </DatabaseProvider>
  );
};

export default App;
