import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setPage } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import { SearchContext } from '../App';
import Pagination from '../components/Pagination';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filterSlice);

  const getCategoryId = (id) => {
    dispatch(setCategoryId(id));
  };

  const setCurrentPage = (id) => {
    dispatch(setPage(id));
  };

  const { searchvalue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortValue.replace('-', '');
    const order = sort.sortValue.includes('-') ? 'asc' : 'desc';
    const search = searchvalue ? `&search=${searchvalue}` : '';

    axios
      .get(
        `https://6429c41100dfa3b54739d18f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      });
  }, [categoryId, sort.sortValue, searchvalue, currentPage]);

  React.useEffect(() => {
    const urlSting = qs.stringify({
      categoryId,
      sortValue: sort.sortValue,
      currentPage,
    });
    navigate(`?${urlSting}`);
    // eslint-disable-next-line
  }, [categoryId, sort.sortValue, currentPage]);

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
