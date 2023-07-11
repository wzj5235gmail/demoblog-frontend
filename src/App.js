import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ArticlesList } from './pages/ArticlesList';
import { ArticleDetail } from './pages/ArticleDetail';
import { ArticleNew } from './pages/ArticleNew';
import { ArticleUpdate } from './pages/ArticleUpdate';
import { Navbar } from './components/Navbar';


const App = () => {

  return (
    <div className='container'>
      <Navbar />
      <Router>
        <Switch>
          <Route path='/' exact component={ArticlesList} />
          <Route path='/articlesList' component={() => <ArticlesList isSearch={false} />} />
          <Route path='/articleDetail/:articleId' component={ArticleDetail} />
          <Route path='/newArticle' component={ArticleNew} />
          <Route path='/articleUpdate/:articleId' component={ArticleUpdate} />
          <Route path='/articlesSearchResult/:searchTerm' component={() => <ArticlesList isSearch={true} />} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;


