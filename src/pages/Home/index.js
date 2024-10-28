import { useRef, useState } from "react";
import "./home.css";
import DownloadQRCodeModal from "../../components/DownloadQRCodeModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaDownload, FaQrcode } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";

const validationSchema = Yup.object().shape({
  url: Yup.string()
    .matches(
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\S*)?$/,
      "Geçerli bir URL girin."
    )
    .required("Website link alanı boş bırakılamaz."),
});

const Home = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const qrRef = useRef();

  const [websiteUrl, setWebsiteUrl] = useState("");
  const [size, setSize] = useState(256);
  const [qrName, setQrName] = useState("");
  const [type, setType] = useState("png");

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleReset,
    handleSubmit,
  } = useFormik({
    initialValues: {
      url: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (values?.url) {
        setWebsiteUrl(values?.url?.trim());
        handleReset();
      }
    },
  });

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL(`${type ? `image/${type}` : "image/png"}`);
      link.download = `${
        qrName
          ? type
            ? `${formatText(qrName)}.${type}`
            : `${formatText(qrName)}.png`
          : "qrcode.png"
      }`;
      link.click();
      setSize("");
      setQrName("");
      setType("");
      setWebsiteUrl("");
    }
  };

  return (
    <div className="container py-5 test">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="form-group">
            <div className="input-group">
              <input
                type="text"
                className={`form-control ${
                  touched?.url && errors?.url ? "is-invalid" : ""
                }`}
                placeholder="website linki giriniz"
                name="url"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.url}
                style={{}}
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSubmit}
              >
                <FaQrcode />
                &nbsp;QR Code Oluştur
              </button>
            </div>
            {touched?.url && errors?.url && (
              <div className="text-danger mt-1">{errors?.url}</div>
            )}
          </div>
        </div>
      </div>
      {websiteUrl && (
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="d-flex align-items-center justify-content-center my-5">
              <QRCodeCanvas
                value={websiteUrl}
                size={256}
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            </div>
            <div ref={qrRef} style={{ display: "none" }}>
              <QRCodeCanvas value={websiteUrl} size={size} />
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center gap-3">
              <button
                className="btn px-5 btn-primary px-4 d-flex align-items-center justify-content-center"
                onClick={() => setShow(true)}
              >
                <FaDownload />
                &nbsp;&nbsp;
                <span className="fw-bold">İndir</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {show && (
        <DownloadQRCodeModal
          show={show}
          handleClose={handleClose}
          size={size}
          setSize={setSize}
          qrName={qrName}
          setQrName={setQrName}
          type={type}
          setType={setType}
          downloadQRCode={downloadQRCode}
        />
      )}
    </div>
  );
};

export default Home;

function formatText(text) {
  return text.toLowerCase().replace(/\s+/g, "_");
}
