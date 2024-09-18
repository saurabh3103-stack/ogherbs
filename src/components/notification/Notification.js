import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './notification.css';
import { IoNotifications } from 'react-icons/io5';
import Pagination from 'react-js-pagination';
import api from '../../api/api';
import Loader from '../loader/Loader';
import coverImg from '../../utils/cover-img.jpg';
import No_Notification from '../../utils/zero-state-screens/No_Notification.svg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setNotification } from '../../model/reducer/notificationReducer';
import { formatNotificationDate } from '../../utils/formatDate';
import { ValidateNoInternet } from '../../utils/NoInternetValidator';
import { MdSignalWifiConnectedNoInternet0 } from 'react-icons/md';

const Notification = () => {
  const user = useSelector(state => state.user);
  const setting = useSelector(state => state.setting);

  const dispatch = useDispatch();

  const totalNotificationPerPage = 10;

  const [totalNotification, setTotalNotification] = useState(null);
  const [currPage, setCurrPage] = useState(1);
  const [notifications, setNotifications] = useState(null);
  const [offset, setOffset] = useState(0);
  const [isLoader, setIsLoader] = useState(false);
  const [isNetworkError, setIsNetworkError] = useState(false);

  const fetchNotification = () => {
    api.getNotification(user?.jwtToken, totalNotificationPerPage, offset)
      .then(response => response.json())
      .then(result => {
        if (result.status === 1) {
          setIsLoader(false);
          dispatch(setNotification({ data: result.data }));
          setNotifications(result.data);
          setTotalNotification(result.total);
        }
      })
      .catch(error => {
        console.log(error);
        const isNoInternet = ValidateNoInternet(error);
        if (isNoInternet) {
          setIsNetworkError(isNoInternet);
        }
      });
  };

  useEffect(() => {
    setIsLoader(true);
    fetchNotification();
  }, [offset]);

  // Page change handler
  const handlePageChange = (pageNum) => {
    setCurrPage(pageNum);
    setOffset(pageNum * totalNotificationPerPage - totalNotificationPerPage);
  };

  const { t } = useTranslation();

  const placeHolderImage = (e) => {
    e.target.src = setting.setting?.web_logo;
  };

  return (
    <>
      {!isNetworkError ? (
        <div className='notification' style={{ marginTop: "70px" }}>
          <div className='cover'>
            <img src={coverImg} className='img-fluid' alt="cover" />
            <div className='title'>
              <h3>{t("notification")}</h3>
              <span>
                <Link to="/" className='text-light text-decoration-none'>{t("home")} / </Link>
              </span>
              <span className='active'>{t("notification")}</span>
            </div>
          </div>
          {notifications === null ? (
            <Loader width="100%" height="500px" background={"var(--second-cards-color)"} />
          ) : (
            <div className="container">
              <div className='notification-container'>
                <div className="notifications">
                  <div className='heading'>{t("all_notification")}</div>
                  {notifications.length === 0 ? (
                    <div className='notification-body no-notification'>
                      <img src={No_Notification} className='no-data-img' alt='no-notification' />
                      <p>{t("empty_notification_list_message")}</p>
                    </div>
                  ) : (
                    <>
                      {isLoader ? <Loader width='100%' height='300px' /> : (
                        <div className='notification-body'>
                          {notifications.map((ntf, index) => (
                            <div key={index} className='wrapper'>
                              {ntf.image_url === "" ? (
                                <div className='logo'>
                                  <IoNotifications fill='#fff' fontSize='3rem' />
                                </div>
                              ) : (
                                <img onError={placeHolderImage} src={ntf.image_url} alt='notification' />
                              )}
                              <div className='content'>
                                <p className='title'>{ntf.title}</p>
                                <p>{ntf.message}</p>
                              </div>
                              <div className='d-flex flex-column justify-content-center'>
                                <span>{formatNotificationDate(ntf.date_sent)}</span>
                                <span>{ntf.date_sent.split(" ")[1]}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {notifications.length !== 0 && (
                        <Pagination
                          itemClass='pagination-item'
                          activePage={currPage}
                          itemsCountPerPage={totalNotificationPerPage}
                          totalItemsCount={totalNotification}
                          pageRangeDisplayed={5}
                          onChange={handlePageChange}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className='d-flex flex-column justify-content-center align-items-center noInternetContainer'>
          <MdSignalWifiConnectedNoInternet0 />
          <p>{t("no_internet_connection")}</p>
        </div>
      )}
    </>
  );
};

export default Notification;
