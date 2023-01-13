import { gql } from 'graphql-request';
import sortNewsByImage from './sortNewsByImage';

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  const query = gql`
    query MyQuery(
      $access_key: String
      $keywords: String
      $categories: String
    ) {
      myQuery(
        access_key: $access_key
        categories: $categories
        countries: "gb"
        sort: "published_desc"
        keywords: $keywords
      ) {
        data {
          author
          category
          country
          description
          image
          language
          published_at
          source
          url
          title
        }
        pagination {
          count
          limit
          offset
          total
        }
      }
    }
  `;

  const res = await fetch(
    'https://gbadolite.stepzen.net/api/early-beetle/__graphql',
    {
      method: 'POST',
      cache: isDynamic ? 'no-cache' : 'default',
      next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `ApiKey ${process.env.ZTEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          access_key: process.env.MEDIA_STACK_API_KEY,
          categories: category,
          keywords: keywords,
        },
      }),
    }
  );

  console.log('LOADING DATA', category, keywords);

  const newsResponse = await res.json();

  const news = sortNewsByImage(newsResponse.data.myQuery);

  return news;
};

export default fetchNews;

// stepzen import curl "http://api.mediastack.com/v1/news?access_key=aae3d3471c7e9f52fb63a4067c866a46&countries=us%2Cgb&limit=100&offset=0&sort=published_desc"
