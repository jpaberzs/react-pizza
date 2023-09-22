import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { setCategoryId, setPage } from '../redux/slices/filterSlice';
import { Status, fetchpizzas } from '../redux/slices/pizzaSlice';
import { RootState, useAppDispatch } from '../redux/store';

import qs from 'qs';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Pagination from '../components/Pagination';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categoryId, sort, currentPage } = useSelector((state: RootState) => state.filterSlice);
  const { items, status } = useSelector((state: RootState) => state.pizza);
  const { searchValue } = useSelector((state: RootState) => state.filterSlice);

  const getCategoryId = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const setCurrentPage = (id: number) => {
    dispatch(setPage(id));
  };

  async function getPizzas() {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortValue.replace('-', '');
    const order = sort.sortValue.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchpizzas({
        currentPage,
        category,
        sortBy,
        order,
        search,
      }),
    );
  }

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortValue, searchValue, currentPage]);

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
        <Categories value={categoryId} onClickCategory={getCategoryId} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы.
            <br />
            попробуйте повторить попытку позже.
          </p>
        </div>
      ) : (
        <div className="content__items">{status === Status.LOADING ? skeletons : pizzas}</div>
      )}
      <Pagination setChangPage={(number: number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
