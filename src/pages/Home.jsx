import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import { SearchContext } from '../App';
import Pagination from '../components/Pagination';

function Home() {
  const { categoryId, sort } = useSelector((state) => state.filterSlice);
  const dispatch = useDispatch();

  const getCategoryId = (id) => {
    dispatch(setCategoryId(id));
  };

  const { searchvalue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortValue.replace('-', '');
    const order = sort.sortValue.includes('-') ? 'asc' : 'desc';
    const search = searchvalue ? `&search=${searchvalue}` : '';

    fetch(
      `https://6429c41100dfa3b54739d18f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setLoading(false);
      });
  }, [categoryId, sort.sortValue, searchvalue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);
  const pizzas = items.map((productItem) => <PizzaBlock key={productItem.id} {...productItem} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => getCategoryId(id)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{loading ? skeletons : pizzas}</div>
      <Pagination setChangPage={(number) => setCurrentPage(number)} />
    </div>
  );
}

export default Home;
