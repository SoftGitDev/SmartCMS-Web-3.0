import React, { ReactNode,  useEffect, useMemo, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";

import "./Datatable.css";
import SearchBar from "./SearchBar";
import NoDatafound from "../../../../assets/images/commone/NoDatafound.png";
import Checkbox from "../checkBox/Checkbox";
import { ChevronDown, ChevronUp, FolderPlus } from "lucide-react";
import Pagination from "./Pagination";
import { debounce } from "../../../../services/storage/common";
import { tableColumnProps } from "../../../../services/type";


type dataProps = {
  data?: any;
  columns?: any;
  dataPerpage?: any;
  checkbox?: any;
  isSearchBar?: boolean;
  children: (child: any) => any;
  // rowClick?: () => void;
  rowClick?: any;
  onDoubleClick?: (data: any, rowIndex?: number) => void;
  selectData?: any;
  setSelectData?: any;
  isLoader?: boolean;
  tableNm?: string;
  pagination?: boolean;
  tableBtn?: any;
  footerSection?: any;
  style?: any;
  isNotResponsive?: boolean;
  setPageNo?: React.Dispatch<React.SetStateAction<number>>,
  setPageSize?: React.Dispatch<React.SetStateAction<number>>,
  totalRecord?: number,
  setSearchContain?: React.Dispatch<React.SetStateAction<any>>;
  isRowLoader?: boolean[];
  isNotHoverable?: boolean;
  resetPagination?: any;
  columnStyle?: any;
  pageNo?: number;
  pageSize?: number;
  leftContent?: ReactNode;
  isNotCardRequired?: boolean;
  detailsComponent?: (row: any, columns?: tableColumnProps[], rowIndex?: number) => ReactNode;
  isShowDltId?: any;
  checkboxDisable?: boolean
  isNotShowNoDataFound?: boolean // This Use for not showing Data not found UI
  emptyTblButton?: any
};

export const Datatable: React.FC<dataProps> = ({
  data,
  columns,
  checkbox,
  isSearchBar,
  children,
  rowClick,
  onDoubleClick,
  selectData,
  setSelectData,
  isLoader,
  tableNm,
  pagination,
  tableBtn,
  footerSection,
  style,
  isNotResponsive,
  setPageNo,
  setPageSize,
  totalRecord,
  setSearchContain,
  isRowLoader,
  isNotHoverable,
  resetPagination,
  columnStyle,
  pageNo,
  pageSize,
  leftContent,
  isNotCardRequired,
  detailsComponent,
  isShowDltId,
  checkboxDisable,
  isNotShowNoDataFound,
  emptyTblButton
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(pageNo || 1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(pageSize || 10);
  const [sortColumn, setSortColumn] = useState<any>(null);
  const [sortDirection, setSortDirection] = useState<string | null>(null);


  useEffect(() => {
    setPageNo && setPageNo(currentPage);
    setPageSize && setPageSize(itemsPerPage);
  }, [currentPage, itemsPerPage])

  useEffect(() => {
    if (resetPagination) {
      setCurrentPage(1);
      setItemsPerPage(10);
    }
  }, [resetPagination])

  // Function to handle sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection((prevDirection: string | null) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Helper function to filter the data based on the HiOutlineSearch term
  const filterData = (data: string[]) => {
    return (isSearchBar && !setSearchContain) ? data?.filter((item) =>
      Object.values(item).some((value) =>
        value !== null ? value.toString().toLowerCase().includes(searchTerm.toLowerCase()) : null
      )
    ) : data;
  };

  // Sort the filtered data
  const sortedData = sortColumn
    ? filterData(data).sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    })
    : filterData(data);

  // Get total number of pages
  const totalPages = totalRecord ? Math.ceil(totalRecord / itemsPerPage) : Math.ceil(sortedData?.length / itemsPerPage);


  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pagination && !totalRecord ? sortedData?.slice(indexOfFirstItem, indexOfLastItem) : sortedData;


  const isSelected = (id: number) => selectData?.indexOf(id) !== -1;

  const handleClick = (event: React.MouseEvent<unknown>, row: any) => {
    const selectedIndex = selectData?.indexOf(row);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectData, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectData?.slice(1));
    } else if (selectedIndex === selectData?.length - 1) {
      newSelected = newSelected.concat(selectData?.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectData?.slice(0, selectedIndex),
        selectData.slice(selectedIndex + 1)
      );
    }
    // setSelectData(newSelected);
    setSelectData && setSelectData(newSelected);

  };


  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data?.map((n: any) => n);
      setSelectData && setSelectData(newSelected);
      return;
    }
    setSelectData && setSelectData([]);
  };


  // Debouncing Functions for API side search
  const handleSearch = useMemo(
    () =>
      debounce((value: any) => {
        setSearchContain && setSearchContain(value);
      }, 500),
    [] // only create once
  );

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch, searchTerm === ""]);

  return (
    <Card className={isNotCardRequired ? "bg-transparent border-0 shadow-none" : ""}>
      <Card.Body className={isNotCardRequired ? "p-0" : ""}>
        <div>
          <div className="inline-block w-100 align-middle">
            <div className="d-flex align-items-center gap-2">
              {leftContent}
              {isSearchBar &&
                <div className={leftContent ? "ms-auto" : ""}>
                  <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
              }
              {tableBtn}
            </div>
            <div className="border rounded my-3 overflow-auto" style={style} >
              <div className="table-section" >
                <Table hover={!isNotHoverable} className="w-100 mb-0 text-nowrap data-table" >
                  <thead>
                    <tr className="tableHeader" >
                      {checkbox && (
                        <th className="p-2" style={{ width: 35 }}>
                          <div className="d-flex justify-content-center ms-1">
                            <Checkbox
                              checked={sortedData?.length > 0 && selectData?.length === sortedData?.length}
                              onChange={(e: any) => handleSelectAllClick(e)}
                            />
                          </div>
                        </th>
                      )}
                      {columns?.map((column: any, index: number) => {
                        return (
                          <th
                            key={index}
                            onClick={() => column.sorting && handleSort(column.field)}
                            className="p-2 text-sm"
                            style={{ width: column.width, ...(columnStyle && columnStyle(column.field)) }}
                          >
                            <div
                              className="d-flex justift-content-between text-slate-700"
                              style={{ justifyContent: column.align }}
                            >
                              {column.header}
                              {sortColumn === column.field && column.sorting && (
                                <span className="ms-auto">
                                  {sortDirection === "asc" ? (
                                    <ChevronUp />
                                  ) : (
                                    <ChevronDown />
                                  )}
                                </span>
                              )}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100 text-truncate">
                    {!isLoader && currentItems?.map((row: any, rowIndex: number) => {
                      const isItemSelected = isSelected(row);
                      return (
                        <React.Fragment key={rowIndex}>
                          {!isRowLoader?.[rowIndex] ?
                            <>
                              <tr style={{ cursor: !isNotHoverable ? "pointer" : "default", }} onDoubleClick={() => onDoubleClick && onDoubleClick(row, rowIndex)}>
                                {checkbox && (
                                  <td className="p-2" style={{ ...(columnStyle && columnStyle(row)) }}>
                                    <div className="d-flex justify-content-center ms-1">
                                      <Checkbox
                                        checked={isItemSelected}
                                        disabled={checkboxDisable}
                                        value={isItemSelected}
                                        onChange={(event: any) => {
                                          handleClick(event, row);
                                        }}
                                      />
                                    </div>
                                  </td>
                                )}
                                {columns?.map((column: any, colIndex: number) => {
                                  return (
                                    <td
                                      key={colIndex}
                                      className="p-2  text-sm"
                                      onClick={rowClick}
                                      style={{ textAlign: column.align || "left", ...(columnStyle && columnStyle(row, column.field)) }}
                                    >
                                      {children({ row: row, column: column, rowIndex: rowIndex })}
                                    </td>
                                  );
                                })}
                              </tr>

                              {detailsComponent && detailsComponent(row, columns, rowIndex)}
                            </>
                            :
                            <tr>
                              {Array(checkbox ? columns.length + 1 : columns.length).fill("n").map((_, colIndex: number) => {
                                return (
                                  <td key={colIndex} className="px-2 py-3">
                                    <div className="skeleton skeleton-text"></div>
                                  </td>
                                );
                              })}
                            </tr>
                          }
                        </React.Fragment>
                      );
                    })}

                    {isLoader && <>
                      {Array(4).fill("n").map((_, rowIndex: number) => {
                        return (
                          <tr key={rowIndex}>
                            {Array(checkbox ? columns?.length + 1 : columns?.length).fill("n").map((_, colIndex: number) => {
                              return (
                                <td
                                  key={colIndex}
                                  className="p-2"
                                >
                                  <div className="skeleton skeleton-text"></div>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </>}


                    {!isNotShowNoDataFound ?
                      (!currentItems || currentItems?.length === 0) && !isLoader && (
                        <tr>
                          <td colSpan={checkbox ? (columns?.length + 1).toString() : columns?.length.toString()} >
                            <div className="d-flex align-items-center justify-content-center flex-column"
                              style={{ height: "40vh" }}>
                              <img src={NoDatafound} alt="no data found" style={{ width: 200 }} />
                              <h1 className="text-base text-center">
                                No {tableNm || "Data"} Found
                              </h1>
                            </div>
                          </td>
                        </tr>
                      )
                      :

                      (!currentItems || currentItems?.length === 0) && !isLoader && (
                        <>
                          <td colSpan={checkbox ? columns?.length + 1 : columns?.length}>
                            <div className="d-flex align-items-center justify-content-center flex-column gap-2  py-5" style={{ marginTop: '100px' }}>
                              {/* Layered bubble icon */}
                              <div className="position-relative" style={{ width: 90, height: 90, marginBottom: 8 }}>
                                {/* Back circle */}
                                <div className="position-absolute rounded-circle" style={{ bottom: 0, right: 0, width: 70, height: 70, background: 'var(--primaryColor)', opacity: 0.15, }} />
                                {/* Front circle */}
                                <div className="position-absolute rounded-circle d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, width: 70, height: 70, background: 'var(--primaryColor)', opacity: 0.5, }}                                >
                                  <FolderPlus size={32} className="text-white" />
                                </div>
                              </div>
                              {/* Title */}
                              <p className="fw-bold text-dark mb-0" style={{ fontSize: 15, letterSpacing: '-0.01em' }}>
                                No {tableNm || 'items'} available
                              </p>
                              {/* Subtitle */}
                              <p className="text-center text-secondary mb-0" style={{ fontSize: 13, maxWidth: 300, lineHeight: 1.6 }}>
                                Get started by adding or creating{' '}
                                {tableNm?.toLowerCase() || 'items'} using the options below.
                              </p>

                              {/* empty table footer button */}
                              {emptyTblButton}
                            </div>
                          </td>
                        </>
                      )
                    }
                  </tbody>

                  {footerSection && currentItems?.length !== 0 &&
                    <tfoot>
                      {footerSection}
                    </tfoot>
                  }
                </Table>
              </div>

            </div>

            {pagination &&
              <Pagination
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                setItemsPerPage={setItemsPerPage}
                totalPages={totalPages}
                totalRecord={totalRecord || data?.length}
              />
            }
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};