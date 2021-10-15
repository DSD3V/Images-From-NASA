import styled from 'styled-components';
import Tab from '@mui/material/Tab';
import { Tab as YearTab, TabList, Tabs } from '@reach/tabs';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';

const GREY = '#9a9a9a';
const LIGHT_GREY = '#b4b4b4';
const DARK_GREY = '#131313';

export const Heading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NasaLogo = styled.img`
  width: 70px;
  height: 70px;
  margin-left: 5px;
`;

export const StyledTab = styled(Tab)`
  && {
    color: ${GREY};
    margin: 0% 1.5% 0% 1.5%;
    transition: 0.4s;

    :hover {
      color: ${props => !props.styleprops.isActive && LIGHT_GREY};
    }
  }
`;

export const ViewContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 150px;
`;

export const ViewHeading = styled.div`
  display: flex;
  color: ${GREY};
  margin-top: 0.8%;

  a {
    display: inline-flex;
    :active {
      color: #0000b3;
    }
    img {
      opacity: 0.6;
      margin-left: 3px;
    }
  }
`;

export const SearchBar = styled(TextField)`
  background-color: white;
  border-radius: 4px;
  width: 50%;

  .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-width: 3px !important;
  }
`;

export const TableContainer = styled.div`
  width: 60%;
  margin-top: 1%;
  display: flex;
  flex-direction: column;
  height: 500px;
`;

export const StyledDataGrid = styled(DataGrid)`
  background-color: white;

  .MuiDataGrid-row {
    cursor: pointer;
    transition: 0.4s;

    :hover {
      border: 1px solid black;
      opacity: 0.9;
    }
  }

  .MuiDataGrid-selectedRowCount {
    visibility: hidden !important;
  }

  .MuiDataGrid-cell:focus-within {
    outline: none !important;
  }
`;

export const CellImg = styled.img`
  width: 120px;
  height: 130px;
`;

export const DetailsViewContainer = styled(ViewContainer)`
  margin-top: 1%;
  color: ${GREY};
`;

export const ReturnButton = styled.button`
  margin-top: -2px;
  cursor: pointer;
  padding: 5px;
  transition: 0.4s;
  background-color: ${GREY};

  :hover {
    background-color: ${LIGHT_GREY};
  }
`;

export const CarouselContainer = styled.div`
  display: flex;
  margin-top: 2%;
  background-color: black;
  width: 100%;
  height: 600px;

  .slider-list {
    cursor: auto !important;
  }
`;

export const SlideDiv = styled.div`
  display: flex;
  background-color: ${DARK_GREY};
  flex-direction: column;
  max-height: 500px;
  text-align: center;
  align-items: center;
  overflow-y: auto;

  .title {
    margin-top: 5%;
    font-size: 1.3rem;
  }

  img {
    max-height: 200px;
  }

  .description {
    width: 80%;
  }
`;

export const SlideButton = styled.button`
  background: transparent;
  border: none;
`;

export const StyledLeftArrow = styled.svg`
  transform: rotate(180deg);
  cursor: pointer;
  margin-left: 16%;
  margin-bottom: 500%;
  margin-right: -50%;

  :hover g {
    stroke: ${LIGHT_GREY};
    transition: 0.4s;
  }
`;

export const StyledRightArrow = styled.svg`
  cursor: pointer;
  margin-right: 16%;
  margin-left: -50%;
  margin-bottom: 500%;

  :hover g {
    stroke: ${LIGHT_GREY};
    transition: 0.4s;
  }
`;

export const StyledYearTab = styled(YearTab)`
  color: ${GREY};
  color: ${props => props.styleprops.isActive && '#1976d2'};
  border: ${props =>
    props.styleprops.isActive
      ? '1px solid #1976d2'
      : '1px solid rgba(255, 255, 255, 0.1)'};
  background-color: black;
  cursor: pointer;
  transition: 0.4s;
  margin: 0.6%;
  padding: 5px 9px;

  :hover {
    color: ${props => !props.styleprops.isActive && LIGHT_GREY};
    border: ${props =>
      props.styleprops.isActive
        ? '1px solid #1976d2'
        : '1px solid rgba(255, 255, 255, .3)'};
  }
`;

export const StyledTabsContainer = styled(Tabs)`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledTabList = styled(TabList)`
  width: 70%;
`;

export const GridContainer = styled.div`
  display: flex;
  margin-top: 4%;
  flex-wrap: wrap;
`;

export const GridCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border: 1px solid ${GREY};
  color: ${GREY};
  width: 150px;
  height: 150px;
  margin: 0.2%;
  transition: 0.2s;

  :hover {
    color: ${LIGHT_GREY};
    border: 1px solid ${LIGHT_GREY};
  }
`;

export const GridCellTitle = styled.p`
  width: 80%;
  font-size: 0.86rem;
  text-align: center;
`;

export const GridCellImg = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 12%;
`;

export const LoaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  p {
    margin-top: 8%;
  }
`;
