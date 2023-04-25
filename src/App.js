import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LogIn from "./login/Login";
import Register from "./login/Register";
import AdminHome from "./Admin/AdminHome";
import AddDoctor from "./Admin/AddDoctor";
import AddHospital from "./Admin/AddHospital"
import UpdateHospital from "./Admin/UpdateHospital"
import Hospital from "./Admin/Hospital";
import AddMedicine from "./Admin/AddMedicine";
import UpdateMedication from "./Admin/UpdateMedication";
import Medicines from "./Admin/Medicines";
import AddSection from "./Admin/AddSection";
import UpdateSection from "./Admin/UpdateSection";
import Sections from "./Admin/Sections";
import ApproveMedicine from './Admin/ApproveMedicine';
import AddMedicineDoctor from './Doctor/AddMedicineDoctor';
import ViewMedicineDoctor from './Doctor/ViewMedicineDoctor';
import DoctorHome from './Doctor/DoctorHome';
import AddDiagnostic from './Admin/AddDiagnostic';
import UpdateDiagnostic from './Admin/UpdateDiagnostic';
import Diagnostic from './Admin/Diagnostic';
import ApproveDiagnostic from './Admin/AproveDiagnostic';
import AddDiagnosticDoctor from './Doctor/AddDiagnosticDoctor';
import ViewDiagnosticDoctor from './Doctor/ViewDiagnosticDoctor';
import UpdateDoctorProfile from './Doctor/UpdateDoctorProfile';
import PatientHome from './Patient/PatientHome';
import UpdatePatientProfile from './Patient/UpdatePatientProfile';
import ShowDoctor from './Patient/ShowDoctor';
import DoctorProfile from './Patient/DoctorProfile';
import Calendar from "./Patient/Calendar";
import MakeAppoiments from "./Patient/MakeAppoiments";
import ViewAppoiments from './Patient/ViewAppoiments';
import AproveAppoiment from './Doctor/AproveAppoiment';
import SeePatients from './Doctor/SeePatients';
import MakeConsultation from './Doctor/MakeConsultation';
import ViewConsultation from './Patient/ViewConsultation';

function App() {
  return (
    <div>
                    <BrowserRouter>
                        <Route exact path="/" component={LogIn}/>
                        <Route exact path="/Login" component={LogIn}/>
                        <Route exact path="/Register" component={Register}/>
                        <Route exact path="/AdminHome" component={AdminHome}/>
                        <Route exact path="/AddDoctor" component={AddDoctor}/>
                        <Route exact path="/AddHospital" component={AddHospital}/>
                        <Route exact path="/UpdateHospital" component={UpdateHospital}/>
                        <Route exact path="/Hospital" component={Hospital}/>
                        <Route exact path="/AddMedicine" component={AddMedicine}/>
                        <Route exact path="/UpdateMedication" component={UpdateMedication}/>
                        <Route exact path="/Medicines" component={Medicines}/>
                        <Route exact path="/AddSection" component={AddSection}/>
                        <Route exact path="/UpdateSection" component={UpdateSection}/>
                        <Route exact path="/Sections" component={Sections}/>
                        <Route exact path="/ApproveMedicine" component={ApproveMedicine}/>
                        <Route exact path="/AddMedicineDoctor" component={AddMedicineDoctor}/>
                        <Route exact path="/ViewMedicineDoctor" component={ViewMedicineDoctor}/>
                        <Route exact path="/DoctorHome" component={DoctorHome}/>
                        <Route exact path="/AddDiagnostic" component={AddDiagnostic}/>
                        <Route exact path="/UpdateDiagnostic" component={UpdateDiagnostic}/>
                        <Route exact path="/Diagnostic" component={Diagnostic}/>
                        <Route exact path="/ApproveDiagnostic" component={ApproveDiagnostic}/>
                        <Route exact path="/AddDiagnosticDoctor" component={AddDiagnosticDoctor}/>
                        <Route exact path="/ViewDiagnosticDoctor" component={ViewDiagnosticDoctor}/>
                        <Route exact path="/UpdateDoctorProfile" component={UpdateDoctorProfile}/>
                        <Route exact path="/UpdatePatientProfile" component={UpdatePatientProfile}/>
                        <Route exact path="/PatientHome" component={PatientHome}/>
                        <Route exact path="/ShowDoctor" component={ShowDoctor}/>
                        <Route exact path="/DoctorProfile" component={DoctorProfile}/>
                        <Route exact path="/MakeAppoiments" component={MakeAppoiments}/>
                        <Route exact path="/Calendar" component={Calendar}/>
                        <Route exact path="/ViewAppoiments" component={ViewAppoiments}/>
                        <Route exact path="/AproveAppoiment" component={AproveAppoiment}/>
                        <Route exact path="/SeePatients" component={SeePatients}/>
                        <Route exact path="/MakeConsultation" component={MakeConsultation}/>
                        <Route exact path="/ViewConsultation" component={ViewConsultation}/>
                    </BrowserRouter>
                    </div>
  );
}

export default App;
