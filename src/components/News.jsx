import React, {useState} from 'react'
import { Select, Row, Col, Typography, Card, Avatar } from 'antd'
import moment from 'moment'

import { useGetCryptosQuery } from '../services/cryptoAPI'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'

const demoImage = 'http://coinrevolution/wp-content/uploads/2020/06/cryptonews.jpg'

const { Text, Title } = Typography
const { Option } = Select
const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('CryptoCurrency')
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: newsCategory, count: simplified ? 3 : 12 })

  const { data } = useGetCryptosQuery(100)

  
  if (!cryptoNews?.value) return 'Loading...'

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value='Cryptocurrency'></Option>
              {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
              
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={news.url} target='_blank' rel='noreferrer'>
              <div className='news-image-container'>
                <Title className='news-title' level={4}>{news.name}</Title>
                <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description
                }
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='news' />
                  <Text className='provider-name'>{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>

              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News