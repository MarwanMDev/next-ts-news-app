import { categories } from '../constants';
import fetchNews from '../lib/fetchNews';
import NewsList from './NewsList';

async function Homepage() {
  const news: NewsResponse = await fetchNews(categories.join(','));
  // set timeout to 3 seconds
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div>
      <NewsList news={news} />
    </div>
  );
}

export default Homepage;
