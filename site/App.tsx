import * as React from 'react'
// import { hot } from  'react-hot-loader/root'
import Layout from '../components/layout'
// import Content from './layout/Content'
import './style/index.scss'
import ComponentsRouter from './router/componentsRouter'
import BackTop from 'components/back-top'
import Silder from './layout/Silder';

class App extends React.Component {
  public render() {
    return (
      <Layout className="app">
        <Layout.Header />
          <Layout>
            <Layout.Silder collapsible auto><Silder /></Layout.Silder>
            <Layout.Content auto id="demo-content">
              <div className="content"><ComponentsRouter /></div>
            </Layout.Content>
          </Layout>
        <Layout.Footer />
        <BackTop target="demo-content" />
      </Layout>
    )
  }
}
export default App