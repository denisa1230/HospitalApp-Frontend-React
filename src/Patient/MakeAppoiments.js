import React from "react"
import PatientNavBar from "../navBars/PatientNavBar";
import {Button, Form, FormGroup, Jumbotron, Table,Input,Label} from "reactstrap";
import 'react-calendar/dist/Calendar.css';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import Swal from 'sweetalert2';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import { NotificationContainer } from "react-notifications";
import 'react-notifications/lib/notifications.css'

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: '100vh',
    marginTop: '0px',
    marginBottom: '0px',
    backgroundColor: 'whitesmoke'
};

class MakeAppoiments extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: localStorage.getItem('email'),
            data: new Date(),
            device: {},
            devList: [],
            localDate:{},
            doctors:[],
            oraCurenta: null,
            appointment:{
              date:"",
              hour:"",
              pacient:{}, 
              doctor:{}
            },
            patients:{},
            selectedDoctor:"",
            selectedDoctorForm:"Selected Doctor",
            selectedPatient:{},
            selectedHour:[]
           
        }
        this.handleMakeAppointment = this.handleMakeAppointment.bind(this)
        this.getDoctor=this.getDoctor.bind(this)
        this.handleDoctor=this.handleDoctor.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handleSelectHourByAppoiment=this.handleSelectHourByAppoiment.bind(this)
        this.handleSelectDoctor = this.handleSelectDoctor.bind(this)
        this.getPatientByAccount=this.getPatientByAccount.bind(this)
        this.handleSelectHour=this.handleSelectHour.bind(this)
      
    }
    componentDidMount(){
      
        this.getDoctor()
        this.getPatientByAccount()
        this.intervalID = setInterval(
            () => this.actualizeazaOraCurenta(),
            60 * 60 * 1000
          );
          
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
   }

      actualizeazaOraCurenta() {
        this.setState({
          oraCurenta: new Date().getHours(),
        });
    }
   
    onChange = data => {
      const dayOfWeek = data.getDay();
      if (dayOfWeek === 6 || dayOfWeek === 0) {
        NotificationManager.info("Programările nu se fac în weekend!", 'Alert',6000);
        return;
      }
        this.setState({data})
        var day = data.getDate()
        var month = data.getMonth() + 1
        this.state.localDate = this.state.data.getFullYear() ;
        if(month < 10)
            this.state.localDate = this.state.localDate + "-0" + month;
        else
            this.state.localDate = this.state.localDate + "-" + month;
        if(day < 10)
            this.state.localDate = this.state.localDate + "-0" + day;
        else
            this.state.localDate = this.state.localDate + "-" + day;
        if(typeof this.state.selectedDoctor !== 'undefined')
        {
          this.handleSelectHourByAppoiment();
        }
        
        
    }

    handleMakeAppointment() {
        if (!this.state.selectedDoctor) {
          NotificationManager.info('Selectați un doctor');
            return;
          }
        // Verificăm dacă s-a selectat o oră 
          if (!this.state.oraSelectata) {
            NotificationManager.info('Selectați o oră între 9 și 17');
            return;
          }
        
          // Verificăm dacă data selectată este în viitor
          const today = new Date();
          if (this.state.data < today) {
            NotificationManager.info("Data selectata este mai veche decat data curenta. Va rugam sa alegeti o data valida!");
            return;
          }
         
        axios.post('http://localhost:8080/appointments/saveAppointment',{
            
            date: this.state.localDate,
            hour: this.state.oraSelectata,
            patient: this.state.selectedPatient,
            doctor:this.state.selectedDoctor,
            status:"PENDING"
            
        }).then(response=>{
          Swal.fire('Appointment was made successfully')
            this.props.history.push("/ViewAppoiments")
        })
    }
    handleSelectHour(event){
      const oraSelectata = event.target.value;
      this.setState({ oraSelectata }, () => {
        console.log(this.state.oraSelectata);
      });
      
    }

    handleSelectHourByAppoiment() {
      axios.get(`http://localhost:8080/appointments/getAppointmentByDoctor/${this.state.selectedDoctor.idDoctor}`)
        .then((response) => {
          const appointments = response.data;
          const options = [];
          for (let ora = 9; ora <= 16; ora++) {
            let appointmentNotFound = true;
            for (let i = 0; i < appointments.length; i++) {
              const appointment = appointments[i];
              if (appointment.date === this.state.localDate && appointment.hour === ora && appointment.status!="Canceled Appointment") {
                appointmentNotFound = false;
                break;
              }
            }
            if (appointmentNotFound===true) {
              options.push({
                value: ora,
                label: ora + ':00 - ' + (ora + 1) + ':00',
              });
            }
          }
          this.setState({
            selectedHour: options,
          });
          console.log(this.state.selectedHour);
        });
    }
    

      handleSelectDoctor(event) {
        const doctor = JSON.parse(event.target.value);
        this.setState({ selectedDoctor: doctor }, () => {
          console.log(this.state.selectedDoctor);
          this.handleSelectHourByAppoiment();
        });
    }

    handleChange(dev, e) {
        this.state = {
            showForm: false,
          };
    }

    getDoctor(){
        axios.get("http://localhost:8080/doctor/findAllDoctor").then(response=>{
        this.setState({
            doctors:response.data
        })
        })
    }
    
 
    handleDoctor(event){
        event.preventDefault();
        const {name, value} = event.target;
        const doctors = this.state.doctors;
        let newDoctor = null;
        for(let i = 0; i < doctors.length; i++) {
          if (value === doctors[i].fullName) {
            newDoctor = doctors[i];
            break;
          }
        }
        this.setState({
          selectedDoctor: newDoctor.fullName,
          doctorId: newDoctor.idDoctor,
        });
      
        console.log("Selected doctor:", this.state.selectedDoctor);
        console.log("Doctor ID:", this.state.doctorId);
      }

      getPatientByAccount() {

        var username= localStorage.getItem("username");
        axios.get(`http://localhost:8080/patient/getPatientByAccount/${username}`)
          .then((response) => {
            this.setState({
              selectedPatient: response.data,
            });
            console.log(this.selectedPatient);
          });
      }

    render() {
        const { showForm, selectedDoctor, doctorDetails } = this.state;
        const { oraCurenta } = this.state;
        
        return (
            <div className="body">
                <PatientNavBar />
                <NotificationContainer/>
                <div className="logo-container-home">
                    <img className="imgg-app" src={require("../Images/SEEDOCTOR.png")} alt="Logo"/>
               
                    <Form className="align">
                        <FormGroup className="calendar">
                            <span>
                                
                            </span>
                            <Form>
                                <div className='calendar-container'>
                                    <Calendar
                                        onChange={this.onChange}
                                        value={this.state.date}
                                        onClickDay={() => this.setState({ showForm: true })}
                                    />
                                </div>
                            </Form>
                        </FormGroup>
                        {showForm && (
                            <FormGroup className="login-form-APP">
                              <img className="imgApp" src={require("../Images/makeAA.png")} alt="Logo"/>
                                <h2>Make an appointment:</h2>
                                <Form>
                                <FormGroup>
                                <Label>Select One Doctor</Label>
                                    <Input type="select"
                                     name="doctor"
                                     value={JSON.stringify(selectedDoctor)}
                                     onChange={this.handleSelectDoctor}>
                                     <option>Select Doctor</option>
                                     {this.state.doctors.map(doctor =>
                                      <option key={doctor.idDoctor} value={JSON.stringify(doctor)}>
                                      {doctor.firstName+" "+doctor.lastName}
                                    </option>)}
                                    </Input>
                                </FormGroup>

                                    <FormGroup>
                                        <Label for="appointmentDate">Appointment date:</Label>
                                        <Input
                                            type="text"
                                            value={this.state.localDate}
                                            readOnly
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                    <Label>Ora curenta este: {this.state.oraCurenta}</Label>
                                    <Input type="select" onChange={(e) => this.handleSelectHour(e)}>
                                    <option>Select Hour</option>
                                    {this.state.selectedHour.map((option) => (
                                     <option key={option.value} value={option.value}>
                                    {option.label}
                                    </option>
                                     ))}
                                    </Input>
                                    </FormGroup>
                                    <Button className="button-33" onClick={this.handleMakeAppointment}> Make appointment </Button>
                                </Form>
                            </FormGroup>
                            
                        )}
                    </Form>
               </div>
            </div>
        );
    }

}

export default MakeAppoiments;