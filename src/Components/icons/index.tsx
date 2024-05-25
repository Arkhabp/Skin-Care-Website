import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IconDefinition } from "@fortawesome/fontawesome-common-types";

import {
  faHome,
  faUserTie,
  faBriefcase,
  faSearch,
  faFilter,
  faArchive,
  faAngleRight,
  faPenToSquare,
  faTrashCan,
  faXmark,
  faFloppyDisk,
  faArrowLeft,
  faArrowRight,
  faCheck,
  faBagShopping,
  faDeleteLeft
} from "@fortawesome/free-solid-svg-icons";
interface IconsProps {
  name?: string;
  size?: "xs" | "sm" | "lg" | "6x";
  color?: string;
}

const Icons: React.FC<IconsProps> = ({
  name,
  size = "6x",
  color = "black"
}) => {
  let icon: IconDefinition | undefined;
  switch (name) {
    case "Home":
      icon = faHome;
      break;
    case "Profile":
      icon = faUserTie;
      break;
    case "Plus":
      icon = faBriefcase;
      break;

    case "Search":
      icon = faSearch;
      break;
    case "Filter":
      icon = faFilter;
      break;
    case "Archive":
      icon = faArchive;
      break;
    case "AngleRight":
      icon = faAngleRight;
      break;
    case "Edit":
      icon = faPenToSquare;
      break;
    case "Delete":
      icon = faTrashCan;
      break;
    case "Cancel":
      icon = faXmark;
      break;
    case "Save":
      icon = faFloppyDisk;
      break;
    case "ArrowLeft":
      icon = faArrowLeft;
      break;
    case "ArrowRight":
      icon = faArrowRight;
      break;
    case "Check":
      icon = faCheck;
      break;
    case "BagShopping":
      icon = faBagShopping;
      break;
    case "Delete":
      icon = faDeleteLeft;
      break;
    default:
      break;
  }

  if (!icon) return null;

  return <FontAwesomeIcon icon={icon} color={color} size={size} />;
};

export default Icons;
