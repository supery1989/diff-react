import * as React from 'react'
import Layout from '../components/layout'
import './style/index.scss'
import ComponentsRouter from './router/componentsRouter'
import BackTop from 'components/back-top'
import Silder from './layout/Silder'
import Header from './layout/Header'
import Footer from './layout/Footer'

class App extends React.Component {
  public render() {
    return (
      <Layout className="app">
        <Layout.Header className='app-header'><Header /></Layout.Header>
          <Layout>
            <Layout.Silder width='250px' auto className='app-slider'><Silder /></Layout.Silder>
            <Layout.Content auto id="demo-content">
              <div className='markdown-content'><ComponentsRouter /></div>
            </Layout.Content>
          </Layout>
        <Layout.Footer className='app-footer'><Footer /></Layout.Footer>
        <BackTop target="demo-content" />
      </Layout>
    )
  }
}
export default App