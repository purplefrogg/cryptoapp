import { Col, Row, Select } from 'antd'
import { Option } from 'antd/lib/mentions'
import Text from 'antd/lib/typography/Text'
import millify from 'millify'
import React, { useState } from 'react'
import { useGetCryptoexchangesQuery, useGetCryptosQuery } from '../services/cryptoAPI'

const Exchanges = () => {
  const { data: cryptos } = useGetCryptosQuery(100)
  const [coinId, setCoinId, isFetching] = useState('Qwsogvtv82FCd')

  const { data } = useGetCryptoexchangesQuery(coinId)


  const onSelectCoin = (value) => {
    setCoinId(value)
  }
  if (isFetching) return 'Loading...'
  return (
    <div>
      <Col span={24}>
        <Select
          showSearch
          defaultValue={cryptos?.data?.coins[0].name}
          className='select-news'
          placeholder='Select a Crypto'
          optionFilterProp='children'
          onChange={onSelectCoin}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >

          {cryptos?.data?.coins.map((coin) => <Option value={coin.uuid}>{coin.name}</Option>)}

        </Select>
      </Col>
      <Row gutter={[10, 10]}>
        <Col span={24}>
        <Row>
          <Col span={7}><Text style={{fontSize:26}}>Exchanges</Text>  
          </Col>
          <Col span={7}><Text style={{fontSize:26}}>Markets</Text>  
          </Col>
          <Col span={7}><Text style={{fontSize:26}}>24h trade volume</Text>  
          </Col>
        </Row>
        </Col>
        {data?.data?.exchanges.map((exchange) => (
           <Col span={24}>
             <Row>
               <Col span={7}>
               {exchange.rank}.
            <img src={exchange.iconUrl} alt="icon" style={{ maxWidth: 25, marginLeft:10, marginRight:10 }} />
            <Text>{exchange.name}</Text>
         
               </Col>
               <Col span={7}>
            <Text>{exchange.numberOfMarkets}</Text>
            </Col>
               <Col span={7}>
            <Text>$ {millify(exchange['24hVolume'])}</Text>
            </Col>
            </Row>
          </Col>


        ))}
      </Row>

    </div>
  )
}

export default Exchanges