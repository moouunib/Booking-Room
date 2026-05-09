import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const UpdateOffer = () => {
  const { id } = useParams(); // ✔ ناخذ id من URL
  const { state } = useLocation();
  const navigate = useNavigate();

  const offer = state?.offer;

  const [form, setForm] = useState({
    offerName: "",
    nightlyPrice: "",
    startDate: "",
    endDate: "",
    typeName: "",
  });

  useEffect(() => {
    if (offer) {
      setForm({
        offerName: offer.offerName,
        nightlyPrice: offer.nightlyPrice,
        startDate: offer.startDate
          ? new Date(offer.startDate).toISOString().split("T")[0]
          : "",
        endDate: offer.endDate
          ? new Date(offer.endDate).toISOString().split("T")[0]
          : "",
        typeName: offer.typeName,
      });
    }
  }, [offer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const updateOffer = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `http://localhost:5000/offers/updateOffer/${id}`,
        form,
      );

      alert(data.message);
      navigate("/employee/showOffers");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  if (!offer) {
    return <p className="text-center mt-5">No offer selected</p>;
  }

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <div className="card shadow border-0">
        <div className="card-header fw-bold bg-white">Update Offer</div>

        <div className="card-body">
          <form onSubmit={updateOffer}>
            <div className="mb-3">
              <label className="form-label">Offer Name</label>
              <input
                type="text"
                className="form-control"
                name="offerName"
                value={form.offerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Nightly Price</label>
              <input
                type="number"
                className="form-control"
                name="nightlyPrice"
                value={form.nightlyPrice}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Room Type</label>

              <select
                className="form-select"
                name="typeName"
                value={form.typeName}
                onChange={handleChange}
                required
              >
                <option value="">-- Choose Type --</option>
                <option value="single">Single</option>
                <option value="lux">Double</option>
                <option value="suite">Suite</option>
                <option value="twin_pool">Twin Pool</option>
              </select>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary w-100">
                Update
              </button>
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={() => navigate("/employee/showOffers")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateOffer;
