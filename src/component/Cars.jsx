import React, { useState } from "react";
import Carjson from "./car.json";
import { BsFillCarFrontFill } from "react-icons/bs";
import { BsSpeedometer } from "react-icons/bs";
import { HiCurrencyDollar } from "react-icons/hi";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

function Cars() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // search functionality...

  const searchCar = search.toLowerCase();

  const carf = Carjson.filter((car) => {
    return searchCar === ""
      ? car
      : car.brand.toLowerCase().includes(search) ||
          car.model.toLowerCase().includes(search) ||
          car.type.toLowerCase().includes(search);
  });

  // pagination variable....

  const perPage = 6;
  const lastIndex = page * perPage;
  const firstIndex = lastIndex - perPage;
  const carData = carf.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(carf.length / perPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const searchFun = (e) => {
    return setSearch(e.target.value);
  };

  const pervPage = () => {
    if (page !== 1) {
      setPage(page - 1);
      console.log(page);
    }
  };
  const nextPage = () => {
    if (page !== nPage) {
      setPage(page + 1);
      console.log(page);
    }
  };
  const changePage = (id) => {
    setPage(id);
  };

  return (
    <>
      <div className="h-screen flex-col items-center justify-center">
        <div className=" grid place-items-center bg-bgWhite  h-screen">
          <div className=" flex items-center justify-center  p-4">
             <h2 className="text-2xl mr-4 font-bold text-fColor">Buy & Rent Car</h2>
            <form>
              <input
                className=" text-center p-2 text-xl bg-white-200 text-fColor font-popins w-72 md:w-96 border-2 transition-2  hover:border-blue-300 focus:border-blue-300 rounded-3xl"
                type=""
                placeholder="Search-Brand,Model,Type"
                value={search}
                onChange={searchFun}
              />
            </form>
          </div>

          <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-4 p-2">
            {carData.map((car) => {
              return (
                <div className=" shadow-2xl w-80 h-96 bg-white  rounded-lg  ">
                  <img
                    src={car.image_url}
                    className=" w-full h-52 p-2 object-fill  "
                    alt={IDBIndex}
                  />
                  <div className="p-4 grid grid-cols-2 gap-3 col-span-2  h-32  ">
                    <h2 className="text-xl text-fColor font-semibold  flex justify-center">
                      {car.brand} {car.model}
                    </h2>
                    <p className="text-blue-400  font-bold text-fColor flex justify-center ">
                      {car.year}
                    </p>
                    <p className="text-gray-800 flex justify-center">
                      <BsFillCarFrontFill className="m-1 text-fColor" />
                      {car.type}
                    </p>
                    <p className="text-gray-600 flex justify-center">
                      <BsSpeedometer className=" m-1 text-fColor" />
                      {car.mileage}
                    </p>
                  </div>

                  <div className="grid h-30 p-2 grid-cols-2 border-t-2  ">
                    <p className="text-gray-700 flex justify-center text-xl font-bold">
                      <HiCurrencyDollar className=" text-fColor mr-2 text-3xl" />
                      {car.price}
                    </p>
                    <p className="flex justify-center">
                      {" "}
                      <button className=" w-20 bg-fColor   flex justify-center items-center text-bgWhite rounded-lg hover:bg-sky-300 duration-300 p-1">
                        Rent now
                      </button>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center items-center gap-2 m-4 ">
          <span
            className=" pagination text-4xl   "
            onClick={pervPage}
          >
            <BsFillArrowLeftCircleFill />
          </span>
          {numbers.map((num) => {
            return (
              <span
                className={`text-xl flex justify-center items-center  bg-fColor rounded-full text-white  p-1 w-8 h-8 ${
                  page !== num ? 'active:bg-cdBlue' : ''}`}
                onClick={() => changePage(num)}
              >
                {num}
              </span>
            );
          })}
          <span className="text-4xl text-blue-600" onClick={nextPage}>
            <BsFillArrowRightCircleFill />
          </span>
        </div>
        </div>
        
      </div>
    </>
  );
}

export default Cars;
