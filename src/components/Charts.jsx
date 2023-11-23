import React, { PureComponent } from 'react';
import { ResponsiveContainer, PieChart, Pie, Legend } from 'recharts';
import { useSelector } from 'react-redux';

  // const products = useSelector((store) => store.market.products)
  // const categories = useSelector((store) => store.market.categories)
  // const subCategories = useSelector((store) => store.market.subCategories)
  // const brands = useSelector((store) => store.market.brands)

  const data = [
    { name: 'Products', value: 100 },
    { name: 'Categories', value: 200 },
    { name: 'SubCategories', value: 300 },
    { name: 'Brands', value: 400 },
  ];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-in-responsive-container-qyv6t';

  render() {

    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={data} fill="#1976D2" label />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}