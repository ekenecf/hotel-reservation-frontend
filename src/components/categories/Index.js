/* eslint-disable import/order */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import { NavLink } from 'react-router-dom';
import { useGetCategoriesQuery, useDeleteCategoryMutation } from '../../Redux/APIFunctions/categories';
import Loading from '../Loading';
import './Categories.css';
import CreateCategory from './Create';
import { useContext } from 'react';
import FormContext from '../../Context/FormContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/fontawesome-free-solid';
import {
  Navigation, Pagination, Scrollbar, A11y,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import '../Hotel.css';
import NavBar from '../NavBar';

const Categories = () => {
  const { data, error, isLoading } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const { showForm, setShowForm } = useContext(FormContext);

  const handleClick = (category) => {
    localStorage.setItem('category_id', category.id);
  };

  return (
    <div>
      <section className="hotels-section">
        <NavBar />
        <div className="hotels-home">
          <div className="hotels-header">
            <h1>HOTEL CATEGORIES</h1>
            <button
              type="button"
              className="addcat-btn"
              onClick={(e) => {
                e.preventDefault();
                setShowForm(true);
              }}
            >
              Add A Category

            </button>
          </div>
          {error ? <div className="main">Ooops..! There was an error</div> : null}
          {isLoading ? <div className="main"><Loading /></div> : null}
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            speed={800}
            navigation
            className="container"
          >
            {data ? data?.map((category) => (
              <SwiperSlide className="hotel flex" key={category.id}>
                <NavLink to={`/categories/${category.id}`}>
                  <div className="cat-link" onClick={() => { handleClick(category); }}>
                    <h2>{category.name}</h2>
                    <p>
                      Hotel Ratings:
                      {' '}
                      {category.rating}
                      {' '}
                      Stars
                    </p>
                    {' '}
                    <div className="rating">
                      { category.rating === 1 ? (<i className="uil uil-star" />) : category.rating === 2 ? (
                        <div className="rating">
                          <i className="uil uil-star" />
                          <i className="uil uil-star" />
                        </div>
                      ) : category.rating === 3 ? (
                        <>
                          <i className="uil uil-star" />
                          <i className="uil uil-star" />
                          <i className="uil uil-star" />
                        </>
                      ) : category.rating === 4 ? (
                        <>
                          <i className="uil uil-star" />
                          <i className="uil uil-star" />
                          <i className="uil uil-star" />
                          <i className="uil uil-star" />
                        </>
                      ) : category.rating === 5 ? (
                        <>
                          <i className="uil uil-star" />
                          <i className="uil uil-star" />
                          <i className="uil uil-star" />
                          <i className="uil uil-star" />
                          <i className="uil uil-star" />
                        </>
                      ) : null }

                      {' '}
                    </div>
                  </div>
                </NavLink>
                <button
                  type="button"
                  title="Delete Category"
                  className="trash"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteCategory({ id: category.id });
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </SwiperSlide>
            )) : <div className="main">No categories yet...</div>}
          </Swiper>
        </div>

      </section>
      {showForm ? <CreateCategory /> : null}
    </div>
  );
};

export default Categories;
