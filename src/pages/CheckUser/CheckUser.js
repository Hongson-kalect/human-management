import {
  Outlet,
  OutletProps,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useEffect } from "react";
import { useState } from "react";
import { faSquareRootVariable } from "@fortawesome/free-solid-svg-icons";
import Login from "../Login/Login";
import { Home } from "../Home";
import { Daycheck } from "../Daycheck";
import Profile from "../Profile";
function Checkuser() {
  //const nav = useNavigate();
  let role = "";
  const [userStorage, setUserStorage] = useLocalStorage("user", {});
  if (
    userStorage.mainRole === "MROLE0" ||
    userStorage.mainRole === "MROLE1" ||
    userStorage.subRole === "SROLE1"
  )
    role = "admin";
  else if (
    userStorage.mainRole === "MROLE2" ||
    userStorage.subRole === "SROLE1"
  )
    role = "manager";
  else if (userStorage.mainRole) role = "staff";
  console.log(role);
  return role === "admin" ? (
    <Home />
  ) : role === "manager" ? (
    <Daycheck />
  ) : role === "staff" ? (
    <Profile />
  ) : (
    <Login />
  );
}
export default Checkuser;
