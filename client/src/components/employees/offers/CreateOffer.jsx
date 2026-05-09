import React, {  useState } from "react";
import axios from "axios";

const CreateOffer = () => {
  const [offerName, setOfferName] = useState("");
  const [nightlyPrice, setNightlyPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [typeName, setTypeName] = useState("");

  
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  
  

  // ✅ submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/offers/createOffer",
        {
          offerName,
          nightlyPrice,
          startDate,
          endDate,
          typeName,
        },
      );
      console.log(data);
      alert(data.message);
      


      

      // reset form
      setOfferName("");
      setNightlyPrice("");
      setStartDate("");
      setEndDate("");
      setTypeName("");
    } catch (err) {
      if (err.response) {
        setMessage("❌ " + err.response.data.message);
      } else {
        setMessage("❌ Server error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Create Offer</h3>

        {message && (
          <div className="alert alert-info text-center">{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Offer Name */}
          <div className="mb-3">
            <label className="form-label">Offer Name</label>
            <input
              type="text"
              className="form-control"
              value={offerName}
              onChange={(e) => setOfferName(e.target.value)}
              required
            />
          </div>

          {/* Price */}
          <div className="mb-3">
            <label className="form-label">Nightly Price</label>
            <input
              type="number"
              className="form-control"
              value={nightlyPrice}
              onChange={(e) => setNightlyPrice(e.target.value)}
              required
            />
          </div>

          {/* Dates */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Type */}
          <div className="mb-3">
            <label className="form-label">Room Type</label>
            <select
              className="form-select"
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
              required
            >
              <option value="">-- Choose Type --</option>
              <option value="single">Single</option>
              <option value="triple">Double</option>
              <option value="suite">Suite</option>
              <option value="twin_pool">Twin Pool</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Offer"}
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default CreateOffer;
