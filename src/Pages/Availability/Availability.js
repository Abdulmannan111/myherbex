import React, { useEffect, useRef, useState } from "react";
import Logo from "../../Images/HerBXlogo.png";
import "./Availability.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Navigation, Pagination } from "swiper";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spin } from "antd";

function Availability() {
  const navigate = useNavigate();

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [allNfts, setAllNfts] = useState({
    mystery: null,
    cuties: null,
    products: null,
  });

  const { mystery, cuties, products } = allNfts;

  useEffect(() => {
    const getAllNfts = async () => {
      // setLoading(true);
      await axios
        .get("https://testnetnftsbackend.myherbx.com/api/myherbx-nfts")
        .then((response) => {
          const allnftdata = response?.data?.nft;
          const mysteryNfts = allnftdata.filter(
            (nft) => nft.category === "Mystery"
          );
          const cutiesNfts = allnftdata.filter(
            (nft) => nft.category === "Cuties"
          );
          const productsNfts = allnftdata.filter(
            (nft) => nft.category === "Products"
          );

          setAllNfts({
            mystery: mysteryNfts,
            cuties: cutiesNfts,
            products: productsNfts,
          });
          setLoading(false);
        });
    };
    getAllNfts();
  }, []);

  return (
    <div className="mainDiv mt-4 mb-4 mb-lg-5 mt-lg-1">
      <img
        onClick={() => navigate("/")}
        className="BannerLogo"
        src={Logo}
        alt="Herbx"
      />

      {loading ? (
        <div className="py-5">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <p className="nftSecTitle ">RARITY: MYSTERY</p>

          <div className="row myteryContainer">
            {mystery?.slice(0, 3)?.map((item) => (
              <div
                className="col-md-6 col-lg-4 mb-4 mb-lg-0 pb-3"
                onClick={() => navigate(`/availability/${item._id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="mx-auto" style={{ width: "95%" }}>
                  <img
                    className="img-fluid w-100"
                    src={item.image}
                    alt=""
                    style={{ border: "4px solid rgb(1, 73, 1)" }}
                  />
                  <div className="mb-3 mb-lg-0 mt-2">
                    <p className="nftDetailsText">Name: {item.name}</p>
                    <p className="nftDetailsText">
                      Price: USD {item.price} (Estimated ARB needed: 0.0000 ARB)
                    </p>
                    <p className="nftDetailsText">Total: {item.total}</p>
                    <p className="nftDetailsText">
                      Available: {item.available}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-md-flex justify-content-center myteryContainer">
            {mystery?.slice(3, 5).map((item) => (
              <div
                className="col-md-6 col-lg-4 mb-4 mb-lg-0 pb-3 px-3"
                onClick={() => navigate(`/availability/${item._id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="mx-auto" style={{ width: "95%" }}>
                  <img
                    className="img-fluid w-100"
                    src={item.image}
                    alt=""
                    style={{ border: "4px solid rgb(1, 73, 1)" }}
                  />
                  <div className="mb-3 mb-lg-0 mt-2">
                    <p className="nftDetailsText">Name: {item.name}</p>
                    <p className="nftDetailsText">
                      Price: USD {item.price} (Estimated ARB needed: 0.0000 ARB)
                    </p>
                    <p className="nftDetailsText">Total: {item.total}</p>
                    <p className="nftDetailsText">
                      Available: {item.available}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="nftSecTitle ">RARITY: CUTIES</p>

          <div className="row myteryContainer">
            {cuties?.slice(0, 3)?.map((item) => (
              <div
                className="col-md-6 col-lg-4 mb-3 mb-lg-0 pb-3"
                onClick={() => navigate(`/availability/${item._id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="mx-auto" style={{ width: "95%" }}>
                  <img
                    className="img-fluid w-100"
                    src={item.image}
                    alt=""
                    style={{ border: "4px solid rgb(1, 73, 1)" }}
                  />
                  <div className="mb-3 mb-lg-0 mt-2">
                    <p className="nftDetailsText">Name: {item.name}</p>
                    <p className="nftDetailsText">
                      Price: USD {item.price} (Estimated ARB needed: 0.0000 ARB)
                    </p>
                    <p className="nftDetailsText">Total: {item.total}</p>
                    <p className="nftDetailsText">
                      Available: {item.available}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-md-flex justify-content-center myteryContainer">
            {cuties?.slice(3, 5)?.map((item) => (
              <div
                className="col-md-6 col-lg-4 mb-3 mb-lg-0 pb-3 px-3"
                onClick={() => navigate(`/availability/${item._id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="mx-auto" style={{ width: "95%" }}>
                  <img
                    className="img-fluid w-100"
                    src={item.image}
                    alt=""
                    style={{ border: "4px solid rgb(1, 73, 1)" }}
                  />
                  <div className="mb-3 mb-lg-0 mt-2">
                    <p className="nftDetailsText">Name: {item.name}</p>
                    <p className="nftDetailsText">
                      Price: USD {item.price} (Estimated ARB needed: 0.0000 ARB)
                    </p>
                    <p className="nftDetailsText">Total: {item.total}</p>
                    <p className="nftDetailsText">
                      Available: {item.available}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="nftSecTitle ">RARITY: PRODUCTS</p>
          <div className="">
            <div className="row myteryContainer">
              {products?.slice(0, 6).map((item) => (
                <div
                  className="col-md-6 col-lg-4 mb-4 mb-lg-0 pb-3"
                  onClick={() => navigate(`/availability/${item._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="mx-auto" style={{ width: "95%" }}>
                    <img
                      className="img-fluid w-100"
                      src={item.image}
                      alt=""
                      style={{ border: "4px solid rgb(1, 73, 1)" }}
                    />
                    <div className="mb-3 mb-lg-0 mt-2">
                      <p className="nftDetailsText">Name: {item.name}</p>
                      <p className="nftDetailsText">
                        Price: USD {item.price} (Estimated ARB needed: 0.0000
                        ARB)
                      </p>
                      <p className="nftDetailsText">Total: {item.total}</p>
                      <p className="nftDetailsText">
                        Available: {item.available}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-md-flex justify-content-center myteryContainer">
              {products?.slice(6, 7).map((item) => (
                <div
                  className="col-md-6 col-lg-4 mb-3 mb-lg-0 pb-3 px-3"
                  onClick={() => navigate(`/availability/${item._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="mx-auto" style={{ width: "95%" }}>
                    <img
                      className="img-fluid w-100"
                      src={item.image}
                      alt=""
                      style={{ border: "4px solid rgb(1, 73, 1)" }}
                    />
                    <div className="mb-3 mb-lg-0 mt-2">
                      <p className="nftDetailsText">Name: {item.name}</p>
                      <p className="nftDetailsText">
                        Price: USD {item.price} (Estimated ARB needed: 0.0000
                        ARB)
                      </p>
                      <p className="nftDetailsText">Total: {item.total}</p>
                      <p className="nftDetailsText">
                        Available: {item.available}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="smVideo">
            {/* <ArrowBackIosIcon ref={prevRef} className="arrowIcon " style={{ fontSize: '25px', paddingRight: "0px", paddingLeft: '8px' }} /> */}
            <Swiper
              style={{
                maxWidth: window.innerWidth,
                marginRight: "10%",
                marginLeft: "10%",
              }}
              slidesPerView={1}
              spaceBetween={25}
              centeredSlides={true}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              modules={[Autoplay, Navigation, Pagination]}
              className="mySwiper"
            >
              {products?.map((item) => (
                <SwiperSlide>
                  <div
                    className="nftContainer mb-5"
                    onClick={() => navigate(`/availability/${item._id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div>
                      <img
                        style={{ border: "4px solid rgb(1, 73, 1)" }}
                        className="img-fluid w-100"
                        src={item.image}
                        alt=""
                      />
                      <div className="mb-3 mb-lg-0 mt-5">
                        <p className="nftDetailsText text-center">
                          Name: {item.name}
                        </p>
                        <p className="nftDetailsText text-center">
                          Price: USD {item.price} (Estimated ARB needed: 0.0000
                          ARB)
                        </p>
                        <p className="nftDetailsText text-center">
                          Total: {item.total}
                        </p>
                        <p className="nftDetailsText text-center">
                          Available: {item.available}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* <ArrowForwardIosIcon ref={nextRef} className="arrowIcon " style={{ fontSize: '25px', padding: '5px' }} /> */}
          </div>
        </>
      )}
    </div>
  );
}

export default Availability;
