import { useEffect, useState } from "react";
import Loader from "./Loader/Loder";
import { VideoItem } from "../pages/Profilepage";

function History() {
  const [historyarr, setHistoryarr] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getHistory = async () => {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/users/history",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const error = await response.json();
          console.log("error fetching history ", error);
          alert(error.message);
          return;
        }

        const responseData = await response.json();

        console.log("got history info ", responseData);

        setHistoryarr(responseData.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getHistory();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="containerbox">
          <h2>History</h2>
          {historyarr && historyarr.length !== 0 ? (
            historyarr.map((video) => <VideoItem key={video} item={video} />)
          ) : (
            <p>No videos found</p>
          )}
        </div>
      )}
    </>
  );
}

export default History;
