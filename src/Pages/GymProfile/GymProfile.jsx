import React, { useState } from "react";
import Heading from "../../components/Heading/Heading";
import "./GymProfile.css";
import gymLogo from "../../assetss/default/png-transparent-gym-logo-thumbnail.png";
import airGym from "../../assetss/default/airGym.jpg";
import equipment from "../../assetss/default/equipment (6).jpg";
import Slider from "react-slick";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Controller } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaPhone,
  FaTiktok,
  FaFacebook,
  FaInstagram,
  FaPlus,
} from "react-icons/fa";

const GymProfile = () => {
  const [currentPage, setCurrentPage] = useState("info");

  const navigate = useNavigate();
  const [showImage, setShowImage] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);
  const handleImageClick = (image) => {
    setExpandedImage(image);
    setShowImage(true);
  };
  const images = [
    airGym,
    equipment,
    airGym,
    equipment,
    airGym,
    equipment,
    airGym,
    equipment,
    airGym,
  ]; // Add your image URLs here

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const valueOfText =
    "Our gym, named 'Elite Fitness Haven,' is not just a place to work out; it's a community where health and well-being are prioritized. Nestled in the heart of the city, we boast state-of-the-art equipment, expert trainers, and a diverse range of classes catering to all fitness levels. What sets us apart is our personalized approach; every member is treated with individual attention, ensuring that their unique fitness goals are met. Our commitment to excellence, combined with a supportive environment, makes us the best choice for anyone serious about their fitness journey.";
  return (
    <div className="myInfo">
      <div className="myInfoHeading">
        <Heading content={"Gym Profile"} />
      </div>
      <div className="myInfoContent m-5">
        <div className="theme bigCard ">
          <p>Theme</p>
          <div className="themeContent">
            <div className="flexcenteraround themelogo">
              <div className="themeLogo logo-small">
                <img src={gymLogo} alt="gym logo" />
              </div>
              <div>
                {/* <input type="file" className="textButton w-100">
                  Change logo
                </input> */}
                <label htmlFor="changeLogo">
                  <div className="flexcenterbetween">
                    <span className="font-smaller mx-1 underLineHover primary-color bold">
                      Change Logo
                    </span>
                    <span>
                      <svg
                        className="primarySvg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-camera"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                      </svg>
                    </span>
                  </div>
                  <input type="file" id="changeLogo" className="sr-only" />
                </label>
              </div>
            </div>
            <span className="divider"></span>
            <div className="flexcenteraround themeIcon">
              <div className="themeLogo logo-small">
                <img src={gymLogo} alt="gym logo" />
              </div>
              <div>
                <label htmlFor="changeIcon">
                  <div className="flexcenterbetween">
                    <span className="font-smaller mx-1 underLineHover primary-color bold">
                      Change Icon
                    </span>
                    <span>
                      <svg
                        className="primarySvg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-camera"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                      </svg>
                    </span>
                  </div>
                  <input type="file" id="changeIcon" className="sr-only" />
                </label>
              </div>
            </div>
            <span className="divider"></span>

            <div className="flexcenteraround ">
              <div className="themeColor p-3">
                <Form.Control
                  type="color"
                  id="exampleColorInput"
                  defaultValue="#563d7c"
                  title="Choose your color"
                />
              </div>
              <div>
                <button className="textButtonTwo w-100">
                  <div className="flexcenterbetween">
                    <span className="font-smaller mx-1 hoverUnderline primary-color bold">
                      Change Color
                    </span>
                    <span>
                      <svg
                        id="primarySvg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-paint-bucket"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.192 2.78c-.458-.677-.927-1.248-1.35-1.643a3 3 0 0 0-.71-.515c-.217-.104-.56-.205-.882-.02-.367.213-.427.63-.43.896-.003.304.064.664.173 1.044.196.687.556 1.528 1.035 2.402L.752 8.22c-.277.277-.269.656-.218.918.055.283.187.593.36.903.348.627.92 1.361 1.626 2.068.707.707 1.441 1.278 2.068 1.626.31.173.62.305.903.36.262.05.64.059.918-.218l5.615-5.615c.118.257.092.512.05.939-.03.292-.068.665-.073 1.176v.123h.003a1 1 0 0 0 1.993 0H14v-.057a1 1 0 0 0-.004-.117c-.055-1.25-.7-2.738-1.86-3.494a4 4 0 0 0-.211-.434c-.349-.626-.92-1.36-1.627-2.067S8.857 3.052 8.23 2.704c-.31-.172-.62-.304-.903-.36-.262-.05-.64-.058-.918.219zM4.16 1.867c.381.356.844.922 1.311 1.632l-.704.705c-.382-.727-.66-1.402-.813-1.938a3.3 3.3 0 0 1-.131-.673q.137.09.337.274m.394 3.965c.54.852 1.107 1.567 1.607 2.033a.5.5 0 1 0 .682-.732c-.453-.422-1.017-1.136-1.564-2.027l1.088-1.088q.081.181.183.365c.349.627.92 1.361 1.627 2.068.706.707 1.44 1.278 2.068 1.626q.183.103.365.183l-4.861 4.862-.068-.01c-.137-.027-.342-.104-.608-.252-.524-.292-1.186-.8-1.846-1.46s-1.168-1.32-1.46-1.846c-.147-.265-.225-.47-.251-.607l-.01-.068zm2.87-1.935a2.4 2.4 0 0 1-.241-.561c.135.033.324.11.562.241.524.292 1.186.8 1.846 1.46.45.45.83.901 1.118 1.31a3.5 3.5 0 0 0-1.066.091 11 11 0 0 1-.76-.694c-.66-.66-1.167-1.322-1.458-1.847z" />
                      </svg>
                    </span>
                  </div>
                </button>
                <input type="file" id="changeColor" className="sr-only" />
              </div>
            </div>
          </div>
        </div>
        <div className="infoCard">
          <h3>Gym Info</h3>

          <p name="info" className=" m-auto pOfGymInfo rounded-2">
            {valueOfText}
          </p>
        </div>
        <div className="locationAndPlans">
          <div className="location">
            <h3>Location</h3>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.23655343019!2d30.94184382470436!3d29.972631021970244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14585658563d8c9d%3A0xf8037c015d1d48ec!2sAir%20Gym%20%26%20Spa!5e0!3m2!1sar!2seg!4v1710300431515!5m2!1sar!2seg"
                style={{ border: 0 }}
                title="map"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
        <div className="workingTimes bigCard">
          <div className="flexcenterbetween">
            <h3>Working times</h3>
            <span className="flexcenterbetween">
              <button
                className="PrimaryButton"
                onClick={() => {
                  navigate("/editworkingtimes");
                }}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                  </svg>
                </span>
                <span>Edit</span>
              </button>
            </span>
          </div>
          <div>
            <table className="mainTableTwo">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Opening</th>
                  <th>Closing</th>
                  <th>Peak hours</th>
                  <th>Female hours</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Day">Monday</td>
                  <td data-label="Opening">9:00 AM</td>
                  <td data-label="Closing">9:00 PM</td>
                  <td data-label="Peak hours">9:00 AM</td>
                  <td data-label="Female hours">9:00 PM</td>
                </tr>
                <tr>
                  <td data-label="Day">Tuesday</td>
                  <td data-label="Opening">9:00 AM</td>
                  <td data-label="Closing">9:00 PM</td>
                  <td data-label="Peak hours">9:00 AM</td>
                  <td data-label="Female hours">9:00 PM</td>
                </tr>
                <tr>
                  <td data-label="Day">Wensday</td>
                  <td data-label="Opening">9:00 AM</td>
                  <td data-label="Closing">9:00 PM</td>
                  <td data-label="Peak hours">9:00 AM</td>
                  <td data-label="Female hours">9:00 PM</td>
                </tr>
                <tr>
                  <td data-label="Day">Thursday</td>
                  <td data-label="Opening">9:00 AM</td>
                  <td data-label="Closing">9:00 PM</td>
                  <td data-label="Peak hours">9:00 AM</td>
                  <td data-label="Female hours">9:00 PM</td>
                </tr>
                <tr>
                  <td data-label="Day">Friday</td>
                  <td data-label="Opening">9:00 AM</td>
                  <td data-label="Closing">9:00 PM</td>
                  <td data-label="Peak hours">9:00 AM</td>
                  <td data-label="Female hours">9:00 PM</td>
                </tr>
                <tr>
                  <td data-label="Day">Saturday</td>
                  <td data-label="Opening">9:00 AM</td>
                  <td data-label="Closing">9:00 PM</td>
                  <td data-label="Peak hours">9:00 AM</td>
                  <td data-label="Female hours">9:00 PM</td>
                </tr>
                <tr>
                  <td data-label="Day">Sunday</td>
                  <td data-label="Opening">9:00 AM</td>
                  <td data-label="Closing">9:00 PM</td>
                  <td data-label="Peak hours">9:00 AM</td>
                  <td data-label="Female hours">9:00 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bigCard gymGallery">
          <div className="flexcenterbetween">
            <h3>Gallery</h3>
            <button className="PrimaryButton">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
              </span>
              <span>Edit</span>
            </button>
          </div>
          <div className="slider-container">
            <Swiper
              // install Swiper modules
              modules={[
                Navigation,
                // Pagination,
                // Scrollbar,
                // A11y,
                Controller,
              ]}
              slidesPerView={4}
              spaceBetween={40}
              navigation
              grabCursor
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
              breakpoints={{
                "@0.00": {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                "@0.75": {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                "@1.00": {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
              }}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="bigImageContainer"
                    onClick={() => handleImageClick(image)}
                  >
                    <img
                      src={image}
                      alt={`imagee-${index}`}
                      className="logoLarge rounded-2"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="bigCard socialLinks">
          <div className="flexcenterbetween">
            <p className="m-0">Web & social media</p>
            <button className="PrimaryButton" onClick={handleShow}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
              </span>
              <span>Add link</span>
            </button>
          </div>
          <div className="flexcenterstart websociallinks">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                </svg>
              </span>
              <span>Facebook</span>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-instagram"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                </svg>
              </span>
              <span>Instagram</span>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-tiktok"
                  viewBox="0 0 16 16"
                >
                  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                </svg>
              </span>
              <span>Tiktok</span>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-whatsapp"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
              </span>
              <span>Whatsapp</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal show={showImage} onHide={() => setShowImage(false)} centered>
          <Modal.Body className="modalOfLogout d-flex flex-column align-items-center justify-content-center">
            <img
              src={expandedImage}
              alt="Expanded"
              className="logoLarge rounded-2 w-75 h-75"
            />
          </Modal.Body>
        </Modal>
      </div>
      <div className="addLinkModal">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton className="modalOfLogout">
            <Modal.Title>Link URL</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalOfLogout">
            <Form>
              <Form.Group controlId="formPhoneNumber" className="my-2">
                <InputGroup>
                  <InputGroup.Text>
                    <FaPhone />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Add Your Phone Number"
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formTikTokLink" className="my-2">
                <InputGroup>
                  <InputGroup.Text>
                    <FaTiktok />
                  </InputGroup.Text>
                  <Form.Control type="text" placeholder="Paste Link" />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formFacebookLink" className="my-2">
                <InputGroup>
                  <InputGroup.Text>
                    <FaFacebook />
                  </InputGroup.Text>
                  <Form.Control type="text" placeholder="Paste Link" />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formInstagramLink" className="my-2">
                <InputGroup>
                  <InputGroup.Text>
                    <FaInstagram />
                  </InputGroup.Text>
                  <Form.Control type="text" placeholder="Paste Link" />
                </InputGroup>
              </Form.Group>
            </Form>
            <div className="flexcenterend gap-2">
              <button className="SecondaryButton w-100" onClick={handleClose}>
                Add Link
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default GymProfile;
