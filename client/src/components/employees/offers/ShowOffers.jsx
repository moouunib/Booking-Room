import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


const ShowOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:5000/offers/getAllOffers",
        );
        setOffers(data.offers);
      } catch (err) {
        setError("❌ Error loading offers");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);
  const deleteOffer = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/offers/deleteOffer/${id}`,
      );
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting offer");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-3 text-center">Offers List</h3>

      {/* زر إنشاء عرض جديد */}
      <div className="d-flex justify-content-end mb-3">
        <Link to="/employee/createOffer">
          <Button variant="primary">+ Create New Offer</Button>
        </Link>
      </div>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && <p className="text-danger text-center">{error}</p>}

      <div className="row">
        {offers.map((offer) => (
          <div className="col-md-4 mb-4" key={offer._id}>
            <Card className="shadow h-100">
              <Card.Body>
                <Card.Title className="fw-bold">{offer.offerName}</Card.Title>

                <Card.Text>
                  💰 <strong>Price:</strong> {offer.nightlyPrice} / night
                </Card.Text>

                <Card.Text>
                  📅 <strong>From:</strong>{" "}
                  {new Date(offer.startDate).toLocaleDateString()}
                </Card.Text>

                <Card.Text>
                  📅 <strong>To:</strong>{" "}
                  {new Date(offer.endDate).toLocaleDateString()}
                </Card.Text>

                <Card.Text>
                  🏨 <strong>Type:</strong> {offer.typeName}
                </Card.Text>

                <div className="d-flex justify-content-between mt-3">
                  <Button
                    onClick={() => deleteOffer(offer._id)}
                    variant="danger"
                    size="sm"
                  >
                    Delete
                  </Button>

                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      navigate(
                        `/employee/updateOffer/${offer._id}`,
                        {
                          state: { offer },
                        },
                      )
                    }
                  >
                    Update
                  </button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowOffers;
