import { Button, Modal } from "react-bootstrap";
import React from "react";

const DownloadQRCodeModal = ({
  show,
  handleClose,
  size,
  setSize,
  qrName,
  setQrName,
  type,
  setType,
  downloadQRCode,
}) => {
  const sizeData = [128, 256, 512, 1024];
  const typeData = ["png", "jpg", "jpeg"];

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>QR Code Oluşturma</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label className="form-label">Boyut(px)</label>
          <div className="row">
            {sizeData &&
              sizeData?.map((item, key) => (
                <div className="col" key={key}>
                  <button
                    className={`btn w-100 ${
                      item === size ? "btn-primary" : "btn-outline-primary"
                    }`}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className="form-group my-2">
          <label className="form-label">İndirme İsmi</label>
          <input
            type="text"
            className="form-control"
            placeholder="indirilecek qr'ın ismi"
            value={qrName}
            onChange={(e) => setQrName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Resim Tipi</label>
          <div className="row">
            {typeData &&
              typeData?.map((item, key) => (
                <div className="col" key={key}>
                  <button
                    className={`btn w-100 ${
                      item === type ? "btn-primary" : "btn-outline-primary"
                    }`}
                    onClick={() => setType(item)}
                  >
                    {item}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          İptal
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            downloadQRCode(qrName, type);
            handleClose();
          }}
        >
          İndir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DownloadQRCodeModal;
