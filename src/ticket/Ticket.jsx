import { useLoaderData } from "react-router";
import Loader from "../loder/loading";

const Ticket = () => {
  const tickets = useLoaderData(); // ✅ CALL IT

  console.log("Loader data:", tickets);

  if (!tickets) return <Loader />;

  return (
    <div className="grid">
      {tickets?.map((ticket) => (
        <div key={ticket.id} className="ticket-card">
          <div className="img-box">
            <img src={ticket.image} alt={ticket.title} />
            <span className="badge">{ticket.transportType}</span>
          </div>

          <div className="content">
            <h3>{ticket.title}</h3>

            <p className="route">
              {ticket.from} → {ticket.to}
            </p>

            <div className="info">
              <span>💺 {ticket.quantity} seats</span>
              <span>💰 ৳{ticket.price}</span>
            </div>

            <ul className="perks">
              {ticket.perks.map((perk, i) => (
                <li key={i}>{perk}</li>
              ))}
            </ul>

            {/* <Link to={`/tickets/${ticket.id}`}> */}
            <button className="details-btn">See Details</button>
            {/* </Link> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ticket;
