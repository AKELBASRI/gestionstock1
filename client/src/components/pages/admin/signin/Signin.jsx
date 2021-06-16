import React from 'react'
import './signin.css'
function Signin() {
    return (
        <div>
           {/* <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto"> */}
           <div className="">
    <div className="card  border-0">
        <div className="row d-flex">
            <div className="col-lg-6">
                <div className="card1 pb-5">
                    {/* <div className="row"> <img src="https://i.imgur.com/CXQmsmF.png" className="logo"/> </div> */}
                    <div className="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src="https://i.imgur.com/uNGdWHi.png" className="image"/> </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="card2 card border-0 px-4 py-5">
                  
                 
                    <div className="row px-3"> <label className="mb-1">
                            <h6 className="mb-0 text-sm">Matricule</h6>
                        </label> <input className="mb-4" type="text" name="email" placeholder="Matricule"/> </div>
                    <div className="row px-3"> <label className="mb-1">
                            <h6 className="mb-0 text-sm">Mot de passe</h6>
                        </label> <input type="password" name="password" placeholder="Mot de passe"/> </div>
                    <div className="row px-3 mb-4">
                       
                    </div>
                    <div className="row mb-3 px-3"> <button type="submit" className="btn btn-blue text-center">Login</button> </div>
                 
                </div>
            </div>
        </div>
        <div className="bg-blue py-4 ">
            <div className="text-center"> <small className="ml-4 ml-sm-5 mb-2 ">Copyright &copy; 2021.  RADEEO S.S.I. Tous droits réservés. Gestion Stock V1.0 by Ahmed Khalil El Basri.</small>
             
            </div>
        </div>
    </div>
</div>
</div>
  
    )
}

export default Signin
