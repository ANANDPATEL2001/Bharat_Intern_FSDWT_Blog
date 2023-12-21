import { BrowserRouter, Switch, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';

import HOC from './Components/HOC'
import Blog from './pages/Blog/Blog';
import Component_navbar from './Components/Component.navbar';
import Component_footer from './Components/Component.footer';
import Editor from './pages/Editor/Editor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={() =>
          <Fragment>
            {/* <Component_navbar />
            <Home /> */}
            <HOC />
          </Fragment>
        } />

        {/* <Route path="/editor" Component={() =>
          <Fragment>
            <Component_navbar />
            <Editor />
            <Component_footer />
          </Fragment>
        } /> */}

        <Route path="/:blog" Component={() =>
          <Fragment>
            <Component_navbar />
            <Blog />
            <Component_footer />
          </Fragment>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
