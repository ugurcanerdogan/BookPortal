import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import defaultPicture from "../../assets/authorImage.png";
import { useApiProgress } from "../../shared/ApiProgress";
import Input from "../../components/Input";
import { updateAuthor } from "../../api/apiCalls";
import { updateAuthorSuccess } from "../../redux/AuthActions";


const AuthorCard = (props) => {

  const [author, setAuthor] = useState({});
  const [updatedName, setUpdatedName] = useState();
  const [editable, setEditable] = useState(false);
  const [inEditMode, setInEditMode] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState();
  const [updatedGender, setUpdatedGender] = useState();
  const [validationErrors, setValidationErrors] = useState([]);
  const { username, isAdmin } = useSelector((store) => ({
    username: store.username, isAdmin: store.isAdmin
  }));
  const { t } = useTranslation();
  const routeParams = useParams();
  const pathUserName = routeParams.username;
  const { name, gender, email, id, image } = author;
  const dispatch = useDispatch();


  useEffect(() => {
    setAuthor(props.author);
  }, [props.author]);

  useEffect(() => {
    setEditable(isAdmin);
  }, [isAdmin]);

  useEffect(() => {
    setValidationErrors(() => {
      return {
        gender: undefined,
        name: undefined,
        email: undefined
      };
    });
  }, [updatedGender, updatedName, updatedEmail]);

  useEffect(() => {
    if (!inEditMode) {
      setUpdatedGender(undefined);
      setUpdatedName(undefined);
      setUpdatedEmail(undefined);
    } else {
      setUpdatedGender(gender);
      setUpdatedName(name);
      setUpdatedEmail(email);
    }
  }, [inEditMode, gender, name, email]);


  const onClickSave = async () => {
    const body = {
      gender: updatedGender,
      name: updatedName,
      email: updatedEmail
    };
    try {
      const response = await updateAuthor(id, body);
      console.log(response);
      setInEditMode(false);
      setAuthor(response.data);
      dispatch(updateAuthorSuccess(response.data));
    } catch (e) {
      setValidationErrors(e.response.data.errors);
    }
  };

  const pendingApiCall = useApiProgress("get", "/api/v1/authors/");
  const updatePendingApiCall = useApiProgress("put", "/api/v1/authors/" + id);

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
          <div><h3>{t("Author Name: ")} {name}</h3></div>
          <div><h4>{t("Author Email: ")} {email}</h4></div>
          <div><h4>{t("Gender: ")} {gender}</h4></div>
          {editable && <button onClick={() => setInEditMode(true)} className="btn btn-success d-inline-flex">
            <span className="material-icons ">border_color</span>{t("Edit Book")}
          </button>}
        </>)}
        {inEditMode && (<>
          <div>
            <Input onChange={(event) => {
              setUpdatedName(event.target.value);
            }} label={t("Change author name")} defaultValue={name}
                   error={validationErrors[0] && validationErrors[0].defaultMessage} />
            <Input onChange={(event) => {
              setUpdatedEmail(event.target.value);
            }} label={t("Change author email")} defaultValue={email}
                   error={validationErrors[1] && validationErrors[1].defaultMessage} />
            <Input onChange={(event) => {
              setUpdatedGender(event.target.value);
            }} label={t("Change author gender")} defaultValue={gender}
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

export default (AuthorCard);