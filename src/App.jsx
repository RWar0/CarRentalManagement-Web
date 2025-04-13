import React from "react";
import { Routes, Route, Outlet } from "react-router";
import SideMenu from "./components/common/SideMenu";
import TopMenu from "./components/common/TopMenu";
import Dashboard from "./pages/Dashboard";
import './app.css';
import VehicleList from "./pages/vehicles/VehicleList";
import VehicleCategories from "./pages/vehicles/VehicleCategories";
import Insurances from "./pages/vehicles/Insurances";
import RentalList from "./pages/rentals/RentalList";
import Invoices from "./pages/rentals/Invoices";
import Payments from "./pages/rentals/Payments";
import CustomerList from "./pages/customers/CustomerList";
import CustomerWarnings from "./pages/customers/CustomerWarnings";
import ServiceList from "./pages/services/ServiceList";
import ServiceVehicles from "./pages/services/ServiceVehicles";
import Fuelings from "./pages/services/Fuelings";
import VehicleAddEditForm from "./pages/vehicles/VehicleAddEditForm";
import Deposits from "./pages/rentals/Deposits";
import CategoryAddEditForm from "./pages/vehicles/CategoryAddEditForm";
import InsuranceAddEditForm from "./pages/vehicles/InsuranceAddEditForm";
import RentalAddEditForm from "./pages/rentals/RentalAddEditForm";
import CustomerAddEditForm from "./pages/customers/CustomerAddEditForm";
import DepositEditForm from "./pages/rentals/DepositEditForm";
import DepositAddForm from "./pages/rentals/DepositAddForm";
import WarningAddEditForm from "./pages/customers/WarningAddEditForm";
import ServiceAddEditForm from "./pages/services/ServiceAddEditForm";
import FuelAddEditForm from "./pages/services/FuelAddEditForm";
import InvoiceAddEditForm from "./pages/rentals/InvoiceAddEditForm";
import PaymentAddForm from "./pages/rentals/PaymentAddForm";
import PaymentEditForm from "./pages/rentals/PaymentEditForm";
import VehicleServiceAddForm from "./pages/services/VehicleServiceAddForm";
import VehicleServiceEditForm from "./pages/services/VehicleServiceEditForm";
import WarningsOfCustomer from "./pages/customers/WarningsOfCustomer";
import RentalsOfCustomer from "./pages/rentals/RentalsOfCustomer";
import ServicesOfVehicle from "./pages/services/ServicesOfVehicle";
import FuelingsOfVehicle from "./pages/services/FuelingsOfVehicle";
import InsurancesOfVehicle from "./pages/vehicles/InsurancesOfVehicle";
import InvoicesOfRental from "./pages/rentals/InvoicesOfRental";
import PaymentsOfInvoice from "./pages/rentals/PaymentsOfInvoice";
import ServicedVehicles from "./pages/services/ServicedVehicles";
import DepositsOfRental from "./pages/rentals/DepositsOfRental";
import RentalsOfVehicle from "./pages/rentals/RentalsOfVehicle";

function App() {
  return (
    <>
      <div className="container-fluid m-0 p-0" style={{ minHeight: '100vh', width: '100vw', backgroundColor: 'rgb(245, 245, 245)' }}>
        <div className="row w-100 m-0 p-0">
          <div className="d-none d-xl-block col-2 m-0 p-0">
            <SideMenu />
          </div>
          <div className="d-xl-none m-0 p-0">
            <TopMenu />
          </div>

          <div className="m-0 p-0 col-12 col-md-12 col-lg-12 col-xl-10 overflow-auto">
            <Routes>
              <Route exact path="/*" element={<Dashboard />} />

              <Route path="/Vehicles/*">
                <Route path="List" element={<VehicleList />} />
                <Route path="VehicleCreate" element={<VehicleAddEditForm />} />
                <Route path="EditVehicle/:id" element={<VehicleAddEditForm />} />

                <Route path="Categories" element={<VehicleCategories />} />
                <Route path="CategoryCreate" element={<CategoryAddEditForm />} />
                <Route path="EditCategory/:id" element={<CategoryAddEditForm />} />

                <Route path="Insurances" element={<Insurances />} />
                <Route path="InsurancesOfVehicle/:id" element={<InsurancesOfVehicle />} />
                <Route path="InsuranceCreate" element={<InsuranceAddEditForm />} />
                <Route path="EditInsurane/:id" element={<InsuranceAddEditForm />} />
              </Route>

              <Route path="/Rentals/*">
                <Route path="List" element={<RentalList />} />
                <Route path="RentalsOfCustomer/:id" element={<RentalsOfCustomer />} />
                <Route path="RentalsOfVehicle/:id" element={<RentalsOfVehicle />} />
                <Route path="RentalCreate" element={<RentalAddEditForm />} />
                <Route path="EditRental/:id" element={<RentalAddEditForm />} />

                <Route path="Deposits" element={<Deposits />} />
                <Route path="DepositsOfRental/:id" element={<DepositsOfRental />} />
                <Route path="DepositCreate" element={<DepositAddForm />} />
                <Route path="EditDeposit/:id" element={<DepositEditForm />} />

                <Route path="Invoices" element={<Invoices />} />
                <Route path="InvoicesOfRental/:id" element={<InvoicesOfRental />} />
                <Route path="InvoiceCreate" element={<InvoiceAddEditForm />} />
                <Route path="EditInvoice/:id" element={<InvoiceAddEditForm />} />

                <Route path="Payments" element={<Payments />} />
                <Route path="PaymentsOfInvoice/:id" element={<PaymentsOfInvoice />} />
                <Route path="PaymentCreate" element={<PaymentAddForm />} />
                <Route path="EditPayment/:id" element={<PaymentEditForm />} />
              </Route>

              <Route path="/Customers/*">
                <Route path="List" element={<CustomerList />} />
                <Route path="WarningsOfCustomer/:id" element={<WarningsOfCustomer />} />
                <Route path="CustomerCreate" element={<CustomerAddEditForm />} />
                <Route path="EditCustomer/:id" element={<CustomerAddEditForm />} />

                <Route path="Warnings" element={<CustomerWarnings />} />
                <Route path="WarningCreate" element={<WarningAddEditForm />} />
                <Route path="EditWarning/:id" element={<WarningAddEditForm />} />
              </Route>


              <Route path="/Services/*">
                <Route path="List" element={<ServiceList />} />
                <Route path="ServiceCreate" element={<ServiceAddEditForm />} />
                <Route path="EditService/:id" element={<ServiceAddEditForm />} />
                
                <Route path="ServicedVehicles/:id" element={<ServicedVehicles />} />
                <Route path="ServicesOfVehicle/:id" element={<ServicesOfVehicle />} />

                <Route path="Vehicles" element={<ServiceVehicles />} />
                <Route path="VehicleServiceCreate" element={<VehicleServiceAddForm />} />
                <Route path="EditVehicleService/:id" element={<VehicleServiceEditForm />} />

                <Route path="Fuelings" element={<Fuelings />} />
                <Route path="FuelingsOfVehicle/:id" element={<FuelingsOfVehicle />} />
                <Route path="FuelingCreate" element={<FuelAddEditForm />} />
                <Route path="EditFueling/:id" element={<FuelAddEditForm />} />
              </Route>

            </Routes>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
