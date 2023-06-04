import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://6429c41100dfa3b54739d18f.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка получение пиццы');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <h1>{pizza.title}</h1>
      <img src={pizza.imageUrl} alt="" />
      <p>{pizza.price}</p>
      <Link to="/" className="button button--black">
        На главную
      </Link>
    </div>
  );
};

export default FullPizza;
