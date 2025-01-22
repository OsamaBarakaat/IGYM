/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useRef, useState } from "react";
import Heading from "../../components/Heading/Heading";
import "./GymProfile.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Controller } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  Button,
  Col,
  Form,
  FormLabel,
  InputGroup,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaTiktok, FaFacebook, FaInstagram } from "react-icons/fa";
import axiosInstance, { privateAxiosInstance } from "../../api/axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Trash2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";
import HeadingNoBack from "../../components/HeadingNoBack/Heading";

const GymProfile = () => {
  const { t } = useTranslation();
  const { gymId } = useSelector((state) => state.user);
  const [gymInfo, setGymInfo] = useState(null);
  const navigate = useNavigate();
  const [showImage, setShowImage] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);
  const [logoLoading, setLogoLoading] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [editDesc, setEditDesc] = useState(null);
  const [gymName, setEditGymName] = useState(null);
  const latRef = useRef(null);
  const lngRef = useRef(null);

  const handleImageClick = (image) => {
    setExpandedImage(image);
    setShowImage(true);
  };

  const [show, setShow] = useState(false);
  const [showEditDesc, setShowEditDesc] = useState(false);
  const [showEditGymName, setShowEditGymName] = useState(false);
  const [showEditLocation, setShowEditLocation] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEditDesc = () => setShowEditDesc(false);
  const handleShowEditDesc = () => setShowEditDesc(true);
  const handleShowEditGymName = () => setShowEditGymName(true);
  const handleCloseEditGymName = () => setShowEditGymName(false);
  const handleShowEditLocation = () => setShowEditLocation(true);
  const handleCloseEditLocation = () => setShowEditLocation(false);

  const handleChangeImg = async (e, key) => {
    const img = e.target.files[0];

    if (!img) return;

    try {
      const formData = new FormData();
      formData.append(key, img);

      setLogoLoading(true);

      const response = await privateAxiosInstance.put(
        `/gyms/${gymId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setGymInfo({ ...gymInfo, [key]: response.data.data[key] });
      toast.success(response.data.message);
    } catch (error) {
      console.error(error.response.data);
      toast.error(error.response.data.message);
    } finally {
      setLogoLoading(false);
    }
  };

  const handleGalleryChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append(`images`, file);
      });

      setGalleryLoading(true);

      const response = await privateAxiosInstance.put(
        `/gyms/${gymId}/branch`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("gallery", response.data.data);

      setGymInfo({ ...gymInfo, branchInfo: response.data.data });
      toast.success(response.data.message);
    } catch (error) {
      console.error(error?.response?.data);
      toast.error(error?.response?.data?.message);
    } finally {
      setGalleryLoading(false);
      e.target.value = null;
    }
  };

  const handleUpdateDesc = async (e) => {
    e.preventDefault();
    try {
      const response = await privateAxiosInstance.put(`/gyms/${gymId}`, {
        description: editDesc,
      });
      setGymInfo({ ...gymInfo, description: response.data.data.description });
      toast.success(response.data.message);
    } catch (error) {
      console.error(error.response.data);

      if (error.response.data.errors) {
        toast.error(
          <div>
            <strong>{error.response.data.message}</strong>
            <ul>
              {error.response.data.errors.map((err, index) => (
                <li key={index}>{err.msg}</li>
              ))}
            </ul>
          </div>
        );
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setShowEditDesc(false);
    }
  };
  const handleUpdateGymName = async (e) => {
    e.preventDefault();
    try {
      const response = await privateAxiosInstance.put(`/gyms/${gymId}`, {
        name: gymName,
      });
      setGymInfo({ ...gymInfo, name: response.data.data.name });
      toast.success(response.data.message);
    } catch (error) {
      console.error(error.response.data);

      if (error.response.data.errors) {
        toast.error(
          <div>
            <strong>{error.response.data.message}</strong>
            <ul>
              {error.response.data.errors.map((err, index) => (
                <li key={index}>{err.msg}</li>
              ))}
            </ul>
          </div>
        );
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setShowEditGymName(false);
    }
  };
  const handleUpdateLocation = async (e) => {
    e.preventDefault();
    try {
      const response = await privateAxiosInstance.put(`/gyms/${gymId}/branch`, {
        location: {
          lat: latRef.current.value,
          lng: lngRef.current.value,
        },
      });

      fetchGymInfo();
      toast.success(response?.data?.message);
    } catch (error) {
      console.error(error?.response?.data);

      if (error?.response?.data?.errors) {
        toast.error(
          <div>
            <strong>{error?.response?.data?.message}</strong>
            <ul>
              {error.response.data.errors.map((err, index) => (
                <li key={index}>{err.msg}</li>
              ))}
            </ul>
          </div>
        );
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setShowEditLocation(false);
    }
  };

  const handleDeleteImage = async (image) => {
    const filteredImages = gymInfo.branchInfo.images.filter(
      (img) => img !== image
    );

    await privateAxiosInstance.put(`/gyms/${gymId}/branch`, {
      filterImages: filteredImages,
    });

    toast.success(t("Image deleted successfully"));

    setGymInfo({
      ...gymInfo,
      branchInfo: { ...gymInfo.branchInfo, images: filteredImages },
    });
  };

  const handleChangeLink = (e) => {
    const { name, value } = e.target;
    const links = { ...gymInfo.links, [name]: value };
    setGymInfo({ ...gymInfo, links });
  };

  const handleChangePhone = (index, event) => {
    const newPhones = [...gymInfo.phones];
    newPhones[index] = event.target.value;
    setGymInfo({ ...gymInfo, phones: newPhones });
  };

  const addPhone = () => {
    setGymInfo({ ...gymInfo, phones: [...gymInfo.phones, ""] });
  };

  const removePhone = (index) => {
    const newPhones = gymInfo.phones.filter((_, i) => i !== index);
    setGymInfo({ ...gymInfo, phones: newPhones });
  };

  const handleSubmitLinks = async (e) => {
    e.preventDefault();

    if (gymInfo.phones.some((phone) => phone === "")) {
      toast.error(t("Please fill in all phone fields before submitting."));
      return;
    }

    if (gymInfo.phones.length > 5) {
      toast.error(t("You can only add up to 5 phone numbers."));
      return;
    }

    try {
      const response = await privateAxiosInstance.put(`/gyms/${gymId}`, {
        links: gymInfo.links,
        phones: gymInfo.phones,
      });
      console.log("links", response.data.data);
      setGymInfo({ ...gymInfo, links: response.data.data.links });
      toast.success(response.data.message);
    } catch (error) {
      console.error(error.response.data);
      if (error.response.data.errors) {
        toast.error(
          <div>
            <strong>{error.response.data.message}</strong>
            <ul>
              {error.response.data.errors.map((err, index) => (
                <li key={index}>{err.msg}</li>
              ))}
            </ul>
          </div>
        );
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  console.log("aaaaaaaaaaaaaaaaaa", gymInfo);

  const fetchGymInfo = async () => {
    try {
      const response = await axiosInstance.get(`/gyms/${gymId}`);
      console.log("gymInfo", response.data.data);
      setGymInfo(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchGymInfo();
  }, []);

  const workingDays = [
    "friday",
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
  ];

  const Loader = (
    <div
      style={{ zIndex: 999 }}
      className="position-absolute bg-light rounded p-3 d-flex justify-content-center align-items-center w-100 h-100"
    >
      <Spinner animation="border" />
    </div>
  );

  return (
    <div className="myInfo ">
      <div className="myInfoHeading ">
        <HeadingNoBack content={t("Gym Profile")} />
      </div>
      <div className="myInfoContent m-2">
        <div className="theme bigCard">
          <p>{t("Theme")}</p>
          <div className="themeContent position-relative">
            {logoLoading && Loader}
            <div className="flexcenteraround themelogo">
              <div className="themeLogo logo-small overflow-hidden">
                <img src={gymInfo?.logo} alt="gym logo" />
              </div>
              <div>
                {/* <input type="file" className="textButton w-100">
                  Change logo
                </input> */}
                <label htmlFor="changeLogo">
                  <div className="flexcenterbetween">
                    <span className="font-smaller mx-1 underLineHover primary-color bold">
                      {t("Change Logo")}
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
                  <input
                    type="file"
                    id="changeLogo"
                    onChange={(e) => handleChangeImg(e, "logo")}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            <span className="divider"></span>
            <div className="flexcenteraround themeIcon">
              <div className="themeLogo logo-small overflow-hidden">
                <img src={gymInfo?.icon} alt="gym Icon" />
              </div>
              <div>
                <label htmlFor="changeIcon">
                  <div className="flexcenterbetween">
                    <span className="font-smaller mx-1 underLineHover primary-color bold">
                      {t("Change Icon")}
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
                  <input
                    type="file"
                    id="changeIcon"
                    onChange={(e) => handleChangeImg(e, "icon")}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            {/* <div className="flexcenteraround ">
              <div className="themeColor p-3 overflow-hidden">
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
                      {t("ChangeGymName")}
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
              </div>
            </div> */}
          </div>
        </div>
        <div className="infoCard">
          <div className="flexcenterbetween">
            <h3>{t("GymName")}</h3>
            <span className="flexcenterbetween">
              <button
                className="PrimaryButton  gap-1"
                onClick={() => {
                  handleShowEditGymName();
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
                <span>{t("Edit")}</span>
              </button>
            </span>
          </div>

          <p name="info" className=" m-auto pOfGymInfo rounded-2">
            {gymInfo?.name}
          </p>
        </div>
        <div className="infoCard">
          <div className="flexcenterbetween">
            <h3>{t("Gym Description")}</h3>
            <span className="flexcenterbetween">
              <button
                className="PrimaryButton  gap-1"
                onClick={() => {
                  handleShowEditDesc();
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
                <span>{t("Edit")}</span>
              </button>
            </span>
          </div>

          <p name="info" className=" m-auto pOfGymInfo rounded-2">
            {gymInfo?.description}
          </p>
        </div>
        <div className="infoCard">
          <div className="flexcenterbetween">
            <h3>{t("Location")}</h3>
            <span className="flexcenterbetween">
              <button
                className="PrimaryButton  gap-1"
                onClick={() => {
                  handleShowEditLocation();
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
                <span>{t("Edit")}</span>
              </button>
            </span>
          </div>

          <div className="">
            <p name="info" className=" m-auto pOfGymInfo rounded-2 my-1">
              {t("lat")} :{" "}
              {gymInfo?.branchInfo?.location?.lat
                ? gymInfo?.branchInfo?.location?.lat
                : t("noLatYet")}
            </p>
            <p name="info" className=" m-auto pOfGymInfo rounded-2 my-1">
              {t("lng")} :{" "}
              {gymInfo?.branchInfo?.location?.lng
                ? gymInfo?.branchInfo?.location?.lng
                : t("noLngYet")}
            </p>
          </div>
        </div>

        <div className="workingTimes bigCard">
          <div className="flexcenterbetween">
            <h3>{t("Working times")}</h3>
            <span className="flexcenterbetween">
              <button
                className="PrimaryButton  gap-1"
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
                <span>{t("Edit")}</span>
              </button>
            </span>
          </div>
          <div>
            <table className="mainTableTwo">
              <thead>
                <tr>
                  <th>{t("Day")}</th>
                  <th>{t("Opening")}</th>
                  <th>{t("Closing")}</th>
                  <th>
                    {t("Peak hours")}{" "}
                    <span>
                      <svg
                        color="red"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-fire"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15" />
                      </svg>
                    </span>
                  </th>
                  <th>
                    {t("Female hours")}{" "}
                    <span>
                      <svg
                        stroke="pink"
                        strokeWidth={1.5}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-gender-female"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5"
                        />
                      </svg>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {workingDays.map((day, index) => (
                  <tr key={index}>
                    <td data-label={t("Day")} className="text-capitalize">
                      {day}
                    </td>
                    <td data-label={t("Opening")}>
                      {gymInfo?.branchInfo.workingTimes[day]?.opening || "---"}
                    </td>
                    <td data-label={t("Closing")}>
                      {gymInfo?.branchInfo.workingTimes[day]?.closing || "---"}
                    </td>
                    <td data-label={t("Peak hours")}>
                      {`${
                        gymInfo?.branchInfo.workingTimes[day]?.peakFrom || ""
                      } - ${
                        gymInfo?.branchInfo.workingTimes[day]?.peakTo || ""
                      }`}
                    </td>
                    <td data-label={t("Female hours")}>
                      {`${
                        gymInfo?.branchInfo.workingTimes[day]?.femaleFrom || ""
                      } - ${
                        gymInfo?.branchInfo.workingTimes[day]?.femaleTo || ""
                      }`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bigCard gymGallery ">
          <div className="flexcenterbetween">
            <h3>{t("Gallery")}</h3>
            <label htmlFor="changeGallery">
              <div className="PrimaryButton  gap-1">
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
                <span>{t("Add")}</span>
              </div>
              <input
                type="file"
                multiple
                id="changeGallery"
                onChange={handleGalleryChange}
                className="sr-only"
              />
            </label>
          </div>
          <div className="slider-container position-relative">
            {galleryLoading && Loader}

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
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                750: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1000: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
              }}
            >
              {gymInfo?.branchInfo.images.map((image, index) => (
                <SwiperSlide key={index} className="imgContRel">
                  <div
                    className="bigImageContainer"
                    onClick={() => handleImageClick(image)}
                  >
                    <img
                      src={image}
                      alt={`imagee-${index}`}
                      className="rounded-2 h-200px"
                    />
                  </div>
                  <button
                    className="trashAbsImgCOnt"
                    onClick={() => {
                      handleDeleteImage(image);
                    }}
                  >
                    <Trash2Icon color="white" />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="bigCard socialLinks">
          <div className="flexcenterbetween">
            <p className="m-0">{t("Web & social media")}</p>
            <button className="PrimaryButton  gap-1" onClick={handleShow}>
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
              <span>{t("Edit link")}</span>
            </button>
          </div>
          <div className="flexcenterstart websociallinks">
            <a
              target="_blank"
              href={gymInfo?.links?.facebook}
              className="d-flex flex-column justify-content-center align-items-center text-decoration-none"
            >
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
              <span>{t("Facebook")}</span>
            </a>
            <a
              target="_blank"
              href={gymInfo?.links?.instagram}
              className="d-flex flex-column justify-content-center align-items-center text-decoration-none"
            >
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
              <span>{t("Instagram")}</span>
            </a>
            <a
              target="_blank"
              href={gymInfo?.links?.tiktok}
              className="d-flex flex-column justify-content-center align-items-center text-decoration-none"
            >
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
              <span>{t("Tiktok")}</span>
            </a>
            <a
              target="_blank"
              href={`https://wa.me/2${gymInfo?.phones[0]}`}
              className="d-flex flex-column justify-content-center align-items-center text-decoration-none"
            >
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
              <span>{t("WhatsApp")}</span>
            </a>
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
            <Modal.Title>{t("Link URL")}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalOfLogout">
            <Form onSubmit={handleSubmitLinks}>
              <Form.Group controlId="formGymPhones" className="my-3">
                <p className="font-bold">{t("Gym Phones")}</p>
                {gymInfo?.phones.map((phone, index) => (
                  <Row key={index} className="mb-3 w-100">
                    <Col>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaPhone />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder={t("Add Your Phone Number")}
                          value={phone}
                          onChange={(event) => handleChangePhone(index, event)}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="auto">
                      {gymInfo.phones.length > 1 && (
                        <Button
                          variant="danger"
                          onClick={() => removePhone(index)}
                        >
                          -
                        </Button>
                      )}
                    </Col>
                    <Col xs="auto">
                      {index === gymInfo.phones.length - 1 &&
                        gymInfo.phones.length < 5 &&
                        phone !== "" && (
                          <Button variant="primary" onClick={addPhone}>
                            +
                          </Button>
                        )}
                    </Col>
                  </Row>
                ))}
              </Form.Group>

              <Form.Group controlId="formTikTokLink" className="my-2">
                <InputGroup>
                  <InputGroup.Text>
                    <FaTiktok />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder={t("Paste Link")}
                    name="tiktok"
                    value={gymInfo?.links?.tiktok}
                    onChange={handleChangeLink}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formFacebookLink" className="my-2">
                <InputGroup>
                  <InputGroup.Text>
                    <FaFacebook />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder={t("Paste Link")}
                    name="facebook"
                    value={gymInfo?.links?.facebook}
                    onChange={handleChangeLink}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formInstagramLink" className="my-2">
                <InputGroup>
                  <InputGroup.Text>
                    <FaInstagram />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder={t("Paste Link")}
                    name="instagram"
                    value={gymInfo?.links?.instagram}
                    onChange={handleChangeLink}
                  />
                </InputGroup>
              </Form.Group>
              <div className="flexcenterend gap-2">
                <button
                  type="submit"
                  className="SecondaryButton w-100"
                  onClick={handleClose}
                >
                  {t("Edit Link")}
                </button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
      <div className="EditDescriptionModal">
        <Modal show={showEditDesc} onHide={handleCloseEditDesc}>
          <Modal.Header className="modalOfLogout d-flex justify-contnet-spacebetween align-items-center">
            <Modal.Title>{t("Edit Description")}</Modal.Title>
            <div onClick={handleCloseEditDesc} className="cursor-pointer">
              X
            </div>
          </Modal.Header>
          <Modal.Body className="modalOfLogout">
            <Form>
              <Form.Group controlId="formDescription" className="my-2">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder={t("Add Your Description")}
                  name="description"
                  defaultValue={gymInfo?.description}
                  value={editDesc}
                  onChange={(e) => {
                    setEditDesc(e.target.value);
                  }}
                />
              </Form.Group>
              <div className="flexcenterend gap-2">
                <button
                  type="submit"
                  className="SecondaryButton w-100"
                  onClick={handleUpdateDesc}
                >
                  {t("Edit Description")}
                </button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
      <div className="EditGymNameModal">
        <Modal show={showEditGymName} onHide={handleCloseEditGymName}>
          <Modal.Header className="modalOfLogout d-flex justify-contnet-spacebetween align-items-center">
            <Modal.Title>{t("EditGymName")}</Modal.Title>
            <div onClick={handleCloseEditGymName} className="cursor-pointer">
              X
            </div>
          </Modal.Header>
          <Modal.Body className="modalOfLogout">
            <Form>
              <Form.Group controlId="formDescription" className="my-2">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder={t("EditYourGymName")}
                  name="gymName"
                  defaultValue={gymInfo?.name}
                  value={gymName}
                  onChange={(e) => {
                    setEditGymName(e.target.value);
                  }}
                />
              </Form.Group>
              <div className="flexcenterend gap-2">
                <button
                  type="submit"
                  className="SecondaryButton w-100"
                  onClick={handleUpdateGymName}
                >
                  {t("EditGymName")}
                </button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
      <div className="EditLocationModal">
        <Modal show={showEditLocation} onHide={handleCloseEditLocation}>
          <Modal.Header className="modalOfLogout d-flex justify-contnet-spacebetween align-items-center">
            <Modal.Title>{t("EditGymLocation")}</Modal.Title>
            <div onClick={handleCloseEditLocation} className="cursor-pointer">
              X
            </div>
          </Modal.Header>
          <Modal.Body className="modalOfLogout">
            <Form>
              <Form.Group controlId="formDescription" className="my-2">
                <div className="gap-2">
                  <FormLabel htmlFor="lat">{t("lat")}</FormLabel>
                  <Form.Control
                    placeholder={t("EditYourLocation(lat)")}
                    controlId="lat"
                    name="lat"
                    defaultValue={gymInfo?.branchInfo?.location?.lat}
                    ref={latRef}
                  />
                  <FormLabel htmlFor="lng">{t("lng")}</FormLabel>
                  <Form.Control
                    id="lng"
                    controlId="lng"
                    placeholder={t("EditYourLocation(lng)")}
                    name="lng"
                    defaultValue={gymInfo?.branchInfo?.location?.lng}
                    ref={lngRef}
                  />
                </div>
              </Form.Group>
              <div className="flexcenterend gap-2">
                <button
                  type="submit"
                  className="SecondaryButton w-100"
                  onClick={handleUpdateLocation}
                >
                  {t("EditGymLocation")}
                </button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default GymProfile;
