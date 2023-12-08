import axios from "axios";
import React, { useEffect, useState } from "react";
import Alluserstyle from "./Alluser.style";

const Alluser = () => {
  const [alluser, setalluser] = useState("");

  useEffect(() => {
    const alluserdata = async () => {
      try {
        const response = await axios.get(
          `https://core.blokcapital.io/userData`
        );
        console.log("message-->", response.data.data.users);
        const mydata = response.data.data.users;
        setalluser(mydata);
      } catch (error) {
        console.error("API Error:", error);
      }
    };
    alluserdata();
  }, []);

  // Function to format the date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  return (
    <Alluserstyle className="h-screen">
      <div className="px-20 py-6">
        <div className="bg-gray-600 bg-opacity-30 rounded-md ">
          <div className="flex flex-wrap justify-between font-bold items-center p-3">
            <div className="w-8 sm:w-10">Sr.No</div>
            <div className="w-1/5 sm:w-1/6">Name</div>
            <div className="w-1/5 sm:w-1/6">Email</div>
            <div className="w-1/5 sm:w-1/6">Wallet Address</div>
            <div className="w-1/5 sm:w-32">Accesscode</div>
            <div className="w-1/5 sm:w-32">Date</div>
          </div>
          <div className="custom-scrollbar h-[46rem] overflow-y-auto">
            {alluser?.length > 0 &&
              alluser.map((user, index) => (
                <div
                  className="flex flex-wrap justify-between items-center p-3 border-b border-gray-500"
                  key={user.id || index}
                >
                  <div className="w-8 sm:w-10 px-2">{index + 1}</div>
                  <div className="w-1/5 sm:w-1/6 ">{user.userName}</div>
                  <div className="w-1/5 sm:w-1/6 break-words">{user.email}</div>
                  <div className="w-1/5 sm:w-1/6 break-words">
                    {user.wallet}
                  </div>
                  <div className="w-1/5 sm:w-32">{user.accessCode}</div>
                  <div className="w-1/5 sm:w-32">
                    {formatDate(user.createdAt)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Alluserstyle>
  );
};

export default Alluser;
