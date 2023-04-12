import React from "react";
import { useSelector } from "react-redux";


export default function AppBoatReg() {
  const appRegData = useSelector((state) => {
    const {smallBoatsRegReducer} = state;
    return smallBoatsRegReducer.appRegData
  })
  console.log("appRegData", appRegData)
  return (
    <div>
      Я Регистрация маломерных судов
    </div>
  )
}