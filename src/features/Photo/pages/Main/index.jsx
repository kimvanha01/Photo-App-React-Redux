import Banner from 'components/Banner';
import Pagination from 'components/Pagination';
import Images from 'constants/images';
import PhotoList from 'features/Photo/components/PhotoList';
import { delPhoto, getAllListPhoto, removePhoto } from 'features/Photo/photoSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import './index.scss';
import queryString from 'query-string';
MainPage.propTypes = {};

function MainPage() {

  const photos = useSelector(state => state.photos.photos);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log('List of photos: ', photos);

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 8,
    _totalRows: 13,
  });

  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 8,
    //...
  })
  console.log(filters)

  useEffect(() => {
    const params = queryString.stringify(filters);
    dispatch(getAllListPhoto(params));
  }, [dispatch])

  const handlePhotoEditClick = (photo) => {
    console.log('Edit: ', photo);
    const editPhotoUrl = `/photos/${photo.id}`;
    history.push(editPhotoUrl);
  }

  const handlePhotoRemoveClick = (photo) => {
    console.log('Remove: ', photo);
    const removePhotoId = photo.id;
    dispatch(delPhoto(removePhotoId));
  }

  const handlePage = (newPage) => {
    console.log("New Page", newPage);
    // setFilters({
    //   ...filters,
    //   _page: newPage
    // })
    const params = queryString.stringify({
      ...filters,
      _page: newPage
    });
    dispatch(getAllListPhoto(params));

  }

  return (
    <div className="photo-main">
      <Banner title="🎉 Your awesome photos 🎉" backgroundUrl={Images.PINK_BG} />

      <Container className="text-center">
        <div className="py-5">
          <Button className="addPhoto flex" color="success"><Link to="/photos/add">Add new photo</Link></Button>{' '}
        </div>

        <PhotoList
          photoList={photos}
          onPhotoEditClick={handlePhotoEditClick}
          onPhotoRemoveClick={handlePhotoRemoveClick}
        />
        <Pagination
          pagination={pagination}
          onPageChange={handlePage}
          setPagination={setPagination}
        />
      </Container>
    </div>
  );
}

export default MainPage;