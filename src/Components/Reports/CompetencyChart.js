import React, { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import "../Css/Site.css";
import axios from "axios";
import UrlData from "../UrlData";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  handlePageClick,
  handlePrevious,
  handleNext,
  calculatePaginationRange,
} from "../PaginationUtils";
// import * as XLSXStyle from "xlsx-style";
import * as XLSX from "xlsx";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

const CompetencyChart = () => {
  const pdfContentRef = useRef(null);
  const [report, setReport] = useState([]);
  const [pdfResponse, setPdfResponse] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const tableRef = useRef(null);
  const [tableLoaded, setTableLoaded] = useState(false);

  useEffect(() => {
    // Check if the table element is loaded
    if (tableRef.current) {
      setTableLoaded(true);
    }
  }, []);
  const exportPdfHandler = () => {
    // Get the table element
    const table = document.getElementById("dataTable");
  
    // Use html2canvas to capture the table as an image
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg");
  
      // Calculate dimensions for the PDF
      const imgWidth = 290; // A4 page width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      // Create a new jsPDF instance
      const doc = new jsPDF({
        orientation: "landscape",
      });
  
      // Add the captured image to the PDF
      doc.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
  
      // Save the PDF
      doc.save("competency-chart.pdf");
    });
  };
  // const exportPdfHandler = () => {
  //   // Get the table element
  //   const table = document.getElementById("dataTable");
  
  //   // Set the width of the table and its container to be wider than the page width
  //   table.style.width = "1000px"; // Adjust the width as needed
  //   table.parentElement.style.overflowX = "auto"; // Enable horizontal scrolling
  
  //   // Use html2canvas to capture the table as an image
  //   html2canvas(table).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/jpeg");
  
  //     // Calculate dimensions for the PDF
  //     const imgWidth = 300; // A4 page width in mm
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  //     // Create a new jsPDF instance
  //     const doc = new jsPDF({
  //       orientation: "landscape",
  //     });
  
  //     // Add the captured image to the PDF
  //     doc.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
  
  //     // Save the PDF
  //     doc.save("table.pdf");
  
  //     // Reset table and container width after capturing
  //     table.style.width = "auto";
  //     table.parentElement.style.overflowX = "hidden";
  //   });
  // };
  // const exportPdfHandler = () => {
  //   // Get the table element
  //   const table = document.getElementById("dataTable");
  
  //   // Create a new jsPDF instance
  //   const doc = new jsPDF({
  //     orientation: "landscape",
  //   });
  
  //   // Add autoTable plugin options
  //   const options = {
  //     startY: 10, // Start y position of the table. This is optional.
  //     margin: { top: 10, bottom: 10, left: 10, right: 10 }, // Page margins
  //   };
  
  //   // Generate PDF directly from the table
  //   doc.autoTable({ html: table, ...options });
  
  //   // Save the PDF
  //   doc.save("competency-chart.pdf");
  // };
  useEffect(() => {
    getAllData();
  }, [currentPage, itemsPerPage]);

  const getAllData = () => {
    axios({
      method: "get",
      url: new URL(UrlData + `CompentencyChartReport/GetAll`),
    })
      .then((response) => {
        console.log("response all report", response.data.data);
        setReport(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  // const doc = new jsPDF();
  // const exportPdfHandler = () => {
  //   doc.autoTable({ html: "#dataTable" });
  //   doc.save("competencyChart.pdf");
  //   console.log("Table Data Exported");
  // };
  // const exportPdfHandler = () => {
  //   const doc = new jsPDF('landscape'); // Creating a PDF in landscape orientation
  //   const pdfContent = pdfContentRef.current;

  //   if (!pdfContent) {
  //     console.error("Element with ref 'pdfContentRef' not found");
  //     return;
  //   }

  //   html2canvas(pdfContent).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const imgWidth = 297; // Adjust width as needed for landscape orientation
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     doc.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);

  //     // Add table using jspdf-autotable
  //     doc.autoTable({ html: '#dataTable' });

  //     doc.save("competency_report.pdf");
  //   });
  // };

  const exportToExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(report);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, "Competency Report");
      xlsx.writeFile(workbook, "competency_report.xlsx");
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = report.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <>
      <style>
        {`
      #dataTable tbody tr {
        height: 30px; 
      }
    `}
      </style>
      <div className="container-fluid">
        <div
          className="card m-3"
          style={{ boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h4 className="card-title fw-bold py-2">
                      Competency Chart
                    </h4>
                  </div>
                  <div className="col-auto d-flex flex-wrap">
                    <div className="btn btn-add" title="Add New">
                      <button
                        className="btn btn-md text-light"
                        type="button"
                        style={{ backgroundColor: "#1B5A90" }}
                        onClick={exportPdfHandler}
                      >
                        Pdf
                      </button>
                    </div>
                    <div className="btn btn-add" title="Add New">
                      <button
                        className="btn btn-md text-light"
                        type="button"
                        style={{ backgroundColor: "#1B5A90" }}
                        onClick={exportToExcel}
                      >
                        Excel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body pt-3" ref={pdfContentRef} id="cardBody">
                <div className="row ">
                  <div className="col-lg-3 d-flex justify-content-center justify-content-lg-start">
                    <h6 className="mt-3">Show</h6>&nbsp;&nbsp;
                    <select
                      className="form-select w-auto"
                      aria-label="Default select example"
                    >
                      <option defaultValue>10</option>
                      <option value="1">10</option>
                      <option value="2">50</option>
                      <option value="3">100</option>
                    </select>
                    &nbsp;&nbsp;
                    <h6 className="mt-3">entries</h6>
                  </div>
                </div>
                <br />
                <div ref={tableRef}>
                  <Table
                    striped
                    hover
                    responsive
                    className="table-bordered table"
                    id="dataTable"
                    width="100%"
                    cellSpacing="0"
                  >
                    <thead className="text-start">
                      <tr>
                        <th scope="col" className="fw-bold">
                          Sr.No
                        </th>
                        <th scope="col" className="fw-bold">
                          Training need assessment date
                        </th>
                        <th scope="col" className="fw-bold">
                          Date of training
                        </th>
                        <th scope="col" className="fw-bold">
                          Training start
                        </th>
                        <th scope="col" className="fw-bold">
                          Training end
                        </th>
                        <th scope="col" className="fw-bold">
                          Training hours
                        </th>
                        <th scope="col" className="fw-bold text-center">
                          Awareness, CH, Annex, WI & FT WI/
                          <br />
                          SOP, DPR/FM & SAP, Special Training
                        </th>
                        <th scope="col" className="fw-bold">
                          Title
                        </th>
                        <th scope="col" className="fw-bold">
                          Issue No
                        </th>
                        <th scope="col" className="fw-bold">
                          Rev No.
                        </th>
                        <th scope="col" className="fw-bold">
                          Rev Date
                        </th>
                        <th scope="col" className="fw-bold">
                          Other
                        </th>
                        <th scope="col" className="fw-bold">
                          Training Topic
                        </th>
                        <th scope="col" className="fw-bold">
                          Training Given By
                        </th>
                        <th scope="col" className="fw-bold">
                          Emp Code
                        </th>
                        <th scope="col" className="fw-bold">
                          Name of Employees
                        </th>
                        <th scope="col" className="fw-bold">
                          Designation
                        </th>
                        <th scope="col" className="fw-bold">
                          Department
                        </th>
                        <th scope="col" className="fw-bold">
                          Number Question in Training Evaluation
                        </th>
                        <th scope="col" className="fw-bold">
                          Marks Obtained in Training Evaluation
                        </th>
                        <th scope="col" className="fw-bold">
                          Result
                        </th>
                        <th scope="col" className="fw-bold">
                          Hard Copy Location
                        </th>
                        <th scope="col" className="fw-bold">
                          Soft Copy Location
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {report &&
                        currentItems.map((data, index) => {
                          return (
                            <tr className="text-start" key={index}>
                              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                              <td></td>
                              <td>{formatDate(data.DateofTrainning)}</td>
                              <td>{data.StartTime}</td>
                              <td>{data.EndTime}</td>
                              <td>{data.TrainingHours}</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>{data.TrainingTopic}</td>
                              <td>-</td>
                              <td>{data.EmpCode}</td>
                              <td>{data.NameOfEmp}</td>
                              <td>{data.Designation}</td>
                              <td>{data.Department}</td>

                              <td>{data.NoOfQues}</td>
                              <td>{data.Marks}</td>
                              <td>{data.Result}</td>
                              <td>-</td>
                              <td>-</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </div>

                <div className="row mt-4 mt-xl-3">
                  <div className="col-lg-4 col-12 ">
                    <h6 className="text-lg-start text-center">
                      Showing {indexOfFirstItem + 1} to{" "}
                      {Math.min(indexOfLastItem, report.length)} of{" "}
                      {report.length} entries
                    </h6>
                  </div>
                  <div className="col-lg-4 col-12"></div>
                  <div className="col-lg-4 col-12 mt-3 mt-lg-0">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination justify-content-center justify-content-lg-end">
                        <li className="page-item">
                          <button
                            className="page-link"
                            onClick={() =>
                              handlePrevious(currentPage, setCurrentPage)
                            }
                            disabled={currentPage === 1}
                            aria-label="Previous"
                          >
                            <span aria-hidden="true">&laquo;</span>
                          </button>
                        </li>
                        {calculatePaginationRange(
                          currentPage,
                          report,
                          itemsPerPage
                        ).map((number) => (
                          <li
                            key={number}
                            className={`page-item ${
                              currentPage === number ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() =>
                                handlePageClick(number, setCurrentPage)
                              }
                            >
                              {number}
                            </button>
                          </li>
                        ))}
                        <li className="page-item">
                          <button
                            className="page-link"
                            onClick={() =>
                              handleNext(
                                currentPage,
                                report,
                                itemsPerPage,
                                setCurrentPage
                              )
                            }
                            disabled={
                              currentPage ===
                              Math.ceil(report.length / itemsPerPage)
                            }
                            aria-label="Next"
                          >
                            <span aria-hidden="true">&raquo;</span>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompetencyChart;
