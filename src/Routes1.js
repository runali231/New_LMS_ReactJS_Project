import HomePage from './Dashboard/HomePage';
import EmployeeMaster from './Components/EmployeeMaster/EmployeeMaster';
import TopicMaster from './Components/Topic Master/TopicMaster';
import MeetingCalendar from './Components/Scheduling/MeetingCalendar';
import AddEmployee from './Components/EmployeeMaster/AddEmployee';
import AddTopic from './Components/Topic Master/AddTopic';
import KPIMaster from './Components/KPI Master/KPIMaster';
import TrainingForm from './Components/TrainingForm/TrainingForm';
import TrainingSchedule from './Components/ScheduleForm/TrainingSchedule';
import TrainingFeedback from './Components/Feedback/TrainingFeedback';
import CompetencyChart from './Components/Reports/CompetencyChart';
import AddKPI from './Components/KPI Master/AddKPI';
import TrainingSchedule1 from './Components/Training/TrainingSchedule1';
import TrainingFeedback1 from './Components/Training/TrainingFeedback1';
import Competency from './Components/Competency/CompetencyMaster';
import employeeCompetency from './Components/Reports/EmployeeCompentency';
import AddTrainingForm from './Components/TrainingForm/AddTrainingForm';
import AddTrainingSchedule from './Components/ScheduleForm/AddTrainingSchedule';
import AddTrainingFeedback from './Components/Feedback/AddFeedback';
import Email from './Components/Training/Email';
import ApprovalEmail from './Components/Training/ApprovalEmail';
import DesignationMaster from './Components/DesignationMaster/DesignationMaster';
import DepartmentMaster from './Components/DepartmentMaster/DepartmentMaster';
import Sample from './Components/Scheduling/Sample';
import CompetencyMaster from './Components/Competency/CompetencyMaster';
import AddCompetency from './Components/Competency/AddCompetency';
import AddEmployeeCompetency from './Components/Reports/AddEmployeeCompetency';
import AddDesignation from './Components/DesignationMaster/AddDesignation';
import AddDepartment from './Components/DepartmentMaster/AddDepartment';
import AddTrainingApprovalForm from './Components/Approval/AddTrainingApprovalForm';
import TrainingApprovalForm from './Components/Approval/TrainingApprovalForm';
import TrainingScheduleApproval from './Components/Approval/TrainingScheduleApproval';
import AddTrainingScheduleApproval from './Components/Approval/AddTrainingScheduleApproval';
import RoleMaster from './Components/RoleMaster/RoleMaster';
import AddRoleMaster from './Components/RoleMaster/AddRoleMaster';
import CityMaster from './Components/CityMaster/CityMaster';
import StateMaster from './Components/StateMaster/StateMaster';
import CountryMaster from './Components/CountryMaster/CountryMaster';
import UserMaster from './Components/UserMaster/UserMaster';


const routes1=[
    { path: '/dashboard', exact: true, name: 'Home', element:HomePage },
    { path: '/employeeMaster', name: 'EmployeeMaster', element:EmployeeMaster},
    { path: '/addEmployee/:id', name: 'AddEmployee', element:AddEmployee},
    { path: '/addEmployee', name: 'AddEmployee', element:AddEmployee},
    { path: '/topicMaster', name: 'TopicMaster', element:TopicMaster},
    { path: '/addTopic/:id', name: 'AddTopic', element:AddTopic},
    { path: '/addTopic', name: 'AddTopic', element:AddTopic},
    { path: '/trainingView', name: 'MeetingCalendar', element:MeetingCalendar},
    { path: '/kpiMaster', name: 'KPIMaster', element:KPIMaster},
    { path: '/addKPI/:id', name: 'AddKPI', element:AddKPI},
    { path:"/addKPI", name: 'AddKPI',  element:AddKPI},
    { path: '/addTrainingForm', name: 'AddTrainingForm', element:AddTrainingForm},
    { path: '/addTrainingForm/:id', name: 'AddTrainingForm', element:AddTrainingForm},
    { path: '/trainingForm', name: 'TrainingForm', element:TrainingForm},
    { path: '/addTrainingSchedule', name: 'AddTrainingSchedule', element:AddTrainingSchedule},
    { path: '/addTrainingSchedule/:id', name: 'AddTrainingSchedule', element:AddTrainingSchedule},
    { path: '/trainingSchedule', name: 'TrainingSchedule', element:TrainingSchedule},
    { path: '/trainingSchedule1', name: 'TrainingSchedule11', element:TrainingSchedule1},
    { path: '/addTrainingFeedback', name: 'AddTrainingFeedback', element:AddTrainingFeedback},
    { path: '/trainingFeedback', name: 'TrainingFeedback', element:TrainingFeedback},
    { path: '/trainingFeedback1', name: 'TrainingFeedback1', element:TrainingFeedback1},
    { path: '/competencyChart', name: 'CompetencyChart', element:CompetencyChart},
    { path: '/addCompetency/:id', name: 'AddCompetencyMaster', element:AddCompetency},
    { path: '/addCompetency', name: 'AddCompetencyMaster', element:AddCompetency},
    { path: '/CompentencyMaster', name: 'CompetencyMaster', element:CompetencyMaster},
    { path: '/addEmployeeCompetency', name: 'AddEmployeeCompetency', element:AddEmployeeCompetency},
    { path: '/employeeCompetency', name: 'employeeCompetency', element:employeeCompetency},
    { path: '/email', name: 'Email', element:Email},
    { path: '/approvalEmail', name: 'approvalEmail', element:ApprovalEmail},
    { path: '/addDesignation', name: 'AddDesignation', element:AddDesignation},
    { path: '/addDesignation/:de_id', name: 'AddDesignation', element:AddDesignation},
    { path: '/designationMaster', name: 'DesignationMaster', element:DesignationMaster},
    { path: '/roleMaster', name: 'RoleMaster', element:RoleMaster},
    { path: '/addRoleMaster', name: 'AddRoleMaster', element:AddRoleMaster},
    { path: '/addRoleMaster/:id', name: 'AddRoleMaster', element:AddRoleMaster},
    { path: '/addDepartment/:id', name: 'AddDepartment', element:AddDepartment},
    { path: '/addDepartment', name: 'AddDepartment', element:AddDepartment},
    { path: '/departmentMaster', name: 'DepartmentMaster', element:DepartmentMaster},
    { path: '/addTrainingApprovalForm/:id', name: 'AddTrainingApprovalForm', element:AddTrainingApprovalForm},
    { path: '/trainingApprovalForm', name: 'TrainingApprovalForm', element:TrainingApprovalForm},
    { path: '/trainingScheduleApproval', name: 'TrainingScheduleApproval', element:TrainingScheduleApproval},
    { path: '/addTrainingScheduleApproval/:id', name: 'AddTrainingScheduleApproval', element:AddTrainingScheduleApproval},
    { path: '/cityMaster/:coId/:coName/:stateId/:stateName', name: 'CityMaster', element:CityMaster},
    { path: '/stateMaster/:countryId/:countryName', name: 'StateMaster', element:StateMaster},
    { path: '/countryMaster', name: 'CountryMaster', element:CountryMaster},
    { path: '/userMaster', name: 'UserMaster', element:UserMaster},

    // { path: '/sample', name: 'Sample', element:Sample  },

]
export default routes1