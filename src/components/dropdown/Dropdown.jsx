import DropdownWrapper from "./Dropdown.style";
import { useState } from "react";

import EthIcon from "../../assets/images/token/eth.png";
import UsdtIcon from "../../assets/images/token/usdt.png";

const Dropdown = ({ setSelectedToken }) => {
  const dropdownList = [
    {
      id: "1",
      icon: EthIcon,
      title: "ETH",
    },
    {
      id: "2",
      icon: UsdtIcon,
      title: "USDT",
    },
  ];

  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [titleText, setTitleText] = useState("USDT");
  const [selectedImg, setSelectedImg] = useState(UsdtIcon);

  const dropdownHandle = () => {
    setIsDropdownActive(true);
  };

  const handleDropdownData = (item) => {
    setTitleText(item.title);
    setSelectedImg(item.icon);
    setIsDropdownActive(false);
  };

  return (
    <DropdownWrapper>
      <button className="dropdown-toggle" onClick={dropdownHandle}>
        <img src={selectedImg} alt="icon" />
        <span>{titleText}</span>
      </button>
      {isDropdownActive && (
        <ul className="dropdown-list">
          {dropdownList.map((item, i) => (
            <li key={i}>
              <a onClick={() => handleDropdownData(item)}>
                <img src={item.icon} alt="icon" />
                <span className="">{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </DropdownWrapper>
  );
};

export default Dropdown;
