import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Colors } from "../styles/Colors";

import { faUserFriends as AudienceRegular } from "@fortawesome/pro-regular-svg-icons";
import { faCashRegister as BoxOfficeRegular } from "@fortawesome/pro-regular-svg-icons";
import { faCalculator as CalculatorRegular } from "@fortawesome/pro-regular-svg-icons";
import { faCalendarStar as CalendarStarRegular } from "@fortawesome/pro-regular-svg-icons";
import { faCheck as Check } from "@fortawesome/pro-regular-svg-icons";
import { faGlassCheers as Cheers } from "@fortawesome/pro-regular-svg-icons";
import { faClipboardList as Clipboard } from "@fortawesome/pro-regular-svg-icons";
import { faCrown as CrownRegular } from "@fortawesome/pro-regular-svg-icons";
import { faTachometer as DashboardRegular } from "@fortawesome/pro-regular-svg-icons";
import { faTrash as DeleteRegular } from "@fortawesome/pro-regular-svg-icons";
import { faDollarSign as Dollar } from "@fortawesome/pro-regular-svg-icons";
import { faArrowAltDown as DownArrow } from "@fortawesome/pro-regular-svg-icons";
import { faFileDownload as DownloadReport } from "@fortawesome/pro-regular-svg-icons";
import { faPlay as Play } from "@fortawesome/pro-solid-svg-icons";
import { faPause as Pause } from "@fortawesome/pro-solid-svg-icons";
import { faFastForward as Forward } from "@fortawesome/pro-solid-svg-icons";
import { faFastBackward as Backward } from "@fortawesome/pro-solid-svg-icons";
import { faCode as Embed } from "@fortawesome/pro-regular-svg-icons";
import { faFileExport as Export } from "@fortawesome/pro-regular-svg-icons";
import { faUsdSquare as FeeRegular } from "@fortawesome/pro-regular-svg-icons";
import { faFilter as FilterRegular } from "@fortawesome/pro-regular-svg-icons";
import { faGlobeAmericas as GlobeRegular } from "@fortawesome/pro-regular-svg-icons";
import { faChartLine as GraphGrowth } from "@fortawesome/pro-regular-svg-icons";
import { faKeySkeleton as KeyRegular } from "@fortawesome/pro-regular-svg-icons";
import { faChevronLeft as LeftChevron } from "@fortawesome/pro-regular-svg-icons";
import { faChevronRight as RightChevron } from "@fortawesome/pro-regular-svg-icons";
import { faLink as Link } from "@fortawesome/pro-regular-svg-icons";
import { faMicrophoneAlt as MicrophoneRegular } from "@fortawesome/pro-regular-svg-icons";
import { faPrint as PrintRegular } from "@fortawesome/pro-regular-svg-icons";
import { faReceipt as ReceiptRegular } from "@fortawesome/pro-regular-svg-icons";
import { faFileChartLine as ReportRegular } from "@fortawesome/pro-regular-svg-icons";
import { faSearch as SearchRegular } from "@fortawesome/pro-regular-svg-icons";
import { faTicketAlt as TicketRegular } from "@fortawesome/pro-regular-svg-icons";
import { faUnlock as Unlock } from "@fortawesome/pro-regular-svg-icons";
import { faArrowAltUp as UpArrow } from "@fortawesome/pro-regular-svg-icons";
import { faArrowAltSquareUp as UpgradeRegular } from "@fortawesome/pro-regular-svg-icons";
import { faUpload as Upload } from "@fortawesome/pro-regular-svg-icons";
import { faUsers as UsersRegular } from "@fortawesome/pro-regular-svg-icons";
import { faLandmark as VenueRegular } from "@fortawesome/pro-regular-svg-icons";
import { faUserFriends as AudienceSolid } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft as BackArrow } from "@fortawesome/free-solid-svg-icons";
import { faBold as Bold } from "@fortawesome/free-solid-svg-icons";
import { faCashRegister as BoxOfficeSolid } from "@fortawesome/free-solid-svg-icons";
import { faBullhorn as Bullhorn } from "@fortawesome/free-solid-svg-icons";
import { faCalculator as CalculatorSolid } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDay as CalendarDaySolid } from "@fortawesome/free-solid-svg-icons";
import { faTimes as Cancel } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle as CancelCircle } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown as CaretDown } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBill as Cash } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle as CheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faCopy as CopySolid } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard as CreditCardBack } from "@fortawesome/free-solid-svg-icons";
import { faCrown as CrownSolid } from "@fortawesome/free-solid-svg-icons";
import { faICursor as Cursor } from "@fortawesome/free-solid-svg-icons";
import { faTrash as DeleteSolid } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope as EnvelopeSolid } from "@fortawesome/free-solid-svg-icons";
import { faEye as EyeSolid } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle as HelpSolid } from "@fortawesome/free-solid-svg-icons";
import { faItalic as Italic } from "@fortawesome/free-solid-svg-icons";
import { faMicrophoneAlt as MicrophoneSolid } from "@fortawesome/free-solid-svg-icons";
import { faMobileAlt as Mobile } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle as PlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faPrint as PrintSolid } from "@fortawesome/free-solid-svg-icons";
import { faReceipt as ReceiptSolid } from "@fortawesome/free-solid-svg-icons";
import { faChevronCircleRight as RightChevronCircle } from "@fortawesome/free-solid-svg-icons";
import { faSearch as SearchSolid } from "@fortawesome/free-solid-svg-icons";
import { faSort as Sort } from "@fortawesome/free-solid-svg-icons";
import { faTicketAlt as TicketSolid } from "@fortawesome/free-solid-svg-icons";
import { faUnderline as Underline } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle as UserCircle } from "@fortawesome/free-solid-svg-icons";
import { faUser as UserSolid } from "@fortawesome/free-solid-svg-icons";
import { faUsers as UsersSolid } from "@fortawesome/free-solid-svg-icons";
import { faLandmark as VenueSolid } from "@fortawesome/free-solid-svg-icons";
import { faExclamationTriangle as Warning } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt as Calendar } from "@fortawesome/free-regular-svg-icons";
import { faClock as Clock } from "@fortawesome/free-regular-svg-icons";
import { faCopy as CopyRegular } from "@fortawesome/free-regular-svg-icons";
import { faEdit as Edit } from "@fortawesome/free-regular-svg-icons";
import { faEye as EyeRegular } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash as EyeSlashRegular } from "@fortawesome/free-regular-svg-icons";
import { faQuestionCircle as HelpRegular } from "@fortawesome/free-regular-svg-icons";
import { faSadTear as SadTear } from "@fortawesome/free-regular-svg-icons";
import { faUser as UserRegular } from "@fortawesome/free-regular-svg-icons";
import { faCalendarDay as CalendarDayLight } from "@fortawesome/pro-light-svg-icons";
import { faMapMarkerAlt as mapPinLight } from "@fortawesome/pro-light-svg-icons";
import { faMinusCircle as MinusCircleLight } from "@fortawesome/pro-light-svg-icons";
import { faPlusCircle as PlusCircleLight } from "@fortawesome/pro-light-svg-icons";
import { faCalendarStar as CalendarStarSolid } from "@fortawesome/pro-solid-svg-icons";
import { faCreditCardFront as CreditCardFront } from "@fortawesome/pro-solid-svg-icons";
import { faTachometer as DashboardSolid } from "@fortawesome/pro-solid-svg-icons";
import { faUsdSquare as FeeSolid } from "@fortawesome/pro-solid-svg-icons";
import { faKeySkeleton as KeySolid } from "@fortawesome/pro-solid-svg-icons";
import { faLongArrowRight as LongRightArrow } from "@fortawesome/pro-solid-svg-icons";
import { faFileChartLine as ReportSolid } from "@fortawesome/pro-solid-svg-icons";
import { faSortAlt as SortBy } from "@fortawesome/pro-solid-svg-icons";
import { faArrowAltSquareUp as UpgradeSolid } from "@fortawesome/pro-solid-svg-icons";

// import { library } from "@fortawesome/fontawesome-svg-core";

export const Icons = {
  Play,
  Pause,
  Forward,
  Backward,
  AudienceRegular,
  BoxOfficeRegular,
  CalculatorRegular,
  CalendarStarRegular,
  Check,
  Cheers,
  Clipboard,
  CrownRegular,
  DashboardRegular,
  DeleteRegular,
  Dollar,
  DownArrow,
  DownloadReport,
  Embed,
  Export,
  FeeRegular,
  FilterRegular,
  GlobeRegular,
  GraphGrowth,
  KeyRegular,
  LeftChevron,
  RightChevron,
  Link,
  MicrophoneRegular,
  PrintRegular,
  ReceiptRegular,
  ReportRegular,
  SearchRegular,
  TicketRegular,
  Unlock,
  UpArrow,
  UpgradeRegular,
  Upload,
  UsersRegular,
  VenueRegular,
  AudienceSolid,
  BackArrow,
  Bold,
  BoxOfficeSolid,
  Bullhorn,
  CalculatorSolid,
  CalendarDaySolid,
  Cancel,
  CancelCircle,
  CaretDown,
  Cash,
  CheckCircle,
  CopySolid,
  CreditCardBack,
  CrownSolid,
  Cursor,
  DeleteSolid,
  EnvelopeSolid,
  EyeSolid,
  HelpSolid,
  Italic,
  MicrophoneSolid,
  Mobile,
  PlusCircle,
  PrintSolid,
  ReceiptSolid,
  RightChevronCircle,
  SearchSolid,
  Sort,
  TicketSolid,
  Underline,
  UserCircle,
  UserSolid,
  UsersSolid,
  VenueSolid,
  Warning,
  Calendar,
  Clock,
  CopyRegular,
  Edit,
  EyeRegular,
  EyeSlashRegular,
  HelpRegular,
  SadTear,
  UserRegular,
  CalendarDayLight,
  mapPinLight,
  MinusCircleLight,
  PlusCircleLight,
  CalendarStarSolid,
  CreditCardFront,
  DashboardSolid,
  FeeSolid,
  KeySolid,
  LongRightArrow,
  ReportSolid,
  SortBy,
  UpgradeSolid,
};
 
const Container = styled.div<any>`
  color: ${(props) => props.color};

  &:hover {
    color: ${(props) => {
      if (props.color === "inherit") return null;
      return props.hoverColor;
    }};
  }
`;

export type IconProps = {
  icon: any;
  color?: Colors | string | null;
  hoverColor?: Colors | string | null;
  onClick?: any | null;
  size?: string | number | undefined;
  position?: string;
  top?: string | number | undefined;
  left?: string | number | undefined;
  right?: string | number | undefined;
  zIndex?: number | void;
  margin?: string | number | undefined;
  tip?: string;
  transitionDuration?: string;
  rotation?: number;
};

export default function Icon({
  icon = Icons.AudienceRegular,
  color = Colors.Blue,
  hoverColor = null,
  onClick,
  size = 20,
  top,
  left,
  right,
  position = "relative" as any,
  zIndex,
  margin,
  tip,
  transitionDuration,
  rotation,
}: IconProps) {
  const cursor: string = onClick ? "pointer" : "";

  return (
    <Container color={color} hoverColor={hoverColor} data-tip={tip}>
      <FontAwesomeIcon
        icon={icon as any}
        onClick={onClick}
        style={{
          top,
          left,
          right,
          position: position as any,
          zIndex: zIndex as any,
          fontSize: size,
          transition: `all ${transitionDuration || "0.2s"}`,
          transform: rotation ? `rotate(${rotation}deg)` : undefined,
          margin,
          cursor,
        }}
      />
    </Container>
  );
}
