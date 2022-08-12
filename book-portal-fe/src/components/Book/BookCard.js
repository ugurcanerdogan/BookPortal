import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import defaultPicture from "../../assets/bookImage.png";
import { useApiProgress } from "../../shared/ApiProgress";
import Input from "../../components/Input";
import { updateBook } from "../../api/apiCalls";
import { updateBookSuccess, updateUserSuccess } from "../../redux/AuthActions";


const BookCard = (props) => {

  const [book, setBook] = useState({});
  const [updatedTitle, setUpdatedTitle] = useState();
  const [editable, setEditable] = useState(false);
  const [inEditMode, setInEditMode] = useState(false);
  const [updatedYear, setUpdatedYear] = useState();
  const [updatedPublisher, setUpdatedPublisher] = useState();
  const [validationErrors, setValidationErrors] = useState([]);
  const { username, isAdmin } = useSelector((store) => ({
    username: store.username, isAdmin: store.isAdmin
  }));
  const { t } = useTranslation();
  const routeParams = useParams();
  const pathUserName = routeParams.username;
  const { title, year, publisher, isbn, id, image } = book;
  const dispatch = useDispatch();


  useEffect(() => {
    setBook(props.book);
  }, [props.book]);

  useEffect(() => {
    setEditable(isAdmin);
  }, [isAdmin]);

  useEffect(() => {
    setValidationErrors(() => {
      return {
        title: undefined,
        year: undefined,
        publisher: undefined
      };
    });
  }, [updatedTitle, updatedYear, updatedPublisher]);

  useEffect(() => {
    if (!inEditMode) {
      setUpdatedPublisher(undefined);
      setUpdatedYear(undefined);
      setUpdatedPublisher(undefined);
    } else {
      setUpdatedTitle(title);
      setUpdatedYear(year);
      setUpdatedPublisher(publisher);
    }
  }, [inEditMode, title, year, publisher]);


  const onClickSave = async () => {
    const body = {
      title: updatedTitle,
      year: updatedYear,
      publisher: updatedPublisher
    };
    try {
      const response = await updateBook(id, body);
      console.log(response);
      setInEditMode(false);
      setBook(response.data);
      dispatch(updateBookSuccess(response.data));
    } catch (e) {
      setValidationErrors(e.response.data.errors);
    }
  };

  const pendingApiCall = useApiProgress("get", "/api/v1/books/");
  const updatePendingApiCall = useApiProgress("put", "/api/v1/books/" + id);

  const updateOrOtherPendingApiCall = pendingApiCall || updatePendingApiCall;
  let imageSource = defaultPicture;
  if (image) {
    imageSource = image;
  }

  let actionDiv;
  if (updateOrOtherPendingApiCall) {
    actionDiv = (<div className="d-flex justify-content-center">
      <div className="spinner-border text-black-50">
        <span className="sr-only"></span>
      </div>
    </div>);
  }

  return (<div className="card text-center">
    <div className="card-body">
      <div>{actionDiv}</div>
      {!actionDiv && (<>
        <div className="card-header text-center"><img className="rounded-circle shadow" width="200" height="200"
                                                      alt="userImage" src={imageSource} /></div>
        {!inEditMode && (<>
          <div><h3>{t("Book Title: ")} {title}</h3></div>
          <div><h4>{t("Year: ")} {year}</h4></div>
          <div><h4>{t("Publisher: ")} {publisher}</h4></div>
          <div><h4>{t("Author: ")} {title}</h4></div>
          {editable && <button onClick={() => setInEditMode(true)} className="btn btn-success d-inline-flex">
            <span className="material-icons ">border_color</span>{t("Edit Book")}
          </button>}
        </>)}
        {inEditMode && (<>
          <div>
            <Input onChange={(event) => {
              setUpdatedTitle(event.target.value);
            }} label={t("Change book title")} defaultValue={title}
                   error={validationErrors[0] && validationErrors[0].defaultMessage} />
            <Input onChange={(event) => {
              setUpdatedYear(event.target.value);
            }} label={t("Change publish year")} defaultValue={year}
                   error={validationErrors[1] && validationErrors[1].defaultMessage} />
            <Input onChange={(event) => {
              setUpdatedPublisher(event.target.value);
            }} label={t("Change publisher")} defaultValue={publisher}
                   error={validationErrors[2] && validationErrors[2].defaultMessage} />
            <button onClick={onClickSave} className="btn btn-primary d-inline-flex mt-2 me-1">
              <span className="material-icons">save</span>
              {t("Save")}
            </button>
            <button className="btn btn-danger d-inline-flex mt-2 ms-1">
              <span className="material-icons">cancel</span>
              {t("Cancel")}
            </button>
          </div>
        </>)}
      </>)}
    </div>
  </div>);
};

export default (BookCard);