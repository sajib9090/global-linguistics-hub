import { useLoaderData } from "react-router-dom";

const Classes = () => {
  const approvedClasses = useLoaderData();

  const handleBuy = (approvedClass) => {
    console.log(approvedClass._id);
  };

  return (
    <div>
      <div>
        <h1 className="text-center font-bold text-3xl pt-8">All Classes</h1>
      </div>
      <div className="mt-24 grid md:grid-cols-4 gap-10">
        {approvedClasses &&
          approvedClasses?.map((approvedClass) => (
            <div
              key={approvedClass._id}
              className="card bg-[#0086FF] bg-opacity-20 shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={approvedClass.classImage}
                alt=""
                className="card-img h-[300px] object-cover"
              />
              <div className="card-body  p-4">
                <h3 className="card-title text-2xl font-bold mb-2">
                  {approvedClass.className.length > 30
                    ? approvedClass.className.slice(0, 30) + "..."
                    : approvedClass.className}
                </h3>
                <div className="card-text">
                  <p className="text-lg mb-2">
                    <strong>Instructor:</strong> {approvedClass.instructorName}
                  </p>

                  <p className="text-lg mb-2">
                    <strong>Available Seats:</strong>{" "}
                    {approvedClass.availableSeats}
                  </p>
                  <p className="text-lg mb-2">
                    <strong>Price:</strong> ${approvedClass.price}
                  </p>
                </div>
                <div className="mt-auto">
                  <button
                    onClick={() => handleBuy(approvedClass)}
                    className="btn bg-[#61BCF2] text-white hover:text-black"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Classes;
