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
                    </BrowserRouter>
                    </div>
  );
}

export default App;
