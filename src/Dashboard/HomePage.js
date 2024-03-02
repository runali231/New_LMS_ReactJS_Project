import React from "react";
import "../assets1/css/style.css";
import "../assets1/plugins/morris/morris.css";
import "../assets1/css/font-awesome.min.css";
import "../assets1/css/line-awesome.min.css";
import { NavLink } from "react-bootstrap";
// import Chart from 'chart.js/auto';
// import "../assets1/js/chart.js"
// import "../assets1/plugins/morris/morris.min.js"
// import "../assets1/plugins/raphael/raphael.min.js"
// import "../assets1/js/app.js"
// import "../assets1/js/jquery-3.5.1.min.js"

function HomePage() {
  return (
    <div className="content container-fluid">
      {/* <div className="page-header">
                    <div className="row">
                        <div className="col-sm-12">
                            <h3 className="page-title">Welcome Admin!</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item active">Dashboard</li>
                            </ul>
                        </div>
                    </div>
                </div> */}
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12 mt-5">
            <h3 className="page-title text-dark">User</h3>
            {/* <ul className="breadcrumb">
                            <li className="breadcrumb-item active">User</li>
                        </ul> */}
          </div>
        </div>
      </div>
      {/* Project, Clients, Tasks, and Employees Widgets */}
      <div className="row">
        {/* Project Widget */}
        <Widget icon="fa fa-cubes" value="112" label="Attended Training" />
        {/* Clients Widget */}
        <Widget icon="fa fa-usd" value="44" label="Not Attend Training" />
        {/* Tasks Widget */}
        <Widget icon="fa fa-diamond" value="37" label="Passes Training" />
        {/* Employees Widget */}
        <Widget icon="fa fa-user" value="218" label="Failed Training" />
        <Widget1 icon="fa fa-diamond" value="37" label="Need Training" />
        {/* Employees Widget */}
        <Widget1 icon="fa fa-user" value="218" label="Scheduled Training" />
      </div>

      {/* Total Revenue and Sales Overview Cards */}
      <div className="row">
        {/* Total Revenue Card */}
        <DashboardCard title="Total Attended Training" chartId="bar-charts" />

        {/* Sales Overview Card */}
        <DashboardCard title="Total Scheduled Training" chartId="line-charts" />
      </div>

      {/* New Employees, Earnings, Expenses, and Profit Cards */}

      <div className="page-header">
        <div className="row">
          <div className="col-sm-12 mt-5">
            <h3 className="page-title text-dark">HOD</h3>
            {/* <ul className="breadcrumb">
                            <li className="breadcrumb-item active">User</li>
                        </ul> */}
          </div>
        </div>
      </div>

      <div className="row">
        {/* New Employees Card */}
        <DashboardInfoCard
          title="Training Attended"
          value="10%"
          progress="70%"
        />
        {/* Earnings Card */}
        <DashboardInfoCard
          title="Training Not Attended"
          value="1,42,300"
          progress="70%"
          previousValue="1,15,852"
        />
        {/* Expenses Card */}
        <DashboardInfoCard
          title="Dept Wise Training Passed"
          value="8,500"
          progress="70%"
          previousValue="7,500"
        />
        {/* Profit Card */}
        <DashboardInfoCard
          title="Dept Wise Training Failed"
          value="1,12,000"
          progress="70%"
          previousValue="1,42,000"
        />

        <DashboardInfoCard
          title="Employee Wise Training Passed"
          value="1,12,000"
          progress="70%"
          previousValue="1,42,000"
        />
        <DashboardInfoCard
          title="Employee Wise Training Failed"
          value="1,12,000"
          progress="70%"
          previousValue="1,42,000"
        />
        <DashboardInfoCard
          title="Dept Wise Pending Approval"
          value="1,12,000"
          progress="70%"
          previousValue="1,42,000"
        />
        <DashboardInfoCard
          title="User Wise Pending Approval"
          value="1,12,000"
          progress="70%"
          previousValue="1,42,000"
        />
        <DashboardInfoCard
          title="Dept Wise Training Approved"
          value="1,12,000"
          progress="70%"
          previousValue="1,42,000"
        />
        <DashboardInfoCard
          title="User Wise Training Approved"
          value="1,12,000"
          progress="70%"
          previousValue="1,42,000"
        />
      </div>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12 mt-3">
            <h3 className="page-title text-dark">HR</h3>
            {/* <ul className="breadcrumb">
                            <li className="breadcrumb-item active">User</li>
                        </ul> */}
          </div>
        </div>
      </div>
      {/* Statistics, Task Statistics, and Today Absent Sections */}
      <div className="row">
        {/* Statistics Section */}
        <StatisticsSection />
        {/* Task Statistics Section */}
        <TaskStatisticsSection />
        {/* Today Absent Section */}
        {/* <TodayAbsentSection /> */}
      </div>

      {/* Invoices and Payments Tables */}
      <div className="row">
        {/* Invoices Table */}
        {/* <TableCard title="Invoices" tableId="invoice-table" /> */}
        {/* Payments Table */}
        {/* <TableCard title="Payments" tableId="payment-table" /> */}
      </div>

      {/* Clients and Recent Projects Tables */}
      <div className="row">
        {/* Clients Table */}
        {/* <TableCard title="Clients" tableId="client-table" /> */}
        {/* Recent Projects Table */}
        {/* <TableCard title="Recent Projects" tableId="project-table" /> */}
      </div>
    </div>
  );
}

function Widget({ icon, value, label }) {
  return (
    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
      <div className="card dash-widget">
        <div className="card-body">
          <span className="dash-widget-icon">
            <i className={icon}></i>
          </span>
          <div className="dash-widget-info">
            <h3>{value}</h3>
            <span>{label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
function Widget1({ icon, value, label }) {
  return (
    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6">
      <div className="card dash-widget">
        <div className="card-body">
          <span className="dash-widget-icon">
            <i className={icon}></i>
          </span>
          <div className="dash-widget-info">
            <h3>{value}</h3>
            <span>{label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
function DashboardCard({ title, chartId }) {
  return (
    <div className="col-md-6 text-center">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <div id={chartId}></div>
        </div>
      </div>
    </div>
  );
}

function DashboardInfoCard({ title, value, progress, previousValue }) {
  return (
    <div className="col-md-3">
      <div className="card dash-widget">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <div>
              <span className="d-block">{title}</span>
            </div>
            <div>
              <span
                className={
                  progress.includes("-") ? "text-danger" : "text-success"
                }
              >
                {progress}
              </span>
            </div>
          </div>
          <h3 className="mb-3">{value}</h3>
          <div className="progress mb-2" style={{ height: "5px" }}>
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{ width: progress }}
              aria-valuenow="40"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          {previousValue && (
            <p className="mb-0">
              Previous Month <span className="text-muted">{previousValue}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatisticsSection() {
  return (
    <div className="col-md-12 col-lg-12 col-xl-6 d-flex">
      <div className="card flex-fill dash-statistics">
        <div className="card-body">
          <h5 className="card-title fw-bold">Company</h5>
          <div className="stats-list">
            {/* Statistics Info */}
            <div className="stats-info">
              <p>
                Training Need
                <strong>
                  4 <small>/ 65</small>
                </strong>
              </p>
              <div className="progress">
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: "31%" }}
                  aria-valuenow="31"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="stats-info">
              <p>
                Training Schedule
                <strong>
                  15 <small>/ 92</small>
                </strong>
              </p>
              <div className="progress">
                <div
                  className="progress-bar bg-warning"
                  role="progressbar"
                  style={{ width: "31%" }}
                  aria-valuenow="31"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="stats-info">
              <p>
                Training Pass
                <strong>
                  85 <small>/ 112</small>
                </strong>
              </p>
              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: "62%" }}
                  aria-valuenow="62"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="stats-info">
              <p>
                Training Fail
                <strong>
                  190 <small>/ 212</small>
                </strong>
              </p>
              <div className="progress">
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: "62%" }}
                  aria-valuenow="62"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="stats-info">
              <p>
                Training Feedback Given
                <strong>
                  22 <small>/ 212</small>
                </strong>
              </p>
              <div className="progress">
                <div
                  className="progress-bar bg-purple"
                  role="progressbar"
                  style={{ width: "22%" }}
                  aria-valuenow="22"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="stats-info">
              <p>
                Training Feedback Pending
                <strong>
                  22 <small>/ 212</small>
                </strong>
              </p>
              <div className="progress">
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: "22%" }}
                  aria-valuenow="22"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="stats-info">
              <p>
                Training Approval Pending
                <strong>
                  22 <small>/ 212</small>
                </strong>
              </p>
              <div className="progress">
                <div
                  className="progress-bar bg-info"
                  role="progressbar"
                  style={{ width: "22%" }}
                  aria-valuenow="22"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="stats-info">
              <p>
                Training Approval Done
                <strong>
                  22 <small>/ 212</small>
                </strong>
              </p>
              <div className="progress">
                <div
                  className="progress-bar bg-dark"
                  role="progressbar"
                  style={{ width: "22%" }}
                  aria-valuenow="22"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskStatisticsSection() {
  return (
    <div className="col-md-12 col-lg-6 col-xl-6 d-flex">
      <div className="card flex-fill">
        <div className="card-body">
          <h4 className="card-title">Department</h4>
          <div className="statistics">
            <div className="row">
              <div className="col-md-6 col-6 text-center">
                <div className="stats-box mb-4">
                  <p>Training Need</p>
                  <h3>385</h3>
                </div>
              </div>
              <div className="col-md-6 col-6 text-center">
                <div className="stats-box mb-4">
                  <p>Training Schedule</p>
                  <h3>19</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="progress mb-4">
            <div
              className="progress-bar bg-purple"
              role="progressbar"
              style={{ width: "30%" }}
              aria-valuenow={30}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              30%
            </div>
            <div
              className="progress-bar bg-warning"
              role="progressbar"
              style={{ width: "22%" }}
              aria-valuenow={22}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              22%
            </div>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: "24%" }}
              aria-valuenow={24}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              24%
            </div>
            <div
              className="progress-bar bg-danger"
              role="progressbar"
              style={{ width: "26%" }}
              aria-valuenow={26}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              21%
            </div>
            <div
              className="progress-bar bg-info"
              role="progressbar"
              style={{ width: "10%" }}
              aria-valuenow={10}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              10%
            </div>
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{ width: "10%" }}
              aria-valuenow={30}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              10%
            </div>
            <div
              className="progress-bar bg-info"
              role="progressbar"
              style={{ width: "10%" }}
              aria-valuenow={20}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              10%
            </div>
            <div
              className="progress-bar bg-dark"
              role="progressbar"
              style={{ width: "10%" }}
              aria-valuenow={10}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              10%
            </div>
          </div>
          <div>
            <p>
              <i className="fa fa-dot-circle-o text-purple me-2"></i>Training
              Need<span className="float-right">166</span>
            </p>
            <p>
              <i className="fa fa-dot-circle-o text-warning me-2 mt-3"></i>
              Training Schedule<span className="float-right">115</span>
            </p>
            <p>
              <i className="fa fa-dot-circle-o text-success me-2 mt-3"></i>
              Training Pass<span className="float-right">31</span>
            </p>
            <p>
              <i className="fa fa-dot-circle-o text-danger me-2 mt-3"></i>
              PTraining Fail <span className="float-right">47</span>
            </p>
            <p className="mb-0">
              <i className="fa fa-dot-circle-o text-info me-2 mt-3"></i>Training
              Feedback Given<span className="float-right">15</span>
            </p>
            <p className="mb-0">
              <i className="fa fa-dot-circle-o text-primary me-2 mt-3"></i>
              Training Feedback Pending<span className="float-right">28</span>
            </p>
            <p className="mb-0">
              <i className="fa fa-dot-circle-o text-info me-2 mt-3"></i>Training
              Approval Pending<span className="float-right">35</span>
            </p>
            <p className="mb-0">
              <i className="fa fa-dot-circle-o text-dark me-2 mt-3"></i>Training
              Approval Done<span className="float-right">22</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TodayAbsentSection() {
  return (
    <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
      <div className="card flex-fill">
        <div className="card-body">
          <h4 className="card-title">
            Today Absent <span className="badge bg-inverse-danger ml-2">5</span>
          </h4>
          <div className="leave-info-box">{/* Today Absent Info Box */}</div>
          <div className="leave-info-box">{/* Today Absent Info Box */}</div>
          <div className="load-more text-center">
            <NavLink to="" className="text-dark">Load More</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableCard({ title, tableId }) {
  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead></thead>
              <tbody id={tableId}></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
