import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import defaultPicture from "../assets/userImage.png";
import { useApiProgress } from "../shared/ApiProgress";
import Input from "../components/Input";
import { updateUser } from "../api/apiCalls";
import { updateSuccess } from "../redux/AuthActions";


const ProfileCard = (props) => {

  const [user, setUser] = useState({});
  const [updatedName, setUpdatedName] = useState();
  const [editable, setEditable] = useState(false);
  const [inEditMode, setInEditMode] = useState(false);
  const [updatedPassword, setUpdatedPassword] = useState();
  const [validationErrors, setValidationErrors] = useState([]);
  const { username: loggedInUsername } = useSelector((store) => ({
    username: store.username
  }));
  const { t } = useTranslation();
  const routeParams = useParams();
  const pathUserName = routeParams.username;
  const { username, name, password, id, image } = user;
  const dispatch = useDispatch();


  useEffect(() => {
    setUser(props.user)
  },[props.user])

  useEffect(() => {
    setEditable(pathUserName === loggedInUsername)
  },[pathUserName, loggedInUsername])

  useEffect(() => {
    setValidationErrors(()=>{
      return {
        name:undefined,
        updatedPassword:undefined
      }
    })
  },[updatedName, updatedPassword])

  useEffect(() => {
    if (!inEditMode) {
      setUpdatedName(undefined);
      setUpdatedPassword(undefined);
    } else {
      setUpdatedName(name);
      setUpdatedPassword(undefined);
    }
  }, [inEditMode, name, username, password]);


  const onClickSave = async () => {
    const body = {
      name: updatedName,
      password: updatedPassword
    }
    try{
      const response = await updateUser(id, body)
      console.log(response)
      setInEditMode(false)
      setUser(response.data);
       dispatch(updateSuccess(response.data))
    }catch (e) {
      setValidationErrors(e.response.data.errors)
    }
  };

  const pendingApiCall = useApiProgress("get","/api/v1/users/");
  const updatePendingApiCall = useApiProgress("put","/api/v1/users/"+id);

  const updateOrOtherPendingApiCall = pendingApiCall || updatePendingApiCall;
  let imageSource = defaultPicture;
  if (image) {
    imageSource = image;
  }

  let message = "We cannot edit";
  if (pathUserName === loggedInUsername) {
    message = "We can edit";
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
          <div><h3>{t("Name-Surname: ")} {name}</h3></div>
          <div><h4>{t("E-mail: ")} {username}</h4></div>
          {editable && <button onClick={() => setInEditMode(true)} className="btn btn-success d-inline-flex">
            <span className="material-icons ">border_color</span>{t("Edit Profile")}
          </button>}
        </>)}
        {inEditMode && (<>
          <div>
            <Input onChange={(event) => {
              setUpdatedName(event.target.value);
            }} label={t("Change name and surname")} defaultValue={name} error={validationErrors[0] && validationErrors[0].defaultMessage}/>
            <Input onChange={(event) => {
              setUpdatedPassword(event.target.value);
            }} label={t("Change password")} type="password" defaultValue={undefined} error={validationErrors[1] && validationErrors[1].defaultMessage}/>
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

export default (ProfileCard);